// src/app/cms/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CMSLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/cms/editor");
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6 rounded-lg bg-white p-8 shadow">
        <h1 className="text-2xl font-bold text-center text-black">CMS Login</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          className="w-full rounded border p-3 text-gray-600 focus:outline-none focus:ring-1 focus:ring-teal-500"
          required
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full rounded bg-teal-600 py-3 text-white hover:bg-teal-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}