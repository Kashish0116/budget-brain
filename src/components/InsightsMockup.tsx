import { Sparkles, AlertCircle, TrendingDown, Coffee } from "lucide-react";

const InsightsMockup = () => {
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
          <div className="rounded-xl bg-gradient-hero p-4 text-primary-foreground shadow-card">
            <p className="text-[10px] font-medium uppercase tracking-wider opacity-80">This month</p>
            <p className="mt-1 text-sm font-semibold leading-snug">
              You spent ₹4,200 less on dining out compared to April. Great job!
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-3">
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent">
                <Coffee className="h-3.5 w-3.5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Subscription detected</p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                  Spotify ₹119/mo recurring on the 5th
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-3">
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <AlertCircle className="h-3.5 w-3.5 text-foreground" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Budget alert</p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                  Shopping is at 82% of your monthly limit
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-3">
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <TrendingDown className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Save ₹1,800/mo</p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                  Switch to annual plans on 3 subscriptions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsMockup;