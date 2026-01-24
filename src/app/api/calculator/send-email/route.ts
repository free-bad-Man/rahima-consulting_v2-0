import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, calculationId } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const calculationUrl = `${process.env.NEXTAUTH_URL || 'https://rahima-consulting.ru'}/calculator/${calculationId}`;

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
          .cta {
            display: inline-block;
            margin-top: 20px;
            padding: 15px 30px;
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
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Ваш расчёт готов!</h1>
        </div>
        <div class="content">
          <p>Здравствуйте${name ? `, ${name}` : ''}!</p>
          
          <p>Спасибо за использование нашего калькулятора. Ваш расчёт стоимости услуг сохранён и доступен по ссылке ниже.</p>
          
          <p>Вы можете в любое время вернуться к расчёту, поделиться им с коллегами или скачать PDF-версию.</p>
          
          <a href="${calculationUrl}" class="cta">Открыть расчёт</a>
          
          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            Если у вас есть вопросы или вы хотите обсудить детали, свяжитесь с нами:
          </p>
          <p style="font-size: 14px; color: #666;">
            📞 Телефон: <a href="tel:+79789987222">+7 (978) 998-72-22</a><br>
            📧 Email: <a href="mailto:info@rahima-consulting.ru">info@rahima-consulting.ru</a><br>
            💬 Telegram: <a href="https://t.me/centr_reg">@centr_reg</a>
          </p>
        </div>
        <div class="footer">
          <p><strong>Rahima Consulting</strong></p>
          <p>Бухгалтерское сопровождение, автоматизация и юридические услуги</p>
          <p>Россия, респ. Крым, г. Симферополь, ул. им Мате Залки 1</p>
        </div>
      </body>
      </html>
    `;

    const result = await sendEmail({
      to: email,
      subject: 'Ваш расчёт стоимости услуг | Rahima Consulting',
      html,
    });

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

