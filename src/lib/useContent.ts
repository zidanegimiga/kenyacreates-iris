// src/lib/useContent.ts
"use client";

import { toast } from "react-toastify";
import { create } from "zustand";

type PendingChange = {
  page?: string;
  section: string;
  path: (string | number)[];
  value: any;
};

const STORAGE_KEY = "cms-pending";

export const useEditorStore = create<{
  pending: PendingChange[];
  add: (change: PendingChange) => void;
  publish: () => Promise<void>;
  reset: () => void;
}>((set, get) => {
  const loadPending = (): PendingChange[] => {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  };

  return {
    pending: loadPending(),

    add: (change) => {
      if (!Array.isArray(change.path)) {
        console.error("Invalid path detected:", change.path);
        return;
      }

      set((state) => {
        const newPending = [
          ...state.pending.filter(
            (c) =>
              !(
                c.page === change.page &&
                c.section === change.section &&
                JSON.stringify(c.path) === JSON.stringify(change.path)
              ),
          ),
          change,
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newPending));
        return { pending: newPending };
      });
    },

    publish: async () => {
      const { pending } = get();
      if (pending.length === 0) return;

      toast.info("Uploading images and saving content...");

      try {
        const processedPending = await Promise.all(
          pending.map(async (change) => {
            if (
              typeof change.value === "string" &&
              change.value.startsWith("data:image")
            ) {
              const res = await fetch(change.value);
              const blob = await res.blob();
              const file = new File([blob], "upload.png", { type: blob.type });

              const formData = new FormData();
              formData.append("file", file);
              formData.append("path", JSON.stringify(change.path));
              formData.append("page", change.page || "");

              const uploadRes = await fetch(
                `/api/content/${change.page}/${change.section}/upload`,
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_CMS_PASSWORD || "kenyacreates2025"}`,
                  },
                  body: formData,
                },
              );

              if (uploadRes.ok) {
                const { url } = await uploadRes.json();
                return { ...change, value: url };
              } else {
                throw new Error(`Image upload failed for ${change.section}`);
              }
            }
            return change;
          }),
        );

        const groups: Record<string, any> = {};
        for (const p of processedPending) {
          const key = `${p.page}:::${p.section}`;
          if (!groups[key]) {
            groups[key] = {
              page: p.page ?? "",
              section: p.section,
              updates: [],
            };
          }
          groups[key].updates.push({ path: p.path, value: p.value });
        }

        await Promise.all(
          Object.values(groups).map(({ page, section, updates }) =>
            fetch(
              `/api/content/${encodeURIComponent(page)}/${encodeURIComponent(section)}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${process.env.NEXT_PUBLIC_CMS_PASSWORD || "kenyacreates2025"}`,
                },
                body: JSON.stringify(updates),
              },
            ).then(async (r) => {
              if (!r.ok) throw new Error(`Save failed for ${section}`);
            }),
          ),
        );

        localStorage.removeItem(STORAGE_KEY);
        set({ pending: [] });
        toast.success("Published successfully!");
        window.location.reload();
      } catch (err: any) {
        console.error("Publish error:", err);
        toast.error(`Publish failed: ${err.message}`);
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
