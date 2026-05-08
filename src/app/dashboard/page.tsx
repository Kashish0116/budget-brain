"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useFinance } from "@/hooks/use-finance";
import Navbar from "@/components/Navbar";
import DashboardPreview from "@/components/DashboardPreview";
import { TransactionHistory } from "@/components/TransactionHistory";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";
import { SetBudgetDialog } from "@/components/SetBudgetDialog";
import InsightsMockup from "@/components/InsightsMockup";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutGrid, Plus } from "lucide-react";

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const { 
    transactions, 
    addTransaction, 
    deleteTransaction, 
    setBudget, 
    getTotalSpent, 
    getCategorySpending, 
    getTotalBudget,
    budgets 
  } = useFinance();
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
      <Navbar onConnect={() => {}} />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome back, {user.name}
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your money this month.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <AddExpenseDialog onAdd={addTransaction} />
            <SetBudgetDialog onSet={setBudget} />
            <Button variant="ghost" onClick={logout} className="text-muted-foreground hover:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Stats */}
          <div className="lg:col-span-2 space-y-8">
            <DashboardPreview 
              totalSpent={getTotalSpent()}
              totalBudget={getTotalBudget()}
              categorySpending={getCategorySpending()}
              userName={user.name}
            />
            
            <TransactionHistory 
              transactions={transactions} 
              onDelete={deleteTransaction} 
            />
          </div>

          {/* Sidebar Insights */}
          <div className="space-y-8">
            <InsightsMockup 
              totalSpent={getTotalSpent()}
              totalBudget={getTotalBudget()}
              categorySpending={getCategorySpending()}
              budgets={budgets}
            />

            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="mb-4 font-semibold text-foreground flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 text-primary" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Income
                </Button>
                <Button variant="outline" className="w-full justify-start text-muted-foreground" disabled>
                  Generate Report (Coming soon)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
