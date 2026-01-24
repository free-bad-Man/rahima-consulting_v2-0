export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextResponse } from "next/server";
import { createDealFromContactForm } from "@/lib/amocrm";
import { sendContactFormEmail } from "@/lib/email";
import { sendTelegramNotification } from "@/lib/telegram";
import { scheduleEmailSeries } from "@/lib/email-scheduler";

/**
 * API для отправки формы обратной связи (Заказать звонок)
 * POST /api/contact
 * 
 * Принимает данные формы и отправляет их:
 * - В n8n для обработки (Telegram, Email)
 * - В amoCRM (создание контакта и сделки)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { name, phone, email, service, comment, calculationId, totalMonthly } = body;

    // Валидация обязательных полей
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Имя обязательно (минимум 2 символа)" },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 5) {
      return NextResponse.json(
        { error: "Телефон обязателен (минимум 5 символов)" },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email?.trim() || '';
    const serviceName = service || "Заказ звонка";
    const trimmedComment = comment?.trim() || '';

    // Отправляем Email уведомление
    let emailResult = null;
    try {
      emailResult = await sendContactFormEmail({
        name: trimmedName,
        phone: trimmedPhone,
        email: trimmedEmail,
        service: serviceName,
        comment: trimmedComment,
      });
      if (emailResult.success) {
        console.log("[Contact API] ✅ Email sent:", emailResult.messageId);
      } else {
        console.error("[Contact API] ⚠️ Email failed:", emailResult.error);
      }
    } catch (emailError) {
      console.error("[Contact API] ❌ Email error:", emailError);
    }

    // Отправляем Telegram уведомление
    let telegramResult = null;
    try {
      telegramResult = await sendTelegramNotification({
        name: trimmedName,
        phone: trimmedPhone,
        email: trimmedEmail,
        service: serviceName,
        comment: trimmedComment,
      });
      if (telegramResult.success) {
        console.log("[Contact API] ✅ Telegram sent:", telegramResult.messageId);
      } else {
        console.error("[Contact API] ⚠️ Telegram failed:", telegramResult.error);
      }
    } catch (telegramError) {
      console.error("[Contact API] ❌ Telegram error:", telegramError);
    }

    // Отправляем в amoCRM (независимо от результата n8n)
    let amocrmResult = null;
    try {
      amocrmResult = await createDealFromContactForm({
        userName: trimmedName,
        userPhone: trimmedPhone,
        userEmail: trimmedEmail,
        serviceName: serviceName,
        comment: trimmedComment,
      });
      console.log("[Contact API] ✅ amoCRM deal created:", amocrmResult);
    } catch (amocrmError) {
      console.error("[Contact API] ❌ amoCRM error:", amocrmError);
      // Не блокируем ответ, если amoCRM не работает
    }

    // Планируем email-серию, если это заявка из калькулятора и есть email
    if (trimmedEmail && (serviceName === 'Заявка из калькулятора' || calculationId)) {
      try {
        await scheduleEmailSeries({
          recipientEmail: trimmedEmail,
          recipientName: trimmedName,
          calculationId,
          totalMonthly,
        });
        console.log(`[Contact API] ✅ Запланирована email-серия для ${trimmedEmail}`);
      } catch (scheduleError) {
        console.error("[Contact API] ❌ Ошибка планирования email-серии:", scheduleError);
        // Не блокируем ответ, если планирование не сработало
      }
    }

    // Проверяем, что хотя бы одна интеграция сработала
    const anySuccess = emailResult?.success || telegramResult?.success || amocrmResult;

    if (anySuccess) {
      return NextResponse.json({
        success: true,
        message: "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.",
        details: {
          email: emailResult?.success || false,
          telegram: telegramResult?.success || false,
          amocrm: !!amocrmResult,
        }
      });
    } else {
      // Если все интеграции провалились
      console.error("[Contact API] ❌ All integrations failed");
      return NextResponse.json(
        { error: "Не удалось отправить заявку. Попробуйте позже или позвоните нам напрямую." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("[Contact API] Error:", error);
    return NextResponse.json(
      { error: "Произошла ошибка. Попробуйте позже." },
      { status: 500 }
    );
  }
}
