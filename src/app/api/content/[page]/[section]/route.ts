// src/app/api/content/[page]/[section]/route.ts
import { NextResponse } from "next/server";
import { getSectionContent, saveSectionContent } from "@/lib/content";

export async function GET(req: Request, context: { params: Promise<{ page: string; section: string }> }) {
  try {
    const { page, section } = await context.params;

    const data = await getSectionContent(page, section);
    console.log("\n\n\n======Returning content:\n\n\n", data);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { page: string; section: string } }) {
  try {
    const { page, section } = params;
    const body = await req.json();

    // Your existing publish flow uses patches; for now accept either:
    // 1. full object -> write directly
    // 2. array of patches -> deep merge (simple)
    if (Array.isArray(body)) {
      // treat body as patches: [{ path: [...], value: ... }]
      // load current
      const current = await getSectionContent(page, section).catch(() => ({}));
      const copy = JSON.parse(JSON.stringify(current));

      for (const patch of body) {
        let node: any = copy;
        const pathArr = patch.path.slice();
        const last = pathArr.pop();
        for (const key of pathArr) {
          if (typeof key === "number") {
            node[key] = node[key] || {};
            node = node[key];
          } else {
            node[key] = node[key] || {};
            node = node[key];
          }
        }
        node[last] = patch.value;
      }

      await saveSectionContent(page, section, copy);
      return NextResponse.json({ ok: true });
    } else {
      // write full payload
      await saveSectionContent(page, section, body);
      return NextResponse.json({ ok: true });
    }
  } catch (err: any) {
    console.error("API save error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
