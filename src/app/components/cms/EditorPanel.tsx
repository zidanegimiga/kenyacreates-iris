"use client";

import { useEditorStore } from "@/lib/useContent";
import { isAuthenticated, logout } from "@/lib/auth";
import LoginModal from "./LoginModal";
import { useEffect, useState } from "react";
import {
  CheckCircle,
  RotateCcw,
  LogOut,
  X,
  Settings2,
  Info,
  ChevronUp,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditorPanel() {
  const { pending, publish, reset } = useEditorStore();
  const [showLogin, setShowLogin] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const router = useRouter();

  const handlePanelButtonClick = () => {
    if (!isAuthenticated()) {
      setShowLogin(true);
    } else {
      setShowPanel(true);
    }
  };

  function handleLogOut() {
    logout();
    router.push("/");
    router.refresh();
  }

  useEffect(() => {
    if (isAuthenticated()) {
      setShowPanel(true);
    }
  }, []);

  if (!showPanel) {
    return (
      <>
        {showLogin && (
          <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} />
        )}
        <button
          onClick={handlePanelButtonClick}
          className="fixed bottom-8 left-8 z-[100] group flex items-center gap-3 rounded-2xl bg-slate-900 border border-white/10 p-4 text-white shadow-2xl transition-all hover:scale-105 active:scale-95 hover:border-teal-500/50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-slate-950 shadow-[0_0_15px_rgba(20,184,166,0.4)]">
            <Settings2
              size={22}
              className="group-hover:rotate-90 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col items-start pr-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Admin
            </span>
            <span className="text-sm font-semibold text-white">
              Open Editor
            </span>
          </div>
          {pending.length > 0 && (
            <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold ring-4 ring-slate-950">
              {pending.length}
            </span>
          )}
        </button>
      </>
    );
  }

  return (
    <>
      {showLogin && (
        <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} />
      )}

      {/* --- Main Editor Drawer --- */}
      <div className="fixed inset-x-0 bottom-0 z-[100] p-4 animate-in slide-in-from-bottom duration-300">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 shadow-2xl backdrop-blur-xl ring-1 ring-black/50">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400">
                <Settings2 size={18} />
              </div>
              <h2 className="text-sm font-bold tracking-tight text-white uppercase">
                CMS Content Editor
              </h2>
              {pending.length > 0 && (
                <span className="rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-bold text-orange-400 ring-1 ring-orange-500/20">
                  {pending.length} unsaved changes
                </span>
              )}
            </div>
            <button
              onClick={() => setShowPanel(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
            {/* Left: Info & Changes List */}
            <div className="md:col-span-8 flex flex-col gap-4">
              <div className="flex items-start gap-3 rounded-xl bg-blue-500/5 p-4 text-sm border border-blue-500/10">
                <Info className="mt-0.5 text-blue-400" size={18} />
                <p className="text-slate-300 leading-relaxed">
                  Interactive editing is{" "}
                  <span className="text-blue-400 font-bold">Active</span>. Click
                  on text elements on the page to change content. Remember to{" "}
                  <span className="text-white underline decoration-teal-500/50">
                    Publish
                  </span>{" "}
                  to make your changes permanent.
                </p>
              </div>

              {pending.length > 0 ? (
                <div className="rounded-xl border border-white/5 bg-black/20 p-4 max-h-[120px] overflow-y-auto custom-scrollbar">
                  <p className="text-[10px] font-bold uppercase text-slate-500 mb-3 tracking-widest">
                    Modified Fields
                  </p>
                  <ul className="space-y-2">
                    {pending.map((change, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between text-xs group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-teal-500">
                            {change.section}
                          </span>
                          <span className="text-slate-500">→</span>
                          <span className="text-slate-300">
                            {change.path.join(".")}
                          </span>
                        </div>
                        <span className="text-slate-500 italic group-hover:text-slate-400 transition-colors">
                          "{String(change.value).slice(0, 30)}..."
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-slate-500 border-2 border-dashed border-white/5 rounded-xl">
                  <p className="text-xs">
                    No pending changes. Start editing text above.
                  </p>
                </div>
              )}
            </div>

            {/* Right: Actions */}
            <div className="md:col-span-4 flex flex-col justify-end gap-3">
              <button
                onClick={publish}
                disabled={pending.length === 0}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-teal-500 px-4 py-3 font-bold text-slate-950 transition-all hover:bg-teal-400 disabled:bg-slate-800 disabled:text-slate-500 disabled:opacity-50 active:scale-95"
              >
                <CheckCircle size={18} />
                Publish Changes
              </button>

              <div className="flex gap-3">
                <button
                  onClick={reset}
                  disabled={pending.length === 0}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <RotateCcw size={16} />
                  Discard
                </button>
                <button
                  onClick={handleLogOut}
                  className="flex items-center justify-center rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm font-medium text-red-400 transition-all hover:bg-red-500/10 hover:border-red-500/50"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
