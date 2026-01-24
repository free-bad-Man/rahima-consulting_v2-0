export interface EmailTemplateData {
  name: string;
  email: string;
  calculationId?: string;
  calculationUrl?: string;
  totalMonthly?: number;
  companyName?: string;
}

// День 0: Спасибо за заявку
export function getThankYouEmailTemplate(data: EmailTemplateData) {
  const { name, calculationId, calculationUrl, totalMonthly } = data;

  const subject = "Спасибо за заявку! Мы свяжемся с вами в течение 2 часов";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Спасибо за заявку</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <!-- Шапка -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                    Спасибо за заявку!
                  </h1>
                </td>
              </tr>
              
              <!-- Контент -->
              <tr>
                <td style="padding: 40px 30px;">
                  <p style="margin: 0 0 20px; font-size: 16px; color: #333333; line-height: 1.6;">
                    Здравствуйте${name ? ', ' + name : ''}!
                  </p>
                  
                  <p style="margin: 0 0 20px; font-size: 16px; color: #333333; line-height: 1.6;">
                    Мы получили вашу заявку и уже начали её обработку. 
                    <strong>Наш менеджер свяжется с вами в течение 2 часов</strong> для уточнения деталей.
                  </p>

                  ${calculationId && calculationUrl && totalMonthly ? `
                  <div style="background-color: #f8f9ff; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0; border-radius: 8px;">
                    <h3 style="margin: 0 0 15px; font-size: 18px; color: #667eea;">Ваш расчёт</h3>
                    <p style="margin: 0 0 10px; font-size: 24px; font-weight: bold; color: #333333;">
                      ${totalMonthly.toLocaleString('ru-RU')} ₽/мес
                    </p>
                    <a href="${calculationUrl}" style="display: inline-block; margin-top: 15px; padding: 12px 24px; background-color: #667eea; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold;">
                      Посмотреть детали расчёта
                    </a>
                  </div>
                  ` : ''}

                  <h3 style="margin: 30px 0 15px; font-size: 18px; color: #333333;">Что будет дальше:</h3>
                  
                  <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                    <tr>
                      <td style="padding: 15px 0; border-bottom: 1px solid #eeeeee;">
                        <div style="display: flex; align-items: start;">
                          <div style="background-color: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">1</div>
                          <div>
                            <strong style="color: #333333;">Звонок менеджера</strong><br>
                            <span style="color: #666666; font-size: 14px;">В течение 2 часов</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 15px 0; border-bottom: 1px solid #eeeeee;">
                        <div style="display: flex; align-items: start;">
                          <div style="background-color: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">2</div>
                          <div>
                            <strong style="color: #333333;">Консультация</strong><br>
                            <span style="color: #666666; font-size: 14px;">Обсудим ваши задачи и подберём оптимальное решение</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 15px 0;">
                        <div style="display: flex; align-items: start;">
                          <div style="background-color: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">3</div>
                          <div>
                            <strong style="color: #333333;">Начало работы</strong><br>
                            <span style="color: #666666; font-size: 14px;">Заключаем договор и приступаем к работе</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>

                  <div style="margin: 30px 0 0; padding: 20px; background-color: #fffbf0; border-radius: 8px; border-left: 4px solid #ffc107;">
                    <p style="margin: 0; font-size: 14px; color: #666666;">
                      <strong style="color: #333333;">💡 Совет:</strong> Подготовьте список ваших вопросов к разговору с менеджером, 
                      чтобы получить максимально точное предложение.
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Футер -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eeeeee;">
                  <p style="margin: 0 0 15px; font-size: 14px; color: #666666;">
                    С уважением,<br>
                    <strong>Команда Rahima Consulting</strong>
                  </p>
                  <p style="margin: 0; font-size: 12px; color: #999999;">
                    <a href="https://rahima-consulting.ru" style="color: #667eea; text-decoration: none;">rahima-consulting.ru</a> | 
                    <a href="tel:+79789987222" style="color: #667eea; text-decoration: none;">+7 (978) 998-72-22</a> | 
                    <a href="mailto:info@rahima-consulting.ru" style="color: #667eea; text-decoration: none;">info@rahima-consulting.ru</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const text = `
Здравствуйте${name ? ', ' + name : ''}!

Спасибо за заявку! Мы получили вашу заявку и уже начали её обработку.
Наш менеджер свяжется с вами в течение 2 часов для уточнения деталей.

${calculationId && calculationUrl && totalMonthly ? `
Ваш расчёт: ${totalMonthly.toLocaleString('ru-RU')} ₽/мес
Посмотреть детали: ${calculationUrl}
` : ''}

Что будет дальше:
1. Звонок менеджера (в течение 2 часов)
2. Консультация - обсудим ваши задачи
3. Начало работы - заключаем договор

С уважением,
Команда Rahima Consulting
https://rahima-consulting.ru
  `.trim();

  return { subject, html, text };
}

