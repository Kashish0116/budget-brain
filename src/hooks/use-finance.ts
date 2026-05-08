"use client";

import { useState, useEffect } from "react";
import { Transaction, Budget, Category } from "@/lib/finance";

export function useFinance() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedTransactions = localStorage.getItem("bb_transactions");
      const savedBudgets = localStorage.getItem("bb_budgets");

      if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
      if (savedBudgets) setBudgets(JSON.parse(savedBudgets));
    } catch (e) {
      console.error("Failed to load finance data", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("bb_transactions", JSON.stringify(transactions));
    }
  }, [transactions, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("bb_budgets", JSON.stringify(budgets));
    }
  }, [budgets, isLoaded]);

  const addTransaction = (t: Omit<Transaction, "id">) => {
    const newTransaction = { ...t, id: crypto.randomUUID() };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const setBudget = (category: Category, amount: number) => {
    setBudgets((prev) => {
      const existing = prev.find((b) => b.category === category);
      if (existing) {
        return prev.map((b) => (b.category === category ? { ...b, amount } : b));
      }
      return [...prev, { category, amount }];
    });
  };

  const getTotalSpent = () => {
    return transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);
  };

  const getCategorySpending = () => {
    const spending: Record<string, number> = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        spending[t.category] = (spending[t.category] || 0) + t.amount;
      });
    return spending;
  };

  const getTotalBudget = () => {
    return budgets.reduce((acc, b) => acc + b.amount, 0);
  };

  return {
    transactions,
    budgets,
    isLoaded,
    addTransaction,
    deleteTransaction,
    setBudget,
    getTotalSpent,
    getCategorySpending,
    getTotalBudget,
  };
}
