import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import { Calculator, Building2, Cpu, Newspaper, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "ИИ-Ассистенты для бизнеса | Rahima Consulting",
  description: "Искусственный интеллект для автоматизации бухгалтерии, маркетинга, продаж и управления",
  openGraph: {
    title: "ИИ-Ассистенты | Rahima Consulting",
    description: "Внедрение ИИ для автоматизации бизнес-процессов",
    type: "website",
  },
};

const aiAssistants = [
  {
    category: "Бухгалтерия",
    icon: Calculator,
    description: "ИИ-помощники для автоматизации учета и аналитики",
    items: [
      {
        title: "ИИ-ассистент для бухгалтерии",
        description: "Автоматизация рутинных операций: проверка документов, контроль расходов, подготовка отчетов",
        slug: "ii-assistant-buhgalteriya",
        features: ["Анализ документов", "Автоматическая проводка", "Контроль дебиторки"],
      },
      {
        title: "Анализ 1С, банка и ЭДО",
        description: "ИИ-анализ данных из 1С, банковских выписок и систем электронного документооборота",
        slug: "analiz-1c-bank-edo",
        features: ["Сверка платежей", "Выявление ошибок", "Прогнозирование"],
      },
      {
        title: "Подсказки по проводкам и отчётности",
        description: "Умный помощник для корректного формирования проводок и заполнения отчетности",
        slug: "podskazki-provodki",
        features: ["Подсказки в реальном времени", "Проверка правильности", "База знаний"],
      },
      {
        title: "Формирование задач для бухгалтера",
        description: "Автоматическая генерация и распределение задач между сотрудниками",
        slug: "formirovanie-zadach",
        features: ["Приоритизация", "Напоминания", "Отчеты о выполнении"],
      },
    ],
  },
  {
    category: "Регистрация и юрподдержка",
    icon: Building2,
    description: "ИИ для юридического сопровождения",
    items: [
      {
        title: "ИИ-ассистент по регистрации и изменениям",
        description: "Помощь в подготовке документов для регистрации бизнеса и внесения изменений",
        slug: "ii-registraciya",
        features: ["Проверка документов", "Генерация заявлений", "Контроль сроков"],
      },
      {
        title: "ИИ-ассистент для госзакупок",
        description: "Анализ тендеров, подготовка документации и контроль исполнения контрактов",
        slug: "ii-goszakupki",
        features: ["Поиск тендеров", "Подготовка заявок", "Мониторинг конкурентов"],
      },
      {
        title: "ИИ-ассистент по корпоративным документам",
        description: "Генерация и проверка уставов, протоколов, договоров и других документов",
        slug: "ii-korporativnye-dokumenty",
        features: ["Генерация документов", "Юридическая проверка", "Шаблоны"],
      },
    ],
  },
  {
    category: "Автоматизация и CRM",
    icon: Cpu,
    description: "ИИ для оптимизации бизнес-процессов",
    items: [
      {
        title: "ИИ-ассистент по автоматизации бизнес-процессов",
        description: "Умный помощник для выявления узких мест и предложения решений",
        slug: "ii-avtomatizaciya-processov",
        features: ["Анализ процессов", "Рекомендации", "Внедрение автоматизации"],
      },
      {
        title: "Генерация ТЗ для amoCRM и n8n",
        description: "Автоматическое создание технических заданий для настройки CRM",
        slug: "generaciya-tz",
        features: ["Анализ требований", "Создание ТЗ", "Готовые сценарии"],
      },
      {
        title: "Предложения по улучшению воронок",
        description: "Анализ и рекомендации по оптимизации воронок продаж",
        slug: "uluchshenie-voronok",
        features: ["A/B тестирование", "Аналитика конверсий", "Точки роста"],
      },
    ],
  },
  {
    category: "Маркетинг и контент",
    icon: Newspaper,
    description: "ИИ для создания контента и анализа маркетинга",
    items: [
      {
        title: "ИИ-ассистент по контенту и SMM",
        description: "Помощник для создания постов, статей и управления социальными сетями",
        slug: "ii-kontent-smm",
        features: ["Генерация текстов", "Подбор изображений", "Планирование публикаций"],
      },
      {
        title: "Генерация контент-планов и постов",
        description: "Автоматическое создание контент-планов и готовых постов для соцсетей",
        slug: "generaciya-kontent-planov",
        features: ["Контент-календарь", "Идеи для постов", "Адаптация под площадку"],
      },
      {
        title: "Анализ откликов и рекомендации",
        description: "ИИ-анализ реакции аудитории и рекомендации по улучшению контента",
        slug: "analiz-otkl ikov",
        features: ["Sentiment анализ", "Тренды", "Персонализация"],
      },
    ],
  },
];

