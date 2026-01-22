import { NextResponse } from "next/server";
import { deslugify } from "@/lib/slugify";
import { getServiceContent } from "@/lib/service-content";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  try {
    const resolved = await params;
    const slug = resolved?.slug || "";
    const decoded = (() => {
      try {
        return decodeURIComponent(slug);
      } catch {
        return slug;
      }
    })();
    const title = deslugify(decoded || "");
    const data = getServiceContent(title);
    return NextResponse.json({ data });
  } catch (e) {
    console.error("Service API error:", e);
    return NextResponse.json({ error: "Failed to get service" }, { status: 500 });
  }
}


