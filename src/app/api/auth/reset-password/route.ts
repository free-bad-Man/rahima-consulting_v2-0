export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, password } = body;

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { error: "Токен обязателен" },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { error: "Пароль должен содержать минимум 6 символов" },
        { status: 400 }
      );
    }

    // Находим токен в БД
    const resetTokenRecord = await prisma.passwordResetToken.findUnique({
      where: {
        token: token,
      },
    });

    if (!resetTokenRecord) {
      return NextResponse.json(
        { error: "Недействительный токен" },
        { status: 400 }
      );
    }

    // Проверяем, не истёк ли токен
    if (resetTokenRecord.expires < new Date()) {
      // Удаляем истёкший токен
      await prisma.passwordResetToken.delete({
        where: { id: resetTokenRecord.id },
      });
      
      return NextResponse.json(
        { error: "Токен истёк. Запросите сброс пароля заново." },
        { status: 400 }
      );
    }

    // Находим пользователя по email из токена
    const user = await prisma.user.findUnique({
      where: { email: resetTokenRecord.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Пользователь не найден" },
        { status: 404 }
      );
    }

    // Хешируем новый пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Обновляем пароль
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });

    // Удаляем использованный токен
    await prisma.passwordResetToken.delete({
      where: { id: resetTokenRecord.id },
    });

    console.log(`[ResetPassword] ✅ Password reset for user: ${user.email}`);

    return NextResponse.json({
      success: true,
      message: "Пароль успешно изменён. Теперь вы можете войти с новым паролем.",
    });
  } catch (error) {
    console.error("[ResetPassword] Error:", error);
    return NextResponse.json(
      { error: "Произошла ошибка. Попробуйте позже." },
      { status: 500 }
    );
  }
}
