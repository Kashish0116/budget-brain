import { Brain } from "lucide-react";

const BudgetBrainLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero shadow-elegant">
        <Brain className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-lg font-bold tracking-tight text-foreground">BudgetBrain</span>
    </div>
  );
};

export default BudgetBrainLogo;
