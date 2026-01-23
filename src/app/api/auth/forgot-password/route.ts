export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { sendEmail } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email обязателен" },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Проверяем, существует ли пользователь
    const user = await prisma.user.findUnique({
      where: { email: trimmedEmail },
    });

    // Для безопасности всегда возвращаем success, даже если пользователь не найден
    // Это предотвращает enumeration атаки
    if (!user) {
      console.log(`[ForgotPassword] User not found: ${trimmedEmail}`);
      return NextResponse.json({
        success: true,
        message: "Если аккаунт с таким email существует, вы получите письмо с инструкциями.",
      });
    }

    // Генерируем токен для сброса пароля
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 час

    // Удаляем старые токены для этого email (если есть)
    await prisma.passwordResetToken.deleteMany({
      where: { email: trimmedEmail },
    });

    // Создаём новый токен
    await prisma.passwordResetToken.create({
      data: {
        email: trimmedEmail,
        token: resetToken,
        expires: resetTokenExpiry,
      },
    });

    // Формируем ссылку для сброса пароля
    const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/auth/reset-password?token=${resetToken}`;

    // Отправляем email
    const emailResult = await sendEmail({
      to: trimmedEmail,
      subject: "🔐 Сброс пароля - Rahima Consulting",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              border-radius: 8px 8px 0 0;
              text-align: center;
            }
            .content {
              background: white;
              padding: 30px;
              border: 1px solid #e0e0e0;
              border-top: none;
            }
            .button {
              display: inline-block;
              margin: 20px 0;
              padding: 14px 30px;
              background: #667eea;
              color: white !important;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
            }
            .footer {
              background: #f0f0f0;
              padding: 20px;
              border-radius: 0 0 8px 8px;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
            .warning {
              background: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🔐 Сброс пароля</h1>
          </div>
          <div class="content">
            <p>Здравствуйте, <strong>${user.name || 'Пользователь'}</strong>!</p>
            <p>Вы запросили сброс пароля для вашего аккаунта в системе Rahima Consulting.</p>
            
            <p>Для создания нового пароля нажмите на кнопку ниже:</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Сбросить пароль</a>
            </div>
            
            <p style="font-size: 14px; color: #666;">
              Или скопируйте эту ссылку в браузер:<br>
              <code style="background: #f5f5f5; padding: 8px; display: inline-block; margin-top: 8px; word-break: break-all;">
                ${resetUrl}
              </code>
            </p>
            
            <div class="warning">
              <strong>⚠️ Важно:</strong> Эта ссылка действительна в течение <strong>1 часа</strong>.
            </div>
            
            <p style="font-size: 13px; color: #888; margin-top: 20px;">
              Если вы не запрашивали сброс пароля, проигнорируйте это письмо. Ваш пароль останется прежним.
            </p>
          </div>
          <div class="footer">
            <p>Rahima Consulting</p>
            <p>Это автоматическое письмо, не отвечайте на него</p>
          </div>
        </body>
        </html>
      `,
    });

    if (!emailResult.success) {
      console.error("[ForgotPassword] Email send failed:", emailResult.error);
      return NextResponse.json(
        { error: "Не удалось отправить email. Попробуйте позже." },
        { status: 500 }
      );
    }

    console.log(`[ForgotPassword] ✅ Reset email sent to ${trimmedEmail}`);

    return NextResponse.json({
      success: true,
      message: "Если аккаунт с таким email существует, вы получите письмо с инструкциями.",
    });
  } catch (error) {
    console.error("[ForgotPassword] Error:", error);
    return NextResponse.json(
      { error: "Произошла ошибка. Попробуйте позже." },
      { status: 500 }
    );
  }
}
