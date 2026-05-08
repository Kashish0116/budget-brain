"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction, CATEGORY_COLORS } from "@/lib/finance";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function TransactionHistory({
  transactions,
  onDelete,
}: {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border bg-secondary/20">
        <h3 className="font-semibold text-foreground">Recent Transactions</h3>
      </div>
      <div className="max-h-[400px] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="text-xs font-medium text-muted-foreground">
                    {new Date(t.date).toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell className="text-sm font-semibold">{t.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-2 w-2 rounded-full" 
                        style={{ background: CATEGORY_COLORS[t.category] }}
                      />
                      <span className="text-xs">{t.category}</span>
                    </div>
                  </TableCell>
                  <TableCell className={`text-right font-bold ${
                    t.type === "expense" ? "text-destructive" : "text-primary"
                  }`}>
                    {t.type === "expense" ? "-" : "+"}₹{t.amount.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => onDelete(t.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No transactions yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
