"use client";

import { useEditorStore } from "@/lib/useContent";
import { isAuthenticated, logout } from "@/lib/auth";
import LoginModal from "./LoginModal";
import { useEffect, useState, useRef } from "react";
import Draggable from "react-draggable";
import {
  CheckCircle,
  RotateCcw,
  LogOut,
  X,
  Settings2,
  GripHorizontal,
  ExternalLink,
  Minus,
  Maximize2,
  Eye,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function EditorPanel() {
  const { pending, publish, reset } = useEditorStore();
  const [showLogin, setShowLogin] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [mounted, setMounted] = useState(false);
  const nodeRef = useRef(null);
  const router = useRouter();

  const path = usePathname();

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated()) {
      setShowPanel(true);
    }
  }, []);

  if (!mounted) return null;

  const handleLogOut = () => {
    logout();
    router.push("/");
    router.refresh();
  };

  if (!isAuthenticated()) {
    return <></>;
  }

  if (!showPanel) {
    return (
      <>
        {showLogin && (
          <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} />
        )}
        <button
          onClick={() =>
            isAuthenticated() ? setShowPanel(true) : setShowLogin(true)
          }
          className="fixed bottom-8 left-8 z-[100] group flex items-center gap-3 rounded-2xl bg-slate-900 border border-white/10 p-4 text-white shadow-2xl transition-all hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-slate-950">
            <Settings2
              size={22}
              className="group-hover:rotate-90 transition-transform duration-500"
            />
          </div>
          <span className="text-sm font-semibold pr-2">Open CMS</span>
        </button>
      </>
    );
  }

  return (
    <>
      {showLogin && (
        <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} />
      )}

      <Draggable nodeRef={nodeRef} handle=".drag-handle" bounds="parent">
        <div
          ref={nodeRef}
          className={`fixed bottom-10 left-10 z-[100] flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 shadow-2xl backdrop-blur-xl ring-1 ring-black/50 transition-all duration-300 ${
            isMinimized ? "h-[52px] w-[320px]" : ""
          }`}
          style={{
            width: isMinimized ? "320px" : "580px",
            height: isMinimized ? "52px" : "520px",
            minWidth: isMinimized ? "320px" : "400px",
            resize: isMinimized ? "none" : "both",
          }}
        >
          <div className="drag-handle flex cursor-grab items-center justify-between border-b border-white/5 bg-white/10 px-4 py-3 active:cursor-grabbing">
            <div className="flex items-center gap-3 select-none">
              <GripHorizontal size={14} className="text-slate-500" />
              <Link
                href="/cms/editor"
                className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-teal-400 hover:text-teal-300 transition-colors uppercase"
              >
                Dashboard <ExternalLink size={10} />
              </Link>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="rounded-md p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                {isMinimized ? <Maximize2 size={14} /> : <Minus size={14} />}
              </button>
              <button
                onClick={() => setShowPanel(false)}
                className="rounded-md p-1.5 text-slate-400 hover:bg-red-500/20 hover:text-red-400"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar animate-in fade-in duration-300">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Active Edits</h3>
                  {pending.length > 0 && (
                    <span className="rounded-full bg-orange-500/20 px-2.5 py-0.5 text-[10px] font-bold text-orange-400 ring-1 ring-orange-500/30">
                      {pending.length} CHANGES
                    </span>
                  )}
                </div>

                {pending.length > 0 ? (
                  <ul className="space-y-2">
                    {pending.map((change, i) => (
                      <li
                        key={i}
                        className="flex flex-col gap-1 rounded-lg bg-black/20 p-3 border border-white/5"
                      >
                        <div className="flex justify-between text-[10px] font-mono text-teal-500">
                          <span>{change.section}</span>
                          <span className="text-slate-600">
                            .
                            {Array.isArray(change.path)
                              ? change.path.join(".")
                              : "unknown"}
                          </span>
                        </div>
                        <span className="text-xs text-slate-300 truncate">
                          "{String(change.value)}"
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex h-32 flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/5 text-slate-500">
                    <p className="text-xs italic tracking-wide">
                      No pending modifications
                    </p>
                  </div>
                )}
              </div>

              {/* --- FOOTER ACTIONS --- */}
              <div className="border-t border-white/5 bg-black/30 p-5 space-y-3">
                <button
                  onClick={publish}
                  disabled={pending.length === 0}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3.5 text-sm font-bold text-slate-950 hover:bg-teal-400 disabled:opacity-20 disabled:grayscale transition-all shadow-lg shadow-teal-500/10"
                >
                  <CheckCircle size={18} />
                  Publish Changes
                </button>

                <div className="grid grid-cols-2 gap-2">
                  {path === "/kenyacreates" ? (
                    <button
                      onClick={() => router.push("/cms/editor/kenyacreates")}
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/10 transition-all"
                    >
                      <Eye size={14} />
                      Edit Mode
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push("/kenyacreates")}
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/10 transition-all"
                    >
                      <Eye size={14} />
                      Preview
                    </button>
                  )}
                  <button
                    onClick={reset}
                    disabled={pending.length === 0}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 py-2.5 text-xs font-semibold text-slate-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all disabled:opacity-70"
                  >
                    <RotateCcw size={14} />
                    Discard
                  </button>
                </div>

                <button
                  onClick={handleLogOut}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/5 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white hover:bg-white/5 transition-all"
                >
                  <LogOut size={12} />
                  Terminate Session
                </button>
              </div>
            </>
          )}
        </div>
      </Draggable>
    </>
  );
}
