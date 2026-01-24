import jsPDF from 'jspdf';

interface CalculationData {
  id: string;
  businessType: string;
  taxSystem: string;
  employeesCount: number;
  hasNDS: boolean;
  hasVED: boolean;
  operationsCount: number;
  services: any[];
  surcharges: any;
  breakdown: any;
  totalMonthly: number;
  totalOneTime: number;
  totalYearly: number;
  createdAt: string;
}

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  IP: "ИП",
  OOO: "ООО",
};

const TAX_SYSTEM_LABELS: Record<string, string> = {
  USN_6: "УСН 6%",
  USN_15: "УСН 15%",
  OSNO: "ОСНО",
  PATENT: "Патент",
};

export function generateCalculationPDF(calculation: CalculationData): jsPDF {
  const doc = new jsPDF();
  let y = 20;

  // Заголовок
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Расчет стоимости услуг', 105, y, { align: 'center' });
  y += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Rahima Consulting', 105, y, { align: 'center' });
  y += 5;
  doc.text('rahima-consulting.ru', 105, y, { align: 'center' });
  y += 15;

  // Дата создания
  doc.setFontSize(9);
  doc.setTextColor(100);
  const date = new Date(calculation.createdAt).toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  doc.text(`Дата расчёта: ${date}`, 20, y);
  doc.text(`ID: ${calculation.id}`, 150, y);
  y += 15;

  // Параметры бизнеса
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text('Параметры бизнеса', 20, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Тип бизнеса: ${BUSINESS_TYPE_LABELS[calculation.businessType]}`, 25, y);
  y += 6;
  doc.text(`Система налогообложения: ${TAX_SYSTEM_LABELS[calculation.taxSystem]}`, 25, y);
  y += 6;
  
  if (calculation.employeesCount > 0) {
    doc.text(`Количество сотрудников: ${calculation.employeesCount}`, 25, y);
    y += 6;
  }

  if (calculation.operationsCount > 0) {
    doc.text(`Операций в месяц: ${calculation.operationsCount}`, 25, y);
    y += 6;
  }

  if (calculation.hasNDS) {
    doc.text('✓ Работа с НДС', 25, y);
    y += 6;
  }

  if (calculation.hasVED) {
    doc.text('✓ Внешнеэкономическая деятельность', 25, y);
    y += 6;
  }

  y += 8;

  // Итоговая стоимость
  doc.setFillColor(240, 240, 255);
  doc.rect(15, y - 5, 180, 30, 'F');
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Итоговая стоимость', 20, y);
  y += 10;

  doc.setFontSize(18);
  doc.setTextColor(128, 0, 128);
  doc.text(`${calculation.totalMonthly.toLocaleString('ru-RU')} ₽/мес`, 25, y);
  y += 8;

  if (calculation.totalOneTime > 0) {
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Разовые платежи: ${calculation.totalOneTime.toLocaleString('ru-RU')} ₽`, 25, y);
    y += 6;
  }

  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(`В год: ${calculation.totalYearly.toLocaleString('ru-RU')} ₽`, 25, y);
  y += 15;

  // Выбранные услуги
  if (calculation.services && calculation.services.length > 0) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0);
    doc.text('Выбранные услуги', 20, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    calculation.services.forEach((service: any) => {
      // Проверка на новую страницу
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.setFont('helvetica', 'bold');
      doc.text(`• ${service.name}`, 25, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      if (service.monthly > 0) {
        doc.text(`  ${service.monthly.toLocaleString('ru-RU')} ₽/мес`, 30, y);
        y += 5;
      }
      if (service.oneTime > 0) {
        doc.text(`  ${service.oneTime.toLocaleString('ru-RU')} ₽ разово`, 30, y);
        y += 5;
      }
      if (service.description) {
        const lines = doc.splitTextToSize(service.description, 150);
        lines.forEach((line: string) => {
          if (y > 270) {
            doc.addPage();
            y = 20;
          }
          doc.setTextColor(100);
          doc.text(`  ${line}`, 30, y);
          y += 5;
        });
        doc.setTextColor(0);
      }
      y += 3;
    });

    y += 5;
  }

  // Надбавки
  if (calculation.surcharges && Object.keys(calculation.surcharges).length > 0) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Надбавки', 20, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    Object.entries(calculation.surcharges).forEach(([key, value]: [string, any]) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      const amount = value.amount 
        ? `${value.amount.toLocaleString('ru-RU')} ₽` 
        : value.percentage;
      doc.text(`• ${value.name}: ${amount}`, 25, y);
      y += 6;
    });

    y += 5;
  }

  // Контактная информация
  if (y > 240) {
    doc.addPage();
    y = 20;
  }

  doc.setFillColor(250, 250, 250);
  doc.rect(15, y - 5, 180, 35, 'F');

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Готовы начать?', 20, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Оставьте заявку на сайте rahima-consulting.ru', 20, y);
  y += 6;
  doc.text('или свяжитесь с нами любым удобным способом:', 20, y);
  y += 6;
  doc.text('• Телефон: +7 (XXX) XXX-XX-XX', 20, y);
  y += 6;
  doc.text('• Email: info@rahima-consulting.ru', 20, y);

  return doc;
}

export function downloadCalculationPDF(calculation: CalculationData, filename?: string) {
  const doc = generateCalculationPDF(calculation);
  const pdfFilename = filename || `расчет-${calculation.id}.pdf`;
  doc.save(pdfFilename);
}

