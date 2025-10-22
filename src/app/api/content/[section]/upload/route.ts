// src/app/api/content/[section]/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { getContent, saveContent } from "@/lib/content";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");
await import("fs").then(fs => fs.promises.mkdir(UPLOAD_DIR, { recursive: true }));

function deepSet(obj: any, path: (string | number)[], value: any): any {
  if (path.length === 1) {
    obj[path[0]] = value;
    return obj;
  }
  const key = path[0];
  if (!(key in obj)) obj[key] = {};
  obj[key] = deepSet(obj[key], path.slice(1), value);
  return obj;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { section: string } }
) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.NEXT_PUBLIC_CMS_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const file = form.get("file") as File;
    const pathStr = form.get("path") as string;
    const pathArr = JSON.parse(pathStr);

    if (!file) throw new Error("No file uploaded");

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replace(/[^a-z0-9.-]/gi, "_")}`;
    const filepath = path.join(UPLOAD_DIR, filename);
    await writeFile(filepath, buffer);

    const url = `/uploads/${filename}`;

    // Update JSON deeply
    const data = await getContent(params.section);
    deepSet(data, pathArr, url);
    await saveContent(params.section, data);

    return NextResponse.json({ url });
  } catch (err: any) {
    console.error("Upload Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}