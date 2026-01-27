// src/lib/auth.ts
"use client";

const USERS = {
  admin: "neon-rhino-77-horizon",
  mira: "velvet-forest-pulse-2026",
};

const AUTH_KEY = "cms-active-session";

/**
 * Validates credentials and persists session
 * @param username - The identity of the user
 * @param password - The secret key
 */
export const login = (username: string, password: string): boolean => {
  const normalizedUser = username.toLowerCase() as keyof typeof USERS;
  const validPassword = USERS[normalizedUser];

  if (validPassword && password === validPassword) {
    if (typeof window !== "undefined") {
      // Store the username so the UI knows who is logged in
      localStorage.setItem(AUTH_KEY, username);
    }
    return true;
  }
  
  return false;
};

/**
 * Clears the session from local storage
 */
export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY);
  }
  return true;
};

/**
 * Checks if a valid session exists
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) !== null;
};

/**
 * Retrieves the currently logged-in username
 */
export const getActiveUser = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_KEY);
};