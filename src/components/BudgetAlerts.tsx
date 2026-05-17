"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, AlertCircle, X } from "lucide-react";
import { Budget, Category, CATEGORY_COLORS } from "@/lib/finance";

interface BudgetAlertsProps {
  budgets: Budget[];
  categorySpending: Record<string, number>;
}

export function BudgetAlerts({ budgets, categorySpending }: BudgetAlertsProps) {
  const [dismissed, setDismissed] = useState<string[]>([]);

  const alerts = useMemo(() => {
    return budgets
      .map((b) => {
        const spent = categorySpending[b.category] || 0;
        const usage = b.amount > 0 ? (spent / b.amount) * 100 : 0;
        return { ...b, spent, usage };
      })
      .filter((b) => b.usage >= 80 && !dismissed.includes(b.category))
      .sort((a, b) => b.usage - a.usage);
  }, [budgets, categorySpending, dismissed]);

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {alerts.map((alert) => {
          const isOver = alert.usage >= 100;
          return (
            <motion.div
              key={alert.category}
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className={`flex items-start gap-3 rounded-xl border p-4 ${
                isOver
                  ? "border-destructive/30 bg-destructive/5"
                  : "border-yellow-500/30 bg-yellow-500/5"
              }`}
            >
              <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                isOver ? "bg-destructive/10" : "bg-yellow-500/10"
              }`}>
                {isOver ? (
                  <AlertCircle className={`h-4 w-4 ${isOver ? "text-destructive" : "text-yellow-500"}`} />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ background: CATEGORY_COLORS[alert.category as Category] }}
                  />
                  <p className={`text-sm font-semibold ${isOver ? "text-destructive" : "text-yellow-600"}`}>
                    {isOver ? "Budget exceeded" : "Budget limit approaching"}
                  </p>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {alert.category}: ₹{alert.spent.toLocaleString("en-IN")} of ₹{alert.amount.toLocaleString("en-IN")} ({Math.round(alert.usage)}%)
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className={`h-full rounded-full ${isOver ? "bg-destructive" : "bg-yellow-500"}`}
                    style={{ width: `${Math.min(alert.usage, 100)}%` }}
                  />
                </div>
              </div>
              <button
                onClick={() => setDismissed((prev) => [...prev, alert.category])}
                className="mt-0.5 shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
