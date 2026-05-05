import { Building2, Smartphone, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const banks = ["HDFC", "ICICI", "SBI", "Axis", "Kotak", "Yes Bank"];
const upiApps = ["Google Pay", "PhonePe", "Paytm", "BHIM"];

const ConnectAccountDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Connect your bank or UPI</DialogTitle>
          <DialogDescription>
            Securely link via read-only access. We never see your password.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Building2 className="h-3.5 w-3.5" /> Banks
            </p>
            <div className="grid grid-cols-3 gap-2">
              {banks.map((b) => (
                <button
                  key={b}
                  className="rounded-lg border border-border bg-card px-3 py-3 text-sm font-medium text-foreground transition-all hover:border-primary hover:bg-accent"
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Smartphone className="h-3.5 w-3.5" /> UPI apps
            </p>
            <div className="grid grid-cols-2 gap-2">
              {upiApps.map((u) => (
                <button
                  key={u}
                  className="rounded-lg border border-border bg-card px-3 py-3 text-sm font-medium text-foreground transition-all hover:border-primary hover:bg-accent"
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg bg-secondary p-3 text-xs text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>End-to-end encrypted via account aggregator. Read-only — we can't move your money.</span>
          </div>

          <Button className="w-full bg-gradient-hero shadow-elegant hover:opacity-90">
            Continue securely
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectAccountDialog;