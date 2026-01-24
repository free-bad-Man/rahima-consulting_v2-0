import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      userId,
      name,
      phone,
      email,
      businessType,
      taxSystem,
      employeesCount,
      hasNDS,
      hasVED,
      operationsCount,
      services,
      surcharges,
      breakdown,
      totalMonthly,
      totalOneTime,
      totalYearly,
    } = body;

    // Валидация обязательных полей
    if (!businessType || !taxSystem) {
      return NextResponse.json(
        { error: "Не указаны обязательные поля" },
        { status: 400 }
      );
    }

    // Создаём расчёт в БД
    const calculation = await prisma.calculation.create({
      data: {
        userId: userId || null,
        name: name || null,
        phone: phone || null,
        email: email || null,
        businessType,
        taxSystem,
        employeesCount: employeesCount || 0,
        hasNDS: hasNDS || false,
        hasVED: hasVED || false,
        operationsCount: operationsCount || 0,
        services: services || [],
        surcharges: surcharges || {},
        breakdown: breakdown || {},
        totalMonthly: totalMonthly || 0,
        totalOneTime: totalOneTime || 0,
        totalYearly: totalYearly || 0,
      },
    });

    return NextResponse.json({
      success: true,
      calculation: {
        id: calculation.id,
        createdAt: calculation.createdAt,
      },
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://rahima-consulting.ru'}/calculator/${calculation.id}`,
    });
  } catch (error) {
    console.error("Error saving calculation:", error);
    return NextResponse.json(
      { error: "Не удалось сохранить расчёт" },
      { status: 500 }
    );
  }
}

