import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Calculator,
  CheckCircle2,
  FileText,
  Landmark,
  Scale,
  ShieldCheck,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Блог Rahima Consulting: статьи для бизнеса, бухгалтерии и автоматизации",
  description:
    "Блог Rahima Consulting: практические статьи и разборы по бухгалтерии, налогам, регистрации бизнеса, юридическим вопросам, СЭЗ, субсидиям и автоматизации.",
  openGraph: {
    title: "Блог Rahima Consulting: статьи для бизнеса, бухгалтерии и автоматизации",
    description:
      "Полезные материалы для бизнеса: бухгалтерия, налоги, право, регистрация, СЭЗ, субсидии, CRM и автоматизация.",
    type: "website",
  },
};

const BLOG_TOPICS = [
  {
    title: "Бухгалтерия и отчётность",
    description:
      "Статьи о ведении бухгалтерии, сдаче отчётности, восстановлении учёта и регулярном сопровождении бизнеса.",
    href: "/cases/accounting/",
    icon: Calculator,
  },
  {
    title: "Налоги и отчётность",
    description:
      "Разборы по налоговым декларациям, требованиям налоговой, проверкам и типовым вопросам предпринимателей.",
    href: "/cases/taxes/",
    icon: FileText,
  },
  {
    title: "Регистрация и изменения",
    description:
      "Материалы по регистрации ИП и ООО, сменам в ЕГРЮЛ, юридическому адресу и другим корпоративным изменениям.",
    href: "/services",
    icon: Briefcase,
  },
  {
    title: "Юридические вопросы бизнеса",
    description:
      "Публикации о договорах, корпоративных документах, сопровождении сделок и рабочих юридических сценариях.",
    href: "/services",
    icon: Scale,
  },
  {
    title: "СЭЗ и субсидии",
    description:
      "Практические разборы по свободной экономической зоне, сопровождению резидентов, субсидиям и отчётности.",
    href: "/cases/sez/",
    icon: Landmark,
  },
  {
    title: "Автоматизация и ИИ",
    description:
      "Материалы про CRM, интеграции, автоматизацию процессов, n8n и цифровые решения для бизнеса.",
    href: "/automation-ai/",
    icon: Workflow,
  },
];

const WHAT_YOU_GET = [
  "Понятные объяснения без лишней теории и перегруженного языка.",
  "Практические сценарии: что делать, с чего начать и каких ошибок избегать.",
  "Связку с реальными услугами, кейсами и контактами, если нужна помощь по задаче.",
  "Материалы, которые полезны и собственнику бизнеса, и бухгалтеру, и руководителю.",
];

const HOW_TO_USE_BLOG = [
  "Если вы пока только разбираетесь в ситуации, начните с блога и выберите близкую тему.",
  "Если задача уже понятна, переходите сразу в услуги или кейсы по нужному направлению.",
  "Если вопрос срочный и нужен не текст, а решение, лучше сразу связаться с нами.",
  "Если нужно понять стоимость, удобнее использовать калькулятор и затем обсудить детали.",
];

const FAQ = [
  {
    question: "Для кого этот блог?",
    answer:
      "Для собственников бизнеса, руководителей, бухгалтеров, юристов и предпринимателей, которым нужны понятные материалы по рабочим вопросам бизнеса.",
  },
  {
    question: "Какие темы здесь публикуются?",
    answer:
      "Бухгалтерия, налоги, регистрация бизнеса, юридические вопросы, СЭЗ, субсидии, CRM, автоматизация и цифровые решения.",
  },
  {
    question: "Можно ли решить задачу только по статье?",
    answer:
      "Иногда статья помогает понять ситуацию и сделать первый шаг. Но если вопрос связан с документами, сроками или рисками, лучше обсудить его с профильным специалистом.",
  },
  {
    question: "Куда перейти, если нужна практическая помощь?",
    answer:
      "В услуги, кейсы, контакты или калькулятор — в зависимости от того, что вам нужно сейчас: разобраться, посмотреть примеры или сразу начать работу.",
  },
];

export default function BlogPage() {
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
                { label: "Блог", href: "/blog/" },
              ]}
            />

            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <BookOpen className="h-4 w-4 text-purple-300" />
                Полезные статьи и разборы для бизнеса
              </div>

              <h1 className="gradient-text-purple-blue mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                Блог Rahima Consulting
              </h1>

              <p className="mx-auto max-w-4xl text-lg leading-8 text-white/80 md:text-xl">
                В блоге Rahima Consulting мы публикуем практические материалы для бизнеса:
                бухгалтерия, налоги, регистрация, юридическое сопровождение, СЭЗ,
                субсидии, CRM и автоматизация. Наша цель — помочь вам быстрее понять
                ситуацию, выбрать правильное направление и перейти к понятному следующему
                шагу.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <BookOpen className="mx-auto mb-3 h-6 w-6 text-purple-300" />
                  <div className="text-2xl font-bold text-white">Практично</div>
                  <div className="mt-2 text-sm text-white/60">
                    Материалы, которые помогают в реальной работе, а не просто заполняют страницу
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-blue-300" />
                  <div className="text-2xl font-bold text-white">Понятно</div>
                  <div className="mt-2 text-sm text-white/60">
                    Без перегруженного языка и случайных терминов
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <CheckCircle2 className="mx-auto mb-3 h-6 w-6 text-green-400" />
                  <div className="text-2xl font-bold text-white">По делу</div>
                  <div className="mt-2 text-sm text-white/60">
                    Каждая тема связана с реальными задачами бизнеса
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={100}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Основные темы блога
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {BLOG_TOPICS.map((item) => {
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

                      <div className="text-sm leading-7 text-white/70">{item.description}</div>
                    </Link>
                  );
                })}
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={160}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Что вы найдёте в блоге
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {WHAT_YOU_GET.map((item) => (
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

            <GlassCard className="mb-12" animationDelay={220}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Как лучше использовать этот раздел
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {HOW_TO_USE_BLOG.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 font-semibold text-white">
                      {index + 1}
                    </div>
                    <div className="leading-7 text-white/80">{item}</div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={280}>
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

            <GlassCard className="mb-12" animationDelay={340}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Куда перейти дальше
              </h2>

              <div className="grid gap-4 md:grid-cols-4">
                <Link
                  href="/services"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Услуги</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Перейти к услугам и выбрать нужное направление.
                  </div>
                </Link>

                <Link
                  href="/cases"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Кейсы</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Посмотреть примеры решений и типовые рабочие ситуации.
                  </div>
                </Link>

                <Link
                  href="/reviews"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Отзывы</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Изучить клиентский опыт и дополнительные подтверждения доверия.
                  </div>
                </Link>

                <Link
                  href="/contacts"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Контакты</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Связаться с нами, если нужна помощь не по статье, а по задаче.
                  </div>
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="text-center" animationDelay={400}>
              <h2 className="mb-4 text-3xl font-bold text-white">
                Нужна не статья, а решение по вашей ситуации?
              </h2>

              <p className="mx-auto mb-6 max-w-3xl leading-7 text-white/80">
                Если вопрос уже перешёл в практическую задачу, не тратьте время на поиск
                похожих текстов. Свяжитесь с нами напрямую или перейдите к расчёту
                стоимости — так вы быстрее получите понятный следующий шаг.
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
                  Перейти к калькулятору
                </Link>
              </div>
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  );
}