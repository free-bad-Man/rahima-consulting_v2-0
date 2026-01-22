import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import { Rocket, TrendingUp, Shield, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Решения для бизнеса | Rahima Consulting",
  description: "Комплексные решения для старта и развития бизнеса: автоматизация, маркетинг, юридическая поддержка",
  openGraph: {
    title: "Решения для бизнеса | Rahima Consulting",
    description: "Готовые решения под ключ для вашего бизнеса",
    type: "website",
  },
};

const solutions = [
  {
    category: "Для старта бизнеса",
    icon: Rocket,
    items: [
      {
        title: "Бизнес-старт под ключ",
        description: "Полное сопровождение запуска нового бизнеса от регистрации до первых продаж",
        slug: "biznes-start-pod-klyuch",
        price: "от 50 000 ₽",
      },
      {
        title: "Финансовая модель для нового бизнеса",
        description: "Разработка финансовой модели и планирование на 12 месяцев",
        slug: "finansovaya-model",
        price: "от 30 000 ₽",
      },
      {
        title: "Базовая упаковка: сайт + Яндекс.Бизнес + VK",
        description: "Комплексная упаковка бизнеса в интернете для быстрого старта",
        slug: "bazovaya-upakovka",
        price: "от 40 000 ₽",
      },
    ],
  },
  {
    category: "Для действующего бизнеса",
    icon: TrendingUp,
    items: [
      {
        title: "Искусственный интеллект в твоей бухгалтерии",
        description: "Внедрение ИИ для автоматизации бухгалтерских процессов и аналитики",
        slug: "ii-v-buhgalterii",
        price: "от 80 000 ₽",
      },
      {
        title: "Перевод бухгалтерии в облачную 1С",
        description: "Миграция бухгалтерского учета в облачные решения с настройкой доступов",
        slug: "oblachnaya-1c",
        price: "от 25 000 ₽",
      },
      {
        title: "Комплексное сопровождение (бухгалтер + юрист)",
        description: "Полная поддержка бизнеса с командой профессионалов",
        slug: "kompleksnoe-soprovozhdenie",
        price: "от 35 000 ₽/мес",
      },
    ],
  },
  {
    category: "Продажи и маркетинг",
    icon: Users,
    items: [
      {
        title: "Автоматизированный отдел продаж",
        description: "Настройка CRM, воронок продаж и автоматизации процессов",
        slug: "avtomatizirovannyj-otdel-prodazh",
        price: "от 60 000 ₽",
      },
      {
        title: "Маркетинг под ключ",
        description: "Разработка и реализация комплексных маркетинговых стратегий",
        slug: "marketing-pod-klyuch",
        price: "от 70 000 ₽/мес",
      },
      {
        title: "CRM + сайт + сквозная аналитика",
        description: "Интеграция всех систем для полного контроля маркетинга",
        slug: "crm-sajt-analitika",
        price: "от 90 000 ₽",
      },
    ],
  },
  {
    category: "Контроль и безопасность",
    icon: Shield,
    items: [
      {
        title: "Бизнес без штрафов",
        description: "Системы контроля и аудита для предотвращения штрафов и санкций",
        slug: "biznes-bez-shtrafov",
        price: "от 15 000 ₽/мес",
      },
      {
        title: "Аудит договоров и корпоративных документов",
        description: "Юридическая экспертиза документов для минимизации рисков",
        slug: "audit-dogovorov",
        price: "от 20 000 ₽",
      },
      {
        title: "Настройка ИИ-ассистентов под процессы компании",
        description: "Индивидуальная настройка ИИ для оптимизации бизнес-процессов",
        slug: "nastrojka-ii-assistentov",
        price: "от 50 000 ₽",
      },
    ],
  },
];

export default function SolutionsPage() {
  return (
    <div className="relative min-h-screen">
      <ShaderBackground />
      
      <div className="relative z-10">
        <PageHeader />
        
        <main className="pt-24 md:pt-32 pb-20 px-4 sm:px-6 lg:px-12">
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

            {/* Solutions Categories */}
            {solutions.map((category, catIndex) => {
              const Icon = category.icon;
              
              return (
                <div key={category.category} className="mb-12">
                  <GlassCard 
                    className="mb-6" 
                    animationDelay={100 + catIndex * 50}
                    hover={false}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                        <Icon className="w-6 h-6 text-purple-300" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white">
                        {category.category}
                      </h2>
                    </div>
                  </GlassCard>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.items.map((solution, solutionIndex) => (
                      <Link 
                        key={solution.slug} 
                        href={`/solutions/${solution.slug}`}
                        className="block group"
                      >
                        <GlassCard 
                          className="h-full flex flex-col"
                          animationDelay={200 + catIndex * 50 + solutionIndex * 50}
                        >
                          <h3 className="text-xl font-semibold text-white mb-3">
                            {solution.title}
                          </h3>
                          
                          <p className="text-white/70 mb-4 flex-grow">
                            {solution.description}
                          </p>

                          <div className="mb-4">
                            <span className="text-2xl font-bold text-purple-300">
                              {solution.price}
                            </span>
                          </div>

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

