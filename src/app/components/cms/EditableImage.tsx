"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Check, X, Upload, ImageIcon, RefreshCcw } from "lucide-react";
import { useEditorStore } from "@/lib/useContent";

type EditableImageProps = {
  page?: string;
  section: string;
  path: (string | number)[];
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  onSave?: (path: (string | number)[], newUrl: string) => void;
  onCancel?: () => void;
};

export default function EditableImage({
  page,
  section,
  path,
  src,
  alt,
  onSave,
  onCancel,
  className,
  ...rest
}: EditableImageProps) {
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const { add, pending } = useEditorStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isPending = pending.find(
      (p) =>
        p.page === page &&
        p.section === section &&
        JSON.stringify(p.path) === JSON.stringify(path),
    );
    if (!isPending) {
      setPreview(null);
    }
  }, [pending, page, section, path]);

  const isCMS =
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/cms");

  if (!isCMS) {
    return <Image src={src} alt={alt} className={className} {...rest} />;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String); // Show local preview immediately
      };
      reader.readAsDataURL(selectedFile);
    }
  };

const handleConfirmPreview = () => {
  if (preview) {
    // 1. Update global store
    add({ page, section, path, value: preview });
    
    // 2. IMPORTANT: Pass BOTH path and preview to the parent handler
    onSave?.(path, preview); 
  }
  setEditing(false);
};

  const handleReset = () => {
    setEditing(false);
    setPreview(null);
    onCancel?.();
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${className || ""}`}
    >
      {/* The displayed image: 
        1. Show the local preview if one exists.
        2. Otherwise, show the original source.
      */}
      <Image
        src={preview || src}
        alt={alt}
        {...rest}
        className={`transition-all duration-500 ${
          editing
            ? "scale-105 blur-md brightness-50"
            : "group-hover:brightness-90"
        }`}
      />

      {/* --- Inactive State: Hover Trigger --- */}
      {!editing && (
        <div
          onClick={() => setEditing(true)}
          className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-teal-500/10 opacity-0 transition-all duration-300 group-hover:opacity-100 backdrop-blur-[2px]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-2xl scale-90 group-hover:scale-100 transition-transform">
            <Upload size={20} />
          </div>
          <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white drop-shadow-md">
            Update Image
          </span>
        </div>
      )}

      {/* --- Active State: Selection Controls --- */}
      {editing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-200">
          {!preview ? (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center gap-3 rounded-2xl bg-white/10 p-8 text-white backdrop-blur-xl ring-1 ring-white/20 hover:bg-white/20 transition-all"
            >
              <div className="rounded-full bg-teal-500/20 p-3 text-teal-400">
                <ImageIcon size={28} />
              </div>
              <span className="text-sm font-semibold tracking-wide">
                Choose New Photo
              </span>
            </button>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-slate-900/95 p-1.5 shadow-2xl ring-1 ring-white/20 backdrop-blur-2xl">
                <button
                  onClick={handleReset}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 hover:bg-white/10 hover:text-red-400 transition-colors"
                  title="Cancel"
                >
                  <X size={20} />
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 hover:bg-white/10 hover:text-teal-400 transition-colors"
                  title="Pick different image"
                >
                  <RefreshCcw size={18} />
                </button>

                <button
                  onClick={handleConfirmPreview}
                  className="flex h-10 px-6 items-center justify-center gap-2 rounded-full bg-teal-500 text-xs font-bold uppercase tracking-wider text-slate-950 transition-all hover:bg-teal-400 active:scale-95 shadow-[0_0_20px_rgba(20,184,166,0.3)]"
                >
                  <Check size={18} />
                  Keep Preview
                </button>
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest text-teal-400 bg-teal-400/10 px-3 py-1 rounded-full border border-teal-400/20">
                Pending Save
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
