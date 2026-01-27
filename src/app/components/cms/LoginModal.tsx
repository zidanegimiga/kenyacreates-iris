"use client";

import { useState, useEffect } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Lock, X, Loader2 } from "lucide-react";

export default function LoginModal({ 
  showLogin, 
  setShowLogin 
}: { 
  showLogin: boolean; 
  setShowLogin: (show: boolean) => void 
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowLogin(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setShowLogin]);

  if (!showLogin) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (login(password)) {
        router.push('/cms/editor');
        setShowLogin(false);
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setShowLogin(false)} />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm overflow-hidden rounded-xl bg-white p-8 shadow-2xl ring-1 ring-black/5"
      >
        <button 
          type="button"
          onClick={() => setShowLogin(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-600">
            <Lock size={24} />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Admin Access</h2>
          <p className="mt-1 text-sm text-gray-500">Please enter your password to continue.</p>
        </div>

        <div className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              placeholder="••••••••"
              className={`w-full rounded-lg border px-4 py-3 text-gray-900 transition-all focus:outline-none focus:ring-2 ${
                error 
                  ? "border-red-300 focus:ring-red-100" 
                  : "border-gray-200 focus:border-teal-500 focus:ring-teal-100"
              }`}
              autoFocus
              disabled={isLoading}
            />
            {error && <p className="mt-2 text-xs font-medium text-red-500">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-lg bg-teal-600 px-4 py-3 font-semibold text-white transition-all hover:bg-teal-700 active:scale-[0.98] disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
}