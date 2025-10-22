// src/components/cms/EditableText.tsx
"use client";

import { useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { useEditorStore } from "@/lib/useContent";

type Props = {
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
  section,
  path,
  value,
  onSave,
  onCancel,
  className,
  children = value,
  style
}: Props) {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(value);
  const { add } = useEditorStore();
  const inputRef = useRef<HTMLInputElement>(null);

  if (!window.location.pathname.startsWith("/cms")) {
    return <span className={className}>{children}</span>;
  }

  const handleSave = () => {
    if (temp !== value) {
      add({ section, path, value: temp });
      onSave(temp);
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setTemp(value);
    onCancel();
    setEditing(false);
  };

  if (!editing) {
    return (
      <span
        className={`cursor-pointer rounded border border-dashed border-gray-400 p-1 hover:border-gray-600 ${className || ""}`}
        onClick={() => {
          setEditing(true);
          setTemp(value);
        }}
        style={style}
      >
        {children || <em className="text-gray-400">Empty</em>}
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-1 rounded bg-gray-700 p-1">
      <input
        ref={inputRef}
        type="text"
        value={temp}
        onChange={(e) => setTemp(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSave();
          if (e.key === "Escape") handleCancel();
        }}
        className={`rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ""}`}
        autoFocus
      />
      <button
        onClick={handleSave}
        className="text-green-600 hover:text-green-800 p-0.5"
        title="Save"
      >
        <Check className="h-4 w-4" />
      </button>
      <button
        onClick={handleCancel}
        className="text-red-600 hover:text-red-800 p-0.5"
        title="Cancel"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}