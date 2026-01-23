import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import { Star, TrendingUp, ArrowRight, Quote, CheckCircle2 } from "lucide-react";
import { getAllCases } from "@/lib/cases-data";

export const metadata: Metadata = {
  title: "Кейсы и отзывы | Rahima Consulting",
  description: "Истории успеха наших клиентов и отзывы о работе с Rahima Consulting",
  openGraph: {
    title: "Кейсы и отзывы | Rahima Consulting",
    description: "Реальные результаты наших клиентов",
    type: "website",
  },
};

export default function CasesPage() {
  const cases = getAllCases();
  
  return (
    <div className="relative min-h-screen">
      <ShaderBackground />
      
      <div className="relative z-10">
        <PageHeader />
        
        <main className="pt-24 md:pt-32 pb-32 md:pb-40 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            
            <Breadcrumbs items={[
              { label: 'Главная', href: '/' },
              { label: 'Кейсы', href: '/cases' },
            ]} />

            {/* Hero Section */}
            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-purple-blue">
                Кейсы и истории успеха
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
                Реальные примеры того, как мы помогаем бизнесу расти и решать сложные задачи
              </p>
            </GlassCard>

            {/* Cases Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {cases.map((caseStudy, index) => (
                <Link 
                  key={caseStudy.slug} 
                  href={`/cases/${caseStudy.slug}`}
                  className="block group"
                >
                  <GlassCard 
                    className="h-full flex flex-col"
                    animationDelay={100 + index * 50}
                  >
                    {/* Category Badge */}
                    <div className="inline-flex items-center gap-2 text-sm text-purple-300 mb-3">
                      <TrendingUp className="w-4 h-4" />
                      <span>{caseStudy.category}</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                      {caseStudy.title}
                    </h3>
                    
                    {/* Client */}
                    <p className="text-white/60 text-sm mb-4">
                      <span className="font-semibold">Клиент:</span> {caseStudy.client}
                    </p>
                    
                    {/* Challenge - short version */}
                    <p className="text-white/70 mb-4 flex-grow">
                      {caseStudy.challenge.substring(0, 150)}...
                    </p>
                    
                    {/* Results Preview */}
                    <div className="mb-4 space-y-2">
                      {caseStudy.results.slice(0, 2).map((result, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/60 text-sm">{result}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-white/50 text-sm">
                        Срок: {caseStudy.timeline}
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

            {/* Testimonials Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Отзывы клиентов</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {cases.slice(0, 4).map((caseStudy, index) => (
                  <GlassCard 
                    key={caseStudy.slug}
                    className="relative"
                    animationDelay={200 + index * 50}
                  >
                    <Quote className="absolute top-4 right-4 w-8 h-8 text-purple-300/20" />
                    
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <p className="text-white/80 mb-4 italic">
                      "{caseStudy.testimonial.text}"
                    </p>
                    
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {caseStudy.testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {caseStudy.testimonial.author}
                        </p>
                        <p className="text-white/50 text-xs">
                          {caseStudy.client}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <GlassCard className="text-center" animationDelay={400}>
              <h2 className="text-3xl font-bold text-white mb-4">
                Готовы стать нашим следующим успешным кейсом?
              </h2>
              <p className="text-white/80 mb-6">
                Расскажите о своей задаче, и мы предложим эффективное решение
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
