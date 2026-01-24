import nodemailer from 'nodemailer';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface ContactFormEmailParams {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  comment?: string;
  customSubject?: string;
  customHtml?: string;
  customText?: string;
}

/**
 * Создает transporter для отправки email через SMTP
 */
function createTransporter() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const smtpSecure = process.env.SMTP_SECURE === 'true';

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword) {
    console.warn('⚠️ SMTP не настроен полностью. Проверьте переменные окружения.');
    throw new Error('SMTP configuration is incomplete');
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort, 10),
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });
}

/**
 * Отправляет email
 */
export async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  try {
    const transporter = createTransporter();
    const smtpFrom = process.env.SMTP_FROM || process.env.SMTP_USER;

    const info = await transporter.sendMail({
      from: `"Rahima Consulting" <${smtpFrom}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''), // Fallback to stripped HTML
    });

    console.log('[Email] ✅ Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Email] ❌ Error sending email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Отправляет уведомление о новой заявке с формы "Заказать звонок"
 * Или отправляет кастомное письмо (если указаны customSubject и customHtml)
 */
export async function sendContactFormEmail({ name, phone, email, service = 'Заказ звонка', comment, customSubject, customHtml, customText }: ContactFormEmailParams) {
  // Если передан кастомный шаблон - отправляем напрямую клиенту
  if (customSubject && customHtml && email) {
    return await sendEmail({
      to: email,
      subject: customSubject,
      html: customHtml,
      text: customText,
    });
  }

  // Иначе отправляем уведомление менеджеру
  const recipientEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

  if (!recipientEmail) {
    console.warn('⚠️ CONTACT_EMAIL не установлен. Email не будет отправлен.');
    return { success: false, error: 'No recipient email configured' };
  }

  const subject = `🔔 Новая заявка: ${service}`;
  
  // Формируем дополнительные поля
  let additionalFields = '';
  if (email) {
    additionalFields += `
        <div class="field">
          <div class="field-label">Email</div>
          <div class="field-value"><a href="mailto:${email}">${email}</a></div>
        </div>`;
  }
  if (comment) {
    additionalFields += `
        <div class="field">
          <div class="field-label">Комментарий</div>
          <div class="field-value" style="white-space: pre-wrap;">${comment}</div>
        </div>`;
  }
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          background: #f9f9f9;
          padding: 30px;
          border: 1px solid #e0e0e0;
          border-top: none;
        }
        .field {
          margin-bottom: 20px;
          padding: 15px;
          background: white;
          border-radius: 6px;
          border-left: 4px solid #667eea;
        }
        .field-label {
          font-weight: 600;
          color: #667eea;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .field-value {
          font-size: 16px;
          color: #333;
        }
        .footer {
          background: #f0f0f0;
          padding: 20px;
          border-radius: 0 0 8px 8px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        .cta {
          display: inline-block;
          margin-top: 20px;
          padding: 12px 30px;
          background: #667eea;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Новая заявка с сайта</h1>
      </div>
      <div class="content">
        <div class="field">
          <div class="field-label">Тип заявки</div>
          <div class="field-value">${service}</div>
        </div>
        <div class="field">
          <div class="field-label">Имя клиента</div>
          <div class="field-value">${name}</div>
        </div>
        <div class="field">
          <div class="field-label">Телефон</div>
          <div class="field-value"><a href="tel:${phone}">${phone}</a></div>
        </div>${additionalFields}
        <div class="field">
          <div class="field-label">Время получения</div>
          <div class="field-value">${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}</div>
        </div>
        <a href="tel:${phone}" class="cta">Позвонить клиенту</a>
      </div>
      <div class="footer">
        <p>Rahima Consulting - Автоматическое уведомление</p>
        <p>Не отвечайте на это письмо</p>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: recipientEmail,
    subject,
    html,
  });
}
