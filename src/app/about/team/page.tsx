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
  ShieldCheck,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Команда | Rahima Consulting",
  description:
    "Команда Rahima Consulting: как устроена работа по направлениям, кто ведёт задачи и почему компании можно доверять.",
  openGraph: {
    title: "Команда | Rahima Consulting",
    description:
      "Trust-страница команды: роли, логика работы и связка с заявкой и реквизитами.",
    type: "website",
  },
};

const TEAM_ROLES = [
  {
    title: "Бухгалтерский контур",
    description:
      "Сопровождение бухгалтерии, отчётности, восстановления учёта и рабочих задач по финансовому контуру бизнеса.",
  },
  {
    title: "Налоги и отчётность",
    description:
      "Разовые и регулярные налоговые сценарии: декларации, требования, сверки, логика следующего шага.",
  },
  {
    title: "Регистрация и изменения",
    description:
      "Запуск бизнеса, смены, корпоративные изменения, маршруты по ЕГРЮЛ и регистрационным сценариям.",
  },
  {
    title: "Юридическое сопровождение",
    description:
      "Договоры, корпоративные документы, маршруты по спорным и прикладным юридическим задачам бизнеса.",
  },
  {
    title: "СЭЗ и субсидии",
    description:
      "Сервисный контур по СЭЗ, сопровождению резидентов, рабочим пакетам и сценариям по субсидиям.",
  },
  {
    title: "Автоматизация и ИИ",
    description:
      "CRM, сайт → CRM, интеграции, n8n и сценарии, где нужен контроль, аналитика и цифровой контур.",
  },
];

const WORKFLOW_STEPS = [
  "Сначала разбираем задачу и фиксируем, какой именно маршрут нужен бизнесу.",
  "Подключаем профильный контур, а не “всех сразу”, чтобы не размазывать ответственность.",
  "Собираем документы, рабочие вводные и следующий шаг без лишнего хаоса.",
  "Ведём задачу через понятную коммуникацию, контроль и итоговый результат по маршруту.",
];

const TRUST_POINTS = [
  "Команда работает по направлениям, а не по принципу “один человек делает всё сразу”.",
  "Страница не публикует несогласованные персональные данные: если профиль нужно показать отдельно, он должен быть утверждён.",
  "На сайте важен не декоративный HR-блок, а доверие через понятную структуру ролей и процесса работы.",
  "Для старта работы главный маршрут остаётся через заявку, а не через абстрактное “познакомиться с нами”.",
];

export default function AboutTeamPage() {
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
                { label: "О компании", href: "/about/" },
                { label: "Команда", href: "/about/team/" },
              ]}
            />

            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <Users className="h-4 w-4 text-purple-300" />
                Trust-страница команды
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-purple-blue">
                Команда Rahima Consulting
              </h1>

              <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-8">
                Эта страница показывает не “биографии ради галочки”, а то, как у нас
                устроена работа по направлениям и почему бизнесу понятнее и безопаснее
                работать с профильной командой, а не искать одного универсального исполнителя
                на все задачи сразу.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Briefcase className="mx-auto mb-3 h-6 w-6 text-purple-300" />
                  <div className="text-2xl font-bold text-white">6</div>
                  <div className="mt-2 text-sm text-white/60">
                    Ключевых рабочих контуров
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-blue-300" />
                  <div className="text-2xl font-bold text-white">1</div>
                  <div className="mt-2 text-sm text-white/60">
                    Главный вход в работу — через заявку и маршрут
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Building2 className="mx-auto mb-3 h-6 w-6 text-green-400" />
                  <div className="text-2xl font-bold text-white">B2B</div>
                  <div className="mt-2 text-sm text-white/60">
                    Команда собрана под реальные задачи бизнеса
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={100}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Какие направления закрывает команда
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {TEAM_ROLES.map((role) => (
                  <div
                    key={role.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="text-lg font-semibold text-white">{role.title}</div>
                    <div className="mt-3 text-sm leading-7 text-white/65">
                      {role.description}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={160}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Как строится работа по задаче клиента
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {WORKFLOW_STEPS.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white font-semibold">
                      {index + 1}
                    </div>
                    <div className="text-white/80 leading-7">{step}</div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={220}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Что важно по этой странице
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {TRUST_POINTS.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                    <span className="text-white/80 leading-7">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm leading-7 text-amber-100/90">
                Если позже захотите добавить реальные карточки сотрудников, все имена,
                фото, должности и описания нужно публиковать только после отдельного согласования.
                Всё неподтверждённое на этом этапе оставляем как <span className="font-semibold">[Нужно уточнить]</span>.
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={280}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Куда перейти дальше
              </h2>

              <div className="grid gap-4 md:grid-cols-3">
                <Link
                  href="/about/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">О компании</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Главный trust-хаб: кто мы, как работаем и куда перейти дальше.
                  </div>
                </Link>

                <Link
                  href="/contacts/requisites/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Реквизиты</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Trust-страница для договоров, оплат и проверки контрагента.
                  </div>
                </Link>

                <Link
                  href="/contacts/ask/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Оставить заявку</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Лучший вход, если уже есть задача и нужен следующий рабочий шаг.
                  </div>
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="text-center" animationDelay={340}>
              <h2 className="text-3xl font-bold text-white mb-4">
                Нужен не “общий разговор”, а понятный профильный маршрут?
              </h2>

              <p className="text-white/80 mb-6 max-w-3xl mx-auto leading-7">
                Опишите задачу, и мы подключим нужный контур команды: бухгалтерию,
                налоги, регистрацию, право, СЭЗ, субсидии или автоматизацию. Так
                старт работы получается быстрее и чище, без лишней потери времени.
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
                  href="/about/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg text-white font-semibold hover:bg-white/20 border border-white/20 transform hover:scale-105 transition-all duration-200"
                >
                  Вернуться в раздел о компании
                </Link>
              </div>
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  );
}