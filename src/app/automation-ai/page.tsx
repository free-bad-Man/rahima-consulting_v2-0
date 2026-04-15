import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import ShaderBackground from "@/components/ui/shader-background";
import GlassCard from "@/components/ui/glass-card";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  CircuitBoard,
  Cpu,
  LineChart,
  MessageSquareText,
  Network,
  ScanSearch,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Автоматизация продаж и контроля: amoCRM + интеграции + ИИ-аналитика",
  description:
    "Автоматизация и ИИ для бизнеса: CRM, сайт → CRM, n8n, интеграции, ИИ-аналитика и аудит маршрута внедрения.",
};

const AUTOMATION_CARDS = [
  {
    title: "CRM",
    href: "/automation-ai/crm/",
    description:
      "Внедрение CRM как управляемой системы продаж: контроль входящих, SLA, качество данных и отчёты руководителю.",
    icon: CircuitBoard,
  },
  {
    title: "Сайт → CRM",
    href: "/automation-ai/site-crm-integration/",
    description:
      "Маршрут лида от сайта до CRM без потерь: формы, UTM, ответственный, источник и следующий шаг.",
    icon: Network,
  },
  {
    title: "n8n",
    href: "/automation-ai/n8n/",
    description:
      "Управляемая автоматизация между системами: триггеры, проверки, уведомления, контроль ошибок и повторные попытки.",
    icon: Workflow,
  },
  {
    title: "Интеграции",
    href: "/automation-ai/integrations/",
    description:
      "Связность каналов и данных вокруг CRM: телефония, мессенджеры, почта, аналитика и контроль маршрутов.",
    icon: Cpu,
  },
  {
    title: "ИИ-аналитика",
    href: "/automation-ai/ai-assistants/",
    description:
      "Причины проигрыша, контроль следующего шага, дисциплина менеджеров и отчёты руководителю на фактах.",
    icon: Bot,
  },
  {
    title: "Аудит и план",
    href: "/automation-ai/audit-plan/",
    description:
      "Первый шаг для смешанного спроса: разбор текущей ситуации, карта проблем, приоритеты и маршрут внедрения.",
    icon: ScanSearch,
  },
];

const BENEFITS = [
  "Продажи под контролем, а не «по ощущениям»",
  "Снижение потерь лидов между каналами и CRM",
  "Понятный маршрут внедрения без хаоса и лишних доработок",
  "Отчётность для руководителя на фактах, а не на гипотезах",
];

export default function AutomationAiPage() {
  const pageUrl = "https://rahima-consulting.ru/automation-ai/";

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Автоматизация продаж и контроля: amoCRM + интеграции + ИИ-аналитика",
    url: pageUrl,
    description:
      "Хаб раздела автоматизации и ИИ: CRM, сайт → CRM, n8n, интеграции, ИИ-аналитика и аудит маршрута внедрения.",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "https://rahima-consulting.ru/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Автоматизация и ИИ",
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="relative min-h-screen">
      <ShaderBackground />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="relative z-10 min-h-screen">
        <PageHeader />

        <main className="px-4 pb-48 pt-24 sm:px-6 lg:px-12 md:pt-32 md:pb-60">
          <div className="mx-auto max-w-6xl">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Автоматизация и ИИ", href: "/automation-ai/" },
              ]}
            />

            <GlassCard className="mb-8" animationDelay={0}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <LineChart className="h-4 w-4 text-purple-300" />
                Автоматизация продаж и контроля
              </div>

              <h1 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-5xl">
                amoCRM, интеграции, n8n и ИИ-аналитика —
                <span className="gradient-text-purple-blue"> как единый управляемый контур</span>
              </h1>

              <p className="max-w-4xl text-lg leading-8 text-white/80 md:text-xl">
                Мы выстраиваем автоматизацию не ради «техники ради техники», а ради понятного
                результата: входящие не теряются, CRM показывает реальную картину, менеджеры не
                пропускают следующий шаг, а руководитель видит, где теряются деньги и что с этим
                делать дальше.
              </p>

              <div className="mt-8 grid gap-3 md:grid-cols-2">
                {BENEFITS.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                    <span className="text-white/85">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contacts/ask/"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white transition-all hover:scale-[1.02] hover:from-purple-700 hover:to-blue-700"
                >
                  Получить аудит и план внедрения
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/contacts/"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/15"
                >
                  Обсудить задачу
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="mb-8" animationDelay={100}>
              <div className="mb-6 flex items-center gap-3">
                <MessageSquareText className="h-6 w-6 text-purple-300" />
                <h2 className="text-2xl font-bold text-white md:text-3xl">
                  Что можно выбрать внутри раздела
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {AUTOMATION_CARDS.map((card, index) => {
                  const Icon = card.icon;

                  return (
                    <Link
                      key={card.href}
                      href={card.href}
                      className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-200 hover:border-purple-400/30 hover:bg-white/10"
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <div className="rounded-xl bg-white/10 p-3">
                          <Icon className="h-5 w-5 text-purple-300" />
                        </div>
                        <div className="text-lg font-semibold text-white">{card.title}</div>
                      </div>

                      <p className="text-sm leading-6 text-white/65">{card.description}</p>

                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-purple-300 transition-colors group-hover:text-purple-200">
                        Открыть сценарий
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </GlassCard>

            <GlassCard className="mb-8" animationDelay={150}>
              <div className="mb-6 flex items-center gap-3">
                <Bot className="h-6 w-6 text-blue-300" />
                <h2 className="text-2xl font-bold text-white md:text-3xl">
                  Когда этот раздел нужен бизнесу
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  "Лиды приходят из нескольких каналов, и часть теряется по дороге.",
                  "CRM стоит, но руководитель не получает из неё нормальную картину.",
                  "Менеджеры работают по-разному, нет контроля SLA и следующего шага.",
                  "Нужно связать сайт, телефонию, мессенджеры, почту и отчётность в единый контур.",
                  "Есть ощущение, что продажи проседают, но непонятно, где именно проблема.",
                  "Нужен понятный первый шаг: что внедрять сейчас, а что позже.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="text-center" animationDelay={200}>
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                Не знаете, с чего начать?
              </h2>

              <p className="mx-auto mb-6 max-w-3xl text-white/75">
                Тогда не выбирайте технологию вслепую. Начните с аудита маршрута лида, структуры
                данных и точек потерь — после этого уже будет понятно, нужен ли вам CRM-контур,
                сайт → CRM, n8n, интеграции или ИИ-аналитика.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/automation-ai/audit-plan/"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white transition-all hover:scale-[1.02] hover:from-purple-700 hover:to-blue-700"
                >
                  Перейти к аудиту и плану
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/contacts/ask/"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/15"
                >
                  Оставить заявку
                </Link>
              </div>
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  );
}