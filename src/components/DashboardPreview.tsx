import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Wallet, PieChart } from "lucide-react";

const categories = [
  { name: "Food & Dining", amount: 18420, pct: 32, color: "oklch(0.62 0.18 155)" },
  { name: "Shopping", amount: 12380, pct: 22, color: "oklch(0.74 0.16 165)" },
  { name: "Transport", amount: 8650, pct: 15, color: "oklch(0.65 0.15 200)" },
  { name: "Bills & Utilities", amount: 7240, pct: 13, color: "oklch(0.7 0.14 80)" },
  { name: "Entertainment", amount: 5120, pct: 9, color: "oklch(0.7 0.18 30)" },
];

const DashboardPreview = () => {
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
          <span className="text-xs font-medium text-muted-foreground">budgetbrain.app/dashboard</span>
          <span className="w-12" />
        </div>

        <div className="space-y-5 p-6">
          {/* Greeting */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">May 2026</p>
              <h3 className="mt-0.5 text-lg font-semibold text-foreground">Good evening, Aarav</h3>
            </div>
            <div className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              On track
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-gradient-hero p-4 text-primary-foreground shadow-card">
              <Wallet className="h-4 w-4 opacity-80" />
              <p className="mt-2 text-[10px] font-medium uppercase tracking-wider opacity-80">Spent</p>
              <p className="text-lg font-bold">₹56,810</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background p-4">
              <TrendingDown className="h-4 w-4 text-primary" />
              <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Saved</p>
              <p className="text-lg font-bold text-foreground">₹23,190</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background p-4">
              <PieChart className="h-4 w-4 text-primary" />
              <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Budget</p>
              <p className="text-lg font-bold text-foreground">71%</p>
            </div>
          </div>

          {/* Categories */}
          <div className="rounded-2xl border border-border/60 bg-background p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Top categories</p>
              <span className="flex items-center gap-1 text-xs font-medium text-primary">
                <TrendingUp className="h-3 w-3" /> 12% vs Apr
              </span>
            </div>
            <div className="space-y-3">
              {categories.map((c, i) => (
                <div key={c.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{c.name}</span>
                    <span className="font-semibold text-muted-foreground">
                      ₹{c.amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${c.pct}%` }}
                      transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ background: c.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPreview;