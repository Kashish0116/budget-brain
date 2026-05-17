"use client";

import { useState, useEffect } from "react";
import { Transaction, Budget, Goal, Category } from "@/lib/finance";

function getDemoTransactions(): Transaction[] {
  const today = new Date();
  const daysAgo = (d: number) => new Date(today.getTime() - d * 86400000).toISOString().split("T")[0];
  return [
    { id: "demo-1", amount: 450, category: "Food & Dining", description: "Zomato order", date: daysAgo(0), type: "expense" },
    { id: "demo-2", amount: 1200, category: "Shopping", description: "Amazon haul", date: daysAgo(1), type: "expense" },
    { id: "demo-3", amount: 180, category: "Transport", description: "Metro recharge", date: daysAgo(1), type: "expense" },
    { id: "demo-4", amount: 3200, category: "Bills & Utilities", description: "Electricity bill", date: daysAgo(2), type: "expense" },
    { id: "demo-5", amount: 650, category: "Food & Dining", description: "Dinner at BBQ Nation", date: daysAgo(2), type: "expense" },
    { id: "demo-6", amount: 500, category: "Entertainment", description: "Netflix + Spotify", date: daysAgo(3), type: "expense" },
    { id: "demo-7", amount: 850, category: "Food & Dining", description: "Grocery run", date: daysAgo(3), type: "expense" },
    { id: "demo-8", amount: 250, category: "Transport", description: "Uber ride", date: daysAgo(4), type: "expense" },
    { id: "demo-9", amount: 1500, category: "Shopping", description: "Myntra clothes", date: daysAgo(5), type: "expense" },
    { id: "demo-10", amount: 70000, category: "Salary", description: "Monthly salary", date: daysAgo(5), type: "income" },
    { id: "demo-11", amount: 4500, category: "Housing", description: "Room rent", date: daysAgo(6), type: "expense" },
    { id: "demo-12", amount: 400, category: "Health", description: "Pharmacy", date: daysAgo(7), type: "expense" },
    { id: "demo-13", amount: 2000, category: "Investments", description: "Mutual fund SIP", date: daysAgo(7), type: "expense" },
    { id: "demo-14", amount: 350, category: "Food & Dining", description: "Swiggy lunch", date: daysAgo(8), type: "expense" },
  ];
}

function getDemoBudgets(): Budget[] {
  return [
    { category: "Food & Dining", amount: 8000 },
    { category: "Shopping", amount: 5000 },
    { category: "Transport", amount: 3000 },
    { category: "Bills & Utilities", amount: 5000 },
    { category: "Entertainment", amount: 2000 },
    { category: "Health", amount: 3000 },
    { category: "Housing", amount: 15000 },
  ];
}

function getDemoGoals(): Goal[] {
  return [
    { id: "demo-goal-1", name: "Emergency Fund", targetAmount: 100000, currentAmount: 45000, category: "Investments" },
    { id: "demo-goal-2", name: "MacBook Pro", targetAmount: 250000, currentAmount: 65000, deadline: "2026-12-31", category: "Shopping" },
    { id: "demo-goal-3", name: "Europe Trip", targetAmount: 300000, currentAmount: 50000, deadline: "2027-06-30", category: "Others" },
  ];
}

export function useFinance() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage, seed demo data if empty
  useEffect(() => {
    try {
      const savedTransactions = localStorage.getItem("bb_transactions");
      const savedBudgets = localStorage.getItem("bb_budgets");
      const savedGoals = localStorage.getItem("bb_goals");

      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      } else {
        setTransactions(getDemoTransactions());
      }

      if (savedBudgets) {
        setBudgets(JSON.parse(savedBudgets));
      } else {
        setBudgets(getDemoBudgets());
      }

      if (savedGoals) {
        setGoals(JSON.parse(savedGoals));
      } else {
        setGoals(getDemoGoals());
      }
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

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("bb_goals", JSON.stringify(goals));
    }
  }, [goals, isLoaded]);

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

  const addGoal = (g: { name: string; targetAmount: number; deadline?: string; category?: Category }) => {
    const newGoal: Goal = { ...g, currentAmount: 0, id: crypto.randomUUID() };
    setGoals((prev) => [...prev, newGoal]);
  };

  const updateGoalProgress = (id: string, currentAmount: number) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, currentAmount } : g))
    );
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const loadDemoData = () => {
    setTransactions(getDemoTransactions());
    setBudgets(getDemoBudgets());
    setGoals(getDemoGoals());
  };

  const getTotalBudget = () => {
    return budgets.reduce((acc, b) => acc + b.amount, 0);
  };

  return {
    transactions,
    budgets,
    goals,
    isLoaded,
    addTransaction,
    deleteTransaction,
    setBudget,
    addGoal,
    updateGoalProgress,
    deleteGoal,
    loadDemoData,
    getTotalSpent,
    getCategorySpending,
    getTotalBudget,
  };
}
