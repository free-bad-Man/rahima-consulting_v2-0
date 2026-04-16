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
    "Кейсы по автоматизации бизнеса: CRM, интеграции, n8n, сайт и CRM, аналитика продаж и внедрение ИИ в рабочие процессы компании.",
  openGraph: {
    title: "Кейсы по автоматизации и ИИ | Rahima Consulting",
    description:
      "Практические кейсы по автоматизации бизнеса, CRM, интеграциям и ИИ: ситуация, действия и результат.",
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

const SITUATIONS = [
  "Лиды приходят из нескольких каналов, но часть заявок теряется по дороге в CRM или между сотрудниками.",
  "CRM уже внедрена, но не даёт руководителю ясной картины по продажам, задачам и качеству обработки обращений.",
  "Нужно связать сайт, CRM, телефонию, мессенджеры, аналитику и внутренние процессы в одну рабочую систему.",
  "Есть ощущение, что продажи проседают, но непонятно, где именно проблема: в данных, в процессе, в менеджерах или в передаче лидов.",
];

const WHY_CASES_HELP = [
  "Кейсы показывают, как реальные проблемы в продажах и процессах решаются на практике, а не в теории.",
  "По ним проще понять, нужен ли бизнесу CRM, интеграция, автоматизация, n8n или более глубокая аналитика.",
  "Они помогают увидеть, какие точки потери чаще всего мешают росту: лиды, передача данных, контроль менеджеров или ручные действия.",
  "Кейсы полезны и тем, кто только планирует внедрение, и тем, у кого система уже есть, но не даёт нужного результата.",
];

const FAQ = [
  {
    question: "Что можно понять из кейсов по автоматизации?",
    answer:
      "Из кейсов можно понять, с какими проблемами бизнес чаще всего сталкивается в CRM, интеграциях, продажах и автоматизации, и какие решения реально работают.",
  },
  {
    question: "Подходит ли этот раздел тем, у кого CRM ещё нет?",
    answer:
      "Да. Кейсы полезны и на старте, когда вы только выбираете, как выстроить процесс, и на этапе доработки уже существующей системы.",
  },
  {
    question: "Можно ли по кейсам понять, нужен ли мне ИИ?",
    answer:
      "Да, кейсы помогают увидеть, где ИИ действительно помогает в аналитике, контроле и автоматизации, а где проблему нужно сначала решить на уровне процессов и данных.",
  },
  {
    question: "Что делать, если нужно быстро понять, с чего начинать?",
    answer:
      "Лучше всего связаться с нами и кратко описать ситуацию. Так можно быстрее понять, какой формат работы будет уместнее: CRM, интеграции, автоматизация процессов или аналитика.",
  },
];

export default function AutomationCasesPage() {
  const automationCases = getAutomationCases();
  const featuredTestimonials = automationCases.slice(0, 4);

  return (
    <div className="relative min-h-screen">
      <ShaderBackground />

      <div className="relative z-10">
        <PageHeader />

        <main className="px-4 pb-48 pt-24 sm:px-6 md:pb-60 md:pt-32 lg:px-12">
          <div className="mx-auto max-w-7xl">
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

              <h1 className="gradient-text-purple-blue mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                Кейсы по автоматизации бизнеса
              </h1>

              <p className="mx-auto max-w-4xl text-lg leading-8 text-white/80 md:text-xl">
                В этом разделе собраны кейсы по CRM, интеграциям, маршруту сайт → CRM,
                n8n и аналитике продаж. Здесь показаны не абстрактные обещания, а
                реальные рабочие ситуации: где терялись лиды, какие процессы были
                выстроены, что изменилось после внедрения и какой результат получил
                бизнес.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <TrendingUp className="mx-auto mb-3 h-6 w-6 text-purple-300" />
                  <div className="text-3xl font-bold text-white">{automationCases.length}+</div>
                  <div className="mt-2 text-sm text-white/60">
                    Кейсов по автоматизации, CRM и ИИ
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Workflow className="mx-auto mb-3 h-6 w-6 text-blue-300" />
                  <div className="text-3xl font-bold text-white">Практика</div>
                  <div className="mt-2 text-sm text-white/60">
                    Контроль процессов, данных и продаж на реальных примерах
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-green-400" />
                  <div className="text-3xl font-bold text-white">Без иллюзий</div>
                  <div className="mt-2 text-sm text-white/60">
                    Только понятные сценарии, прозрачная логика и измеримый результат
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={80}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                С какими задачами сюда обычно приходят
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {SITUATIONS.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 leading-7 text-white/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="mb-12 grid gap-6 md:grid-cols-2">
              {automationCases.map((caseStudy, index) => (
                <Link
                  key={caseStudy.slug}
                  href={`/cases/${caseStudy.slug}`}
                  className="group block"
                >
                  <GlassCard className="flex h-full flex-col" animationDelay={120 + index * 50}>
                    <div className="mb-3 inline-flex items-center gap-2 text-sm text-purple-300">
                      <Bot className="h-4 w-4" />
                      <span>{caseStudy.category}</span>
                    </div>

                    <h3 className="mb-3 text-2xl font-bold text-white transition-colors group-hover:text-purple-300">
                      {caseStudy.title}
                    </h3>

                    <p className="mb-4 text-sm text-white/60">
                      <span className="font-semibold">Клиент:</span> {caseStudy.client}
                    </p>

                    <p className="mb-4 flex-grow text-white/70">
                      {caseStudy.challenge.length > 180
                        ? `${caseStudy.challenge.slice(0, 177)}...`
                        : caseStudy.challenge}
                    </p>

                    <div className="mb-4 space-y-2">
                      {caseStudy.results.slice(0, 2).map((result, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                          <span className="text-sm text-white/60">{result}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="text-sm text-white/50">Срок: {caseStudy.timeline}</span>
                      <div className="flex items-center font-medium text-purple-300 transition-colors group-hover:text-purple-200">
                        Подробнее
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>

            <GlassCard className="mb-12" animationDelay={220}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Почему кейсы полезны ещё до начала внедрения
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {WHY_CASES_HELP.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                    <span className="leading-7 text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="mb-12">
              <h2 className="mb-8 text-center text-3xl font-bold text-white">
                Что отмечают клиенты после внедрения
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                {featuredTestimonials.map((caseStudy, index) => (
                  <GlassCard
                    key={caseStudy.slug}
                    className="relative"
                    animationDelay={280 + index * 50}
                  >
                    <Quote className="absolute right-4 top-4 h-8 w-8 text-purple-300/20" />

                    <div className="mb-3 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <p className="mb-4 italic leading-7 text-white/80">
                      "{caseStudy.testimonial.text}"
                    </p>

                    <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                        <span className="text-sm font-bold text-white">
                          {caseStudy.testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {caseStudy.testimonial.author}
                        </p>
                        <p className="text-xs text-white/50">{caseStudy.client}</p>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>

            <GlassCard className="mb-12" animationDelay={420}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Частые вопросы
              </h2>

              <div className="space-y-4">
                {FAQ.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="mb-2 text-lg font-semibold text-white">{item.question}</div>
                    <div className="leading-7 text-white/75">{item.answer}</div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={500}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Куда перейти дальше
              </h2>

              <div className="grid gap-4 md:grid-cols-3">
                <Link
                  href="/automation-ai/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">
                    Автоматизация и ИИ
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Перейти в раздел CRM, интеграций, n8n и цифровых решений для бизнеса.
                  </div>
                </Link>

                <Link
                  href="/reviews/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Отзывы</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Посмотреть клиентский опыт и дополнительные подтверждения доверия.
                  </div>
                </Link>

                <Link
                  href="/contacts/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Контакты</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Связаться с нами и обсудить свою задачу в удобном формате.
                  </div>
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="text-center" animationDelay={580}>
              <h2 className="mb-4 text-3xl font-bold text-white">
                Нужен порядок в продажах, CRM и данных?
              </h2>
              <p className="mx-auto mb-6 max-w-3xl leading-7 text-white/80">
                Опишите ситуацию, и мы поможем понять, где теряются лиды, нужен ли
                аудит CRM, интеграция сайта, автоматизация процессов или более глубокая
                аналитика продаж.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contacts/"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-purple-500/50 transition-all duration-200 hover:scale-105 hover:from-purple-700 hover:to-blue-700"
                >
                  Связаться с нами
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/calculator"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/20"
                >
                  Рассчитать стоимость
                </Link>
              </div>
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  );
}