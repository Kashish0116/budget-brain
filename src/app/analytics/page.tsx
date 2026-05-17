"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useFinance } from "@/hooks/use-finance";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { CATEGORY_COLORS, Category } from "@/lib/finance";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const CATEGORY_LIST: Category[] = [
  "Food & Dining", "Shopping", "Transport", "Bills & Utilities",
  "Entertainment", "Health", "Housing", "Salary", "Gift", "Investments", "Others",
];

function getWeekNumber(date: Date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - startOfYear.getTime();
  const day = startOfYear.getDay();
  return Math.ceil((diff / 86400000 + day + 1) / 7);
}

export default function AnalyticsPage() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const { transactions, getCategorySpending, getTotalSpent, getTotalBudget, budgets } = useFinance();
  const router = useRouter();
  const [view, setView] = useState<"weekly" | "monthly">("weekly");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const expenses = transactions.filter((t) => t.type === "expense");
  const categorySpending = getCategorySpending();
  const totalSpent = getTotalSpent();
  const totalBudget = getTotalBudget();

  // Build time-based data
  const timeGroups: Record<string, number> = {};
  if (view === "weekly") {
    const now = new Date();
    for (let i = 3; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 7 * 86400000);
      const label = `Week ${getWeekNumber(d)}`;
      timeGroups[label] = 0;
    }
  } else {
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
      timeGroups[label] = 0;
    }
  }

  expenses.forEach((t) => {
    const d = new Date(t.date);
    if (view === "weekly") {
      const label = `Week ${getWeekNumber(d)}`;
      if (timeGroups[label] !== undefined) timeGroups[label] += t.amount;
    } else {
      const label = d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
      if (timeGroups[label] !== undefined) timeGroups[label] += t.amount;
    }
  });

  const timeLabels = Object.keys(timeGroups);
  const timeData = Object.values(timeGroups);

  const timeChartData = {
    labels: timeLabels,
    datasets: [
      {
        label: view === "weekly" ? "Weekly Spending" : "Monthly Spending",
        data: timeData,
        backgroundColor: "oklch(0.55 0.2 240 / 0.8)",
        borderColor: "oklch(0.55 0.2 240)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const timeChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (v: any) => "₹" + Number(v).toLocaleString("en-IN"),
        },
      },
    },
  };

  // Category pie chart
  const pieLabels = CATEGORY_LIST.filter((c) => (categorySpending[c] || 0) > 0);
  const pieColors = pieLabels.map((c) => CATEGORY_COLORS[c]);
  const pieData = {
    labels: pieLabels,
    datasets: [
      {
        data: pieLabels.map((c) => categorySpending[c]),
        backgroundColor: pieColors.map((c) => c.replace(")", "/0.8)")),
        borderColor: pieColors,
        borderWidth: 1,
      },
    ],
  };

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
                  ₹{totalSpent.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="mt-2 text-2xl font-bold text-foreground">
                  ₹{totalBudget.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="mt-2 text-2xl font-bold text-primary">
                  ₹{(totalBudget - totalSpent).toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Spending Over Time</h3>
                  <div className="flex gap-1 rounded-lg bg-secondary p-1">
                    <button
                      onClick={() => setView("weekly")}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                        view === "weekly"
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Weekly
                    </button>
                    <button
                      onClick={() => setView("monthly")}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                        view === "monthly"
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>
                {expenses.length > 0 ? (
                  <Bar data={timeChartData} options={timeChartOptions} />
                ) : (
                  <p className="py-12 text-center text-sm text-muted-foreground">
                    No expenses yet. Add some data to see the chart.
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="mb-6 font-semibold text-foreground">Spending by Category</h3>
                {totalSpent > 0 ? (
                  <div className="mx-auto max-w-sm">
                    <Pie data={pieData} />
                  </div>
                ) : (
                  <p className="py-12 text-center text-sm text-muted-foreground">
                    No expenses yet. Add some data to see the chart.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
