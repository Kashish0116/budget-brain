import { Zap, ShieldCheck, BarChart3, Bell } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Auto-categorize",
    desc: "Every transaction sorted instantly across 30+ categories.",
  },
  {
    icon: BarChart3,
    title: "Monthly reports",
    desc: "Beautiful breakdowns of where your money actually went.",
  },
  {
    icon: Bell,
    title: "Smart alerts",
    desc: "Know before you overspend with personalized nudges.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-grade security",
    desc: "256-bit encryption. Read-only access. Always.",
  },
];

const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {features.map((f) => (
        <div
          key={f.title}
          className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-elegant">
            <f.icon className="h-5 w-5" />
          </div>
          <h4 className="mt-4 text-base font-semibold text-foreground">{f.title}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
