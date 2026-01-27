"use client";

import { useState, useEffect } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Lock, User, Loader2, X } from "lucide-react";

export default function LoginModal({ 
  showLogin, 
  setShowLogin 
}: { 
  showLogin: boolean; 
  setShowLogin: (show: boolean) => void 
}) {
  const [username, setUsername] = useState("");
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

    await new Promise(resolve => setTimeout(resolve, 800));

    if (login(username, password)) {
      router.push('/cms/editor');
      setShowLogin(false);
    } else {
      setError("Invalid credentials");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* --- Complex Animated Background --- */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -inset-[10px] animate-blob bg-teal-500 blur-3xl filter opacity-20" />
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md scale-100 rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl transition-all animate-in zoom-in-95 duration-300"
      >
        <button 
          type="button"
          onClick={() => setShowLogin(false)}
          className="absolute right-4 top-4 text-white/50 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 ring-1 ring-teal-500/50">
            <Lock size={28} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Welcome Back</h2>
          <p className="mt-2 text-slate-400">Enter your admin credentials</p>
        </div>

        <div className="space-y-5">
          {/* Username Field */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-slate-500 outline-none transition-all focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20"
              disabled={isLoading}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-slate-500 outline-none transition-all focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 p-3 text-center text-sm font-medium text-red-400 ring-1 ring-red-500/50">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full overflow-hidden rounded-lg bg-teal-500 py-3 font-bold text-slate-950 transition-all hover:bg-teal-400 active:scale-[0.98] disabled:opacity-70"
          >
            <span className="relative z-10 flex items-center justify-center">
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Authorize Access"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}