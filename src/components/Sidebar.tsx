"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, TrendingUp, Wallet, Target, BarChart3 } from "lucide-react";
import BudgetBrainLogo from "./BudgetBrainLogo";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
    { href: "/transactions", label: "Transactions", icon: TrendingUp },
    { href: "/budgets", label: "Budgets", icon: Wallet },
    { href: "/goals", label: "Goals", icon: Target },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-card shadow-lg">
      <div className="flex h-16 items-center justify-center border-b border-border px-6">
        <BudgetBrainLogo />
      </div>

      <nav className="space-y-2 px-4 py-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                active
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
