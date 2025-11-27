// src/app/api/content/[section]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";

const ADMIN_PASSWORD = process.env.CMS_PASSWORD || "kenyacreates2025";

function deepSet(obj: any, path: (string | number)[], value: any): void {
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!(key in obj)) obj[key] = {};
    obj = obj[key];
  }
  obj[path[path.length - 1]] = value;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    const { section } = await params; // FIX
    const data = await getContent(section);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}


export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { section } = await params; // FIX

    const updates = await req.json();
    const data = await getContent(section);

    Array.isArray(updates)
      ? updates.forEach((u: any) => deepSet(data, u.path, u.value))
      : deepSet(data, updates.path, updates.value);

    await saveContent(section, data);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
