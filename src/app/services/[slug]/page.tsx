import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import { getAllServices, getServiceBySlug } from "@/lib/services-data";
import { Check, Phone, Calculator, AlertCircle, Clock, Package } from "lucide-react";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://rahima-consulting.ru").replace(/\/+$/, "");

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

const KNOWN_SECTION_TITLES = [
  "Суть услуги",
  "Для кого",
  "Ключевые преимущества",
  "Преимущества",
  "Что входит в услугу",
  "Что входит",
  "Что потребуется",
  "Стоимость",
  "Цена",
  "Сроки",
  "Результат",
  "Порядок работы",
  "Важно знать",
];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeServiceTextForRender(text: string): string {
  return text
    .replace(/\r/g, "")
    .replace(/([.!?])\s+(?=\d+\.\s*[А-ЯA-ZЁ])/g, "$1\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractSection(block: string): { title: string; body: string } | null {
  const compact = block.replace(/\s+/g, " ").trim();

  for (const title of KNOWN_SECTION_TITLES) {
    const re = new RegExp(`^(\\d+\\.\\s*${escapeRegExp(title)})(?:\\s+|:\\s*)([\\s\\S]*)$`, "i");
    const match = compact.match(re);
    if (match) {
      return {
        title: match[1].trim(),
        body: match[2].trim(),
      };
    }
  }

  const generic = compact.match(/^(\d+\.\s*[А-ЯA-ZЁ][^.?!]{2,100})(?:\s+)([\s\S]+)$/);
  if (generic) {
    return {
      title: generic[1].trim(),
      body: generic[2].trim(),
    };
  }

  return null;
}

function renderServiceDescription(fullText: string) {
  const normalized = normalizeServiceTextForRender(fullText);

  const blocks = normalized
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.map((block, idx) => {
    const lines = block
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const isBulletList =
      lines.length > 1 && lines.every((line) => /^[-•]\s+/.test(line));

    if (isBulletList) {
      return (
        <ul key={idx} className="space-y-3">
          {lines.map((line, lineIdx) => (
            <li key={lineIdx} className="flex items-start gap-3 text-white/85 leading-relaxed">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span>{line.replace(/^[-•]\s+/, "")}</span>
            </li>
          ))}
        </ul>
      );
    }

    const section = extractSection(block);
    if (section) {
      return (
        <div
          key={idx}
          className="rounded-xl border border-white/10 bg-white/5 p-5 md:p-6"
        >
          <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
            {section.title}
          </h3>
          <p className="text-white/80 leading-8 whitespace-pre-line">
            {section.body}
          </p>
        </div>
      );
    }

    return (
      <p
        key={idx}
        className="text-white/80 leading-8 whitespace-pre-line"
      >
        {block}
      </p>
    );
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const slug = resolved?.slug || "";
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Услуга не найдена",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = service.short_tagline || service.full_text?.substring(0, 160) || "";
  const priceText = service.price_from ? `от ${service.price_from} ₽` : "";
  const canonical = `${SITE_URL}/services/${slug}`;

  return {
    title: service.title,
    description: `${description} ${priceText}`.trim(),
    keywords: service.tags?.join(", "),
    openGraph: {
      title: service.title,
      description,
      type: "website",
      siteName: "Rahima Consulting",
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
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
  const services = getAllServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export const dynamicParams = false;

export default async function ServicePage({ params }: PageProps) {
  const resolved = await params;
  const slug = resolved?.slug || "";
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.short_tagline || service.full_text?.substring(0, 200),
    url: `${SITE_URL}/services/${slug}`,
    provider: {
      "@type": "Organization",
      name: "Rahima Consulting",
      url: SITE_URL,
    },
    ...(service.price_from && {
      offers: {
        "@type": "Offer",
        price: service.price_from,
        priceCurrency: service.currency || "RUB",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/services/${slug}`,
      },
    }),
  };

  return (
    <div className="relative min-h-screen">
      <ShaderBackground />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative z-10">
        <PageHeader />

        <main className="pt-24 md:pt-32 pb-48 md:pb-60 px-4 sm:px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Услуги", href: "/services" },
                { label: service.title, href: `/services/${slug}` },
              ]}
            />

            <GlassCard className="mb-8" animationDelay={0}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text-purple-blue">
                {service.title}
              </h1>

              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {service.short_tagline || service.full_text?.substring(0, 300)}
              </p>

              {service.price_from && (
                <div className="flex flex-wrap items-baseline gap-3 mb-8">
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {service.price_from} ₽
                  </span>
                  <span className="text-lg text-white/60">
                    {service.price_display || "/месяц"}
                  </span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+79789987222"
                  className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 
                             bg-gradient-to-r from-purple-600 to-blue-600 
                             rounded-lg text-white font-semibold
                             hover:from-purple-700 hover:to-blue-700 
                             transform hover:scale-105 transition-all duration-200
                             shadow-lg shadow-purple-500/50"
                >
                  <Phone className="w-5 h-5" />
                  Заказать консультацию
                </a>

                <Link
                  href="/calculator"
                  className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 
                             bg-white/10 backdrop-blur-sm
                             rounded-lg text-white font-semibold
                             hover:bg-white/20 border border-white/20
                             transform hover:scale-105 transition-all duration-200"
                >
                  <Calculator className="w-5 h-5" />
                  Рассчитать стоимость
                </Link>
              </div>
            </GlassCard>

            {service.includes && service.includes.length > 0 && (
              <GlassCard className="mb-8" animationDelay={200}>
                <div className="flex items-center gap-3 mb-6">
                  <Package className="w-6 h-6 text-purple-300" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Что входит в услугу
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {service.includes.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-lg bg-white/5 
                                 hover:bg-white/10 transition-all duration-200
                                 transform hover:translate-x-2"
                    >
                      <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {service.requirements && service.requirements.length > 0 && (
              <GlassCard className="mb-8" animationDelay={300}>
                <div className="flex items-center gap-3 mb-6">
                  <AlertCircle className="w-6 h-6 text-blue-300" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Что потребуется
                  </h2>
                </div>

                <ul className="space-y-3">
                  {service.requirements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-white/80">
                      <span className="text-blue-300 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            {service.duration_estimate && (
              <GlassCard className="mb-8" animationDelay={400}>
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-purple-300" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      Срок выполнения
                    </h3>
                    <p className="text-white/80">{service.duration_estimate}</p>
                  </div>
                </div>
              </GlassCard>
            )}

            {service.full_text && (
              <GlassCard className="mb-8 prose-glass" animationDelay={500}>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Описание услуги
                </h2>

                <div className="space-y-5">
                  {renderServiceDescription(service.full_text)}
                </div>
              </GlassCard>
            )}

            {service.red_flags && service.red_flags.length > 0 && (
              <GlassCard className="mb-8 border-red-500/30" animationDelay={600}>
                <div className="flex items-center gap-3 mb-6">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Важно знать
                  </h2>
                </div>

                <ul className="space-y-3">
                  {service.red_flags.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-red-300/80">
                      <span className="text-red-400 mt-1">⚠</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            <GlassCard className="text-center" animationDelay={700}>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Готовы начать?
              </h2>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                {service.cta || "Свяжитесь с нами для получения консультации и расчета стоимости"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+79789987222"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 
                             bg-gradient-to-r from-purple-600 to-blue-600 
                             rounded-lg text-white font-semibold
                             hover:from-purple-700 hover:to-blue-700 
                             transform hover:scale-105 transition-all duration-200
                             shadow-lg shadow-purple-500/50"
                >
                  <Phone className="w-5 h-5" />
                  Позвонить нам
                </a>
                <Link
                  href="/contacts"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 
                             bg-white/10 backdrop-blur-sm
                             rounded-lg text-white font-semibold
                             hover:bg-white/20 border border-white/20
                             transform hover:scale-105 transition-all duration-200"
                >
                  Написать нам
                </Link>
              </div>
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  );
}