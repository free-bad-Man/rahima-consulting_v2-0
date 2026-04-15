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
    "Кейсы по бухгалтерскому сопровождению, восстановлению учёта, отчётности и разовым бухгалтерским задачам.",
  openGraph: {
    title: "Кейсы по бухгалтерии | Rahima Consulting",
    description:
      "Каталог бухгалтерских кейсов и типовых рабочих сценариев: ситуация, действия и результат.",
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
    "ифи",
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

export default function AccountingCasesPage() {
  const accountingCases = getAccountingCases();
  const featuredTestimonials = accountingCases.slice(0, 4);

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
                { label: "Бухгалтерия", href: "/cases/accounting/" },
              ]}
            />

            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <Calculator className="h-4 w-4 text-purple-300" />
                Кейсы по бухгалтерии
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-purple-blue">
                Кейсы по бухгалтерскому сопровождению
              </h1>

              <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-8">
                Это отдельный каталог кейсов по бухгалтерии: сопровождение ООО и ИП,
                отчётность, восстановление учёта, разовые задачи и рабочие сценарии
                “ситуация → что сделали → что получил клиент → результат”.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <TrendingUp className="mx-auto mb-3 h-6 w-6 text-purple-300" />
                  <div className="text-3xl font-bold text-white">{accountingCases.length}+</div>
                  <div className="mt-2 text-sm text-white/60">Бухгалтерских кейсов и сценариев</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-blue-300" />
                  <div className="text-3xl font-bold text-white">1</div>
                  <div className="mt-2 text-sm text-white/60">
                    Главный маршрут: из кейса в услугу и дальше в заявку
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <FileText className="mx-auto mb-3 h-6 w-6 text-green-400" />
                  <div className="text-3xl font-bold text-white">HTML</div>
                  <div className="mt-2 text-sm text-white/60">
                    Полезный контент без фейковых обещаний и лишней воды
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={80}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                С какими бухгалтерскими задачами сюда обычно приходят
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                  "Нужно передать бухгалтерию на сопровождение без хаоса и потери периода.",
                  "Есть отчётность, требования ИФНС, ЕНС или хвосты по прошлым периодам.",
                  "Нужно восстановить учёт, собрать документы и понять реальную картину.",
                  "Нужна точечная помощь: декларация, сверка, разовая задача или срочный маршрут.",
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
              {accountingCases.map((caseStudy, index) => (
                <Link
                  key={caseStudy.slug}
                  href={`/cases/${caseStudy.slug}`}
                  className="block group"
                >
                  <GlassCard className="h-full flex flex-col" animationDelay={120 + index * 50}>
                    <div className="inline-flex items-center gap-2 text-sm text-purple-300 mb-3">
                      <TrendingUp className="w-4 h-4" />
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
                Что чаще всего отмечают клиенты
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
                  href="/services/accounting/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">
                    Услуги по бухгалтерии
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Хаб бухгалтерских услуг: сопровождение, восстановление, отчётность и разовые задачи.
                  </div>
                </Link>

                <Link
                  href="/contacts/remote/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Удалённо по РФ</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Как организована работа с документами, сроками и контролем без офлайн-встреч.
                  </div>
                </Link>

                <Link
                  href="/contacts/simferopol/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Офис в Симферополе</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Контакты офиса, локальный контур и очный формат работы.
                  </div>
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="text-center" animationDelay={520}>
              <h2 className="text-3xl font-bold text-white mb-4">
                Нужен похожий маршрут по вашей бухгалтерской задаче?
              </h2>
              <p className="text-white/80 mb-6 max-w-3xl mx-auto leading-7">
                Опишите ситуацию, и мы вернёмся с понятным следующим шагом:
                что проверить, какие документы нужны и в какой бухгалтерский сценарий
                вам идти дальше.
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
                  href="/services/accounting/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg text-white font-semibold hover:bg-white/20 border border-white/20 transform hover:scale-105 transition-all duration-200"
                >
                  Перейти в бухгалтерские услуги
                </Link>
              </div>
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  );
}