// src/app/admin/dashboard/page.tsx
"use client";

import { useEditorStore } from "@/lib/useContent";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { isOpen, toggle } = useEditorStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const auth = document.cookie.includes("admin-auth=true");
    if (!auth) router.replace("/admin");
  }, [router]);

  if (!mounted) return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggle}
        className="fixed left-6 top-6 z-50 rounded-full bg-gradient-to-r from-teal-600 to-purple-600 p-4 text-white shadow-xl transition hover:scale-110"
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        )}
      </button>

      {/* Collapsible Panel */}
      <div
        className={`fixed left-0 top-0 z-40 h-full bg-white shadow-2xl transition-all duration-300 ${
          isOpen ? "w-80 translate-x-0" : "w-16 -translate-x-12"
        }`}
      >
        <div className="flex h-full flex-col p-4">
          {isOpen && (
            <>
              <h2 className="mb-4 text-xl font-bold text-teal-700">CMS Editor</h2>
              <p className="mb-4 text-sm text-gray-600">
                Edit content below. Changes save instantly.
              </p>
              <button
                onClick={() => {
                  document.cookie = "admin-auth=; path=/; max-age=0";
                  router.push("/admin");
                }}
                className="mt-auto rounded bg-red-600 px-4 py-2 text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all ${isOpen ? "ml-80" : "ml-16"}`}>
        <iframe
          src="/"
          className="h-screen w-full border-0"
          title="Preview"
        />
      </div>
    </>
  );
}