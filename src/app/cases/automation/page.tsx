import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import { getAllCases } from "@/lib/cases-data";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Cpu,
  Quote,
  ShieldCheck,
  Star,
  TrendingUp,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Кейсы по автоматизации и ИИ | Rahima Consulting",
  description:
    "Кейсы по CRM, интеграциям, n8n, сайту → CRM и ИИ-аналитике продаж.",
  openGraph: {
    title: "Кейсы по автоматизации и ИИ | Rahima Consulting",
    description:
      "Каталог кейсов по автоматизации бизнеса, CRM, интеграциям и ИИ-аналитике.",
    type: "website",
  },
};

function normalizeText(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function isAutomationCase(caseStudy: ReturnType<typeof getAllCases>[number]) {
  const haystack = normalizeText(
    [
      caseStudy.category,
      caseStudy.title,
      caseStudy.challenge,
      caseStudy.solution,
      caseStudy.client,
      ...(caseStudy.results || []),
      ...(caseStudy.tags || []),
    ]
      .filter(Boolean)
      .join(" "),
  );

  const keywords = [
    "автомат",
    "crm",
    "amo",
    "n8n",
    "интеграц",
    "воронк",
    "лид",
    "продаж",
    "ai",
    "ии",
    "бот",
    "site",
    "сайт",
    "аналит",
  ];

  return keywords.some((keyword) => haystack.includes(keyword));
}

function getAutomationCases() {
  const allCases = getAllCases();
  const filtered = allCases.filter(isAutomationCase);

  if (filtered.length > 0) {
    return filtered;
  }

  return allCases.slice(0, 4);
}

export default function AutomationCasesPage() {
  const automationCases = getAutomationCases();
  const featuredTestimonials = automationCases.slice(0, 4);

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
                { label: "Кейсы", href: "/cases/" },
                { label: "Автоматизация", href: "/cases/automation/" },
              ]}
            />

            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <Cpu className="h-4 w-4 text-purple-300" />
                Кейсы по автоматизации и ИИ
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-purple-blue">
                Кейсы по автоматизации бизнеса
              </h1>

              <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-8">
                Здесь собраны кейсы по CRM, маршруту сайт → CRM, интеграциям, n8n
                и ИИ-аналитике продаж. Это не обещания “магической автоматизации”,
                а реальные рабочие сценарии: где терялись лиды, что было настроено,
                как усилили контроль и какой результат получил бизнес.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <TrendingUp className="mx-auto mb-3 h-6 w-6 text-purple-300" />
                  <div className="text-3xl font-bold text-white">{automationCases.length}+</div>
                  <div className="mt-2 text-sm text-white/60">
                    Кейсов по автоматизации и CRM
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Workflow className="mx-auto mb-3 h-6 w-6 text-blue-300" />
                  <div className="text-3xl font-bold text-white">1</div>
                  <div className="mt-2 text-sm text-white/60">
                    Главный первый шаг — аудит маршрута и данных
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-green-400" />
                  <div className="text-3xl font-bold text-white">Без</div>
                  <div className="mt-2 text-sm text-white/60">
                    “магии”, только контролируемые сценарии и понятный результат
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={80}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Когда сюда обычно приходят
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                  "Лиды приходят из нескольких каналов, но часть теряется по дороге в CRM.",
                  "CRM уже стоит, но не даёт руководителю нормальной картины и контроля.",
                  "Нужно связать сайт, телефонию, мессенджеры, аналитику и данные в один контур.",
                  "Есть ощущение, что продажи проседают, но неясно, проблема в людях, процессе или данных.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/80 leading-7"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {automationCases.map((caseStudy, index) => (
                <Link
                  key={caseStudy.slug}
                  href={`/cases/${caseStudy.slug}`}
                  className="block group"
                >
                  <GlassCard className="h-full flex flex-col" animationDelay={120 + index * 50}>
                    <div className="inline-flex items-center gap-2 text-sm text-purple-300 mb-3">
                      <Bot className="w-4 h-4" />
                      <span>{caseStudy.category}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                      {caseStudy.title}
                    </h3>

                    <p className="text-white/60 text-sm mb-4">
                      <span className="font-semibold">Клиент:</span> {caseStudy.client}
                    </p>

                    <p className="text-white/70 mb-4 flex-grow">
                      {caseStudy.challenge.length > 180
                        ? `${caseStudy.challenge.slice(0, 177)}...`
                        : caseStudy.challenge}
                    </p>

                    <div className="mb-4 space-y-2">
                      {caseStudy.results.slice(0, 2).map((result, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/60 text-sm">{result}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-white/50 text-sm">Срок: {caseStudy.timeline}</span>
                      <div className="flex items-center text-purple-300 font-medium group-hover:text-purple-200 transition-colors">
                        Подробнее
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Что отмечают клиенты после внедрения
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {featuredTestimonials.map((caseStudy, index) => (
                  <GlassCard
                    key={caseStudy.slug}
                    className="relative"
                    animationDelay={220 + index * 50}
                  >
                    <Quote className="absolute top-4 right-4 w-8 h-8 text-purple-300/20" />

                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <p className="text-white/80 mb-4 italic leading-7">
                      "{caseStudy.testimonial.text}"
                    </p>

                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {caseStudy.testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {caseStudy.testimonial.author}
                        </p>
                        <p className="text-white/50 text-xs">{caseStudy.client}</p>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>

            <GlassCard className="mb-12" animationDelay={420}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Куда перейти дальше
              </h2>

              <div className="grid gap-4 md:grid-cols-3">
                <Link
                  href="/automation-ai/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">
                    Хаб автоматизации и ИИ
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    CRM, сайт → CRM, n8n, интеграции, ИИ-аналитика и выбор маршрута внедрения.
                  </div>
                </Link>

                <Link
                  href="/automation-ai/audit-plan/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">
                    Аудит и план внедрения
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Первый шаг, если спрос смешанный и нужно понять, с чего начинать.
                  </div>
                </Link>

                <Link
                  href="/reviews/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Отзывы</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Доверительный раздел по всем основным направлениям работы.
                  </div>
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="text-center" animationDelay={520}>
              <h2 className="text-3xl font-bold text-white mb-4">
                Нужен такой же порядок в продажах и данных?
              </h2>
              <p className="text-white/80 mb-6 max-w-3xl mx-auto leading-7">
                Опишите ситуацию, и мы вернёмся с маршрутом: что проверять сначала,
                где теряются лиды, нужен ли CRM-контур, интеграции, n8n или ИИ-аналитика.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/automation-ai/audit-plan/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/50"
                >
                  Перейти к аудиту
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/contacts/ask/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg text-white font-semibold hover:bg-white/20 border border-white/20 transform hover:scale-105 transition-all duration-200"
                >
                  Оставить заявку
                </Link>
              </div>
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  );
}