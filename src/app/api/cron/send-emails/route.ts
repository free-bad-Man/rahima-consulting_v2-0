import { NextRequest, NextResponse } from "next/server";
import { sendScheduledEmails } from "@/lib/email-scheduler";

/**
 * API endpoint для cron job, который отправляет запланированные письма
 * 
 * Настройка cron (в docker-compose.yml или на сервере):
 * curl -X POST http://localhost:3000/api/cron/send-emails
 * 
 * Рекомендуется запускать каждые 5-10 минут
 */
export async function POST(request: NextRequest) {
  try {
    // Проверка секретного ключа для безопасности
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || 'your-secret-key-here';
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log('⏰ Cron job: отправка запланированных писем');
    
    const sentCount = await sendScheduledEmails();

    return NextResponse.json({
      success: true,
      message: `Отправлено ${sentCount} писем`,
      sentCount,
    });
  } catch (error: any) {
    console.error('❌ Ошибка в cron job send-emails:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// Разрешаем GET для проверки статуса
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    message: 'Email cron job endpoint is ready',
    info: 'Use POST request with Authorization header to trigger email sending',
  });
}

