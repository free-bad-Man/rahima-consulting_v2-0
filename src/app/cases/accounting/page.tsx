import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import { getAllCases } from "@/lib/cases-data";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  FileText,
  Quote,
  ShieldCheck,
  Star,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Кейсы по бухгалтерии | Rahima Consulting",
  description:
    "Кейсы по бухгалтерскому сопровождению, восстановлению учёта, отчётности и разовым бухгалтерским задачам для бизнеса.",
  openGraph: {
    title: "Кейсы по бухгалтерии | Rahima Consulting",
    description:
      "Практические кейсы по бухгалтерии: ситуация, действия, результат и полезные выводы для бизнеса.",
    type: "website",
  },
};

function normalizeText(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function isAccountingCase(caseStudy: ReturnType<typeof getAllCases>[number]) {
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
    "бух",
    "налог",
    "отчет",
    "отчёт",
    "декларац",
    "учет",
    "учёт",
    "ифнс",
    "енс",
    "account",
    "tax",
    "bookkeep",
  ];

  return keywords.some((keyword) => haystack.includes(keyword));
}

function getAccountingCases() {
  const allCases = getAllCases();
  const filtered = allCases.filter(isAccountingCase);

  if (filtered.length > 0) {
    return filtered;
  }

  return allCases.slice(0, 4);
}

const SITUATIONS = [
  "Нужно передать бухгалтерию на сопровождение без потери порядка в документах и сроках.",
  "Есть отчётность, требования ИФНС, вопросы по ЕНС или накопившиеся ошибки по прошлым периодам.",
  "Нужно восстановить учёт и понять, что реально происходит в документах и обязательствах компании.",
  "Нужна точечная бухгалтерская помощь: декларация, сверка, закрытие периода или срочная разовая задача.",
];

const WHY_CASES_HELP = [
  "Кейсы показывают, как похожие бухгалтерские задачи решаются на практике, а не только в теории.",
  "По ним проще понять, какие документы, сроки и действия оказываются ключевыми.",
  "Они помогают быстрее оценить сложность задачи и подготовиться к разговору со специалистом.",
  "Кейсы полезны и для первой оценки ситуации, и для выбора более подходящего формата работы.",
];

const FAQ = [
  {
    question: "Что можно понять из кейсов по бухгалтерии?",
    answer:
      "Из кейсов можно понять, какие задачи чаще всего возникают, как обычно выстраивается работа и какие результаты бизнес получает после наведения порядка в бухгалтерии.",
  },
  {
    question: "Подходит ли этот раздел тем, у кого бухгалтерская проблема только появилась?",
    answer:
      "Да. Кейсы помогают быстро сопоставить свою ситуацию с похожими примерами и понять, насколько задача срочная и объёмная.",
  },
  {
    question: "Можно ли по кейсу понять, нужен ли мне полный аутсорсинг или разовая помощь?",
    answer:
      "Да, кейсы помогают увидеть разницу между регулярным сопровождением, восстановлением учёта и точечными бухгалтерскими задачами.",
  },
  {
    question: "Что делать, если вопрос срочный?",
    answer:
      "Если сроки уже поджимают, лучше не ограничиваться чтением кейсов, а сразу связаться с нами и описать задачу. Это поможет быстрее получить понятный порядок действий.",
  },
];

export default function AccountingCasesPage() {
  const accountingCases = getAccountingCases();
  const featuredTestimonials = accountingCases.slice(0, 4);

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
                { label: "Бухгалтерия", href: "/cases/accounting/" },
              ]}
            />

            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <Calculator className="h-4 w-4 text-purple-300" />
                Кейсы по бухгалтерии
              </div>

              <h1 className="gradient-text-purple-blue mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                Кейсы по бухгалтерскому сопровождению
              </h1>

              <p className="mx-auto max-w-4xl text-lg leading-8 text-white/80 md:text-xl">
                В этом разделе собраны кейсы по бухгалтерии: сопровождение ИП и ООО,
                отчётность, восстановление учёта, разовые задачи и рабочие ситуации, где
                бизнесу важно не просто получить общий совет, а понять, как именно
                выстраивается решение и к какому результату оно приводит.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <TrendingUp className="mx-auto mb-3 h-6 w-6 text-purple-300" />
                  <div className="text-3xl font-bold text-white">{accountingCases.length}+</div>
                  <div className="mt-2 text-sm text-white/60">
                    Бухгалтерских кейсов и типовых сценариев
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-blue-300" />
                  <div className="text-3xl font-bold text-white">Практика</div>
                  <div className="mt-2 text-sm text-white/60">
                    Реальные примеры работы, а не абстрактные обещания
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <FileText className="mx-auto mb-3 h-6 w-6 text-green-400" />
                  <div className="text-3xl font-bold text-white">Понятно</div>
                  <div className="mt-2 text-sm text-white/60">
                    С фокусом на документы, действия и результат для бизнеса
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={80}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                С какими бухгалтерскими задачами сюда обычно приходят
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
              {accountingCases.map((caseStudy, index) => (
                <Link
                  key={caseStudy.slug}
                  href={`/cases/${caseStudy.slug}`}
                  className="group block"
                >
                  <GlassCard className="flex h-full flex-col" animationDelay={120 + index * 50}>
                    <div className="mb-3 inline-flex items-center gap-2 text-sm text-purple-300">
                      <TrendingUp className="h-4 w-4" />
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
                Почему кейсы полезны ещё до старта работы
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
                Нужна помощь по бухгалтерской задаче?
              </h2>
              <p className="mx-auto mb-6 max-w-3xl leading-7 text-white/80">
                Опишите ситуацию, и мы поможем понять, какие документы проверить, что
                нужно сделать в первую очередь и какой формат бухгалтерской помощи будет
                наиболее уместным именно для вашего бизнеса.
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