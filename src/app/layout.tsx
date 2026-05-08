import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BudgetBrain — Smart expense tracking for India",
  description:
    "Connect your bank & UPI apps. BudgetBrain auto-categorizes spending and gives you smart monthly insights.",
  keywords: ["budget", "expense tracking", "finance", "India"],
  authors: [{ name: "BudgetBrain" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://budgetbrain.app",
    siteName: "BudgetBrain",
    title: "BudgetBrain — Smart expense tracking for India",
    description:
      "Connect your bank & UPI apps. BudgetBrain auto-categorizes spending and gives you smart monthly insights.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BudgetBrain — Smart expense tracking for India",
    description:
      "Connect your bank & UPI apps. BudgetBrain auto-categorizes spending and gives you smart monthly insights.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
