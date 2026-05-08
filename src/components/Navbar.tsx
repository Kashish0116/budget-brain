"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import BudgetBrainLogo from "./BudgetBrainLogo";
import { useAuth } from "@/hooks/use-auth";

import { useState, useEffect } from "react";

const Navbar = ({ onConnect }: { onConnect: () => void }) => {
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/">
          <BudgetBrainLogo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="/#how"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            How it works
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {mounted && user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <Button
                size="sm"
                variant="outline"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={() => (window.location.hash = "auth")}>
                Login
              </Button>
              <Button
                size="sm"
                onClick={onConnect}
                className="bg-gradient-hero shadow-elegant hover:opacity-90"
              >
                Get started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
