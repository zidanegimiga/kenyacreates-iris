// src/lib/auth.ts
"use client";

const ADMIN_PASSWORD = "kenyacreates2025"; // ← change this!
const AUTH_KEY = "cms-admin-auth";

export const login = (password: string): boolean => {
  if (password === ADMIN_PASSWORD) {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_KEY, "true");
    }
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
  return true;
};

export const isAuthenticated = (): boolean => {
  return typeof window !== "undefined" && localStorage.getItem(AUTH_KEY) === "true";
};