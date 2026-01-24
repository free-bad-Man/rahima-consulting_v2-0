import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const calculation = await prisma.calculation.findUnique({
      where: { id },
    });

    if (!calculation) {
      return NextResponse.json(
        { error: "Расчёт не найден" },
        { status: 404 }
      );
    }

    // Увеличиваем счётчик просмотров
    await prisma.calculation.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
      calculation,
    });
  } catch (error) {
    console.error("Error fetching calculation:", error);
    return NextResponse.json(
      { error: "Не удалось получить расчёт" },
      { status: 500 }
    );
  }
}

