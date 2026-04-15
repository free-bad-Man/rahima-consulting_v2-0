import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import { getAllCases } from "@/lib/cases-data";
import {
  ArrowRight,
  CheckCircle2,
  Quote,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Отзывы клиентов | Rahima Consulting",
  description:
    "Отзывы клиентов Rahima Consulting по бухгалтерии, налогам, регистрации, юридическому сопровождению, СЭЗ и автоматизации.",
  openGraph: {
    title: "Отзывы клиентов | Rahima Consulting",
    description:
      "Доверительный раздел с отзывами клиентов и переходами в кейсы, услуги и заявку.",
    type: "website",
  },
};

function getDirectionLabel(category: string) {
  const normalized = category.toLowerCase();

  if (normalized.includes("бух")) return "Бухгалтерия";
  if (normalized.includes("нал")) return "Налоги и отчётность";
  if (normalized.includes("сэз")) return "СЭЗ";
  if (normalized.includes("субсид")) return "Субсидии";
  if (normalized.includes("автомат")) return "Автоматизация и ИИ";
  if (normalized.includes("crm")) return "Автоматизация и ИИ";
  if (normalized.includes("юрид")) return "Юридическое сопровождение";

  return category;
}

export default function ReviewsPage() {
  const cases = getAllCases();

  const testimonials = cases.slice(0, 6).map((caseStudy) => ({
    slug: caseStudy.slug,
    author: caseStudy.testimonial.author,
    client: caseStudy.client,
    text: caseStudy.testimonial.text,
    category: getDirectionLabel(caseStudy.category),
    title: caseStudy.title,
  }));

  const uniqueDirections = Array.from(
    new Set(cases.map((caseStudy) => getDirectionLabel(caseStudy.category))),
  ).slice(0, 6);

  return (
    <div className="relative min-h-screen">
      <ShaderBackground />

      <div className="relative z-10">
        <PageHeader />

        <main className="px-4 pb-48 pt-24 sm:px-6 lg:px-12 md:pt-32 md:pb-60">
          <div className="mx-auto max-w-7xl">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Отзывы", href: "/reviews/" },
              ]}
            />

            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <ShieldCheck className="h-4 w-4 text-purple-300" />
                Доверительный раздел
              </div>

              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl gradient-text-purple-blue">
                Отзывы клиентов Rahima Consulting
              </h1>

              <p className="mx-auto max-w-4xl text-lg leading-8 text-white/80 md:text-xl">
                Здесь мы собираем клиентский опыт по ключевым направлениям работы:
                бухгалтерия, налоги, регистрация и изменения, юридическое сопровождение,
                СЭЗ, субсидии и автоматизация. Это не витрина “идеальных обещаний”, а
                доверительный контур, который помогает понять, с какими задачами к нам
                приходят и как выглядит результат работы.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-2 flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-300" />
                  </div>
                  <div className="text-3xl font-bold text-white">{testimonials.length}+</div>
                  <div className="mt-2 text-sm text-white/60">Отзывов и клиентских историй</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-2 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-300" />
                  </div>
                  <div className="text-3xl font-bold text-white">{uniqueDirections.length}</div>
                  <div className="mt-2 text-sm text-white/60">Основных направлений услуг</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-2 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">1</div>
                  <div className="mt-2 text-sm text-white/60">
                    Главный следующий шаг — заявка и маршрут по ситуации
                  </div>
                </div>
              </div>
            </GlassCard>

            <div className="mb-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {testimonials.map((item, index) => (
                <GlassCard
                  key={`${item.slug}-${index}`}
                  className="relative h-full"
                  animationDelay={100 + index * 50}
                >
                  <Quote className="absolute right-5 top-5 h-8 w-8 text-purple-300/20" />

                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-purple-300">
                    {item.category}
                  </div>

                  <p className="mb-5 text-white/85 italic leading-7">"{item.text}"</p>

                  <div className="border-t border-white/10 pt-4">
                    <div className="font-semibold text-white">{item.author}</div>
                    <div className="mt-1 text-sm text-white/55">{item.client}</div>
                    <div className="mt-3 text-sm text-white/45">{item.title}</div>
                  </div>

                  <div className="mt-5">
                    <Link
                      href={`/cases/${item.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-purple-300 transition-colors hover:text-purple-200"
                    >
                      Смотреть связанный кейс
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </GlassCard>
              ))}
            </div>

            <GlassCard className="mb-12" animationDelay={450}>
              <h2 className="mb-6 text-3xl font-bold text-white text-center">
                По каким направлениям нас чаще всего оценивают
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {uniqueDirections.map((direction) => (
                  <div
                    key={direction}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="mb-3 text-lg font-semibold text-white">{direction}</div>
                    <div className="space-y-2 text-sm text-white/65">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                        <span>Понятный маршрут работы и следующий шаг</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                        <span>Нормальная коммуникация без хаоса</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                        <span>Ощутимый результат в документах, процессе и контроле</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={520}>
              <h2 className="mb-6 text-3xl font-bold text-white text-center">
                Куда перейти дальше
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Link
                  href="/cases/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="text-lg font-semibold text-white">Кейсы</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Реальные сценарии: ситуация, действия и результат.
                  </div>
                </Link>

                <Link
                  href="/services/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="text-lg font-semibold text-white">Услуги</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Подобрать правильный рабочий маршрут по задаче бизнеса.
                  </div>
                </Link>

                <Link
                  href="/about/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="text-lg font-semibold text-white">О компании</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Команда, партнёры и доверительный контур компании.
                  </div>
                </Link>

                <Link
                  href="/contacts/ask/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div className="text-lg font-semibold text-white">Оставить заявку</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Получить маршрут, список документов и следующий шаг.
                  </div>
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="text-center" animationDelay={600}>
              <h2 className="mb-4 text-3xl font-bold text-white">
                Хотите такой же понятный результат по своей задаче?
              </h2>

              <p className="mx-auto mb-6 max-w-3xl text-white/80">
                Опишите ситуацию, и мы вернёмся с маршрутом, списком документов и
                следующим шагом. Это самый быстрый вход в работу без лишних кругов.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contacts/ask/"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-semibold text-white transition-all hover:scale-[1.02] hover:from-purple-700 hover:to-blue-700"
                >
                  Оставить заявку
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/contacts/"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/15"
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