import { Building2, Smartphone, Check } from "lucide-react";

const banks = [
  { name: "HDFC Bank", type: "Savings ••3421", connected: true },
  { name: "ICICI Bank", type: "Credit ••8821", connected: true },
  { name: "SBI", type: "Savings ••1209", connected: false },
];
const upi = [
  { name: "Google Pay", id: "aarav@okhdfc", connected: true },
  { name: "PhonePe", id: "9876••@ybl", connected: true },
];

const ConnectAccountsMockup = () => {
  return (
    <div className="mx-auto w-full max-w-[300px]">
      <div className="rounded-[2.5rem] border-[10px] border-foreground/90 bg-background p-4 shadow-elegant">
        <div className="mb-4 flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-foreground">9:41</span>
          <span className="text-[10px] text-muted-foreground">Connect</span>
        </div>
        <h4 className="px-1 text-base font-bold text-foreground">Linked accounts</h4>
        <p className="mb-4 px-1 text-xs text-muted-foreground">Banks & UPI apps</p>

        <div className="mb-4 space-y-2">
          {banks.map((b) => (
            <div key={b.name} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                <Building2 className="h-4 w-4 text-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">{b.name}</p>
                <p className="text-[10px] text-muted-foreground">{b.type}</p>
              </div>
              {b.connected ? (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />
                </div>
              ) : (
                <span className="text-[10px] font-semibold text-primary">Link</span>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {upi.map((u) => (
            <div key={u.name} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                <Smartphone className="h-4 w-4 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">{u.name}</p>
                <p className="text-[10px] text-muted-foreground">{u.id}</p>
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectAccountsMockup;