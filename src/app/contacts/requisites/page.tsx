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
  FileText,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Реквизиты | Rahima Consulting",
  description:
    "Реквизиты для договоров, оплат и документооборота. Trust-страница с официальными данными и переходом в заявку.",
  openGraph: {
    title: "Реквизиты | Rahima Consulting",
    description:
      "Официальные реквизиты для договоров, оплат и ЭДО.",
    type: "website",
  },
};

const REQUISITES = [
  { label: "Форма работы", value: "[Нужно уточнить]" },
  { label: "ФИО / Наименование", value: "[Нужно уточнить]" },
  { label: "ИНН", value: "[Нужно уточнить]" },
  { label: "ОГРН / ОГРНИП", value: "[Нужно уточнить]" },
  { label: "Расчётный счёт", value: "[Нужно уточнить]" },
  { label: "Банк", value: "[Нужно уточнить]" },
  { label: "БИК", value: "[Нужно уточнить]" },
  { label: "Корреспондентский счёт", value: "[Нужно уточнить]" },
  { label: "Email для документооборота", value: "[Нужно уточнить]" },
];

const IMPORTANT_NOTES = [
  "Эта страница нужна для договоров, оплат и проверки контрагента.",
  "Реквизиты должны быть опубликованы в HTML, а не картинкой.",
  "Если вы видите поля [Нужно уточнить], замените их данными из официальной карточки реквизитов.",
  "Для коммерческого маршрута и старта работы главный следующий шаг остаётся через заявку.",
];

export default function ContactsRequisitesPage() {
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
                { label: "Реквизиты", href: "/contacts/requisites/" },
              ]}
            />

            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <Building2 className="h-4 w-4 text-purple-300" />
                Реквизиты и документооборот
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-purple-blue">
                Реквизиты Rahima Consulting
              </h1>

              <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-8">
                Эта страница нужна для договоров, оплат, проверки контрагента и
                документооборота. Она не заменяет контактный или коммерческий маршрут,
                а усиливает доверительный контур сайта и даёт официальный блок данных
                в нормальном HTML-формате.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <FileText className="mx-auto mb-3 h-6 w-6 text-purple-300" />
                  <div className="text-2xl font-bold text-white">HTML</div>
                  <div className="mt-2 text-sm text-white/60">
                    Реквизиты должны быть читаемыми и копируемыми
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-blue-300" />
                  <div className="text-2xl font-bold text-white">Trust</div>
                  <div className="mt-2 text-sm text-white/60">
                    Страница усиливает доверие, а не продаёт “сама по себе”
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <CheckCircle2 className="mx-auto mb-3 h-6 w-6 text-green-400" />
                  <div className="text-2xl font-bold text-white">1 шаг</div>
                  <div className="mt-2 text-sm text-white/60">
                    Для старта работ дальше ведём в заявку
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={100}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Официальные реквизиты
              </h2>

              <div className="overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full border-collapse">
                  <tbody>
                    {REQUISITES.map((item, index) => (
                      <tr
                        key={item.label}
                        className={index % 2 === 0 ? "bg-white/5" : "bg-white/[0.03]"}
                      >
                        <td className="w-[38%] border-b border-white/10 px-5 py-4 text-sm font-medium text-white/75 align-top">
                          {item.label}
                        </td>
                        <td className="border-b border-white/10 px-5 py-4 text-sm text-white align-top break-all">
                          {item.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm leading-7 text-amber-100/90">
                Перед публикацией замените все поля <span className="font-semibold">[Нужно уточнить]</span> данными
                из официальной карточки реквизитов и документов документооборота.
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={160}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Что важно по этой странице
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {IMPORTANT_NOTES.map((item) => (
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
                Куда перейти дальше
              </h2>

              <div className="grid gap-4 md:grid-cols-3">
                <Link
                  href="/contacts/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Контакты</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Главный контактный контур: связи, маршруты и форматы работы.
                  </div>
                </Link>

                <Link
                  href="/about/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">О компании</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Trust-хаб компании: команда, партнёры, контакты и следующие переходы.
                  </div>
                </Link>

                <Link
                  href="/contacts/ask/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Оставить заявку</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Если нужен не просто реквизит, а старт работы по задаче.
                  </div>
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="text-center" animationDelay={300}>
              <h2 className="text-3xl font-bold text-white mb-4">
                Нужен договор, расчёт или следующий шаг по задаче?
              </h2>

              <p className="text-white/80 mb-6 max-w-3xl mx-auto leading-7">
                Для старта работы, расчёта стоимости и маршрута по ситуации используйте
                основной контур заявки. Реквизиты — это trust-страница и support-точка,
                а не замена рабочему входу в проект.
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
                  href="/contacts/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg text-white font-semibold hover:bg-white/20 border border-white/20 transform hover:scale-105 transition-all duration-200"
                >
                  Перейти в контакты
                </Link>
              </div>
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  );
}