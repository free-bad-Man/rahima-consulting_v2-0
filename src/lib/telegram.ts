interface TelegramMessageParams {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  comment?: string;
}

/**
 * Отправляет уведомление в Telegram группу/канал
 */
export async function sendTelegramNotification({ name, phone, email, service = 'Заказ звонка', comment }: TelegramMessageParams) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('❌ Telegram не настроен! Проверьте переменные окружения:');
    console.error(`   TELEGRAM_BOT_TOKEN: ${botToken ? '✅ установлен' : '❌ не установлен'}`);
    console.error(`   TELEGRAM_CHAT_ID: ${chatId ? '✅ установлен' : '❌ не установлен'}`);
    return { success: false, error: 'Telegram not configured' };
  }

  let additionalInfo = '';
  if (email) {
    additionalInfo += `\n📧 <b>Email:</b> ${email}`;
  }
  if (comment) {
    // Экранируем HTML в комментарии
    const escapedComment = comment.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    additionalInfo += `\n\n💬 <b>Комментарий:</b>\n<pre>${escapedComment}</pre>`;
  }

  const message = `
🔔 <b>Новая заявка с сайта</b>

📋 <b>Тип заявки:</b> ${service}
👤 <b>Имя:</b> ${name}
📞 <b>Телефон:</b> <code>${phone}</code>${additionalInfo}

⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}

<a href="tel:${phone}">📞 Позвонить клиенту</a>
  `.trim();

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.description || 'Telegram API error');
    }

    console.log('[Telegram] ✅ Message sent:', data.result.message_id);
    return { success: true, messageId: data.result.message_id };
  } catch (error) {
    console.error('[Telegram] ❌ Error sending message:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Проверяет доступность Telegram бота (ping)
 */
export async function checkTelegramBot() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    return { ok: false, error: 'TELEGRAM_BOT_TOKEN not set' };
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
    const data = await response.json();
    
    if (data.ok) {
      console.log('[Telegram] ✅ Bot connected:', data.result.username);
      return { ok: true, bot: data.result };
    } else {
      console.error('[Telegram] ❌ Bot check failed:', data.description);
      return { ok: false, error: data.description };
    }
  } catch (error) {
    console.error('[Telegram] ❌ Error checking bot:', error);
    return { ok: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

