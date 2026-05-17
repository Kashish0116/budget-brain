"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useFinance } from "@/hooks/use-finance";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { SetGoalDialog } from "@/components/SetGoalDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, Target, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Category, CATEGORY_COLORS } from "@/lib/finance";

export default function GoalsPage() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const { goals, addGoal, deleteGoal, updateGoalProgress, loadDemoData } = useFinance();
  const router = useRouter();

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

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Navbar />

      <main className="ml-64 min-h-screen pt-16">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Financial Goals
              </h1>
              <p className="text-muted-foreground">
                Set and track your financial goals.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <SetGoalDialog onSet={addGoal} />
              <Button variant="outline" onClick={loadDemoData}>
                <Target className="mr-2 h-4 w-4" />
                Load Demo Data
              </Button>
              <Button variant="ghost" onClick={logout} className="text-muted-foreground hover:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          {goals.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-secondary/30 p-12 text-center">
              <Target className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">
                No goals yet. Click &ldquo;Set Goal&rdquo; to start tracking your financial targets.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {goals.map((goal) => {
                const current = goal.currentAmount || 0;
                const progress = goal.targetAmount > 0
                  ? Math.min(Math.round((current / goal.targetAmount) * 100), 100)
                  : 0;

                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-border bg-card p-6 shadow-card"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                          <Target className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{goal.name}</h3>
                          {goal.category && (
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{ background: CATEGORY_COLORS[goal.category as Category] }}
                              />
                              <span className="text-xs text-muted-foreground">{goal.category}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteGoal(goal.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mb-2 flex items-end justify-between">
                      <span className="text-2xl font-bold text-foreground">
                        ₹{current.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        of ₹{goal.targetAmount.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          progress >= 100 ? "bg-green-500" : "bg-primary"
                        }`}
                      />
                    </div>

                    <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{progress}% complete</span>
                      {goal.deadline && (
                        <span>Due {new Date(goal.deadline).toLocaleDateString("en-IN")}</span>
                      )}
                    </div>

                    {progress < 100 && (
                      <div className="mt-4 flex items-center gap-2">
                        <Input
                          type="number"
                          placeholder="Update amount"
                          className="h-9 text-sm"
                          id={`progress-${goal.id}`}
                        />
                        <Button
                          size="sm"
                          className="h-9 shrink-0"
                          onClick={() => {
                            const input = document.getElementById(`progress-${goal.id}`) as HTMLInputElement;
                            const val = parseFloat(input.value);
                            if (!isNaN(val) && val >= 0) {
                              updateGoalProgress(goal.id, val);
                              input.value = "";
                            }
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
