export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextRequest, NextResponse } from "next/server";
import { exchangeAuthCodeForTokens } from "@/lib/amocrm";

/**
 * Callback endpoint для amoCRM OAuth авторизации
 * GET /api/amocrm/callback?code=...
 * 
 * После авторизации в amoCRM пользователь перенаправляется сюда с кодом авторизации
 */

// Обработка OPTIONS для CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    // Проверка на ошибку от amoCRM
    if (error) {
      console.error("[amocrm] Authorization error:", error);
      return NextResponse.redirect(
        new URL(`/dashboard/settings?amocrm_error=${encodeURIComponent(error)}`, request.url)
      );
    }

    // Проверка наличия кода
    if (!code) {
      // Если код отсутствует, показываем информационную страницу
      return new NextResponse(
        `<!DOCTYPE html>
<html>
<head>
  <title>amoCRM Authorization</title>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
    .error { color: #d32f2f; }
    .info { color: #1976d2; margin: 20px 0; }
  </style>
</head>
<body>
  <h1 class="error">⚠️ Authorization Code Missing</h1>
  <p class="info">This endpoint should be accessed through the amoCRM authorization flow.</p>
  <p>Please use the authorization URL:</p>
  <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; word-break: break-all;">
    https://rahimaconsulting.amocrm.ru/oauth2/authorize?client_id=1dffbf5c-08c6-4d73-ae49-a2518c609e8f&response_type=code&redirect_uri=https://rahima-consulting.ru/api/amocrm/callback
  </p>
  <p><a href="/dashboard/settings">Go to Settings</a></p>
</body>
</html>`,
        {
          status: 200,
          headers: { "Content-Type": "text/html" },
        }
      );
    }

    try {
      // Обмениваем код на токены
      const tokens = await exchangeAuthCodeForTokens(code);

      // TODO: Сохранить токены в БД или переменных окружения
      // Пока просто выводим в консоль для копирования
      console.log("[amocrm] Tokens received:");
      console.log("AMOCRM_ACCESS_TOKEN=" + tokens.access_token);
      console.log("AMOCRM_REFRESH_TOKEN=" + tokens.refresh_token);

      // Перенаправляем на страницу настроек с успешным сообщением
      return NextResponse.redirect(
        new URL(
          `/dashboard/settings?amocrm_success=1&access_token=${encodeURIComponent(tokens.access_token)}&refresh_token=${encodeURIComponent(tokens.refresh_token)}`,
          request.url
        )
      );
    } catch (tokenError) {
      console.error("[amocrm] Error exchanging code for tokens:", tokenError);
      return NextResponse.redirect(
        new URL(
          `/dashboard/settings?amocrm_error=${encodeURIComponent(
            tokenError instanceof Error ? tokenError.message : "token_exchange_failed"
          )}`,
          request.url
        )
      );
    }
  } catch (error) {
    console.error("[amocrm] Callback error:", error);
    return NextResponse.redirect(
      new URL("/dashboard/settings?amocrm_error=unknown", request.url)
    );
  }
}

