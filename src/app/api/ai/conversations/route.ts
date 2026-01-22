export const fetchCache = "force-no-store";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const date = url.searchParams.get("date"); // формат YYYY-MM-DD
    let session = null;
    try {
      session = await auth();
    } catch (e) {
      // продолжим анонимно
    }
    const userId = session?.user?.id || null;

    const where: any = {};
    if (userId) where.userId = userId;
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      where.updatedAt = { gte: start, lt: end };
    }

    const conversations = await prisma.conversation.findMany({
      where,
      include: { messages: true },
      orderBy: { updatedAt: "desc" },
      take: 200,
    });

    return NextResponse.json({ conversations });
  } catch (e) {
    console.error("Conversations GET error:", e);
    return NextResponse.json({ error: "Не удалось получить разговоры" }, { status: 500 });
  }
}


