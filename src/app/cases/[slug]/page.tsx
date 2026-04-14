import { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import { getAllCases, getCaseBySlug, type CaseStudy } from "@/lib/cases-data";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  Quote,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://rahima-consulting.ru").replace(
  /\/+$/,
  "",
);

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

const LEGACY_CASE_ALIASES: Record<string, string> = {
  "цифровизация-медицинской-клиники": "medical-clinic-digital-transformation",
  "цифровизация-медицинской-клиники-рост-записей-на-45": "medical-clinic-digital-transformation",
  "автоматизация-сети-кафе": "restaurant-chain-automation",
  "аутсорсинг-бухгалтерии-для-строительной-компании": "construction-company-accounting",
  "запуск-интернет-магазина-с-нуля": "online-store-business-launch",
  "налоговая-оптимизация-для-it-стартапа": "it-startup-tax-optimization",
  "реструктуризация-логистической-компании": "logistics-company-tax-restructuring",
};

function normalizeIncomingSlug(input: string) {
  return decodeURIComponent(input || "")
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "");
}

function resolveLegacyAlias(slug: string) {
  return LEGACY_CASE_ALIASES[normalizeIncomingSlug(slug)] || null;
}

function buildCaseDescription(caseStudy: CaseStudy) {
  const raw = [caseStudy.title, caseStudy.challenge, caseStudy.timeline]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  if (!raw) {
    return "Кейс Rahima Consulting.";
  }

  return raw.length > 180 ? `${raw.slice(0, 177).trim()}...` : raw;
}

function buildCaseJsonLd(caseStudy: CaseStudy, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: caseStudy.title,
    headline: caseStudy.title,
    description: buildCaseDescription(caseStudy),
    url: `${SITE_URL}/cases/${slug}`,
    author: {
      "@type": "Organization",
      name: "Rahima Consulting",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Rahima Consulting",
      url: SITE_URL,
    },
    about: caseStudy.category,
    keywords: caseStudy.tags,
  };
}

function buildBreadcrumbJsonLd(caseStudy: CaseStudy, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Кейсы",
        item: `${SITE_URL}/cases`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: caseStudy.title,
        item: `${SITE_URL}/cases/${slug}`,
      },
    ],
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const rawSlug = resolved?.slug || "";
  const normalizedRawSlug = normalizeIncomingSlug(rawSlug);
  const canonicalSlug = resolveLegacyAlias(normalizedRawSlug) || normalizedRawSlug;
  const caseStudy = getCaseBySlug(canonicalSlug);

  if (!caseStudy) {
    return {
      title: "Кейс не найден",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = buildCaseDescription(caseStudy);
  const canonical = `${SITE_URL}/cases/${caseStudy.slug}`;

  return {
    title: caseStudy.title,
    description,
    keywords: [caseStudy.category, caseStudy.client, ...caseStudy.tags],
    openGraph: {
      title: caseStudy.title,
      description,
      type: "article",
      siteName: "Rahima Consulting",
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: caseStudy.title,
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
  const cases = getAllCases();
  const canonicalParams = cases.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));

  const aliasParams = Object.keys(LEGACY_CASE_ALIASES).map((slug) => ({
    slug,
  }));

  return [...canonicalParams, ...aliasParams];
}

export const dynamicParams = false;

export default async function CaseDetailPage({ params }: PageProps) {
  const resolved = await params;
  const rawSlug = resolved?.slug || "";
  const normalizedRawSlug = normalizeIncomingSlug(rawSlug);
  const aliasTarget = resolveLegacyAlias(normalizedRawSlug);

  if (aliasTarget && aliasTarget !== normalizedRawSlug) {
    permanentRedirect(`/cases/${aliasTarget}`);
  }

  const caseStudy = getCaseBySlug(normalizedRawSlug);

  if (!caseStudy) {
    notFound();
  }

  const caseJsonLd = buildCaseJsonLd(caseStudy, caseStudy.slug);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(caseStudy, caseStudy.slug);

  return (
    <>
      <ShaderBackground />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseJsonLd) }}
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
                { label: "Кейсы", href: "/cases" },
                { label: caseStudy.title, href: `/cases/${caseStudy.slug}` },
              ]}
            />

            <GlassCard className="mb-8" animationDelay={0}>
              <div className="flex flex-wrap items-start gap-4 mb-6">
                <div className="inline-flex items-center gap-2 text-sm text-purple-300">
                  <TrendingUp className="w-4 h-4" />
                  <span>{caseStudy.category}</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-text-purple-blue">
                {caseStudy.title}
              </h1>

              <p className="text-white/60 text-base md:text-lg mb-6">
                <span className="font-semibold">Клиент:</span> {caseStudy.client}
              </p>

              <div className="flex flex-wrap gap-4 text-sm md:text-base text-white/70">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10">
                  <Clock className="w-4 h-4 text-purple-300" />
                  <span>{caseStudy.timeline}</span>
                </div>

                {caseStudy.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="mb-8" animationDelay={100}>
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-purple-300" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Задача клиента
                </h2>
              </div>

              <p className="text-white/80 leading-8 whitespace-pre-line">
                {caseStudy.challenge}
              </p>
            </GlassCard>

            <GlassCard className="mb-8" animationDelay={150}>
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-6 h-6 text-blue-300" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Что мы сделали
                </h2>
              </div>

              <p className="text-white/80 leading-8 whitespace-pre-line">
                {caseStudy.solution}
              </p>
            </GlassCard>

            <GlassCard className="mb-8" animationDelay={200}>
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Результат
                </h2>
              </div>

              <div className="space-y-4">
                {caseStudy.results.map((result, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-white/85 leading-relaxed">{result}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="mb-8" animationDelay={250}>
              <div className="flex items-start gap-4">
                <Quote className="w-10 h-10 text-purple-300/40 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Отзыв клиента
                  </h2>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-white/85 italic text-lg leading-8 mb-6">
                    "{caseStudy.testimonial.text}"
                  </p>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-white font-semibold">{caseStudy.testimonial.author}</p>
                    <p className="text-white/50 text-sm">{caseStudy.client}</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="text-center" animationDelay={300}>
              <h2 className="text-3xl font-bold text-white mb-4">
                Хотите такой же результат для своего бизнеса?
              </h2>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Расскажите о своей задаче — подберём решение и покажем, как прийти к понятному,
                измеримому результату.
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
                  Обсудить проект
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/cases"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg
                           bg-white/10 hover:bg-white/20 backdrop-blur-sm
                           text-white font-medium transition-all text-lg
                           transform hover:scale-105"
                >
                  Все кейсы
                </Link>
              </div>
            </GlassCard>
          </div>
        </main>
      </div>
    </>
  );
}