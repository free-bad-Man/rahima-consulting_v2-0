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
  Quote,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Отзывы клиентов | Rahima Consulting",
  description:
    "Отзывы клиентов Rahima Consulting по бухгалтерии, налогам, регистрации бизнеса, юридическому сопровождению, СЭЗ, субсидиям и автоматизации.",
  openGraph: {
    title: "Отзывы клиентов | Rahima Consulting",
    description:
      "Отзывы клиентов Rahima Consulting по ключевым направлениям работы компании: бухгалтерия, право, СЭЗ, субсидии и автоматизация бизнеса.",
    type: "website",
  },
};

function getDirectionLabel(category: string) {
  const normalized = category.toLowerCase();

  if (normalized.includes("бух")) return "Бухгалтерия";
  if (normalized.includes("нал")) return "Налоги и отчётность";
  if (normalized.includes("сэз")) return "СЭЗ";
  if (normalized.includes("субсид")) return "Субсидии";
  if (normalized.includes("автомат")) return "Автоматизация и ИИ";
  if (normalized.includes("crm")) return "Автоматизация и ИИ";
  if (normalized.includes("юрид")) return "Юридическое сопровождение";

  return category;
}

const REVIEW_POINTS = [
  "Клиентам важны не обещания, а понятный процесс работы и конкретный результат.",
  "Отзывы помогают увидеть, с какими задачами к нам приходят чаще всего и как выглядит итог работы.",
  "Этот раздел полезен тем, кто хочет не только посмотреть услуги, но и понять клиентский опыт по направлениям.",
  "Отзывы особенно важны в темах, где бизнесу нужен аккуратный порядок действий: бухгалтерия, налоги, право, СЭЗ, субсидии и автоматизация.",
];

const FAQ = [
  {
    question: "Что можно понять по отзывам?",
    answer:
      "По отзывам можно понять, с какими задачами чаще всего обращаются клиенты, как они оценивают процесс работы и какие результаты считают для себя важными.",
  },
  {
    question: "Связаны ли отзывы с реальными кейсами?",
    answer:
      "Да, многие отзывы связаны с конкретными кейсами. Поэтому из этого раздела можно сразу перейти к более подробному описанию похожей ситуации.",
  },
  {
    question: "Чем отзывы отличаются от кейсов?",
    answer:
      "Кейсы показывают структуру задачи, ход работы и результат. Отзывы передают клиентский взгляд: что было важно, как ощущался процесс и что дало сотрудничество на практике.",
  },
  {
    question: "Что делать, если я хочу не читать отзывы, а обсудить свою задачу?",
    answer:
      "В таком случае лучше сразу перейти в контакты или к расчёту стоимости, чтобы быстрее получить предметный следующий шаг.",
  },
];

