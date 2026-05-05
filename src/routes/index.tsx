import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Upload, Lock, Sparkles, LayoutGrid } from "lucide-react";
import Navbar from "@/components/Navbar";
import DashboardPreview from "@/components/DashboardPreview";
import ConnectAccountsMockup from "@/components/ConnectAccountsMockup";
import InsightsMockup from "@/components/InsightsMockup";
import FeatureCards from "@/components/FeatureCards";
import ConnectAccountDialog from "@/components/ConnectAccountDialog";
import BudgetBrainLogo from "@/components/BudgetBrainLogo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BudgetBrain — Smart expense tracking for India" },
      {
        name: "description",
        content:
          "Connect your bank & UPI apps. BudgetBrain auto-categorizes spending and gives you smart monthly insights.",
      },
    ],
  }),
  component: Index,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

function Index() {
  const [openConnect, setOpenConnect] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen bg-background">
      <Navbar onConnect={() => setOpenConnect(true)} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-soft" />
        <div className="absolute -top-40 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-card">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                AI-powered expense tracking
              </div>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Smart way to{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">track</span>,{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">categorize</span>{" "}
                & understand your expenses.
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                Connect your bank & UPI apps and let BudgetBrain automatically analyze your spending every month.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  onClick={() => setOpenConnect(true)}
                  className="bg-gradient-hero shadow-elegant hover:opacity-90"
                >
                  <LayoutGrid className="mr-1 h-4 w-4" />
                  Connect Bank / UPI
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  <Upload className="mr-1 h-4 w-4" />
                  Upload Statement
                </Button>
              </div>
              <div className="mt-7 flex flex-wrap gap-5 text-xs font-medium text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-primary" /> Bank-grade security
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" /> Auto-categorization
                </span>
                <span className="flex items-center gap-1.5">
                  <LayoutGrid className="h-3.5 w-3.5 text-primary" /> Smart insights
                </span>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <DashboardPreview />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Auth Tabs */}
      <section className="px-6 py-16">
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
                <Button className="mt-5 w-full bg-gradient-hero shadow-elegant hover:opacity-90">
                  Login to BudgetBrain
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-foreground">Create your account</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sign up to connect your accounts and start getting smart insights.
                </p>
                <Button className="mt-5 w-full bg-gradient-hero shadow-elegant hover:opacity-90">
                  Create Free Account
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
              From linking accounts in seconds to AI-driven insights, BudgetBrain keeps your finances clear.
            </p>
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-3">
            <ConnectAccountsMockup />
            <InsightsMockup />
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

      <ConnectAccountDialog open={openConnect} onOpenChange={setOpenConnect} />
    </div>
  );
}
