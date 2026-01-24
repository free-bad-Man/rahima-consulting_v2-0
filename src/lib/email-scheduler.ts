import { prisma } from "@/lib/prisma";
import { sendContactFormEmail } from "@/lib/email";
import {
  getThankYouEmailTemplate,
  getFollowUpDay1EmailTemplate,
  getFollowUpDay3EmailTemplate,
  getFollowUpDay7EmailTemplate,
  type EmailTemplateData,
} from "@/lib/email-templates";

export async function scheduleEmailSeries(data: {
  recipientEmail: string;
  recipientName: string;
  calculationId?: string;
  totalMonthly?: number;
}) {
  const { recipientEmail, recipientName, calculationId, totalMonthly } = data;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rahima-consulting.ru';
  const calculationUrl = calculationId ? `${baseUrl}/calculator/${calculationId}` : undefined;

  const templateData: EmailTemplateData = {
    name: recipientName,
    email: recipientEmail,
    calculationId,
    calculationUrl,
    totalMonthly,
  };

  const now = new Date();

  // День 0: Спасибо за заявку (сразу)
  const thankYou = getThankYouEmailTemplate(templateData);
  await prisma.emailSchedule.create({
    data: {
      recipientEmail,
      recipientName,
      templateType: 'THANK_YOU',
      subject: thankYou.subject,
      htmlContent: thankYou.html,
      textContent: thankYou.text,
      metadata: { calculationId, totalMonthly },
      scheduledFor: now,
    },
  });

  // День 1: Почему выбирают нас
  const day1 = getFollowUpDay1EmailTemplate(templateData);
  const day1Date = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  await prisma.emailSchedule.create({
    data: {
      recipientEmail,
      recipientName,
      templateType: 'FOLLOW_UP_DAY1',
      subject: day1.subject,
      htmlContent: day1.html,
      textContent: day1.text,
      metadata: { calculationId },
      scheduledFor: day1Date,
    },
  });

  // День 3: Специальное предложение
  const day3 = getFollowUpDay3EmailTemplate(templateData);
  const day3Date = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  await prisma.emailSchedule.create({
    data: {
      recipientEmail,
      recipientName,
      templateType: 'FOLLOW_UP_DAY3',
      subject: day3.subject,
      htmlContent: day3.html,
      textContent: day3.text,
      metadata: { calculationId, totalMonthly },
      scheduledFor: day3Date,
    },
  });

  // День 7: Напоминание
  const day7 = getFollowUpDay7EmailTemplate(templateData);
  const day7Date = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  await prisma.emailSchedule.create({
    data: {
      recipientEmail,
      recipientName,
      templateType: 'FOLLOW_UP_DAY7',
      subject: day7.subject,
      htmlContent: day7.html,
      textContent: day7.text,
      metadata: { calculationId },
      scheduledFor: day7Date,
    },
  });

  console.log(`📧 Запланировано 4 письма для ${recipientEmail}`);
}

export async function sendScheduledEmails() {
  const now = new Date();

  // Получаем все письма, которые нужно отправить
  const emails = await prisma.emailSchedule.findMany({
    where: {
      scheduledFor: {
        lte: now,
      },
      status: 'PENDING',
      attempts: {
        lt: 3, // Максимум 3 попытки
      },
    },
    take: 50, // Обрабатываем не более 50 писем за раз
  });

  console.log(`📧 Найдено ${emails.length} писем для отправки`);

  for (const email of emails) {
    try {
      // Обновляем статус на SENDING
      await prisma.emailSchedule.update({
        where: { id: email.id },
        data: {
          status: 'SENDING',
          attempts: {
            increment: 1,
          },
        },
      });

      // Отправляем письмо через Nodemailer
      await sendContactFormEmail({
        name: email.recipientName || 'Клиент',
        phone: '',
        email: email.recipientEmail,
        service: email.subject,
        comment: '',
        customSubject: email.subject,
        customHtml: email.htmlContent,
        customText: email.textContent,
      });

      // Обновляем статус на SENT
      await prisma.emailSchedule.update({
        where: { id: email.id },
        data: {
          status: 'SENT',
          sentAt: new Date(),
        },
      });

      console.log(`✅ Отправлено письмо ${email.id} на ${email.recipientEmail}`);
    } catch (error: any) {
      console.error(`❌ Ошибка отправки письма ${email.id}:`, error);

      // Обновляем статус на FAILED или PENDING (если есть ещё попытки)
      await prisma.emailSchedule.update({
        where: { id: email.id },
        data: {
          status: email.attempts >= 2 ? 'FAILED' : 'PENDING',
          error: error.message,
        },
      });
    }

    // Задержка между письмами (100мс), чтобы не нагружать SMTP
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return emails.length;
}

// Функция для отмены запланированных писем (если клиент уже стал клиентом)
export async function cancelScheduledEmails(recipientEmail: string) {
  await prisma.emailSchedule.updateMany({
    where: {
      recipientEmail,
      status: 'PENDING',
    },
    data: {
      status: 'CANCELLED',
    },
  });

  console.log(`🚫 Отменены все запланированные письма для ${recipientEmail}`);
}

