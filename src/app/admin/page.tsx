// src/app/admin/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PASSWORD = "kenyacreates2025"; // Change in production!

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      document.cookie = `admin-auth=true; path=/; max-age=86400`;
      router.push("/admin/dashboard");
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl"
      >
        <h1 className="mb-6 text-center text-3xl font-bold text-teal-700">
          Kenya Creates CMS
        </h1>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          className="w-full rounded-lg border p-4 text-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          autoFocus
        />
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 py-4 font-semibold text-white transition hover:shadow-lg"
        >
          Login to Edit
        </button>
      </form>
    </div>
  );
}