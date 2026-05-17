"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useFinance } from "@/hooks/use-finance";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { LogOut, BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  const { user, isLoading, logout } = useAuth();
  const { getCategorySpending, getTotalSpent, getTotalBudget } = useFinance();
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
                Analytics
              </h1>
              <p className="text-muted-foreground">
                Visualize your spending patterns and financial insights.
              </p>
            </div>
            <Button variant="ghost" onClick={logout} className="text-muted-foreground hover:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="mt-2 text-2xl font-bold text-foreground">
                  ${getTotalSpent().toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="mt-2 text-2xl font-bold text-foreground">
                  ${getTotalBudget().toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="mt-2 text-2xl font-bold text-primary">
                  ${(getTotalBudget() - getTotalSpent()).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-dashed border-border bg-secondary/30 p-12 text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">
                Advanced analytics charts coming soon! Track your spending trends and patterns.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
