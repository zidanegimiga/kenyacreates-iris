// src/app/api/auth/route.ts
import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = "kenyacreates2025";
// const ADMIN_PASSWORD = process.env.CMS_PASSWORD || "kenyacreates2025";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password === ADMIN_PASSWORD) {
    return NextResponse.json({ token: "admin-token-123" });
  }
  return NextResponse.json({ error: "Invalid" }, { status: 401 });
}