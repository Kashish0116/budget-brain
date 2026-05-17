"use client";

import { motion } from "framer-motion";
import { Goal, Category, CATEGORY_COLORS } from "@/lib/finance";
import { Target, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GoalsListProps {
  goals: Goal[];
  onDelete: (id: string) => void;
}

export function GoalsList({ goals, onDelete }: GoalsListProps) {
  if (goals.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <h3 className="mb-4 font-semibold text-foreground flex items-center gap-2">
        <Target className="h-4 w-4 text-primary" />
        Financial Goals
      </h3>
      <div className="space-y-4">
        {goals.map((goal) => {
          const current = goal.currentAmount || 0;
          const progress = goal.targetAmount > 0
            ? Math.min(Math.round((current / goal.targetAmount) * 100), 100)
            : 0;

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{goal.name}</span>
                  {goal.category && (
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: CATEGORY_COLORS[goal.category as Category] }}
                    />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground">
                    ₹{(goal.currentAmount || 0).toLocaleString("en-IN")} / ₹{goal.targetAmount.toLocaleString("en-IN")}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                    onClick={() => onDelete(goal.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`h-full rounded-full transition-colors ${
                    progress >= 100 ? "bg-green-500" : "bg-primary"
                  }`}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{progress}% complete</span>
                {goal.deadline && (
                  <span>Due: {new Date(goal.deadline).toLocaleDateString("en-IN")}</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
