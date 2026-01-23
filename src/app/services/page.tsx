import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import { getAllServices } from "@/lib/services-data";
import { ArrowRight, Calculator, Building2, Cpu, TrendingUp, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Услуги | Rahima Consulting",
  description: "Полный спектр услуг: бухгалтерское сопровождение, регистрация бизнеса, юридическая поддержка, автоматизация и маркетинг",
  openGraph: {
    title: "Услуги | Rahima Consulting",
    description: "Полный спектр услуг для вашего бизнеса",
    type: "website",
  },
};

const categoryIcons: Record<string, any> = {
  'Бухгалтерия': Calculator,
  'Регистрация бизнеса': Building2,
  'Юридическое сопровождение': Users,
  'Автоматизация бизнеса': Cpu,
  'Маркетинг и SMM': TrendingUp,
};

export default function ServicesPage() {
  const allServices = getAllServices();

  // Group services by category
  const categories = [
    {
      name: 'Бухгалтерия',
      services: allServices.filter(s => 
        s.title.toLowerCase().includes('бухгалтер') || 
        s.title.toLowerCase().includes('учет') ||
        s.title.toLowerCase().includes('отчет')
      ),
    },
    {
      name: 'Регистрация бизнеса',
      services: allServices.filter(s => 
        s.title.toLowerCase().includes('регистрация') || 
        s.title.toLowerCase().includes('ликвидация') ||
        s.title.toLowerCase().includes('егрюл') ||
        s.title.toLowerCase().includes('изменения')
      ),
    },
    {
      name: 'Юридическое сопровождение',
      services: allServices.filter(s => 
        s.title.toLowerCase().includes('юрид') || 
        s.title.toLowerCase().includes('право') ||
        s.title.toLowerCase().includes('договор') ||
        s.title.toLowerCase().includes('закупк')
      ),
    },
    {
      name: 'Автоматизация бизнеса',
      services: allServices.filter(s => 
        s.title.toLowerCase().includes('автоматизация') || 
        s.title.toLowerCase().includes('crm') ||
        s.title.toLowerCase().includes('n8n') ||
        s.title.toLowerCase().includes('дашборд')
      ),
    },
    {
      name: 'Маркетинг и SMM',
      services: allServices.filter(s => 
        s.title.toLowerCase().includes('маркетинг') || 
        s.title.toLowerCase().includes('smm') ||
        s.title.toLowerCase().includes('реклам') ||
        s.title.toLowerCase().includes('контент')
      ),
    },
  ].filter(cat => cat.services.length > 0);

  return (
    <div className="relative min-h-screen">
      <ShaderBackground />
      
      <div className="relative z-10">
        <PageHeader />
        
        <main className="pt-24 md:pt-32 pb-48 md:pb-60 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            
            <Breadcrumbs items={[
              { label: 'Главная', href: '/' },
              { label: 'Услуги', href: '/services' },
            ]} />

            {/* Hero Section */}
            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-purple-blue">
                Наши услуги
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
                Полный спектр профессиональных услуг для развития вашего бизнеса
              </p>
            </GlassCard>

            {/* Categories */}
            {categories.map((category, catIndex) => {
              const Icon = categoryIcons[category.name] || Calculator;
              
              return (
                <div key={category.name} className="mb-12">
                  <GlassCard 
                    className="mb-6" 
                    animationDelay={100 + catIndex * 50}
                    hover={false}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                        <Icon className="w-6 h-6 text-purple-300" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white">
                        {category.name}
                      </h2>
                    </div>
                  </GlassCard>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.services.map((service, serviceIndex) => (
                      <Link 
                        key={service.slug} 
                        href={`/services/${service.slug}`}
                        className="block"
                      >
                        <GlassCard 
                          className="h-full flex flex-col"
                          animationDelay={200 + catIndex * 50 + serviceIndex * 50}
                        >
                          <h3 className="text-xl font-semibold text-white mb-3">
                            {service.title}
                          </h3>
                          
                          <p className="text-white/70 mb-4 flex-grow line-clamp-3">
                            {service.short_tagline || service.full_text?.substring(0, 150)}
                          </p>

                          {service.price_from && (
                            <div className="mb-4">
                              <span className="text-2xl font-bold text-purple-300">
                                {service.price_from} ₽
                              </span>
                              <span className="text-white/60 ml-2">
                                {service.price_display || '/месяц'}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center text-purple-300 font-medium group-hover:text-purple-200 transition-colors">
                            Подробнее
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </GlassCard>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* CTA Section */}
            <GlassCard className="text-center" animationDelay={400}>
              <h2 className="text-3xl font-bold text-white mb-4">
                Не нашли нужную услугу?
              </h2>
              <p className="text-white/80 mb-6">
                Свяжитесь с нами, и мы подберём индивидуальное решение для вашего бизнеса
              </p>
              <Link 
                href="/contacts"
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 
                           rounded-lg text-white font-semibold
                           hover:from-purple-700 hover:to-blue-700 
                           transform hover:scale-105 transition-all duration-200
                           shadow-lg shadow-purple-500/50"
              >
                Связаться с нами
              </Link>
            </GlassCard>

          </div>
        </main>
      </div>
    </div>
  );
}

