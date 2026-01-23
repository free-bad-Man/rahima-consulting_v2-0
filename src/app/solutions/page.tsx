import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import { Briefcase, ArrowRight, CheckCircle } from "lucide-react";
import { getAllSolutions } from "@/lib/solutions-data";

export const metadata: Metadata = {
  title: "Решения для бизнеса | Rahima Consulting",
  description: "Комплексные решения для старта и развития бизнеса: автоматизация, маркетинг, юридическая поддержка",
  openGraph: {
    title: "Решения для бизнеса | Rahima Consulting",
    description: "Готовые решения под ключ для вашего бизнеса",
    type: "website",
  },
};

export default function SolutionsPage() {
  const solutions = getAllSolutions();
  
  return (
    <div className="relative min-h-screen">
      <ShaderBackground />
      
      <div className="relative z-10">
        <PageHeader />
        
        <main className="pt-24 md:pt-32 pb-48 md:pb-60 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            
            <Breadcrumbs items={[
              { label: 'Главная', href: '/' },
              { label: 'Решения', href: '/solutions' },
            ]} />

            {/* Hero Section */}
            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-purple-blue">
                Готовые решения для бизнеса
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
                Комплексные пакеты услуг под ключ для решения конкретных задач вашего бизнеса
              </p>
            </GlassCard>

            {/* Solutions Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {solutions.map((solution, index) => (
                <Link 
                  key={solution.slug} 
                  href={`/solutions/${solution.slug}`}
                  className="block group"
                >
                  <GlassCard 
                    className="h-full flex flex-col"
                    animationDelay={100 + index * 50}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-purple-300" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {solution.title}
                        </h3>
                        <p className="text-white/70 text-sm mb-3">
                          {solution.short_tagline}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-4 flex-grow">
                      <div className="space-y-2">
                        {solution.advantages.slice(0, 3).map((advantage, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-white/60 text-sm">{advantage}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-xl font-bold text-purple-300">
                        {solution.price_display}
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
                Нужно индивидуальное решение?
              </h2>
              <p className="text-white/80 mb-6">
                Мы создадим уникальное решение специально под ваши задачи и бюджет
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

