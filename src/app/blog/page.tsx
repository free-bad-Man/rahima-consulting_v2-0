import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  FileText,
  Landmark,
  Lightbulb,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Блог | Rahima Consulting",
  description:
    "Блог Rahima Consulting: практические разборы по бухгалтерии, налогам, регистрации, СЭЗ, субсидиям и автоматизации бизнеса.",
  openGraph: {
    title: "Блог | Rahima Consulting",
    description:
      "Полезные материалы и разборы для бизнеса: маршруты, сценарии и рабочие следующие шаги.",
    type: "website",
  },
};

const BLOG_DIRECTIONS = [
  {
    title: "Бухгалтерия",
    description:
      "Материалы по сопровождению, восстановлению учёта, отчётности и рабочим бухгалтерским сценариям.",
    href: "/services/accounting/",
    icon: Calculator,
  },
  {
    title: "Налоги и отчётность",
    description:
      "Разборы по декларациям, требованиям, камералкам, отчётным маршрутам и следующему шагу.",
    href: "/services/taxes-reporting/",
    icon: FileText,
  },
  {
    title: "СЭЗ и субсидии",
    description:
      "Пояснения по рабочим маршрутам, пакетам документов и логике следующего действия без опасных обещаний.",
    href: "/sez-subsidii/",
    icon: Landmark,
  },
  {
    title: "Автоматизация и ИИ",
    description:
      "CRM, сайт → CRM, интеграции, n8n и сценарии, где бизнесу нужен порядок, а не хаос.",
    href: "/automation-ai/",
    icon: Workflow,
  },
];

const FEATURED_MATERIALS = [
  {
    title: "Как понять, какой маршрут нужен бизнесу: услуга, кейс или заявка",
    description:
      "Базовый материал для сайта: как человеку быстрее выбрать правильный вход и не потеряться в разделах.",
    href: "/contacts/ask/",
    category: "Навигация по решению",
  },
  {
    title: "Когда бизнесу уже нужен бухгалтерский контур, а не разовая консультация",
    description:
      "Материал о том, как отличить единичную задачу от регулярного сопровождения и почему это важно для бизнеса.",
    href: "/services/accounting/",
    category: "Бухгалтерия",
  },
  {
    title: "Что делать, если налоговая задача выглядит запутанной",
    description:
      "Как не распыляться: сначала собрать ситуацию, документы и определить следующий шаг по налоговому сценарию.",
    href: "/services/taxes-reporting/",
    category: "Налоги и отчётность",
  },
  {
    title: "СЭЗ и субсидии: почему опасно начинать с обещаний вместо маршрута",
    description:
      "Разбор подхода: сначала сценарий, документы и условия, а потом уже конкретные действия по направлению.",
    href: "/sez-subsidii/",
    category: "СЭЗ / Субсидии",
  },
  {
    title: "Автоматизация без хаоса: когда бизнесу реально нужен CRM-контур",
    description:
      "Материал про то, как понять, что пора наводить порядок в лидах, процессах и маршруте данных.",
    href: "/automation-ai/",
    category: "Автоматизация и ИИ",
  },
  {
    title: "Отзывы, кейсы и статьи: зачем на сайте все три контура одновременно",
    description:
      "Пояснение, чем отличаются trust-страницы, кейсы и полезные статьи и как они работают вместе.",
    href: "/reviews/",
    category: "Контент и доверие",
  },
];

const BLOG_PRINCIPLES = [
  "Блог нужен не ради “новостей ради новостей”, а ради полезных разборов и следующего шага для клиента.",
  "Материалы должны поддерживать основные рабочие контуры сайта: услуги, кейсы, trust-страницы и заявку.",
  "Лучше меньше, но полезнее: одна сильная статья лучше десяти пустых SEO-заготовок.",
  "Каждый материал должен вести дальше в понятный маршрут, а не оставлять человека без действия.",
];

export default function BlogPage() {
  return (
    <div className="relative min-h-screen">
      <ShaderBackground />

      <div className="relative z-10">
        <PageHeader />

        <main className="pt-24 md:pt-32 pb-48 md:pb-60 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Блог", href: "/blog/" },
              ]}
            />

            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <BookOpen className="h-4 w-4 text-purple-300" />
                Полезные материалы
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-purple-blue">
                Блог Rahima Consulting
              </h1>

              <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-8">
                Здесь собираются не “дежурные статьи ради трафика”, а практические
                материалы, которые помогают бизнесу быстрее понять ситуацию, выбрать
                правильный маршрут и перейти к следующему шагу: в услугу, кейс,
                trust-раздел или заявку.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Lightbulb className="mx-auto mb-3 h-6 w-6 text-purple-300" />
                  <div className="text-2xl font-bold text-white">Практика</div>
                  <div className="mt-2 text-sm text-white/60">
                    Материалы про реальные рабочие сценарии
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <CheckCircle2 className="mx-auto mb-3 h-6 w-6 text-blue-300" />
                  <div className="text-2xl font-bold text-white">Маршрут</div>
                  <div className="mt-2 text-sm text-white/60">
                    Каждый материал должен вести к следующему шагу
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <BookOpen className="mx-auto mb-3 h-6 w-6 text-green-400" />
                  <div className="text-2xl font-bold text-white">Контент</div>
                  <div className="mt-2 text-sm text-white/60">
                    Без пустых текстов и случайных SEO-заготовок
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={100}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Основные направления материалов
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {BLOG_DIRECTIONS.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                    >
                      <div className="mb-3 flex items-center gap-2 text-purple-300">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <div className="text-sm leading-7 text-white/65">
                        {item.description}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={160}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Актуальные материалы и маршруты
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {FEATURED_MATERIALS.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                  >
                    <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-purple-300">
                      {item.category}
                    </div>
                    <div className="text-xl font-semibold text-white group-hover:text-purple-200 transition-colors">
                      {item.title}
                    </div>
                    <div className="mt-3 text-sm leading-7 text-white/65">
                      {item.description}
                    </div>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-purple-300 group-hover:text-purple-200 transition-colors">
                      Открыть материал
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={220}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Каким должен быть блог на этом сайте
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {BLOG_PRINCIPLES.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                    <span className="text-white/80 leading-7">{item}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={280}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Куда перейти дальше
              </h2>

              <div className="grid gap-4 md:grid-cols-4">
                <Link
                  href="/services/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Услуги</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Перейти в рабочие маршруты по направлениям.
                  </div>
                </Link>

                <Link
                  href="/cases/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Кейсы</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Посмотреть реальные сценарии и результаты.
                  </div>
                </Link>

                <Link
                  href="/reviews/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Отзывы</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Усилить trust-контур через клиентский опыт.
                  </div>
                </Link>

                <Link
                  href="/contacts/ask/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Оставить заявку</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Если уже нужна не статья, а следующий шаг по задаче.
                  </div>
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="text-center" animationDelay={340}>
              <h2 className="text-3xl font-bold text-white mb-4">
                Нужен материал под вашу реальную ситуацию?
              </h2>

              <p className="text-white/80 mb-6 max-w-3xl mx-auto leading-7">
                Тогда лучше не искать “статью наудачу”, а описать задачу. Так мы быстрее
                поймём, в какой рабочий маршрут вас вести дальше: в услугу, кейс,
                trust-раздел или сразу в заявку.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contacts/ask/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/50"
                >
                  Оставить заявку
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/services/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg text-white font-semibold hover:bg-white/20 border border-white/20 transform hover:scale-105 transition-all duration-200"
                >
                  Перейти в услуги
                </Link>
              </div>
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  );
}