export default function ReviewsPage() {
  const cases = getAllCases();

  const testimonials = cases.slice(0, 6).map((caseStudy) => ({
    slug: caseStudy.slug,
    author: caseStudy.testimonial.author,
    client: caseStudy.client,
    text: caseStudy.testimonial.text,
    category: getDirectionLabel(caseStudy.category),
    title: caseStudy.title,
  }));

  const uniqueDirections = Array.from(
    new Set(cases.map((caseStudy) => getDirectionLabel(caseStudy.category))),
  ).slice(0, 6);

  return (
    <div className="relative min-h-screen">
      <ShaderBackground />

      <div className="relative z-10">
        <PageHeader />

        <main className="px-4 pb-48 pt-24 sm:px-6 lg:px-12 md:pb-60 md:pt-32">
          <div className="mx-auto max-w-7xl">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Отзывы", href: "/reviews/" },
              ]}
            />

            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <ShieldCheck className="h-4 w-4 text-purple-300" />
                Отзывы клиентов по основным направлениям
              </div>

              <h1 className="gradient-text-purple-blue mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                Отзывы клиентов Rahima Consulting
              </h1>

              <p className="mx-auto max-w-4xl text-lg leading-8 text-white/80 md:text-xl">
                Здесь собран клиентский опыт по ключевым направлениям работы Rahima
                Consulting: бухгалтерия, налоги, регистрация бизнеса, юридическое
                сопровождение, СЭЗ, субсидии и автоматизация. Этот раздел помогает
                увидеть, с какими задачами к нам приходят, что особенно ценят клиенты и
                как выглядит результат работы на практике.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-2 flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-300" />
                  </div>
                  <div className="text-3xl font-bold text-white">{testimonials.length}+</div>
                  <div className="mt-2 text-sm text-white/60">
                    Отзывов и клиентских историй
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-2 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-300" />
                  </div>
                  <div className="text-3xl font-bold text-white">{uniqueDirections.length}</div>
                  <div className="mt-2 text-sm text-white/60">Основных направлений услуг</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-2 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">Практика</div>
                  <div className="mt-2 text-sm text-white/60">
                    Реальный клиентский опыт вместо абстрактных обещаний
                  </div>
                </div>
              </div>
            </GlassCard>

            <div className="mb-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {testimonials.map((item, index) => (
                <GlassCard
                  key={`${item.slug}-${index}`}
                  className="relative h-full"
                  animationDelay={100 + index * 50}
                >
                  <Quote className="absolute right-5 top-5 h-8 w-8 text-purple-300/20" />

                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-purple-300">
                    {item.category}
                  </div>

                  <p className="mb-5 italic leading-7 text-white/85">"{item.text}"</p>

                  <div className="border-t border-white/10 pt-4">
                    <div className="font-semibold text-white">{item.author}</div>
                    <div className="mt-1 text-sm text-white/55">{item.client}</div>
                    <div className="mt-3 text-sm text-white/45">{item.title}</div>
                  </div>

                  <div className="mt-5">
                    <Link
                      href={`/cases/${item.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-purple-300 transition-colors hover:text-purple-200"
                    >
                      Смотреть связанный кейс
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </GlassCard>
              ))}
            </div>

            <GlassCard className="mb-12" animationDelay={450}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Почему этот раздел полезен
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {REVIEW_POINTS.map((item) => (
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

            <GlassCard className="mb-12" animationDelay={520}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                По каким направлениям нас чаще всего оценивают
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {uniqueDirections.map((direction) => (
                  <div
                    key={direction}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="mb-3 text-lg font-semibold text-white">{direction}</div>
                    <div className="space-y-2 text-sm text-white/65">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                        <span>Понятный порядок работы и ясные шаги</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                        <span>Спокойная коммуникация без лишнего хаоса</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                        <span>Ощутимый результат в документах, процессах и контроле</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={580}>
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

            <GlassCard className="mb-12" animationDelay={640}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Куда перейти дальше
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Link
                  href="/cases/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="text-lg font-semibold text-white">Кейсы</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Посмотреть реальные сценарии: задача, действия и результат.
                  </div>
                </Link>

                <Link
                  href="/services/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="text-lg font-semibold text-white">Услуги</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Выбрать нужное направление для своей бизнес-задачи.
                  </div>
                </Link>

                <Link
                  href="/about/team/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="text-lg font-semibold text-white">Команда</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Посмотреть, по каким направлениям работает Rahima Consulting.
                  </div>
                </Link>

                <Link
                  href="/contacts/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="text-lg font-semibold text-white">Контакты</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Связаться с нами и обсудить свою ситуацию в удобном формате.
                  </div>
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="text-center" animationDelay={700}>
              <h2 className="mb-4 text-3xl font-bold text-white">
                Хотите такой же понятный результат по своей задаче?
              </h2>

              <p className="mx-auto mb-6 max-w-3xl text-white/80">
                Опишите ситуацию, и мы поможем понять, какие шаги нужны, какие документы
                стоит подготовить и какой формат работы будет самым уместным именно для
                вашего бизнеса.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contacts/"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-semibold text-white transition-all hover:scale-[1.02] hover:from-purple-700 hover:to-blue-700"
                >
                  Связаться с нами
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/calculator"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/15"
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