"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useFinance } from "@/hooks/use-finance";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { SetBudgetDialog } from "@/components/SetBudgetDialog";
import { Button } from "@/components/ui/button";
import { LogOut, Wallet } from "lucide-react";

export default function BudgetsPage() {
  const { user, isLoading, logout } = useAuth();
  const { budgets, setBudget, getTotalBudget, getCategorySpending } = useFinance();
  const categorySpending = getCategorySpending();
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
                Budgets
              </h1>
              <p className="text-muted-foreground">
                Set and manage your monthly budgets by category.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <SetBudgetDialog onSet={setBudget} />
              <Button variant="ghost" onClick={logout} className="text-muted-foreground hover:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {budgets.length > 0 ? (
              budgets.map((budget, index) => {
                const spent = categorySpending[budget.category] || 0;
                const remaining = budget.amount - spent;
                const usage = budget.amount > 0 ? Math.min(Math.round((spent / budget.amount) * 100), 100) : 0;

                return (
                <div key={index} className="rounded-lg border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Wallet className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground capitalize">{budget.category}</p>
                        <p className="text-sm text-muted-foreground">Monthly budget</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-foreground">
                        ₹{budget.amount.toLocaleString("en-IN")}
                      </p>
                      <span className={`text-sm font-medium ${
                        remaining < 0 ? "text-destructive" : "text-green-600"
                      }`}>
                        {remaining >= 0 ? "₹" : "-₹"}
                        {Math.abs(remaining).toLocaleString("en-IN")} {remaining >= 0 ? "left" : "over"}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div
                        className={`h-full rounded-full transition-all ${
                          usage > 90 ? "bg-destructive" : usage > 70 ? "bg-yellow-500" : "bg-primary"
                        }`}
                        style={{ width: `${usage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₹{spent.toLocaleString("en-IN")} spent</span>
                      <span>{usage}% used</span>
                    </div>
                  </div>
                </div>
                );
              })
            ) : (
              <div className="col-span-full rounded-lg border border-dashed border-border bg-secondary/30 p-12 text-center">
                <Wallet className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">
                  No budgets set yet. Click "Set Budget" to create one.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
