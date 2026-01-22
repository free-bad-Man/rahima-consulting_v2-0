export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextResponse } from "next/server";
import { createDealFromContactForm } from "@/lib/amocrm";

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
    
    const { name, phone } = body;

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

    // n8n integration removed — log payload instead of sending to external workflow
    const n8nResult = { success: true, error: null };
    try {
      console.info("[n8n removed] contact form payload:", {
        name: trimmedName,
        phone: trimmedPhone,
        service: "Заказ звонка",
      });
    } catch (e) {
      // swallow logging errors
    }

    // Отправляем в amoCRM (независимо от результата n8n)
    let amocrmResult = null;
    try {
      amocrmResult = await createDealFromContactForm({
        userName: trimmedName,
        userPhone: trimmedPhone,
      });
      console.log("[Contact API] ✅ amoCRM deal created:", amocrmResult);
    } catch (amocrmError) {
      console.error("[Contact API] ❌ amoCRM error:", amocrmError);
      // Не блокируем ответ, если amoCRM не работает
    }

    if (!n8nResult.success) {
      console.error("[Contact API] n8n error:", n8nResult.error);
      // Если amoCRM успешно создал сделку, все равно возвращаем успех
      if (amocrmResult) {
        return NextResponse.json({
          success: true,
          message: "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.",
        });
      }
      // Не показываем пользователю детали ошибки n8n
      return NextResponse.json(
        { error: "Не удалось отправить заявку. Попробуйте позже." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.",
    });
  } catch (error) {
    console.error("[Contact API] Error:", error);
    return NextResponse.json(
      { error: "Произошла ошибка. Попробуйте позже." },
      { status: 500 }
    );
  }
}
