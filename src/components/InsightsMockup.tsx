import { Sparkles, AlertCircle, TrendingDown, Coffee, CheckCircle2 } from "lucide-react";
import { Budget } from "@/lib/finance";

interface InsightsProps {
  totalSpent: number;
  totalBudget: number;
  categorySpending: Record<string, number>;
  budgets: Budget[];
}

const InsightsMockup = ({ totalSpent, totalBudget, categorySpending, budgets }: InsightsProps) => {
  const overBudgetCategories = budgets.filter(b => (categorySpending[b.category] || 0) > b.amount);
  const nearBudgetCategories = budgets.filter(b => {
    const spent = categorySpending[b.category] || 0;
    return spent > b.amount * 0.8 && spent <= b.amount;
  });

  return (
    <div className="mx-auto w-full max-w-[300px]">
      <div className="rounded-[2.5rem] border-[10px] border-foreground/90 bg-background p-4 shadow-elegant">
        <div className="mb-4 flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-foreground">9:41</span>
          <span className="text-[10px] text-muted-foreground">Insights</span>
        </div>

        <div className="mb-3 flex items-center gap-2 px-1">
          <Sparkles className="h-4 w-4 text-primary" />
          <h4 className="text-base font-bold text-foreground">Smart insights</h4>
        </div>

        <div className="space-y-2.5">
          {totalSpent > 0 ? (
            <div className="rounded-xl bg-gradient-hero p-4 text-primary-foreground shadow-card">
              <p className="text-[10px] font-medium uppercase tracking-wider opacity-80">
                Summary
              </p>
              <p className="mt-1 text-sm font-semibold leading-snug">
                You've spent ₹{totalSpent.toLocaleString("en-IN")} so far this month. 
                {totalBudget > 0 ? ` That's ${Math.round((totalSpent / totalBudget) * 100)}% of your total budget.` : ""}
              </p>
            </div>
          ) : (
            <div className="rounded-xl bg-secondary/50 p-4 border border-dashed border-border">
              <p className="text-xs text-center text-muted-foreground font-medium">
                Add expenses to see AI-powered insights
              </p>
            </div>
          )}

          {overBudgetCategories.map(b => (
            <div key={b.category} className="rounded-xl border border-destructive/20 bg-destructive/5 p-3">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                  <AlertCircle className="h-3.5 w-3.5 text-destructive" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Budget exceeded</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                    {b.category} is ₹{(categorySpending[b.category] - b.amount).toLocaleString("en-IN")} over limit
                  </p>
                </div>
              </div>
            </div>
          ))}

          {nearBudgetCategories.map(b => (
            <div key={b.category} className="rounded-xl border border-border bg-card p-3">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <AlertCircle className="h-3.5 w-3.5 text-foreground" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Budget alert</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                    {b.category} is at {Math.round((categorySpending[b.category] / b.amount) * 100)}% of limit
                  </p>
                </div>
              </div>
            </div>
          ))}

          {totalSpent > 0 && overBudgetCategories.length === 0 && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Good progress</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                    All categories are currently within your set budget limits.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightsMockup;
