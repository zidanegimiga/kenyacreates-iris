// src/app/api/content/[page]/[section]/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { getSectionContent, saveSectionContent } from "@/lib/content";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
// ensure dir exists at server start
await import("fs").then((fs) => fs.promises.mkdir(UPLOAD_DIR, { recursive: true }));

function deepSet(obj: any, pathArr: (string | number)[], value: any): any {
  if (pathArr.length === 0) return value;
  const [first, ...rest] = pathArr;
  if (rest.length === 0) {
    obj[first as any] = value;
    return obj;
  }
  if (!(first in obj)) {
    // if next key is a number, create array, else object
    obj[first as any] = typeof rest[0] === "number" ? [] : {};
  }
  obj[first as any] = deepSet(obj[first as any], rest, value);
  return obj;
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ page: string; section: string }> }) {
  const { page, section } = await params;

  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.NEXT_PUBLIC_CMS_PASSWORD || "kenyacreates2025"}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const pathStr = form.get("path") as string | null;

    const pathArr: (string | number)[] = pathStr ? JSON.parse(pathStr) : [];

    if (!file) throw new Error("No file uploaded");

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replace(/[^a-z0-9.-]/gi, "_")}`;
    const filepath = path.join(UPLOAD_DIR, filename);
    await writeFile(filepath, buffer);

    const url = `/uploads/${filename}`;

    // load page/section content (page-aware)
    const data = await getSectionContent(page, section).catch(() => ({}));
    deepSet(data, pathArr, url);
    await saveSectionContent(page, section, data);

    return NextResponse.json({ url });
  } catch (err: any) {
    console.error("Upload Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
