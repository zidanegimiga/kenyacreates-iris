// src/components/cms/EditableImage.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, X, Upload } from "lucide-react";

type Props = {
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
  section,
  path,
  src,
  alt,
  onSave,
  onCancel,
  ...rest
}: Props) {
  const [editing, setEditing] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    form.append("path", JSON.stringify(path));

    const res = await fetch(`/api/content/${section}/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CMS_PASSWORD}` },
      body: form,
    });

    if (res.ok) {
      const { url } = await res.json();
      // @ts-ignore
      onSave(url);
      setEditing(false);
    }
  };

  if (!window.location.pathname.startsWith("/cms")) {
    return <Image src={src} alt={alt} {...rest} />;
  }

  if (!editing) {
    return (
      <div
        className="group relative cursor-pointer rounded border-2 border-dashed border-gray-400 p-2 hover:border-gray-600"
        onClick={() => setEditing(true)}
      >
        <Image src={src} alt={alt} {...rest} />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
          <Upload className="h-6 w-6 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded bg-gray-700 p-2">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="text-sm"
      />
      <button
        onClick={handleUpload}
        disabled={!file}
        className="text-green-600 hover:text-green-800 disabled:text-gray-400"
      >
        <Check className="h-4 w-4" />
      </button>
      <button
        onClick={() => {
          setFile(null);
          setEditing(false);
          // @ts-ignore
          onCancel();
        }}
        className="text-red-600 hover:text-red-800"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}