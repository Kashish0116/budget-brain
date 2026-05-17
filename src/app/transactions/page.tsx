"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useFinance } from "@/hooks/use-finance";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { TransactionHistory } from "@/components/TransactionHistory";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";
import { Button } from "@/components/ui/button";
import { LogOut, Plus, RotateCcw } from "lucide-react";

export default function TransactionsPage() {
  const { user, isLoading, logout } = useAuth();
  const { transactions, addTransaction, deleteTransaction, loadDemoData } = useFinance();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Navbar />

      <main className="ml-64 min-h-screen pt-16">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Transactions
              </h1>
              <p className="text-muted-foreground">
                View and manage all your transactions here.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={loadDemoData}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Load Demo Data
              </Button>
              <AddExpenseDialog onAdd={addTransaction} />
              <Button variant="ghost" onClick={logout} className="text-muted-foreground hover:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          <TransactionHistory 
            transactions={transactions} 
            onDelete={deleteTransaction} 
          />
        </div>
      </main>
    </div>
  );
}
