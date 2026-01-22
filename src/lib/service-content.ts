// Базовая структура контента для услуг (использует сгенерированные карточки в data/services)
import fs from "fs";
import path from "path";

export interface ServiceContent {
  subtitle: string;
  services: Array<{ icon?: string; title: string; description: string; price?: string }>;
  advantages: string[];
  process: Array<{ step: string; title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

type GeneratedService = {
  service_code?: string;
  title: string;
  slug: string;
  short_tagline?: string;
  price_display?: string;
  price_from?: number | null;
  currency?: string;
  packages?: Record<string, string>;
  duration_estimate?: string | null;
  includes?: string[];
  excludes?: string[];
  requirements?: string[];
  cta?: string;
  red_flags?: string[];
  tags?: string[];
  source_doc?: string;
  full_text?: string;
};

let generatedServices: GeneratedService[] = [];
try {
  const p = path.join(process.cwd(), "data", "services", "generated_services_normalized.json");
  if (fs.existsSync(p)) {
    generatedServices = JSON.parse(fs.readFileSync(p, "utf-8"));
  } else {
    const p2 = path.join(process.cwd(), "data", "services", "generated_services.json");
    if (fs.existsSync(p2)) generatedServices = JSON.parse(fs.readFileSync(p2, "utf-8"));
  }
} catch (e) {
  console.warn("Failed to load generated services:", e);
}

export const getServiceContent = (title: string): ServiceContent => {
  const found = generatedServices.find(
    (s) =>
      s.title === title ||
      s.slug === title.toString().toLowerCase().replace(/\s+/g, "-") ||
      (s.title && title && s.title.toLowerCase().includes(title.toLowerCase()))
  );

  if (found) {
    const base: ServiceContent = {
      subtitle: found.short_tagline || found.title,
      services: [],
      advantages: ["Опыт работы более 10 лет", "Команда квалифицированных специалистов"],
      process: [
        { step: "1", title: "Консультация и оценка", description: "Бесплатная консультация и оценка объема работ" },
        { step: "2", title: "Заключение договора", description: "Оформление договора и согласование условий" },
        { step: "3", title: "Выполнение", description: "Реализация работ по согласованному плану" },
      ],
      faqs: [],
    };

    if (Array.isArray(found.includes) && found.includes.length > 0) {
      base.services = found.includes.slice(0, 6).map((t: string) => ({ title: t, description: t }));
    } else if (found.short_tagline) {
      base.services = [{ title: found.short_tagline, description: found.short_tagline }];
    }

    return base;
  }

  return {
    subtitle: `Профессиональные услуги: ${title}`,
    services: [{ title: "Консультация", description: "Детальная консультация по услуге" }],
    advantages: ["Опыт работы более 10 лет", "Персональный менеджер"],
    process: [
      { step: "1", title: "Консультация", description: "Сбор информации и оценка" },
      { step: "2", title: "Согласование", description: "Согласование договора и сроков" },
      { step: "3", title: "Выполнение", description: "Реализация и сдача результата" },
    ],
    faqs: [],
  };
};