// День 1: Почему выбирают нас (кейсы)
export function getFollowUpDay1EmailTemplate(data: EmailTemplateData) {
  const { name } = data;

  const subject = "Почему 500+ компаний выбрали Rahima Consulting";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Наши кейсы</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <!-- Шапка -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                    Почему нам доверяют?
                  </h1>
                </td>
              </tr>
              
              <!-- Контент -->
              <tr>
                <td style="padding: 40px 30px;">
                  <p style="margin: 0 0 20px; font-size: 16px; color: #333333; line-height: 1.6;">
                    Здравствуйте${name ? ', ' + name : ''}!
                  </p>
                  
                  <p style="margin: 0 0 30px; font-size: 16px; color: #333333; line-height: 1.6;">
                    Вчера вы оставили заявку на расчёт стоимости наших услуг. Сегодня хотим поделиться 
                    <strong>реальными кейсами наших клиентов</strong>, которые уже работают с нами.
                  </p>

                  <!-- Кейс 1 -->
                  <div style="margin: 30px 0; padding: 25px; background-color: #f8f9ff; border-radius: 12px; border-left: 4px solid #667eea;">
                    <h3 style="margin: 0 0 15px; font-size: 18px; color: #667eea;">
                      🏢 Интернет-магазин электроники
                    </h3>
                    <p style="margin: 0 0 10px; font-size: 14px; color: #666666;">
                      <strong>Задача:</strong> Оптимизация налогообложения, ведение учёта 300+ операций в месяц
                    </p>
                    <p style="margin: 0 0 10px; font-size: 14px; color: #666666;">
                      <strong>Решение:</strong> Переход на УСН 15%, автоматизация учёта, внедрение CRM
                    </p>
                    <p style="margin: 0; font-size: 16px; color: #28a745; font-weight: bold;">
                      Результат: Экономия 200 000 ₽/год на налогах, -70% времени на отчётность
                    </p>
                  </div>

                  <!-- Кейс 2 -->
                  <div style="margin: 30px 0; padding: 25px; background-color: #f8f9ff; border-radius: 12px; border-left: 4px solid #667eea;">
                    <h3 style="margin: 0 0 15px; font-size: 18px; color: #667eea;">
                      🚀 IT-стартап (10 сотрудников)
                    </h3>
                    <p style="margin: 0 0 10px; font-size: 14px; color: #666666;">
                      <strong>Задача:</strong> Регистрация ООО, постановка учёта с нуля, кадровый учёт
                    </p>
                    <p style="margin: 0 0 10px; font-size: 14px; color: #666666;">
                      <strong>Решение:</strong> Регистрация за 3 дня, внедрение учёта, автоматизация кадров
                    </p>
                    <p style="margin: 0; font-size: 16px; color: #28a745; font-weight: bold;">
                      Результат: Запуск бизнеса за 1 неделю, 0 ошибок в документах
                    </p>
                  </div>

                  <!-- Кейс 3 -->
                  <div style="margin: 30px 0; padding: 25px; background-color: #f8f9ff; border-radius: 12px; border-left: 4px solid #667eea;">
                    <h3 style="margin: 0 0 15px; font-size: 18px; color: #667eea;">
                      🌍 Компания с ВЭД (экспорт)
                    </h3>
                    <p style="margin: 0 0 10px; font-size: 14px; color: #666666;">
                      <strong>Задача:</strong> Оформление ВЭД-документов, работа с НДС, валютный контроль
                    </p>
                    <p style="margin: 0 0 10px; font-size: 14px; color: #666666;">
                      <strong>Решение:</strong> Полное сопровождение ВЭД, юридическая поддержка
                    </p>
                    <p style="margin: 0; font-size: 16px; color: #28a745; font-weight: bold;">
                      Результат: 0 штрафов от таможни, увеличение экспорта на 150%
                    </p>
                  </div>

                  <div style="margin: 30px 0 0; padding: 25px; background-color: #fff3cd; border-radius: 12px; text-align: center;">
                    <p style="margin: 0 0 15px; font-size: 18px; color: #333333; font-weight: bold;">
                      Хотите такой же результат?
                    </p>
                    <a href="https://rahima-consulting.ru/cases" style="display: inline-block; padding: 14px 28px; background-color: #667eea; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                      Посмотреть все кейсы
                    </a>
                  </div>
                </td>
              </tr>

              <!-- Футер -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eeeeee;">
                  <p style="margin: 0 0 15px; font-size: 14px; color: #666666;">
                    С уважением,<br>
                    <strong>Команда Rahima Consulting</strong>
                  </p>
                  <p style="margin: 0; font-size: 12px; color: #999999;">
                    <a href="https://rahima-consulting.ru" style="color: #667eea; text-decoration: none;">rahima-consulting.ru</a> | 
                    <a href="tel:+79789987222" style="color: #667eea; text-decoration: none;">+7 (978) 998-72-22</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const text = `
Здравствуйте${name ? ', ' + name : ''}!

Почему 500+ компаний выбрали Rahima Consulting?

КЕЙС 1: Интернет-магазин электроники
- Задача: Оптимизация налогообложения, 300+ операций/мес
- Результат: Экономия 200 000 ₽/год, -70% времени на отчётность

КЕЙС 2: IT-стартап (10 сотрудников)
- Задача: Регистрация ООО, постановка учёта с нуля
- Результат: Запуск за 1 неделю, 0 ошибок

КЕЙС 3: Компания с ВЭД
- Задача: Оформление ВЭД, работа с НДС
- Результат: 0 штрафов, +150% экспорта

Хотите такой же результат? Посмотрите все кейсы: https://rahima-consulting.ru/cases

С уважением,
Команда Rahima Consulting
  `.trim();

  return { subject, html, text };
}

