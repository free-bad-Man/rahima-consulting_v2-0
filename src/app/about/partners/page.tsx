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
  Network,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Партнёры | Rahima Consulting",
  description:
    "Партнёрский контур Rahima Consulting: банки, сервисы, платформы и рабочие интеграционные связи.",
  openGraph: {
    title: "Партнёры | Rahima Consulting",
    description:
      "Trust-страница о партнёрском контуре: с кем и в какой логике работает Rahima Consulting.",
    type: "website",
  },
};

const PARTNER_GROUPS = [
  {
    title: "Банки и финансовые сервисы",
    description:
      "Партнёрские связи в банковом контуре: расчётные счета, базовые финансовые сценарии, сопровождение по смежным маршрутам.",
  },
  {
    title: "CRM и digital-платформы",
    description:
      "Платформы для автоматизации, CRM, интеграций и цифрового контроля процессов бизнеса.",
  },
  {
    title: "Документооборот и учётные сервисы",
    description:
      "Инструменты и сервисы, которые поддерживают рабочий документооборот, отчётность и бухгалтерский контур.",
  },
  {
    title: "Юридические и регистрационные контуры",
    description:
      "Связки и партнёрские каналы по смежным маршрутам: регистрация, сопровождение и корпоративные задачи.",
  },
  {
    title: "СЭЗ / субсидии / региональные маршруты",
    description:
      "Контуры, где важны связность процесса, пакет документов и понятная логика следующего шага.",
  },
  {
    title: "Технологические интеграторы",
    description:
      "Связки вокруг интеграций, n8n, CRM, сайта и бизнес-аналитики — там, где нужны не обещания, а работающий контур.",
  },
];

const PARTNER_PRINCIPLES = [
  "Партнёрство — это не “логотип ради доверия”, а рабочая связка, которая помогает клиенту пройти маршрут быстрее и чище.",
  "Мы не публикуем неподтверждённые статусы, регалии и формулировки “официальный партнёр”, если это отдельно не согласовано.",
  "Страница про партнёров усиливает trust-контур и помогает понять экосистему работы компании.",
  "Главный коммерческий вход остаётся через заявку и разбор задачи, а не через витрину партнёрских логотипов.",
];

const PARTNER_FLOW = [
  "Клиент приходит с задачей, а не с желанием “посмотреть список логотипов”.",
  "Мы определяем маршрут и понимаем, нужен ли партнёрский контур вообще.",
  "Подключаем нужную связку только там, где это ускоряет процесс или снижает хаос.",
  "Доводим задачу до рабочего следующего шага внутри единого маршрута.",
];

export default function AboutPartnersPage() {
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
                { label: "Партнёры", href: "/about/partners/" },
              ]}
            />

            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <Handshake className="h-4 w-4 text-purple-300" />
                Партнёрский контур
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-purple-blue">
                Партнёры Rahima Consulting
              </h1>

              <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-8">
                Эта страница показывает не “галерею логотипов ради солидности”, а
                партнёрский контур компании: с кем и в какой логике строится работа,
                когда это действительно помогает клиенту быстрее пройти маршрут,
                уменьшить хаос и получить понятный следующий шаг.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Network className="mx-auto mb-3 h-6 w-6 text-purple-300" />
                  <div className="text-2xl font-bold text-white">Экосистема</div>
                  <div className="mt-2 text-sm text-white/60">
                    Партнёры — часть рабочего контура, а не декор
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-blue-300" />
                  <div className="text-2xl font-bold text-white">Trust</div>
                  <div className="mt-2 text-sm text-white/60">
                    Без неподтверждённых статусов и громких формулировок
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Building2 className="mx-auto mb-3 h-6 w-6 text-green-400" />
                  <div className="text-2xl font-bold text-white">B2B</div>
                  <div className="mt-2 text-sm text-white/60">
                    Всё подчинено реальной задаче клиента
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={100}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Какие партнёрские контуры здесь имеются в виду
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {PARTNER_GROUPS.map((group) => (
                  <div
                    key={group.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="text-lg font-semibold text-white">{group.title}</div>
                    <div className="mt-3 text-sm leading-7 text-white/65">
                      {group.description}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={160}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Как работает партнёрская логика
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {PARTNER_FLOW.map((step, index) => (
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
                {PARTNER_PRINCIPLES.map((item) => (
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
                Если позже захотите добавить конкретные названия, логотипы, статусы или
                формулировки партнёрства, публикуйте только то, что реально подтверждено.
                Всё неподтверждённое на этом этапе лучше оставлять как{" "}
                <span className="font-semibold">[Нужно уточнить]</span>.
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
                    Главный trust-хаб компании: логика работы, команда и контактный контур.
                  </div>
                </Link>

                <Link
                  href="/about/team/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Команда</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Кто закрывает направления и как строится работа по задачам бизнеса.
                  </div>
                </Link>

                <Link
                  href="/contacts/ask/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Оставить заявку</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Главный вход, если уже есть задача и нужен рабочий следующий шаг.
                  </div>
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="text-center" animationDelay={340}>
              <h2 className="text-3xl font-bold text-white mb-4">
                Нужен не общий обзор, а конкретный маршрут по задаче?
              </h2>

              <p className="text-white/80 mb-6 max-w-3xl mx-auto leading-7">
                Тогда не выбирайте партнёра “вслепую”. Опишите ситуацию, и мы поймём,
                нужен ли вообще партнёрский контур, какой именно, и какой следующий шаг
                будет для бизнеса самым уместным.
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