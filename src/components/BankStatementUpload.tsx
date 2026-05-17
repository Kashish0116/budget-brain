"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Category } from "@/lib/finance";

interface ParsedTransaction {
  date: string;
  description: string;
  amount: number;
  type: "expense" | "income";
  category: Category;
}

const KEYWORD_CATEGORIES: Record<string, Category> = {
  swiggy: "Food & Dining", zomato: "Food & Dining", restaurant: "Food & Dining",
  food: "Food & Dining", dining: "Food & Dining", grocery: "Food & Dining",
  amazon: "Shopping", flipkart: "Shopping", myntra: "Shopping", shopping: "Shopping",
  uber: "Transport", ola: "Transport", metro: "Transport", petrol: "Transport",
  fuel: "Transport", transport: "Transport",
  electricity: "Bills & Utilities", bill: "Bills & Utilities", water: "Bills & Utilities",
  recharge: "Bills & Utilities", utilities: "Bills & Utilities",
  netflix: "Entertainment", spotify: "Entertainment", movie: "Entertainment",
  entertainment: "Entertainment",
  hospital: "Health", pharmacy: "Health", doctor: "Health", health: "Health",
  rent: "Housing", housing: "Housing",
  salary: "Salary", credit: "Salary",
  gift: "Gift",
  sip: "Investments", mutual: "Investments", investment: "Investments", nps: "Investments",
};

function categorize(description: string): Category {
  const lower = description.toLowerCase();
  for (const [keyword, category] of Object.entries(KEYWORD_CATEGORIES)) {
    if (lower.includes(keyword)) return category;
  }
  return "Others";
}

function parseDate(dateStr: string): string {
  const cleaned = dateStr.trim();
  // DD/MM/YYYY or DD-MM-YYYY
  const dmy = cleaned.match(/(\d{2})[\/\-](\d{2})[\/\-](\d{4})/);
  if (dmy) return `${dmy[3]}-${dmy[2].padStart(2, "0")}-${dmy[1].padStart(2, "0")}`;
  // DD/MM/YY
  const dmy2 = cleaned.match(/(\d{2})[\/\-](\d{2})[\/\-](\d{2})/);
  if (dmy2) return `20${dmy2[3]}-${dmy2[2].padStart(2, "0")}-${dmy2[1].padStart(2, "0")}`;
  // YYYY-MM-DD
  const ymd = cleaned.match(/(\d{4})[\/\-](\d{2})[\/\-](\d{2})/);
  if (ymd) return `${ymd[1]}-${ymd[2].padStart(2, "0")}-${ymd[3].padStart(2, "0")}`;
  return "";
}

function parseAmount(str: string): number {
  const cleaned = str.replace(/[,]/g, "").trim();
  const match = cleaned.match(/[\-\+]?\d+\.?\d*/);
  return match ? Math.abs(parseFloat(match[0])) : 0;
}

function parseTransactionsFromText(text: string): ParsedTransaction[] {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const transactions: ParsedTransaction[] = [];

  // Patterns for Indian bank statement rows:
  // Pattern 1: Date | Description | ... | Debit | Credit | Balance
  // Pattern 2: Date | Narration | ... | Withdrawal | Deposit | Balance
  // Pattern 3: Date, Description, amount (simple CSV-like)
  for (const line of lines) {
    const parts = line.split(/\s{2,}/); // Split by 2+ spaces (common in PDF text extraction)

    // Try to find a date first
    const dateStr = parts.find((p) => /^\d{2}[\/\-]\d{2}[\/\-]\d{2,4}$/.test(p.trim()));
    if (!dateStr) continue;

    const date = parseDate(dateStr);
    if (!date) continue;

    // Look for amount-like values
    const amountParts = parts.filter((p) => /[\-\+]?\s*[\d,]+\.\d{2}/.test(p.trim()));
    if (amountParts.length === 0) continue;

    // Description is everything between date and amounts
    const dateIdx = parts.indexOf(dateStr);
    const amountIndices = amountParts.map((ap) => parts.indexOf(ap));
    const firstAmountIdx = Math.min(...amountIndices);
    const description = parts.slice(dateIdx + 1, firstAmountIdx).join(" ").trim();

    // Determine debit/credit from amounts
    // Typically: debit (expense) is positive, credit (income) is positive or has a different column
    // We look at the raw text near amounts to determine direction
    let amount = 0;
    let type: "expense" | "income" = "expense";

    for (const ap of amountParts) {
      const raw = ap.trim();
      const num = parseAmount(raw);

      // If preceded by "-" or "(Dr)" or in a debit column
      const idx = parts.indexOf(ap);
      const contextBefore = (parts[idx - 1] || "").toLowerCase();
      const contextLine = line.substring(0, line.indexOf(ap)).toLowerCase();

      const isDebit = raw.startsWith("-") || raw.startsWith("(") ||
        contextBefore.includes("dr") || contextBefore.includes("withdrawal") ||
        contextBefore.includes("debit") || contextLine.includes("dr") ||
        contextLine.includes("withdrawal") || contextLine.includes("debit");

      const isCredit = raw.endsWith(")") ||
        contextBefore.includes("cr") || contextBefore.includes("deposit") ||
        contextBefore.includes("credit") || contextLine.includes("cr") ||
        contextLine.includes("deposit") || contextLine.includes("credit");

      if (isDebit) {
        amount = num;
        type = "expense";
        break;
      } else if (isCredit) {
        amount = num;
        type = "income";
        break;
      } else {
        // Ambiguous - use first amount as expense (most common)
        amount = num || amount;
      }
    }

    if (amount === 0) continue;

    transactions.push({
      date,
      description: description || "Bank transaction",
      amount,
      type,
      category: categorize(description),
    });
  }

  return transactions;
}

export function BankStatementUpload({
  onParsed,
}: {
  onParsed: (transactions: ParsedTransaction[]) => void;
}) {
  const [parsing, setParsing] = useState(false);
  const [result, setResult] = useState<{ count: number; error?: string } | null>(null);

  async function handleFile(file: File) {
    if (!file.name.endsWith(".pdf")) {
      setResult({ count: 0, error: "Please upload a PDF file." });
      return;
    }

    setParsing(true);
    setResult(null);

    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

      const buffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: buffer }).promise;
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        fullText += content.items.map((item: any) => item.str).join(" ") + "\n";
      }

      const transactions = parseTransactionsFromText(fullText);

      if (transactions.length === 0) {
        setResult({
          count: 0,
          error: "Could not find any transactions in the PDF. Make sure it's an Indian bank statement.",
        });
      } else {
        onParsed(transactions);
        setResult({ count: transactions.length });
      }
    } catch (e) {
      console.error("PDF parse error", e);
      setResult({ count: 0, error: "Failed to parse PDF. Make sure it's a valid bank statement." });
    } finally {
      setParsing(false);
    }
  }

  return (
    <div>
      <input
        type="file"
        accept=".pdf"
        id="bank-statement-upload"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      <label htmlFor="bank-statement-upload">
        <Button variant="outline" className="w-full justify-start cursor-pointer" asChild>
          <span>
            {parsing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            {parsing ? "Parsing Statement..." : "Upload Bank Statement"}
          </span>
        </Button>
      </label>
      {result && (
        <div className={`mt-2 flex items-center gap-2 text-xs ${
          result.error ? "text-destructive" : "text-green-600"
        }`}>
          {result.error ? (
            <><AlertCircle className="h-3 w-3" /> {result.error}</>
          ) : (
            <><CheckCircle2 className="h-3 w-3" /> {result.count} transactions found</>
          )}
        </div>
      )}
    </div>
  );
}
