import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Вакансии | Rahima Consulting",
  description:
    "Вакансии и кадровый резерв Rahima Consulting: как мы подходим к подбору, какие направления нам важны и как откликнуться.",
  openGraph: {
    title: "Вакансии | Rahima Consulting",
    description:
      "Trust-страница вакансий: направления, принципы найма и переход в отклик.",
    type: "website",
  },
};

const DIRECTIONS = [
  {
    title: "Бухгалтерия и отчётность",
    description:
      "Специалисты, которые умеют держать рабочий контур учёта, отчётности и клиентского сопровождения без хаоса.",
  },
  {
    title: "Налоги и сопровождение задач",
    description:
      "Люди, которые умеют разбирать ситуацию, выстраивать следующий шаг и доводить налоговый маршрут до результата.",
  },
  {
    title: "Юридический и регистрационный контур",
    description:
      "Специалисты по регистрациям, изменениям, корпоративным задачам и юридическому сопровождению бизнеса.",
  },
  {
    title: "СЭЗ / субсидии / региональные маршруты",
    description:
      "Люди, которые умеют работать со сложными пакетами, маршрутизацией и понятной клиентской логикой.",
  },
  {
    title: "Автоматизация и CRM",
    description:
      "Специалисты по CRM, интеграциям, процессам, n8n и цифровому контуру бизнеса.",
  },
  {
    title: "Операционный и клиентский контур",
    description:
      "Те, кто умеет держать коммуникацию, порядок, сроки и качество следующего шага для клиента.",
  },
];

const HIRING_PRINCIPLES = [
  "Мы ищем не “универсального героя на всё”, а сильного специалиста в понятном рабочем контуре.",
  "Для нас важны системность, аккуратность в документах, ясная коммуникация и умение держать маршрут задачи.",
  "Даже если сейчас нет открытой роли, мы поддерживаем кадровый резерв по ключевым направлениям.",
  "Страница вакансий — это trust-узел и вход в отклик, а не витрина случайных формулировок.",
];

const HOW_IT_WORKS = [
  "Вы присылаете отклик или кратко описываете свой профиль.",
  "Мы сопоставляем ваш опыт с одним из реальных рабочих контуров компании.",
  "Если есть совпадение по роли и задачам, возвращаемся со следующим шагом.",
  "Если роль сейчас не открыта, но профиль сильный, сохраняем контакт в кадровом резерве.",
];

export default function AboutVacanciesPage() {
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
                { label: "Вакансии", href: "/about/vacancies/" },
              ]}
            />

            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <Briefcase className="h-4 w-4 text-purple-300" />
                Вакансии и кадровый резерв
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-purple-blue">
                Вакансии Rahima Consulting
              </h1>

              <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-8">
                Эта страница нужна не для “шума ради найма”, а для понятного кадрового
                контура: кого мы ищем, как подходим к ролям и каким специалистам с нами
                по пути. Даже если активной вакансии сейчас нет, сильный профиль может
                попасть в кадровый резерв по нужному направлению.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Users className="mx-auto mb-3 h-6 w-6 text-purple-300" />
                  <div className="text-2xl font-bold text-white">Команда</div>
                  <div className="mt-2 text-sm text-white/60">
                    Под реальные контуры работы, а не “всё сразу”
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-blue-300" />
                  <div className="text-2xl font-bold text-white">Trust</div>
                  <div className="mt-2 text-sm text-white/60">
                    Честная HR-страница без фальшивых обещаний
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Workflow className="mx-auto mb-3 h-6 w-6 text-green-400" />
                  <div className="text-2xl font-bold text-white">1 шаг</div>
                  <div className="mt-2 text-sm text-white/60">
                    Главный маршрут — отклик и следующий шаг по профилю
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={100}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                По каким направлениям мы смотрим специалистов
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {DIRECTIONS.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="text-lg font-semibold text-white">{item.title}</div>
                    <div className="mt-3 text-sm leading-7 text-white/65">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={160}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Как мы подходим к найму
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {HIRING_PRINCIPLES.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                    <span className="text-white/80 leading-7">{item}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={220}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Как выглядит следующий шаг
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {HOW_IT_WORKS.map((step, index) => (
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

              <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm leading-7 text-amber-100/90">
                Если позже захотите добавить конкретные открытые позиции, грейды, зарплатные
                вилки или стек, публикуйте только подтверждённые данные. Всё неутверждённое
                лучше оставлять как <span className="font-semibold">[Нужно уточнить]</span>.
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
                    Главный trust-хаб: кто мы, как работаем и как устроен контур компании.
                  </div>
                </Link>

                <Link
                  href="/about/team/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Команда</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Как распределены роли и какие направления реально закрываются внутри компании.
                  </div>
                </Link>

                <Link
                  href="/contacts/ask/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Откликнуться</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Универсальная точка входа, если хотите оставить профиль и получить следующий шаг.
                  </div>
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="text-center" animationDelay={340}>
              <h2 className="text-3xl font-bold text-white mb-4">
                Хотите попасть в команду или кадровый резерв?
              </h2>

              <p className="text-white/80 mb-6 max-w-3xl mx-auto leading-7">
                Отправьте краткую информацию о себе, опыте и направлении, в котором вы
                сильны. Так мы быстрее поймём, есть ли совпадение по рабочему контуру
                и какой следующий шаг предложить дальше.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contacts/ask/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/50"
                >
                  Оставить отклик
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