// src/lib/useContent.ts
"use client";

import { toast } from "react-toastify";
import { create } from "zustand";

type PendingChange = { section: string; path: (string | number)[]; value: any };

const STORAGE_KEY = "cms-pending";

export const useEditorStore = create<{
  pending: PendingChange[];
  add: (change: PendingChange) => void;
  publish: () => Promise<void>;
  reset: () => void;
}>((set, get) => {
  // Load from localStorage on init
  const loadPending = (): PendingChange[] => {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  };

  return {
    pending: loadPending(),

    add: (change) =>
      set((state) => {
        const newPending = [...state.pending.filter((c) => JSON.stringify(c.path) !== JSON.stringify(change.path)), change];
        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newPending));
        console.log("Queued change:", change); // Debug
        toast.info(`Queued change: ${JSON.stringify(change)}`)
        return { pending: newPending };
      }),

    publish: async () => {
      const { pending } = get();
      if (pending.length === 0) {
        toast.info("No changes to publish!")
        return;
      }

      console.log("Publishing:", pending); // Debug

      const groups = pending.reduce((acc, curr) => {
        if (!acc[curr.section]) acc[curr.section] = [];
        acc[curr.section].push({ path: curr.path, value: curr.value });
        return acc;
      }, {} as Record<string, any[]>);

      try {
        await Promise.all(
          Object.entries(groups).map(([section, updates]) =>
            fetch(`/api/content/${section}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_CMS_PASSWORD || "kenyacreates2025"}`,
              },
              body: JSON.stringify(updates),
            }).then(async (r) => {
              if (!r.ok) {
                const err = await r.json();
                throw new Error(`Failed to save ${section}: ${err.error || r.statusText}`);
              }
              console.log(`Saved ${section}`); // Debug
            })
          )
        );

        // Clear pending & localStorage
        localStorage.removeItem(STORAGE_KEY);
        set({ pending: [] });
        toast.success("All changes published successfully! Refresh to confirm.")
        // Optional: Force reload to fetch new data
        window.location.reload();
      } catch (err: any) {
        console.error("Publish error:", err); // Debug
        // alert(`Publish failed: ${err.message}. Check console.`);
        toast.error(`Publish failed: ${err.message}. Check console.`)
      }
    },

    reset: () => {
      localStorage.removeItem(STORAGE_KEY);
      set({ pending: [] });
      alert("Changes discarded. Refreshing...");
      window.location.reload();
    },
  };
});