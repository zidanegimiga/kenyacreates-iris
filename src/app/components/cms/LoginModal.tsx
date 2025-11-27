// src/components/cms/LoginModal.tsx
"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginModal({ showLogin, setShowLogin }: { showLogin: boolean, setShowLogin: (showLogin: boolean) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()
  // const { toggle } = useEditorStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      // toggle();
      router.push('/cms/editor')
      setShowLogin(false);
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl"
      >
        <h2 className="mb-4 text-xl font-bold text-black">Admin Login</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          placeholder="Enter password"
          className="text-gray-400 w-full rounded border p-3 focus:outline-none focus:ring-1 focus:ring-teal-500"
          autoFocus
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className="flex-1 rounded bg-teal-500 px-4 py-2 text-white hover:bg-teal-700"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}