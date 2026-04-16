import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Scale,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Команда | Rahima Consulting",
  description:
    "Команда Rahima Consulting: бухгалтерия, налоги, регистрация бизнеса, юридическое сопровождение, СЭЗ, субсидии и автоматизация. Показываем, как устроена работа и почему бизнесу удобно решать задачи с профильной командой.",
  openGraph: {
    title: "Команда | Rahima Consulting",
    description:
      "Кто работает в Rahima Consulting, по каким направлениям распределена экспертиза и как строится работа по задаче клиента.",
    type: "website",
  },
};

const TEAM_DIRECTIONS = [
  {
    title: "Бухгалтерия и отчётность",
    description:
      "Сопровождение бизнеса по бухгалтерии, регулярной отчётности, восстановлению учёта и разовым рабочим задачам.",
    icon: Briefcase,
  },
  {
    title: "Налоги и отчётность",
    description:
      "Декларации, требования налоговой, камеральные проверки, сверки и сопровождение задач, где важна аккуратность в деталях.",
    icon: CheckCircle2,
  },
  {
    title: "Регистрация и изменения",
    description:
      "Запуск ИП и ООО, смены, изменения в ЕГРЮЛ, адрес, директор, корпоративные документы и регистрационные действия.",
    icon: Building2,
  },
  {
    title: "Юридическое сопровождение",
    description:
      "Договоры, корпоративные вопросы, правовые документы и прикладные юридические задачи для бизнеса.",
    icon: Scale,
  },
  {
    title: "СЭЗ и субсидии",
    description:
      "Работа с маршрутами по свободной экономической зоне, сопровождению резидентов, субсидиям и связанным документам.",
    icon: ShieldCheck,
  },
  {
    title: "Автоматизация и ИИ",
    description:
      "CRM, интеграции, n8n, маршруты данных и цифровые решения, которые помогают бизнесу работать быстрее и понятнее.",
    icon: Workflow,
  },
];

const WORKFLOW_STEPS = [
  "Сначала мы разбираем саму задачу, а не предлагаем шаблонное решение без контекста.",
  "Дальше в работу включается профильный специалист или профильная группа по нужному направлению.",
  "По каждой задаче выстраивается понятный порядок действий, чтобы клиент видел, что происходит и какой следующий шаг нужен.",
  "Итог — не просто консультация ради консультации, а движение к конкретному результату по задаче бизнеса.",
];

const WHY_CLIENTS_TRUST = [
  "Клиент работает не с разрозненными исполнителями, а с командой, где роли разделены по специализациям.",
  "Такой подход снижает хаос в коммуникации и помогает быстрее переводить задачу в рабочее решение.",
  "Мы не обещаем универсального исполнителя на всё сразу — под каждую задачу нужен свой профильный специалист.",
  "Для бизнеса это означает более понятный процесс, меньше лишних кругов и выше качество результата.",
];

const TEAM_VALUES = [
  "Внимание к деталям и аккуратность в документах.",
  "Ясная коммуникация без лишней сложности.",
  "Работа на результат, а не на видимость активности.",
  "Понимание, что у бизнеса важны сроки, понятный процесс и ответственность.",
];

export default function AboutTeamPage() {
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
                { label: "О компании", href: "/about/team/" },
                { label: "Команда", href: "/about/team/" },
              ]}
            />

            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <Users className="h-4 w-4 text-purple-300" />
                Профильная команда по направлениям бизнеса
              </div>

              <h1 className="gradient-text-purple-blue mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                Команда Rahima Consulting
              </h1>

              <p className="mx-auto max-w-4xl text-lg leading-8 text-white/80 md:text-xl">
                Rahima Consulting — это команда специалистов по бухгалтерии, налогам,
                регистрации бизнеса, юридическим вопросам, СЭЗ, субсидиям и
                автоматизации. Мы показываем не абстрактную “витрину компании”, а
                реальную структуру экспертизы: кто подключается к задаче и почему
                бизнесу удобнее решать такие вопросы с профильной командой.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Briefcase className="mx-auto mb-3 h-6 w-6 text-purple-300" />
                  <div className="text-2xl font-bold text-white">6 направлений</div>
                  <div className="mt-2 text-sm text-white/60">
                    Бухгалтерия, налоги, право, регистрация, СЭЗ и автоматизация
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-blue-300" />
                  <div className="text-2xl font-bold text-white">Профильный подход</div>
                  <div className="mt-2 text-sm text-white/60">
                    Задачи распределяются по специализациям, а не “на одного человека”
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Building2 className="mx-auto mb-3 h-6 w-6 text-green-400" />
                  <div className="text-2xl font-bold text-white">B2B-фокус</div>
                  <div className="mt-2 text-sm text-white/60">
                    Работаем под реальные задачи бизнеса, а не под формальные описания
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={100}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                По каким направлениям работает команда
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {TEAM_DIRECTIONS.map((role) => {
                  const Icon = role.icon;

                  return (
                    <div
                      key={role.title}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5"
                    >
                      <div className="mb-3 flex items-center gap-2 text-purple-300">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{role.title}</span>
                      </div>

                      <div className="text-sm leading-7 text-white/70">{role.description}</div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={160}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Как строится работа по задаче клиента
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {WORKFLOW_STEPS.map((step, index) => (
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

            <GlassCard className="mb-12" animationDelay={220}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Почему бизнесу удобнее работать с профильной командой
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {WHY_CLIENTS_TRUST.map((item) => (
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

            <GlassCard className="mb-12" animationDelay={280}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Что мы ценим в работе
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {TEAM_VALUES.map((item) => (
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
                  href="/about/partners/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Партнёры</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Посмотреть, с какими сервисами, банками и платформами работает компания.
                  </div>
                </Link>

                <Link
                  href="/about/vacancies/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Вакансии</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Перейти к открытым ролям и кадровому резерву Rahima Consulting.
                  </div>
                </Link>

                <Link
                  href="/contacts/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Контакты</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Связаться с нами и обсудить задачу бизнеса в удобном формате.
                  </div>
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="text-center" animationDelay={400}>
              <h2 className="mb-4 text-3xl font-bold text-white">
                Нужна команда под конкретную задачу бизнеса?
              </h2>

              <p className="mx-auto mb-6 max-w-3xl leading-7 text-white/80">
                Опишите ситуацию, и мы подключим профильное направление: бухгалтерию,
                налоги, юридическое сопровождение, регистрацию, СЭЗ, субсидии или
                автоматизацию. Так работа начинается быстрее и понятнее уже с первого шага.
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