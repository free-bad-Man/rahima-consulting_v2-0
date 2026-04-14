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
  Globe,
  MapPinned,
  MessageSquareText,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Регионы работы | Rahima Consulting",
  description:
    "Офис в Симферополе и удалённая работа по РФ: как мы работаем по регионам без гео-спама и фейковых филиалов.",
  openGraph: {
    title: "Регионы работы | Rahima Consulting",
    description:
      "Честная география работы: Симферополь, удалённо по РФ и приоритетные регионы.",
    type: "website",
  },
};

const PRIORITY_REGIONS = [
  {
    title: "Крым / Симферополь",
    description:
      "Базовый домашний регион проекта: офис, локальный контур и очный формат работы.",
    href: "/contacts/simferopol/",
  },
  {
    title: "Херсонская область",
    description:
      "Удалённая работа по РФ с понятным регламентом, документами и маршрутом по задаче.",
    href: "/contacts/remote/",
  },
  {
    title: "Запорожская область",
    description:
      "Работаем без псевдофилиалов: через удалённый формат, контроль и следующий шаг по ситуации.",
    href: "/contacts/remote/",
  },
  {
    title: "ДНР",
    description:
      "Приоритетный региональный контур: не гео-спам, а честная удалённая модель работы.",
    href: "/contacts/remote/",
  },
  {
    title: "ЛНР",
    description:
      "Поддерживаем задачи удалённо по РФ через единый контактный и документный контур.",
    href: "/contacts/remote/",
  },
  {
    title: "Краснодар",
    description:
      "Удалённый формат с понятной коммуникацией, документами и маршрутом без лишних кругов.",
    href: "/contacts/remote/",
  },
  {
    title: "Ростов-на-Дону",
    description:
      "Работаем как удалённый сервисный контур, а не как “ещё один офис на карте”.",
    href: "/contacts/remote/",
  },
  {
    title: "Вся РФ",
    description:
      "Если вашего региона нет в витрине, это не ограничение: работаем удалённо по всей России.",
    href: "/contacts/ask/",
  },
];

const WHAT_THIS_PAGE_DOES = [
  "Показывает честную географию работы без выдуманных филиалов.",
  "Объясняет, как устроен удалённый формат по РФ.",
  "Даёт понятный следующий шаг: заявка, удалённый маршрут или офис в Симферополе.",
  "Поддерживает региональные сигналы без клонов “услуга × город”.",
];

export default function ContactsRegionsPage() {
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
                { label: "Контакты", href: "/contacts/" },
                { label: "Регионы", href: "/contacts/regions/" },
              ]}
            />

            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <Globe className="h-4 w-4 text-purple-300" />
                География работы
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-purple-blue">
                Регионы работы Rahima Consulting
              </h1>

              <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-8">
                Мы честно показываем географию работы: офис в Симферополе и удалённый
                формат по РФ. Эта страница не про фейковые “представительства в каждом
                городе”, а про понятный регламент, контактный контур и следующий шаг
                для клиента из региона.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Building2 className="mx-auto mb-3 h-6 w-6 text-purple-300" />
                  <div className="text-2xl font-bold text-white">Симферополь</div>
                  <div className="mt-2 text-sm text-white/60">Офис и локальный контур</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <MapPinned className="mx-auto mb-3 h-6 w-6 text-blue-300" />
                  <div className="text-2xl font-bold text-white">РФ</div>
                  <div className="mt-2 text-sm text-white/60">Удалённая работа по регионам</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-green-400" />
                  <div className="text-2xl font-bold text-white">Без гео-спама</div>
                  <div className="mt-2 text-sm text-white/60">
                    Только реальная модель работы и связи
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={80}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Что делает эта страница
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {WHAT_THIS_PAGE_DOES.map((item) => (
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

            <GlassCard className="mb-12" animationDelay={140}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Приоритетные регионы
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {PRIORITY_REGIONS.map((region) => (
                  <Link
                    key={region.title}
                    href={region.href}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                  >
                    <div className="text-lg font-semibold text-white">{region.title}</div>
                    <div className="mt-2 text-sm leading-6 text-white/60">
                      {region.description}
                    </div>
                  </Link>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={220}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Как выбрать правильный маршрут
              </h2>

              <div className="grid gap-4 md:grid-cols-3">
                <Link
                  href="/contacts/simferopol/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="mb-3 flex items-center gap-2 text-purple-300">
                    <Building2 className="h-5 w-5" />
                    <span className="font-medium">Офис в Симферополе</span>
                  </div>
                  <p className="text-white/70 leading-7">
                    Для локального контакта, очного формата и базового регионального сигнала.
                  </p>
                </Link>

                <Link
                  href="/contacts/remote/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="mb-3 flex items-center gap-2 text-blue-300">
                    <PhoneCall className="h-5 w-5" />
                    <span className="font-medium">Удалённо по РФ</span>
                  </div>
                  <p className="text-white/70 leading-7">
                    Для регионов, где нужен понятный регламент работы, документы и контроль без визита в офис.
                  </p>
                </Link>

                <Link
                  href="/contacts/ask/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="mb-3 flex items-center gap-2 text-green-400">
                    <MessageSquareText className="h-5 w-5" />
                    <span className="font-medium">Оставить заявку</span>
                  </div>
                  <p className="text-white/70 leading-7">
                    Лучший следующий шаг, если уже есть задача и нужен не обзор, а конкретный маршрут.
                  </p>
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="text-center" animationDelay={300}>
              <h2 className="text-3xl font-bold text-white mb-4">
                Не нашли свой регион в витрине?
              </h2>

              <p className="text-white/80 mb-6 max-w-3xl mx-auto leading-7">
                Это не ограничение. Мы работаем удалённо по РФ и выстраиваем маршрут
                не от “города ради SEO”, а от вашей реальной задачи, документов и следующего шага.
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
                  href="/contacts/remote/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg text-white font-semibold hover:bg-white/20 border border-white/20 transform hover:scale-105 transition-all duration-200"
                >
                  Как работаем удалённо
                </Link>
              </div>
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  );
}