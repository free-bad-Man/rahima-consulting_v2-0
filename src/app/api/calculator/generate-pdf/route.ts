import { NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, entityType, taxSystem, employees, operations, hasNDS, hasVED, result } = body;

    // Создаём PDF
    const doc = new jsPDF();
    let yPos = 20;

    // Заголовок
    doc.setFontSize(20);
    doc.text('Расчёт стоимости услуг', 105, yPos, { align: 'center' });
    yPos += 10;

    doc.setFontSize(12);
    doc.text('Rahima Consulting', 105, yPos, { align: 'center' });
    yPos += 15;

    // Информация о клиенте
    doc.setFontSize(14);
    doc.text('Информация о клиенте:', 14, yPos);
    yPos += 8;

    doc.setFontSize(10);
    if (name) {
      doc.text(`Имя: ${name}`, 14, yPos);
      yPos += 6;
    }
    if (phone) {
      doc.text(`Телефон: ${phone}`, 14, yPos);
      yPos += 6;
    }
    if (email) {
      doc.text(`Email: ${email}`, 14, yPos);
      yPos += 6;
    }
    if (entityType) {
      doc.text(`Тип бизнеса: ${entityType === 'IP' ? 'ИП' : 'ООО'}`, 14, yPos);
      yPos += 6;
    }
    if (taxSystem) {
      const taxNames: Record<string, string> = {
        USN_6: 'УСН 6%',
        USN_15: 'УСН 15%',
        OSNO: 'ОСНО',
        PATENT: 'Патент',
      };
      doc.text(`Система налогообложения: ${taxNames[taxSystem] || taxSystem}`, 14, yPos);
      yPos += 6;
    }
    if (employees > 0) {
      doc.text(`Количество сотрудников: ${employees}`, 14, yPos);
      yPos += 6;
    }
    if (operations > 0) {
      doc.text(`Операций в месяц: ${operations}`, 14, yPos);
      yPos += 6;
    }
    if (hasNDS) {
      doc.text('С НДС: Да', 14, yPos);
      yPos += 6;
    }
    if (hasVED) {
      doc.text('ВЭД: Да', 14, yPos);
      yPos += 6;
    }

    yPos += 5;

    // Детализация
    doc.setFontSize(14);
    doc.text('Детализация услуг:', 14, yPos);
    yPos += 8;

    doc.setFontSize(10);
    result.breakdown.forEach((category: any) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(12);
      doc.text(category.category, 14, yPos);
      yPos += 6;

      doc.setFontSize(10);
      category.items.forEach((item: any) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }

        const itemText = `  • ${item.name}: ${item.price.toLocaleString('ru-RU')} руб.${item.type === 'monthly' ? '/мес' : ''}`;
        doc.text(itemText, 14, yPos);
        yPos += 5;
      });

      yPos += 3;
    });

    // Итоги
    yPos += 5;
    doc.setFontSize(14);
    doc.text('Итого:', 14, yPos);
    yPos += 8;

    doc.setFontSize(12);
    if (result.oneTime > 0) {
      doc.text(`Разовые платежи: ${result.oneTime.toLocaleString('ru-RU')} руб.`, 14, yPos);
      yPos += 7;
    }
    if (result.monthly > 0) {
      doc.text(`Ежемесячные платежи: ${result.monthly.toLocaleString('ru-RU')} руб./мес`, 14, yPos);
      yPos += 7;
    }

    const yearly = result.monthly * 12 + result.oneTime;
    doc.setFontSize(14);
    doc.text(`Годовая стоимость: ${yearly.toLocaleString('ru-RU')} руб.`, 14, yPos);

    // Футер
    doc.setFontSize(8);
    doc.text('Rahima Consulting', 14, 285);
    doc.text('Email: info@rahima-consulting.ru', 14, 289);
    doc.text('Телефон: +7 (978) 998-72-22', 80, 289);

    // Генерируем PDF
    const pdfBuffer = doc.output('arraybuffer');

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Расчёт_Rahima_Consulting.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}

