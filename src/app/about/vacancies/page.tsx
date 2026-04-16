import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import {
  ArrowRight,
  BadgeDollarSign,
  BrainCircuit,
  Briefcase,
  Calculator,
  CheckCircle2,
  Code2,
  Scale,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Вакансии | Rahima Consulting",
  description:
    "Вакансии Rahima Consulting: бухгалтерия, право, продажи, автоматизация и ИИ. Расскажем, кого ищем, как проходит отклик и что важно для работы в команде.",
  openGraph: {
    title: "Вакансии | Rahima Consulting",
    description:
      "Открытые роли и кадровый резерв Rahima Consulting: направления, формат работы и понятный порядок отклика.",
    type: "website",
  },
};

const OPEN_ROLES = [
  {
    title: "Помощник юриста",
    description:
      "Поддержка по регистрационным и корпоративным задачам, работа с документами, проверка комплектов и сопровождение типовых юридических маршрутов.",
    icon: Scale,
  },
  {
    title: "Помощник бухгалтера",
    description:
      "Работа с первичными документами, отчётным контуром, сверками, базовыми бухгалтерскими задачами и подготовкой данных для сопровождения клиентов.",
    icon: Calculator,
  },
  {
    title: "Промпт-инженер",
    description:
      "Разработка и тестирование AI-сценариев, улучшение качества ответов, работа с логикой промптов и внутренних ассистентов компании.",
    icon: BrainCircuit,
  },
  {
    title: "Программист-интегратор",
    description:
      "Интеграции CRM, автоматизация процессов, маршруты данных, n8n и техническая сборка решений для бизнеса.",
    icon: Code2,
  },
  {
    title: "Менеджер по продажам",
    description:
      "Работа с входящими обращениями, первичная квалификация запроса, доведение клиента до понятного следующего шага и сопровождение в воронке.",
    icon: BadgeDollarSign,
  },
];

const HIRING_PRINCIPLES = [
  "Нам важны системность, аккуратность в работе с документами и уважение к срокам.",
  "Мы ценим ясную коммуникацию, инициативность и умение доводить задачу до результата.",
  "Если активной вакансии по вашему профилю сейчас нет, сильный кандидат может попасть в кадровый резерв.",
  "Мы ищем не “человека на всё”, а специалиста, который силён в своём направлении и готов расти в команде.",
];

const HOW_TO_APPLY = [
  "Вы оставляете отклик и коротко описываете опыт, направление и формат работы, который вам интересен.",
  "Мы смотрим, есть ли совпадение по роли, задачам и текущим приоритетам команды.",
  "Если профиль подходит, возвращаемся с ближайшим следующим шагом: созвон, тестовое задание или интервью.",
  "Если совпадение не моментальное, но профиль сильный, сохраняем контакт в кадровом резерве.",
];

const WHAT_WE_VALUE = [
  "Умение работать не только быстро, но и внимательно.",
  "Спокойное отношение к сложным задачам и меняющимся вводным.",
  "Готовность учиться, разбираться в новых инструментах и держать качество результата.",
  "Понимание, что хорошая работа — это не шум, а порядок, ясность и надёжность.",
];

export default function AboutVacanciesPage() {
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
                { label: "О компании", href: "/about/" },
                { label: "Вакансии", href: "/about/vacancies/" },
              ]}
            />

            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <Briefcase className="h-4 w-4 text-purple-300" />
                Открытые роли и кадровый резерв
              </div>

              <h1 className="gradient-text-purple-blue mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                Вакансии Rahima Consulting
              </h1>

              <p className="mx-auto max-w-4xl text-lg leading-8 text-white/80 md:text-xl">
                Мы растём как команда сопровождения бизнеса и цифровых решений. На этой
                странице собраны направления, по которым мы ищем специалистов, а также
                понятный порядок отклика. Даже если ваша роль не открыта прямо сейчас,
                сильный профиль может попасть в кадровый резерв.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Users className="mx-auto mb-3 h-6 w-6 text-purple-300" />
                  <div className="text-2xl font-bold text-white">5 ролей</div>
                  <div className="mt-2 text-sm text-white/60">
                    По текущим приоритетным направлениям
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-blue-300" />
                  <div className="text-2xl font-bold text-white">Прозрачно</div>
                  <div className="mt-2 text-sm text-white/60">
                    Без случайных обещаний и расплывчатых формулировок
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Workflow className="mx-auto mb-3 h-6 w-6 text-green-400" />
                  <div className="text-2xl font-bold text-white">1 маршрут</div>
                  <div className="mt-2 text-sm text-white/60">
                    Отклик → разбор профиля → следующий шаг
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={100}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                По каким ролям мы смотрим кандидатов
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {OPEN_ROLES.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5"
                    >
                      <div className="mb-3 flex items-center gap-2 text-purple-300">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </div>

                      <div className="text-sm leading-7 text-white/70">{item.description}</div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={160}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Что для нас важно в работе
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {HIRING_PRINCIPLES.map((item) => (
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
                Как проходит отклик
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {HOW_TO_APPLY.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 font-semibold text-white">
                      {index + 1}
                    </div>
                    <div className="leading-7 text-white/80">{step}</div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={280}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Кого нам особенно комфортно брать в работу
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {WHAT_WE_VALUE.map((item) => (
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

            <GlassCard className="mb-12" animationDelay={340}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Куда перейти дальше
              </h2>

              <div className="grid gap-4 md:grid-cols-3">
                <Link
                  href="/about/team/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Команда</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Посмотреть, по каким направлениям работает Rahima Consulting.
                  </div>
                </Link>

                <Link
                  href="/about/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">О компании</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Понять, чем занимается компания и как устроен подход к работе.
                  </div>
                </Link>

                <Link
                  href="/contacts/ask/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Откликнуться</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Оставить информацию о себе и получить следующий шаг по отклику.
                  </div>
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="text-center" animationDelay={400}>
              <h2 className="mb-4 text-3xl font-bold text-white">
                Хотите откликнуться на роль или попасть в кадровый резерв?
              </h2>

              <p className="mx-auto mb-6 max-w-3xl leading-7 text-white/80">
                Напишите, чем вы занимаетесь, в каком направлении сильны и какой формат
                работы вам подходит. Так мы быстрее поймём, есть ли совпадение по роли
                и какой следующий шаг предложить.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contacts/ask/"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-purple-500/50 transition-all duration-200 hover:scale-105 hover:from-purple-700 hover:to-blue-700"
                >
                  Оставить отклик
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/about/team/"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/20"
                >
                  Посмотреть команду
                </Link>
              </div>
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  );
}