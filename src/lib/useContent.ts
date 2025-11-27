// src/lib/useContent.ts
"use client";

import { toast } from "react-toastify";
import { create } from "zustand";

type PendingChange = { page: string; section: string; path: (string | number)[]; value: any };

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
        // Replace existing change by same page+section+path
        const newPending = [
          ...state.pending.filter(
            (c) =>
              !(
                c.page === change.page &&
                c.section === change.section &&
                JSON.stringify(c.path) === JSON.stringify(change.path)
              )
          ),
          change,
        ];
        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newPending));
        console.log("Queued change:", change); // Debug
        toast.info(`Queued change: ${change.section}.${change.path.join(".")}`);
        return { pending: newPending };
      }),

    publish: async () => {
      const { pending } = get();
      if (pending.length === 0) {
        toast.info("No changes to publish!");
        return;
      }

      // Group by page + section
      const groups: Record<string, { page: string; section: string; updates: any[] }> = {};
      for (const p of pending) {
        const key = `${p.page}:::${p.section}`;
        if (!groups[key]) groups[key] = { page: p.page, section: p.section, updates: [] };
        groups[key].updates.push({ path: p.path, value: p.value });
      }

      try {
        await Promise.all(
          Object.values(groups).map(({ page, section, updates }) =>
            fetch(`/api/content/${encodeURIComponent(page)}/${encodeURIComponent(section)}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_CMS_PASSWORD || "kenyacreates2025"}`,
              },
              body: JSON.stringify(updates),
            }).then(async (r) => {
              if (!r.ok) {
                const err = await r.json().catch(() => ({ error: r.statusText }));
                throw new Error(`Failed to save ${section} on page ${page}: ${err.error || r.statusText}`);
              }
              console.log(`Saved ${section} for page ${page}`); // Debug
            })
          )
        );

        // Clear pending & localStorage
        localStorage.removeItem(STORAGE_KEY);
        set({ pending: [] });
        toast.success("All changes published successfully! Refreshing...");
        // Reload to pick up new content from files
        window.location.reload();
      } catch (err: any) {
        console.error("Publish error:", err); // Debug
        toast.error(`Publish failed: ${err.message}. Check console.`);
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
