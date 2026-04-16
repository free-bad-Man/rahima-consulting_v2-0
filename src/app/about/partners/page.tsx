import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Handshake,
  Landmark,
  Network,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Партнёры | Rahima Consulting",
  description:
    "Партнёры Rahima Consulting: банки, CRM-платформы, сервисы документооборота и технологические решения, которые помогают быстрее решать задачи бизнеса.",
  openGraph: {
    title: "Партнёры | Rahima Consulting",
    description:
      "С кем работает Rahima Consulting и как партнёрские связи помогают бизнесу быстрее запускать процессы, сопровождать документы и внедрять решения.",
    type: "website",
  },
};

const PARTNER_GROUPS = [
  {
    title: "Банки и финансовые сервисы",
    description:
      "Партнёрские связи по расчётным счетам, финансовым сервисам и смежным банковским сценариям для бизнеса.",
    icon: WalletCards,
  },
  {
    title: "CRM и цифровые платформы",
    description:
      "Сервисы для автоматизации продаж, работы с лидами, контроля клиентского пути и управления воронкой.",
    icon: Network,
  },
  {
    title: "Документооборот и учётные решения",
    description:
      "Системы и инструменты, которые помогают выстраивать электронный документооборот, обмен документами и рабочий порядок в учёте.",
    icon: Building2,
  },
  {
    title: "Юридические и регистрационные сервисы",
    description:
      "Смежные направления, где важны надёжные связки по корпоративным вопросам, регистрационным действиям и сопровождению бизнеса.",
    icon: ShieldCheck,
  },
  {
    title: "СЭЗ, субсидии и региональные маршруты",
    description:
      "Партнёрские и экспертные связки для задач, где важны документы, сроки, координация действий и корректный порядок работы.",
    icon: Landmark,
  },
  {
    title: "Интеграции и автоматизация",
    description:
      "Технологические решения для CRM, сайта, мессенджеров, телефонии, n8n и связанных процессов цифровой автоматизации.",
    icon: Handshake,
  },
];

const HOW_WE_WORK = [
  "Мы не строим страницу партнёров как витрину логотипов без смысла — важен практический результат для клиента.",
  "Партнёрские связи подключаются там, где они реально ускоряют задачу, упрощают запуск или делают процесс надёжнее.",
  "Если клиенту не нужна сторонняя связка, мы не усложняем маршрут ради формальности.",
  "Главная цель — не показать список названий, а помочь бизнесу быстрее пройти к решению.",
];

const WHY_IT_MATTERS = [
  "Бизнес получает не разрозненные советы, а более понятный и собранный процесс работы.",
  "Снижается количество лишних касаний, ручных переделок и потерь времени на поиски подрядчиков по каждому блоку отдельно.",
  "По смежным задачам проще держать единый темп работы, когда участники процесса понимают общий результат.",
  "Для клиента это удобнее, потому что разные части задачи собираются в более понятную систему.",
];

const WHEN_PARTNERS_HELP = [
  "Когда нужно открыть расчётный счёт и параллельно запустить бизнес без задержек.",
  "Когда требуется связать сайт, CRM, интеграции и автоматизацию в один рабочий процесс.",
  "Когда важно быстро собрать документооборот, бухгалтерский или юридический контур без хаоса.",
  "Когда задача затрагивает сразу несколько направлений и нужна координация действий, а не разрозненные исполнители.",
];

export default function AboutPartnersPage() {
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
                { label: "Партнёры", href: "/about/partners/" },
              ]}
            />

            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <Handshake className="h-4 w-4 text-purple-300" />
                Партнёры и рабочие сервисы
              </div>

              <h1 className="gradient-text-purple-blue mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                Партнёры Rahima Consulting
              </h1>

              <p className="mx-auto max-w-4xl text-lg leading-8 text-white/80 md:text-xl">
                Rahima Consulting работает не изолированно, а в связке с банками,
                цифровыми платформами, системами документооборота и технологическими
                решениями. Это помогает быстрее запускать бизнес-процессы, аккуратнее
                сопровождать задачи и собирать более понятный маршрут для клиента.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Network className="mx-auto mb-3 h-6 w-6 text-purple-300" />
                  <div className="text-2xl font-bold text-white">Экосистема</div>
                  <div className="mt-2 text-sm text-white/60">
                    Связки с сервисами, которые реально помогают в работе
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-blue-300" />
                  <div className="text-2xl font-bold text-white">Практичность</div>
                  <div className="mt-2 text-sm text-white/60">
                    Подключаем решения под задачу, а не ради красивой витрины
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Building2 className="mx-auto mb-3 h-6 w-6 text-green-400" />
                  <div className="text-2xl font-bold text-white">B2B-подход</div>
                  <div className="mt-2 text-sm text-white/60">
                    В центре всегда остаётся реальный результат для бизнеса
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={100}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                По каким направлениям строятся партнёрские связи
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {PARTNER_GROUPS.map((group) => {
                  const Icon = group.icon;

                  return (
                    <div
                      key={group.title}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5"
                    >
                      <div className="mb-3 flex items-center gap-2 text-purple-300">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{group.title}</span>
                      </div>

                      <div className="text-sm leading-7 text-white/70">
                        {group.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={160}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Как мы используем партнёрские связи в работе
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {HOW_WE_WORK.map((item) => (
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
                Почему это важно для клиента
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {WHY_IT_MATTERS.map((item) => (
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
                В каких ситуациях это особенно полезно
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {WHEN_PARTNERS_HELP.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 leading-7 text-white/80"
                  >
                    {item}
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
                  href="/about/vacancies/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Вакансии</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Перейти к открытым ролям и кадровому резерву компании.
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
                Нужен понятный маршрут по задаче бизнеса?
              </h2>

              <p className="mx-auto mb-6 max-w-3xl leading-7 text-white/80">
                Если задача затрагивает сразу несколько направлений — бухгалтерию,
                банки, CRM, документооборот или автоматизацию — опишите ситуацию.
                Мы подскажем, какой формат работы подойдёт лучше и какой следующий шаг
                будет самым уместным.
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