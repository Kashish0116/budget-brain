"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Sparkles, LayoutGrid } from "lucide-react";
import Navbar from "@/components/Navbar";
import DashboardPreview from "@/components/DashboardPreview";
import InsightsMockup from "@/components/InsightsMockup";
import FeatureCards from "@/components/FeatureCards";
import BudgetBrainLogo from "@/components/BudgetBrainLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFinance } from "@/hooks/use-finance";
import { useAuth } from "@/hooks/use-auth";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";
import { SetBudgetDialog } from "@/components/SetBudgetDialog";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function Home() {
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { 
    addTransaction, 
    setBudget, 
    getTotalSpent, 
    getCategorySpending, 
    getTotalBudget,
    budgets 
  } = useFinance();
  const { login, signup } = useAuth();

  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    setAuthError("");
    setIsSubmitting(true);

    const result = login(loginIdentifier.trim(), loginPassword);
    if (!result.success) {
      setAuthError(result.message ?? "Unable to sign in. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleSignup = async () => {
    setAuthError("");
    if (signupPassword !== signupConfirmPassword) {
      setAuthError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    const result = signup(signupUsername.trim(), signupEmail.trim(), signupPassword);
    if (!result.success) {
      setAuthError(result.message ?? "Unable to sign up. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-soft" />
        <div className="absolute -top-40 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-card">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Personal finance tracker
              </div>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Smart way to{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">track</span>,{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">categorize</span> &
                understand your expenses.
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                Start tracking your expenses manually or connect your accounts for automatic analysis.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <AddExpenseDialog onAdd={addTransaction} />
                <SetBudgetDialog onSet={setBudget} />
              </div>
              <div className="mt-7 flex flex-wrap gap-5 text-xs font-medium text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-primary" /> Private & Secure
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" /> Monthly Budgets
                </span>
                <span className="flex items-center gap-1.5">
                  <LayoutGrid className="h-3.5 w-3.5 text-primary" /> Smart Insights
                </span>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <DashboardPreview 
                totalSpent={mounted ? getTotalSpent() : 0}
                totalBudget={mounted ? getTotalBudget() : 0}
                categorySpending={mounted ? getCategorySpending() : {}}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Auth Tabs */}
      <section id="auth" className="px-6 py-16">
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="mb-6 inline-flex rounded-lg bg-secondary p-1">
              <button
                onClick={() => setAuthTab("login")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  authTab === "login"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setAuthTab("signup")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  authTab === "signup"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign Up
              </button>
            </div>

            {authTab === "login" ? (
              <div>
                <h3 className="text-xl font-semibold text-foreground">Welcome back</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Log in to continue tracking and optimizing your monthly spending.
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="login-identifier">Username or Email</Label>
                    <Input
                      id="login-identifier"
                      value={loginIdentifier}
                      onChange={(event) => setLoginIdentifier(event.target.value)}
                      placeholder="Enter your username or email"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginPassword}
                      onChange={(event) => setLoginPassword(event.target.value)}
                      placeholder="Enter your password"
                      className="mt-2"
                    />
                  </div>
                </div>

                {authError ? (
                  <p className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {authError}
                  </p>
                ) : null}

                <Button
                  type="button"
                  onClick={handleLogin}
                  disabled={isSubmitting}
                  className="mt-5 w-full bg-gradient-hero shadow-elegant hover:opacity-90"
                >
                  {isSubmitting ? "Signing in..." : "Login to BudgetBrain"}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-foreground">Create your account</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sign up to connect your accounts and start getting smart insights.
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="signup-username">Username</Label>
                    <Input
                      id="signup-username"
                      value={signupUsername}
                      onChange={(event) => setSignupUsername(event.target.value)}
                      placeholder="Choose a username"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupEmail}
                      onChange={(event) => setSignupEmail(event.target.value)}
                      placeholder="Enter your email"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupPassword}
                      onChange={(event) => setSignupPassword(event.target.value)}
                      placeholder="Create a password"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-confirm-password">Confirm password</Label>
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      value={signupConfirmPassword}
                      onChange={(event) => setSignupConfirmPassword(event.target.value)}
                      placeholder="Confirm your password"
                      className="mt-2"
                    />
                  </div>
                </div>

                {authError ? (
                  <p className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {authError}
                  </p>
                ) : null}

                <Button
                  type="button"
                  onClick={handleSignup}
                  disabled={isSubmitting}
                  className="mt-5 w-full bg-gradient-hero shadow-elegant hover:opacity-90"
                >
                  {isSubmitting ? "Creating account..." : "Create Free Account"}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Phone mockups + features */}
      <section id="features" className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to master your money
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              From linking accounts in seconds to AI-driven insights, BudgetBrain keeps your
              finances clear.
            </p>
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <InsightsMockup 
              totalSpent={mounted ? getTotalSpent() : 0}
              totalBudget={mounted ? getTotalBudget() : 0}
              categorySpending={mounted ? getCategorySpending() : {}}
              budgets={mounted ? budgets : []}
            />
            <FeatureCards />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <BudgetBrainLogo />
          <p className="text-xs text-muted-foreground">© 2026 BudgetBrain. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
