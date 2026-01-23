import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import { getAllServices, getServiceBySlug, type Service } from "@/lib/services-data";
import { Check, Phone, Calculator, AlertCircle, Clock, Package } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const slug = resolved?.slug || "";
  const service = getServiceBySlug(slug);
  
  if (!service) {
    return {
      title: "Услуга не найдена",
    };
  }

  const description = service.short_tagline || service.full_text?.substring(0, 160) || '';
  const priceText = service.price_from ? `от ${service.price_from} ₽` : '';

  return {
    title: `${service.title} | Rahima Consulting`,
    description: `${description} ${priceText}`.trim(),
    keywords: service.tags?.join(', '),
    openGraph: {
      title: service.title,
      description: description,
      type: 'website',
      siteName: 'Rahima Consulting',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.title,
      description: description,
    },
    alternates: {
      canonical: `https://your-domain.com/services/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map(service => ({
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

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.short_tagline || service.full_text?.substring(0, 200),
    "provider": {
      "@type": "Organization",
      "name": "Rahima Consulting",
      "url": "https://your-domain.com",
    },
    ...(service.price_from && {
      "offers": {
        "@type": "Offer",
        "price": service.price_from,
        "priceCurrency": service.currency || "RUB",
        "availability": "https://schema.org/InStock",
      }
    }),
  };

  return (
    <div className="relative min-h-screen">
      <ShaderBackground />
      
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="relative z-10">
        <PageHeader />
        
        <main className="pt-24 md:pt-32 pb-48 md:pb-60 px-4 sm:px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            
            <Breadcrumbs items={[
              { label: 'Главная', href: '/' },
              { label: 'Услуги', href: '/services' },
              { label: service.title, href: `/services/${slug}` },
            ]} />

            {/* Main Service Card */}
            <GlassCard className="mb-8" animationDelay={0}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text-purple-blue">
                {service.title}
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {service.short_tagline || service.full_text?.substring(0, 300)}
              </p>

              {/* Price */}
              {service.price_from && (
                <div className="flex flex-wrap items-baseline gap-3 mb-8">
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {service.price_from} ₽
                  </span>
                  <span className="text-lg text-white/60">
                    {service.price_display || '/месяц'}
                  </span>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+7"
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

            {/* What's Included */}
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

            {/* Requirements */}
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

            {/* Duration */}
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

            {/* Full Description */}
            {service.full_text && (
              <GlassCard className="mb-8 prose-glass" animationDelay={500}>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Описание услуги
                </h2>
                <div className="text-white/80 leading-relaxed whitespace-pre-line">
                  {service.full_text}
                </div>
              </GlassCard>
            )}

            {/* Red Flags */}
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

            {/* Final CTA */}
            <GlassCard className="text-center" animationDelay={700}>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Готовы начать?
              </h2>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                {service.cta || 'Свяжитесь с нами для получения консультации и расчета стоимости'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+7"
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
