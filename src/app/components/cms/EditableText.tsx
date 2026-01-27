"use client";

import { useRef, useState, useEffect } from "react";
import { Check, X, PencilLine } from "lucide-react";
import { useEditorStore } from "@/lib/useContent";

type Props = {
  page?: string;
  section: string;
  path: (string | number)[];
  value: string;
  onSave: (value: string) => void;
  onCancel: () => void;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

export default function EditableText({
  page,
  section,
  path,
  value,
  onSave,
  onCancel,
  className,
  children = value,
  style,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(value);
  const { add } = useEditorStore();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isCMS =
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/cms");

  if (!isCMS) {
    return (
      <span className={className} style={style}>
        {children}
      </span>
    );
  }

  const handleSave = () => {
    if (temp !== value) {
      add({ page, section, path, value: temp });
      onSave(temp);
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setTemp(value);
    onCancel();
    setEditing(false);
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.style.height = "inherit";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [editing, temp]);

  if (!editing) {
    return (
      <span
        onClick={() => {
          setEditing(true);
          setTemp(value);
        }}
        className={`
          group relative inline-block cursor-text rounded-md transition-all duration-200
          hover:bg-teal-500/5 hover:ring-2 hover:ring-teal-500/30
          ${className || ""}
        `}
        style={style}
      >
        <span className="absolute -right-6 top-0 hidden opacity-0 transition-opacity group-hover:flex group-hover:opacity-100">
          <PencilLine size={14} className="text-teal-500" />
        </span>
        {children || (
          <em className="text-slate-400 opacity-50 underline decoration-dotted">
            Empty Field
          </em>
        )}
      </span>
    );
  }

  return (
    <div className="relative inline-flex min-w-[120px] flex-col rounded-xl border border-white/20 bg-slate-900/80 p-2 shadow-2xl backdrop-blur-md animate-in zoom-in-95 duration-150">
      <textarea
        ref={inputRef}
        value={temp}
        onChange={(e) => setTemp(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSave();
          }
          if (e.key === "Escape") handleCancel();
        }}
        className={`
          w-full resize-none rounded-lg bg-transparent px-2 py-1.5 text-white outline-none 
          placeholder-slate-500 ring-1 ring-white/10 focus:ring-teal-500/50 
          ${className || ""}
        `}
        autoFocus
      />

      <div className="mt-2 flex items-center justify-end gap-2 border-t border-white/5 pt-2">
        <button
          onClick={handleCancel}
          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/5 hover:text-red-400"
          title="Cancel (Esc)"
        >
          <X size={14} />
        </button>
        <button
          onClick={handleSave}
          className="flex h-7 px-3 items-center justify-center gap-1 rounded-md bg-teal-500 text-[11px] font-bold uppercase tracking-wider text-slate-950 transition-all hover:bg-teal-400 active:scale-95"
          title="Save (Enter)"
        >
          <Check size={14} />
          Save
        </button>
      </div>
    </div>
  );
}