export default function AIAssistantsPage() {
  return (
    <div className="relative min-h-screen">
      <ShaderBackground />
      
      <div className="relative z-10">
        <PageHeader />
        
        <main className="pt-24 md:pt-32 pb-20 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            
            <Breadcrumbs items={[
              { label: 'Главная', href: '/' },
              { label: 'ИИ-Ассистенты', href: '/ai-assistants' },
            ]} />

            {/* Hero Section */}
            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <div className="inline-block p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 mb-6">
                <Sparkles className="w-12 h-12 text-purple-300" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-purple-blue">
                ИИ-Ассистенты для бизнеса
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
                Используйте силу искусственного интеллекта для автоматизации рутинных задач 
                и принятия умных бизнес-решений
              </p>
            </GlassCard>

            {/* AI Assistants Categories */}
            {aiAssistants.map((category, catIndex) => {
              const Icon = category.icon;
              
              return (
                <div key={category.category} className="mb-12">
                  <GlassCard 
                    className="mb-6" 
                    animationDelay={100 + catIndex * 50}
                    hover={false}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                        <Icon className="w-6 h-6 text-purple-300" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white">
                        {category.category}
                      </h2>
                    </div>
                    <p className="text-white/70 ml-16">{category.description}</p>
                  </GlassCard>

                  <div className="grid md:grid-cols-2 gap-6">
                    {category.items.map((assistant, assistantIndex) => (
                      <Link 
                        key={assistant.slug} 
                        href={`/ai-assistants/${assistant.slug}`}
                        className="block group"
                      >
                        <GlassCard 
                          className="h-full flex flex-col"
                          animationDelay={200 + catIndex * 50 + assistantIndex * 50}
                        >
                          <h3 className="text-xl font-semibold text-white mb-3">
                            {assistant.title}
                          </h3>
                          
                          <p className="text-white/70 mb-4">
                            {assistant.description}
                          </p>

                          <div className="mb-4 flex-grow">
                            <div className="text-sm font-semibold text-purple-300 mb-2">
                              Возможности:
                            </div>
                            <ul className="space-y-1">
                              {assistant.features.map((feature, idx) => (
                                <li key={idx} className="text-white/60 text-sm flex items-center gap-2">
                                  <span className="text-purple-400">✓</span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex items-center text-purple-300 font-medium group-hover:text-purple-200 transition-colors">
                            Узнать больше
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </GlassCard>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Benefits Section */}
            <GlassCard className="mb-8" animationDelay={400}>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Преимущества ИИ-ассистентов
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-300 mb-2">70%</div>
                  <div className="text-white/80">экономия времени на рутинных задачах</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-300 mb-2">24/7</div>
                  <div className="text-white/80">работа без перерывов и выходных</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-300 mb-2">0</div>
                  <div className="text-white/80">человеческих ошибок в расчетах</div>
                </div>
              </div>
            </GlassCard>

            {/* CTA Section */}
            <GlassCard className="text-center" animationDelay={500}>
              <h2 className="text-3xl font-bold text-white mb-4">
                Готовы внедрить ИИ в свой бизнес?
              </h2>
              <p className="text-white/80 mb-6">
                Получите бесплатную консультацию и узнайте, как ИИ может помочь вашему бизнесу
              </p>
              <Link 
                href="/contacts"
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 
                           rounded-lg text-white font-semibold
                           hover:from-purple-700 hover:to-blue-700 
                           transform hover:scale-105 transition-all duration-200
                           shadow-lg shadow-purple-500/50"
              >
                Получить консультацию
              </Link>
            </GlassCard>

          </div>
        </main>
      </div>
    </div>
  );
}

