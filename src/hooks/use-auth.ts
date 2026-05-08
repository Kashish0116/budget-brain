"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface User {
  name: string;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("bb_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Failed to load auth data", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (name: string, email: string) => {
    const newUser = { name, email };
    localStorage.setItem("bb_user", JSON.stringify(newUser));
    setUser(newUser);
    router.push("/dashboard");
  };

  const signup = (name: string, email: string) => {
    login(name, email);
  };

  const logout = () => {
    localStorage.removeItem("bb_user");
    setUser(null);
    router.push("/");
  };

  return {
    user,
    isLoading,
    login,
    signup,
    logout,
  };
}
