export type Category = 
  | "Food & Dining" 
  | "Shopping" 
  | "Transport" 
  | "Bills & Utilities" 
  | "Entertainment" 
  | "Health" 
  | "Housing"
  | "Salary"
  | "Gift"
  | "Investments"
  | "Others";

export interface Transaction {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: string;
  type: "expense" | "income";
}

export interface Budget {
  category: Category;
  amount: number;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  createdAt: string;
}

export const CATEGORIES: Category[] = [
  "Food & Dining",
  "Shopping",
  "Transport",
  "Bills & Utilities",
  "Entertainment",
  "Health",
  "Housing",
  "Salary",
  "Gift",
  "Investments",
  "Others"
];

export const CATEGORY_COLORS: Record<Category, string> = {
  "Food & Dining": "oklch(0.62 0.18 155)",
  "Shopping": "oklch(0.74 0.16 165)",
  "Transport": "oklch(0.65 0.15 200)",
  "Bills & Utilities": "oklch(0.7 0.14 80)",
  "Entertainment": "oklch(0.7 0.18 30)",
  "Health": "oklch(0.6 0.2 0)",
  "Housing": "oklch(0.5 0.1 50)",
  "Salary": "oklch(0.7 0.2 140)",
  "Gift": "oklch(0.8 0.15 300)",
  "Investments": "oklch(0.5 0.2 250)",
  "Others": "oklch(0.7 0 0)",
};
