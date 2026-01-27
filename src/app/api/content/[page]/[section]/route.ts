import { NextRequest, NextResponse } from "next/server";
import { getSectionContent, saveSectionContent } from "@/lib/content";

type RouteContext = {
  params: Promise<{ page: string; section: string }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  try { 
    const { page, section } = await context.params;

    const data = await getSectionContent(page, section);
    console.log(`\n\n\n====== Returning content for ${page}/${section} ======\n\n\n`);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const { page, section } = await context.params;
    const body = await req.json();

    if (Array.isArray(body)) {
      const current = await getSectionContent(page, section).catch(() => ({}));
      const copy = JSON.parse(JSON.stringify(current));

      for (const patch of body) {
        let node: any = copy;
        const pathArr = [...patch.path];
        const last = pathArr.pop();

        for (const key of pathArr) {
          if (!(key in node)) {
            node[key] = typeof key === "number" ? [] : {};
          }
          node = node[key];
        }
        node[last] = patch.value;
      }

      await saveSectionContent(page, section, copy);
      return NextResponse.json({ ok: true });
    } else {
      await saveSectionContent(page, section, body);
      return NextResponse.json({ ok: true });
    }
  } catch (err: any) {
    console.error("API save error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}