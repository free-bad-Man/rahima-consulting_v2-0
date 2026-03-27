import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import { getAllSolutions, getSolutionBySlug, type Solution } from "@/lib/solutions-data";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";
import { Check, Phone, Calculator, Users, Clock, Package, Briefcase } from "lucide-react";

const PHONE_HREF = "tel:+79789987222";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

function buildMetaDescription(solution: Solution): string {
  const raw = [solution.short_tagline, solution.description, solution.price_display]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  if (!raw) {
    return "Бизнес-решение от Rahima Consulting.";
  }

  return raw.length > 180 ? `${raw.slice(0, 177).trim()}...` : raw;
}

function buildSolutionJsonLd(solution: Solution, slug: string) {
  const url = absoluteUrl(`/solutions/${slug}`);
  const description = buildMetaDescription(solution);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.title,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      telephone: "+7-978-998-72-22",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Республика Крым",
    },
    serviceType: solution.title,
    audience: solution.for_whom?.length
      ? {
          "@type": "Audience",
          audienceType: solution.for_whom.join(", "),
        }
      : undefined,
    offers:
      solution.price_from && solution.price_from > 0
        ? {
            "@type": "Offer",
            price: solution.price_from,
            priceCurrency: "RUB",
            availability: "https://schema.org/InStock",
            url,
          }
        : undefined,
  };
}

function buildBreadcrumbJsonLd(solution: Solution, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Решения",
        item: absoluteUrl("/solutions"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: solution.title,
        item: absoluteUrl(`/solutions/${slug}`),
      },
    ],
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const slug = resolved?.slug || "";
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return {
      title: "Решение не найдено",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonical = absoluteUrl(`/solutions/${slug}`);
  const description = buildMetaDescription(solution);

  return {
    title: solution.title,
    description,
    keywords: [
      solution.title,
      ...solution.for_whom,
      ...solution.includes.slice(0, 5),
      ...solution.advantages.slice(0, 5),
    ],
    openGraph: {
      title: solution.title,
      description,
      type: "website",
      siteName: SITE_NAME,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: solution.title,
      description,
    },
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateStaticParams() {
  const solutions = getAllSolutions();

  return solutions.map((solution) => ({
    slug: solution.slug,
  }));
}

export const dynamicParams = false;

export default async function SolutionPage({ params }: PageProps) {
  const resolved = await params;
  const slug = resolved?.slug || "";
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  const solutionJsonLd = buildSolutionJsonLd(solution, slug);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(solution, slug);

  return (
    <>
      <ShaderBackground />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(solutionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen relative z-10">
        <PageHeader />

        <main className="pt-24 md:pt-32 pb-48 md:pb-60 px-4 sm:px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Решения", href: "/solutions" },
                { label: solution.title, href: `/solutions/${solution.slug}` },
              ]}
            />

            <GlassCard className="mb-8" animationDelay={0}>
              <div className="flex items-start gap-4 mb-6">
                <Briefcase className="w-12 h-12 text-purple-300 flex-shrink-0" />
                <div className="flex-grow">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {solution.title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/80">
                    {solution.short_tagline || solution.description}
                  </p>
                </div>
              </div>

              {solution.price_display && (
                <div className="mb-8">
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {solution.price_display}
                  </span>
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
                           bg-gradient-to-r from-purple-600 to-blue-600
                           hover:from-purple-700 hover:to-blue-700
                           text-white font-medium transition-all
                           transform hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  Обсудить решение
                </Link>
                <Link
                  href="/calculator"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
                           bg-white/10 hover:bg-white/20 backdrop-blur-sm
                           text-white font-medium transition-all
                           transform hover:scale-105"
                >
                  <Calculator className="w-5 h-5" />
                  Рассчитать стоимость
                </Link>
              </div>
            </GlassCard>

            {solution.description && (
              <GlassCard className="mb-8" animationDelay={100}>
                <div className="flex items-center gap-3 mb-6">
                  <Package className="w-6 h-6 text-purple-300" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Описание решения
                  </h2>
                </div>
                <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                  {solution.description}
                </p>
              </GlassCard>
            )}

            {solution.for_whom && solution.for_whom.length > 0 && (
              <GlassCard className="mb-8" animationDelay={150}>
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-purple-300" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Для кого это решение
                  </h2>
                </div>

                <div className="space-y-3">
                  {solution.for_whom.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {solution.includes && solution.includes.length > 0 && (
              <GlassCard className="mb-8" animationDelay={200}>
                <div className="flex items-center gap-3 mb-6">
                  <Package className="w-6 h-6 text-purple-300" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Что входит в решение
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {solution.includes.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {solution.advantages && solution.advantages.length > 0 && (
              <GlassCard className="mb-8" animationDelay={250}>
                <div className="flex items-center gap-3 mb-6">
                  <Check className="w-6 h-6 text-green-400" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Ключевые преимущества
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {solution.advantages.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {solution.timeline && (
              <GlassCard className="mb-8" animationDelay={300}>
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-purple-300" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Сроки реализации
                  </h2>
                </div>
                <p className="text-white/80 text-lg">{solution.timeline}</p>
              </GlassCard>
            )}

            <div id="contact" className="scroll-mt-32">
              <GlassCard className="text-center" animationDelay={350}>
                <h2 className="text-3xl font-bold text-white mb-4">Готовы начать?</h2>
                <p className="text-white/80 mb-6">
                  Оставьте заявку, и мы свяжемся с вами в ближайшее время
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/contacts"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-lg
                           bg-gradient-to-r from-purple-600 to-blue-600
                           hover:from-purple-700 hover:to-blue-700
                           text-white font-medium transition-all text-lg
                           transform hover:scale-105"
                  >
                    <Phone className="w-5 h-5" />
                    Оставить заявку
                  </Link>
                  <a
                    href={PHONE_HREF}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-lg
                           bg-white/10 hover:bg-white/20 backdrop-blur-sm
                           text-white font-medium transition-all text-lg
                           transform hover:scale-105"
                  >
                    <Phone className="w-5 h-5" />
                    Позвонить нам
                  </a>
                  <Link
                    href="/calculator"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-lg
                           bg-white/10 hover:bg-white/20 backdrop-blur-sm
                           text-white font-medium transition-all text-lg
                           transform hover:scale-105"
                  >
                    <Calculator className="w-5 h-5" />
                    Рассчитать стоимость
                  </Link>
                </div>
              </GlassCard>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}