// День 3: Специальное предложение
export function getFollowUpDay3EmailTemplate(data: EmailTemplateData) {
  const { name, totalMonthly } = data;

  const subject = "🎁 Специальное предложение только для вас -10%";

  const discount = totalMonthly ? Math.round(totalMonthly * 0.1) : 0;
  const discountedPrice = totalMonthly ? totalMonthly - discount : 0;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Специальное предложение</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <!-- Шапка -->
              <tr>
                <td style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0 0 10px; color: #ffffff; font-size: 32px; font-weight: bold;">
                    🎁 Специальное предложение
                  </h1>
                  <p style="margin: 0; color: #ffffff; font-size: 18px; opacity: 0.95;">
                    Скидка -10% на первый месяц!
                  </p>
                </td>
              </tr>
              
              <!-- Контент -->
              <tr>
                <td style="padding: 40px 30px;">
                  <p style="margin: 0 0 20px; font-size: 16px; color: #333333; line-height: 1.6;">
                    Здравствуйте${name ? ', ' + name : ''}!
                  </p>
                  
                  <p style="margin: 0 0 30px; font-size: 16px; color: #333333; line-height: 1.6;">
                    Вы оставили заявку 3 дня назад, но ещё не приняли решение? 
                    <strong>Мы готовы сделать вам специальное предложение!</strong>
                  </p>

                  ${totalMonthly ? `
                  <div style="margin: 30px 0; padding: 30px; background: linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%); border-radius: 16px; text-align: center; border: 2px solid #f5576c;">
                    <p style="margin: 0 0 10px; font-size: 14px; color: #999999; text-decoration: line-through;">
                      Обычная цена: ${totalMonthly.toLocaleString('ru-RU')} ₽/мес
                    </p>
                    <p style="margin: 0 0 15px; font-size: 42px; font-weight: bold; color: #f5576c;">
                      ${discountedPrice.toLocaleString('ru-RU')} ₽/мес
                    </p>
                    <p style="margin: 0; font-size: 18px; color: #333333;">
                      <strong>Экономия ${discount.toLocaleString('ru-RU')} ₽ в первый месяц!</strong>
                    </p>
                  </div>
                  ` : `
                  <div style="margin: 30px 0; padding: 30px; background: linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%); border-radius: 16px; text-align: center; border: 2px solid #f5576c;">
                    <p style="margin: 0 0 15px; font-size: 42px; font-weight: bold; color: #f5576c;">
                      -10%
                    </p>
                    <p style="margin: 0; font-size: 18px; color: #333333;">
                      <strong>На первый месяц сотрудничества!</strong>
                    </p>
                  </div>
                  `}

                  <h3 style="margin: 30px 0 20px; font-size: 20px; color: #333333; text-align: center;">
                    Что вы получаете:
                  </h3>

                  <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                    <tr>
                      <td style="padding: 15px; background-color: #f8f9ff; border-radius: 8px; margin-bottom: 10px;">
                        <div style="display: flex; align-items: center;">
                          <span style="font-size: 24px; margin-right: 15px;">✅</span>
                          <span style="color: #333333; font-size: 15px;">Полное бухгалтерское сопровождение</span>
                        </div>
                      </td>
                    </tr>
                    <tr><td style="height: 10px;"></td></tr>
                    <tr>
                      <td style="padding: 15px; background-color: #f8f9ff; border-radius: 8px;">
                        <div style="display: flex; align-items: center;">
                          <span style="font-size: 24px; margin-right: 15px;">✅</span>
                          <span style="color: #333333; font-size: 15px;">Личный менеджер на связи 24/7</span>
                        </div>
                      </td>
                    </tr>
                    <tr><td style="height: 10px;"></td></tr>
                    <tr>
                      <td style="padding: 15px; background-color: #f8f9ff; border-radius: 8px;">
                        <div style="display: flex; align-items: center;">
                          <span style="font-size: 24px; margin-right: 15px;">✅</span>
                          <span style="color: #333333; font-size: 15px;">Гарантия качества и сроков</span>
                        </div>
                      </td>
                    </tr>
                    <tr><td style="height: 10px;"></td></tr>
                    <tr>
                      <td style="padding: 15px; background-color: #f8f9ff; border-radius: 8px;">
                        <div style="display: flex; align-items: center;">
                          <span style="font-size: 24px; margin-right: 15px;">✅</span>
                          <span style="color: #333333; font-size: 15px;">Бесплатная консультация перед стартом</span>
                        </div>
                      </td>
                    </tr>
                  </table>

                  <div style="margin: 40px 0 0; padding: 25px; background-color: #fff3cd; border-radius: 12px; text-align: center;">
                    <p style="margin: 0 0 5px; font-size: 14px; color: #856404;">
                      ⏰ Предложение действует 48 часов
                    </p>
                    <p style="margin: 0 0 20px; font-size: 12px; color: #856404;">
                      До ${new Date(Date.now() + 48 * 60 * 60 * 1000).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <a href="https://rahima-consulting.ru/calculator" style="display: inline-block; padding: 14px 32px; background-color: #f5576c; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                      Воспользоваться предложением
                    </a>
                  </div>
                </td>
              </tr>

              <!-- Футер -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eeeeee;">
                  <p style="margin: 0 0 15px; font-size: 14px; color: #666666;">
                    С уважением,<br>
                    <strong>Команда Rahima Consulting</strong>
                  </p>
                  <p style="margin: 0; font-size: 12px; color: #999999;">
                    <a href="https://rahima-consulting.ru" style="color: #667eea; text-decoration: none;">rahima-consulting.ru</a> | 
                    <a href="tel:+79789987222" style="color: #667eea; text-decoration: none;">+7 (978) 998-72-22</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const text = `
Здравствуйте${name ? ', ' + name : ''}!

🎁 СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ: -10% НА ПЕРВЫЙ МЕСЯЦ!

${totalMonthly ? `
Обычная цена: ${totalMonthly.toLocaleString('ru-RU')} ₽/мес
Со скидкой: ${discountedPrice.toLocaleString('ru-RU')} ₽/мес
Экономия: ${discount.toLocaleString('ru-RU')} ₽!
` : `Скидка -10% на первый месяц сотрудничества!`}

Что вы получаете:
✅ Полное бухгалтерское сопровождение
✅ Личный менеджер 24/7
✅ Гарантия качества и сроков
✅ Бесплатная консультация

⏰ Предложение действует 48 часов!

Воспользоваться: https://rahima-consulting.ru/calculator

С уважением,
Команда Rahima Consulting
  `.trim();

  return { subject, html, text };
}

// День 7: Напоминание
export function getFollowUpDay7EmailTemplate(data: EmailTemplateData) {
  const { name } = data;

  const subject = "Забыли про нас? Давайте обсудим ваш проект!";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Напоминание</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <!-- Шапка -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                    Всё ещё думаете?
                  </h1>
                </td>
              </tr>
              
              <!-- Контент -->
              <tr>
                <td style="padding: 40px 30px;">
                  <p style="margin: 0 0 20px; font-size: 16px; color: #333333; line-height: 1.6;">
                    Здравствуйте${name ? ', ' + name : ''}!
                  </p>
                  
                  <p style="margin: 0 0 20px; font-size: 16px; color: #333333; line-height: 1.6;">
                    Прошла неделя с тех пор, как вы оставили заявку на нашем сайте. 
                    Мы заметили, что вы ещё не начали работу с нами.
                  </p>

                  <p style="margin: 0 0 30px; font-size: 16px; color: #333333; line-height: 1.6;">
                    <strong>Возможно, у вас остались вопросы?</strong> Мы готовы ответить на них и помочь разобраться!
                  </p>

                  <div style="margin: 30px 0; padding: 30px; background-color: #f8f9ff; border-radius: 12px; border-left: 4px solid #667eea;">
                    <h3 style="margin: 0 0 20px; font-size: 20px; color: #667eea;">
                      Топ-3 вопроса от клиентов:
                    </h3>
                    
                    <div style="margin-bottom: 20px;">
                      <strong style="color: #333333; font-size: 15px;">1. Как происходит передача документов?</strong>
                      <p style="margin: 5px 0 0; font-size: 14px; color: #666666; line-height: 1.5;">
                        Мы работаем полностью онлайн через защищённый личный кабинет и Telegram. 
                        Никаких поездок в офис!
                      </p>
                    </div>

                    <div style="margin-bottom: 20px;">
                      <strong style="color: #333333; font-size: 15px;">2. Что если мне не подойдёт?</strong>
                      <p style="margin: 5px 0 0; font-size: 14px; color: #666666; line-height: 1.5;">
                        Мы работаем без долгосрочных контрактов. Можете прекратить сотрудничество в любой момент.
                      </p>
                    </div>

                    <div style="margin-bottom: 0;">
                      <strong style="color: #333333; font-size: 15px;">3. Как быстро вы реагируете на вопросы?</strong>
                      <p style="margin: 5px 0 0; font-size: 14px; color: #666666; line-height: 1.5;">
                        Ваш личный менеджер отвечает в течение 2 часов (часто быстрее!), 
                        даже в выходные.
                      </p>
                    </div>
                  </div>

                  <div style="margin: 30px 0 0; padding: 25px; background-color: #fff3cd; border-radius: 12px; text-align: center;">
                    <p style="margin: 0 0 15px; font-size: 18px; color: #333333; font-weight: bold;">
                      Давайте обсудим ваш проект!
                    </p>
                    <p style="margin: 0 0 20px; font-size: 14px; color: #666666;">
                      Выберите удобный способ связи:
                    </p>
                    <div style="margin-bottom: 15px;">
                      <a href="tel:+79789987222" style="display: inline-block; padding: 12px 24px; background-color: #28a745; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 5px;">
                        📞 Позвонить нам
                      </a>
                    </div>
                    <div style="margin-bottom: 15px;">
                      <a href="https://wa.me/79789987222" style="display: inline-block; padding: 12px 24px; background-color: #25D366; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 5px;">
                        💬 Написать в WhatsApp
                      </a>
                    </div>
                    <div>
                      <a href="https://t.me/centr_reg" style="display: inline-block; padding: 12px 24px; background-color: #0088cc; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 5px;">
                        ✈️ Написать в Telegram
                      </a>
                    </div>
                  </div>

                  <div style="margin: 30px 0 0; text-align: center;">
                    <p style="margin: 0; font-size: 14px; color: #999999; font-style: italic;">
                      P.S. Если передумали, просто не отвечайте на это письмо. 
                      Мы больше не будем вас беспокоить.
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Футер -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eeeeee;">
                  <p style="margin: 0 0 15px; font-size: 14px; color: #666666;">
                    С уважением,<br>
                    <strong>Команда Rahima Consulting</strong>
                  </p>
                  <p style="margin: 0; font-size: 12px; color: #999999;">
                    <a href="https://rahima-consulting.ru" style="color: #667eea; text-decoration: none;">rahima-consulting.ru</a> | 
                    <a href="tel:+79789987222" style="color: #667eea; text-decoration: none;">+7 (978) 998-72-22</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const text = `
Здравствуйте${name ? ', ' + name : ''}!

Прошла неделя с вашей заявки. Всё ещё думаете?

Возможно, у вас есть вопросы? Давайте обсудим!

ТОП-3 ВОПРОСА ОТ КЛИЕНТОВ:

1. Как происходит передача документов?
→ Полностью онлайн через личный кабинет и Telegram

2. Что если не подойдёт?
→ Работаем без долгосрочных контрактов

3. Как быстро отвечаете?
→ В течение 2 часов, даже в выходные

СВЯЖИТЕСЬ С НАМИ:
📞 Позвонить: +7 (978) 998-72-22
💬 WhatsApp: https://wa.me/79789987222
✈️ Telegram: https://t.me/centr_reg

P.S. Если передумали, просто не отвечайте. Больше не будем беспокоить.

С уважением,
Команда Rahima Consulting
  `.trim();

  return { subject, html, text };
}

