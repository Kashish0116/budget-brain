"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface User {
  name: string;
  email: string;
}

interface Credentials {
  username: string;
  email: string;
  password: string;
}

interface AuthResult {
  success: boolean;
  message?: string;
}

const USER_KEY = "bb_user";
const CREDENTIALS_KEY = "bb_credentials";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(USER_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Failed to load auth data", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const buildUser = (creds: Credentials): User => ({
    name: creds.username,
    email: creds.email,
  });

  const persistUser = (user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setUser(user);
  };

  const login = (identifier: string, password: string): AuthResult => {
    const rawCreds = localStorage.getItem(CREDENTIALS_KEY);

    if (!rawCreds) {
      return {
        success: false,
        message: "No account found. Please sign up first.",
      };
    }

    try {
      const creds: Credentials = JSON.parse(rawCreds);
      const normalizedIdentifier = identifier.trim().toLowerCase();
      const matchesUsername = creds.username.toLowerCase() === normalizedIdentifier;
      const matchesEmail = creds.email.toLowerCase() === normalizedIdentifier;

      if (!matchesUsername && !matchesEmail) {
        return {
          success: false,
          message: "No account matches that username or email.",
        };
      }

      if (creds.password !== password) {
        return {
          success: false,
          message: "Incorrect password. Please try again.",
        };
      }

      const loggedInUser = buildUser(creds);
      persistUser(loggedInUser);
      router.push("/dashboard");

      return {
        success: true,
      };
    } catch (error) {
      console.error("Failed to parse credentials", error);
      return {
        success: false,
        message: "Unable to log in right now. Please try again later.",
      };
    }
  };

  const signup = (
    username: string,
    email: string,
    password: string,
  ): AuthResult => {
    if (!username || !email || !password) {
      return {
        success: false,
        message: "Please provide a username, email, and password.",
      };
    }

    const existingCredentials = localStorage.getItem(CREDENTIALS_KEY);
    if (existingCredentials) {
      return {
        success: false,
        message: "An account already exists. Please log in instead.",
      };
    }

    const credentials: Credentials = {
      username: username.trim(),
      email: email.trim(),
      password,
    };

    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
    return login(username, password);
  };

  const logout = () => {
    localStorage.removeItem(USER_KEY);
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
