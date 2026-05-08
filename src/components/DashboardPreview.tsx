import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Wallet, PieChart } from "lucide-react";
import { CATEGORY_COLORS, Category } from "@/lib/finance";

interface DashboardPreviewProps {
  totalSpent: number;
  totalBudget: number;
  categorySpending: Record<string, number>;
  userName?: string;
}

const DashboardPreview = ({ 
  totalSpent, 
  totalBudget, 
  categorySpending,
  userName = "Aarav" 
}: DashboardPreviewProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const budgetUsage = totalBudget > 0 ? Math.min(Math.round((totalSpent / totalBudget) * 100), 100) : 0;
  
  const sortedCategories = Object.entries(categorySpending)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="relative">
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-hero opacity-20 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-elegant"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-border/60 bg-secondary/40 px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-chart-4/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-primary/60" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            budgetbrain.app/dashboard
          </span>
          <span className="w-12" />
        </div>

        <div className="space-y-5 p-6">
          {/* Greeting */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {mounted ? new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : "---"}
              </p>
              <h3 className="mt-0.5 text-lg font-semibold text-foreground">Good evening, {userName}</h3>
            </div>
            <div className={`rounded-full px-3 py-1 text-xs font-semibold ${
              budgetUsage > 90 ? "bg-destructive/10 text-destructive" : "bg-accent text-accent-foreground"
            }`}>
              {budgetUsage > 90 ? "Over budget" : "On track"}
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-gradient-hero p-4 text-primary-foreground shadow-card">
              <Wallet className="h-4 w-4 opacity-80" />
              <p className="mt-2 text-[10px] font-medium uppercase tracking-wider opacity-80">
                Spent
              </p>
              <p className="text-lg font-bold">₹{totalSpent.toLocaleString("en-IN")}</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background p-4">
              <TrendingDown className="h-4 w-4 text-primary" />
              <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Remaining
              </p>
              <p className="text-lg font-bold text-foreground">₹{Math.max(0, totalBudget - totalSpent).toLocaleString("en-IN")}</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background p-4">
              <PieChart className="h-4 w-4 text-primary" />
              <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Budget
              </p>
              <p className="text-lg font-bold text-foreground">{budgetUsage}%</p>
            </div>
          </div>

          {/* Categories */}
          <div className="rounded-2xl border border-border/60 bg-background p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Top categories</p>
            </div>
            <div className="space-y-3">
              {sortedCategories.length > 0 ? sortedCategories.map(([name, amount], i) => (
                <div key={name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{name}</span>
                    <span className="font-semibold text-muted-foreground">
                      ₹{amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(amount / totalSpent) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ background: CATEGORY_COLORS[name as Category] }}
                    />
                  </div>
                </div>
              )) : (
                <p className="py-4 text-center text-xs text-muted-foreground">No expenses yet</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPreview;
