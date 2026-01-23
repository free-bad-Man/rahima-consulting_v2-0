import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import { Bot, ArrowRight, Zap, CheckCircle } from "lucide-react";
import { getAllAIAssistants } from "@/lib/ai-assistants-data";

export const metadata: Metadata = {
  title: "ИИ-Ассистенты для бизнеса | Rahima Consulting",
  description: "Искусственный интеллект для автоматизации бухгалтерии, маркетинга, продаж и управления",
  openGraph: {
    title: "ИИ-Ассистенты | Rahima Consulting",
    description: "Внедрение ИИ для автоматизации бизнес-процессов",
    type: "website",
  },
};

export default function AIAssistantsPage() {
  const aiAssistants = getAllAIAssistants();
  
  return (
    <div className="relative min-h-screen">
      <ShaderBackground />
      
      <div className="relative z-10">
        <PageHeader />
        
        <main className="pt-24 md:pt-32 pb-48 md:pb-60 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            
            <Breadcrumbs items={[
              { label: 'Главная', href: '/' },
              { label: 'ИИ-Ассистенты', href: '/ai-assistants' },
            ]} />

            {/* Hero Section */}
            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <div className="inline-block p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 mb-6">
                <Zap className="w-12 h-12 text-purple-300" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-purple-blue">
                ИИ-Ассистенты для бизнеса
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
                Используйте силу искусственного интеллекта для автоматизации рутинных задач 
                и принятия умных бизнес-решений
              </p>
            </GlassCard>

            {/* AI Assistants Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {aiAssistants.map((assistant, index) => (
                <Link 
                  key={assistant.slug} 
                  href={`/ai-assistants/${assistant.slug}`}
                  className="block group"
                >
                  <GlassCard 
                    className="h-full flex flex-col"
                    animationDelay={100 + index * 50}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex-shrink-0">
                        <Bot className="w-6 h-6 text-purple-300" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {assistant.title}
                        </h3>
                        <p className="text-white/70 text-sm mb-3 line-clamp-2">
                          {assistant.short_tagline}...
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-4 flex-grow">
                      <p className="text-white/60 text-sm mb-3">{assistant.description.substring(0, 150)}...</p>
                      <div className="space-y-2">
                        <p className="text-white/80 text-xs font-semibold mb-1">Основные возможности:</p>
                        {assistant.features.slice(0, 3).map((feature, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-white/60 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-xl font-bold text-purple-300">
                        {assistant.price_display}
                      </span>
                      <div className="flex items-center text-purple-300 font-medium group-hover:text-purple-200 transition-colors">
                        Подробнее
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>

            {/* CTA Section */}
            <GlassCard className="text-center" animationDelay={400}>
              <h2 className="text-3xl font-bold text-white mb-4">
                Нужен индивидуальный ИИ-ассистент?
              </h2>
              <p className="text-white/80 mb-6">
                Мы разработаем уникального ИИ-помощника специально под задачи вашего бизнеса
              </p>
              <Link 
                href="/contacts"
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 
                           rounded-lg text-white font-semibold
                           hover:from-purple-700 hover:to-blue-700 
                           transform hover:scale-105 transition-all duration-200
                           shadow-lg shadow-purple-500/50"
              >
                Обсудить проект
              </Link>
            </GlassCard>

          </div>
        </main>
      </div>
    </div>
  );
}

