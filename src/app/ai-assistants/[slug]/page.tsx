import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import { getAllAIAssistants, getAIAssistantBySlug, type AIAssistant } from "@/lib/ai-assistants-data";
import { Check, Phone, Calculator, Cpu, Zap, Settings, Code, Sparkles } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const slug = resolved?.slug || "";
  const assistant = getAIAssistantBySlug(slug);
  
  if (!assistant) {
    return {
      title: "ИИ Ассистент не найден",
    };
  }

  const description = assistant.short_tagline || assistant.description || '';

  return {
    title: `${assistant.title} | Rahima Consulting`,
    description: `${description} ${assistant.price_display || ''}`.trim(),
    openGraph: {
      title: assistant.title,
      description: description,
      type: 'website',
      siteName: 'Rahima Consulting',
    },
    twitter: {
      card: 'summary_large_image',
      title: assistant.title,
      description: description,
    },
    alternates: {
      canonical: `https://your-domain.com/ai-assistants/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateStaticParams() {
  const assistants = getAllAIAssistants();
  
  return assistants.map((assistant) => ({
    slug: assistant.slug,
  }));
}

export default async function AIAssistantPage({ params }: PageProps) {
  const resolved = await params;
  const slug = resolved?.slug || "";
  const assistant = getAIAssistantBySlug(slug);

  if (!assistant) {
    notFound();
  }

  return (
    <>
      <ShaderBackground />
      
      <div className="min-h-screen relative z-10">
        <PageHeader />
        
        <main className="pt-24 md:pt-32 pb-48 md:pb-60 px-4 sm:px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            
            <Breadcrumbs items={[
              { label: 'Главная', href: '/' },
              { label: 'ИИ-Ассистенты', href: '/ai-assistants' },
              { label: assistant.title, href: `/ai-assistants/${assistant.slug}` },
            ]} />

            {/* Hero Section */}
            <GlassCard className="mb-8" animationDelay={0}>
              <div className="flex items-start gap-4 mb-6">
                <Cpu className="w-12 h-12 text-purple-300 flex-shrink-0" />
                <div className="flex-grow">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {assistant.title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/80">
                    {assistant.short_tagline}
                  </p>
                </div>
              </div>

              {/* Price */}
              {assistant.price_display && (
                <div className="mb-8">
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {assistant.price_display}
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
                  Заказать консультацию
                </Link>
                <Link
                  href="/dashboard/orders"
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

            {/* Description */}
            {assistant.description && (
              <GlassCard className="mb-8" animationDelay={100}>
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-purple-300" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    О системе
                  </h2>
                </div>
                <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                  {assistant.description}
                </p>
              </GlassCard>
            )}

            {/* Features */}
            {assistant.features && assistant.features.length > 0 && (
              <GlassCard className="mb-8" animationDelay={150}>
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-6 h-6 text-purple-300" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Основные возможности
                  </h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {assistant.features.map((feature, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{feature}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Use Cases */}
            {assistant.use_cases && assistant.use_cases.length > 0 && (
              <GlassCard className="mb-8" animationDelay={200}>
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="w-6 h-6 text-purple-300" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Сценарии использования
                  </h2>
                </div>
                
                <div className="space-y-3">
                  {assistant.use_cases.map((useCase, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{useCase}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Tech Stack */}
            {assistant.tech_stack && assistant.tech_stack.length > 0 && (
              <GlassCard className="mb-8" animationDelay={250}>
                <div className="flex items-center gap-3 mb-6">
                  <Code className="w-6 h-6 text-purple-300" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Технологический стек
                  </h2>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {assistant.tech_stack.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-4 py-2 rounded-lg bg-white/10 text-white/90 font-medium
                               hover:bg-white/20 transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Integration */}
            {assistant.integration && (
              <GlassCard className="mb-8" animationDelay={300}>
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="w-6 h-6 text-purple-300" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Интеграция
                  </h2>
                </div>
                <p className="text-white/80 text-lg">{assistant.integration}</p>
              </GlassCard>
            )}

            {/* CTA */}
            <GlassCard className="text-center" animationDelay={350}>
              <h2 className="text-3xl font-bold text-white mb-4">
                Готовы внедрить ИИ в свой бизнес?
              </h2>
              <p className="text-white/80 mb-6">
                Оставьте заявку, и мы проведем консультацию по внедрению
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg
                           bg-gradient-to-r from-purple-600 to-blue-600
                           hover:from-purple-700 hover:to-blue-700
                           text-white font-medium transition-all text-lg
                           transform hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  Заказать консультацию
                </Link>
                <Link
                  href="tel:+79876543210"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg
                           bg-white/10 hover:bg-white/20 backdrop-blur-sm
                           text-white font-medium transition-all text-lg
                           transform hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  Позвонить нам
                </Link>
                <Link
                  href="/contacts"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg
                           bg-white/10 hover:bg-white/20 backdrop-blur-sm
                           text-white font-medium transition-all text-lg
                           transform hover:scale-105"
                >
                  Написать нам
                </Link>
              </div>
            </GlassCard>

          </div>
        </main>
      </div>
    </>
  );
}

