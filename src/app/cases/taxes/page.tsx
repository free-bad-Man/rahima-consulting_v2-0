import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import { getAllCases } from "@/lib/cases-data";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Quote,
  Receipt,
  ShieldCheck,
  Star,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Кейсы по налогам и отчётности | Rahima Consulting",
  description:
    "Кейсы по налогам и отчётности: декларации, требования ИФНС, сверки, камеральные проверки и практические примеры решения налоговых задач бизнеса.",
  openGraph: {
    title: "Кейсы по налогам и отчётности | Rahima Consulting",
    description:
      "Практические кейсы по налогам и отчётности: ситуация, действия, результат и полезные выводы для бизнеса.",
    type: "website",
  },
};

function normalizeText(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function isTaxCase(caseStudy: ReturnType<typeof getAllCases>[number]) {
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
    "налог",
    "отчет",
    "отчёт",
    "декларац",
    "ифнс",
    "фнс",
    "камерал",
    "требован",
    "енс",
    "ндс",
    "ндфл",
    "усн",
    "tax",
    "declaration",
    "report",
  ];

  return keywords.some((keyword) => haystack.includes(keyword));
}

function getTaxCases() {
  const allCases = getAllCases();
  const filtered = allCases.filter(isTaxCase);

  if (filtered.length > 0) {
    return filtered;
  }

  return allCases.slice(0, 4);
}

const SITUATIONS = [
  "Нужно срочно разобраться с декларацией, отчётностью или сроками подачи документов.",
  "Пришло требование ИФНС, есть расхождения, вопросы по налогам или непонятно, что делать дальше.",
  "Нужна сверка, уточнённая декларация, корректировка данных или разбор уже накопившихся ошибок.",
  "Есть ощущение, что налоговые задачи ведутся хаотично, и нужен более понятный порядок работы.",
];

const WHY_CASES_HELP = [
  "Кейсы показывают, как похожие налоговые задачи решаются на практике, а не только в теории.",
  "По ним проще понять, какие документы обычно нужны и где чаще всего возникают ошибки.",
  "Они помогают оценить сложность ситуации ещё до начала работы со специалистом.",
  "Кейсы полезны и для первой ориентации, и для подготовки к более предметному обсуждению задачи.",
];

const FAQ = [
  {
    question: "Что можно понять из кейсов по налогам и отчётности?",
    answer:
      "Из кейсов можно понять, какие ситуации чаще всего возникают у бизнеса, какие шаги обычно требуются и какие документы важно проверить в первую очередь.",
  },
  {
    question: "Подойдёт ли этот раздел тем, у кого вопрос только появился?",
    answer:
      "Да. Кейсы помогают быстро сопоставить свою ситуацию с похожими примерами и понять, насколько задача срочная и сложная.",
  },
  {
    question: "Можно ли решить вопрос только по кейсам?",
    answer:
      "Кейсы помогают сориентироваться, но если вопрос связан со сроками, требованиями ИФНС, суммами или рисками, лучше обсудить его индивидуально.",
  },
  {
    question: "Что делать, если задача срочная?",
    answer:
      "Если времени мало, лучше не ограничиваться чтением кейсов, а сразу связаться с нами и описать ситуацию. Это поможет быстрее получить понятный следующий шаг.",
  },
];

export default function TaxCasesPage() {
  const taxCases = getTaxCases();
  const featuredTestimonials = taxCases.slice(0, 4);

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
                { label: "Налоги и отчётность", href: "/cases/taxes/" },
              ]}
            />

            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <Receipt className="h-4 w-4 text-purple-300" />
                Кейсы по налогам и отчётности
              </div>

              <h1 className="gradient-text-purple-blue mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                Кейсы по налоговым задачам
              </h1>

              <p className="mx-auto max-w-4xl text-lg leading-8 text-white/80 md:text-xl">
                В этом разделе собраны кейсы по налогам и отчётности: декларации,
                требования ИФНС, камеральные проверки, сверки, исправление ошибок и
                другие рабочие ситуации, в которых бизнесу важно быстро понять проблему,
                оценить риски и выбрать грамотный порядок действий.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <TrendingUp className="mx-auto mb-3 h-6 w-6 text-purple-300" />
                  <div className="text-3xl font-bold text-white">{taxCases.length}+</div>
                  <div className="mt-2 text-sm text-white/60">
                    Кейсов по налогам и отчётности
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-blue-300" />
                  <div className="text-3xl font-bold text-white">Практика</div>
                  <div className="mt-2 text-sm text-white/60">
                    Реальные ситуации бизнеса, а не общий пересказ правил
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <FileText className="mx-auto mb-3 h-6 w-6 text-green-400" />
                  <div className="text-3xl font-bold text-white">Понятно</div>
                  <div className="mt-2 text-sm text-white/60">
                    С акцентом на документы, порядок действий и полезные выводы
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={80}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Какие налоговые ситуации сюда обычно приводят
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
              {taxCases.map((caseStudy, index) => (
                <Link
                  key={caseStudy.slug}
                  href={`/cases/${caseStudy.slug}`}
                  className="group block"
                >
                  <GlassCard className="flex h-full flex-col" animationDelay={120 + index * 50}>
                    <div className="mb-3 inline-flex items-center gap-2 text-sm text-purple-300">
                      <Receipt className="h-4 w-4" />
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
                Почему кейсы полезны ещё до начала работы
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
                Что отмечают клиенты
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
                  href="/services"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Услуги</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Перейти к услугам и выбрать направление, связанное с вашей задачей.
                  </div>
                </Link>

                <Link
                  href="/reviews"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Отзывы</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Посмотреть клиентский опыт и дополнительные подтверждения доверия.
                  </div>
                </Link>

                <Link
                  href="/contacts"
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
                Нужна помощь по налоговой задаче?
              </h2>
              <p className="mx-auto mb-6 max-w-3xl leading-7 text-white/80">
                Опишите ситуацию, и мы поможем понять, какие документы проверить, что
                сделать в первую очередь и какой формат работы подойдёт именно для вашей
                задачи.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contacts"
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