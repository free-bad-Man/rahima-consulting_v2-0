import { Metadata } from "next";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import { Star, TrendingUp, Users, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Кейсы и отзывы | Rahima Consulting",
  description: "Истории успеха наших клиентов и отзывы о работе с Rahima Consulting",
  openGraph: {
    title: "Кейсы и отзывы | Rahima Consulting",
    description: "Реальные результаты наших клиентов",
    type: "website",
  },
};

const cases = [
  {
    title: "Автоматизация бухгалтерии для торговой сети",
    client: "Розничная сеть «Продукты 24»",
    industry: "Розничная торговля",
    challenge: "5 магазинов, запутанный учет, постоянные ошибки в отчетности",
    solution: "Внедрение облачной 1С, настройка автоматических проводок, обучение персонала",
    results: [
      "Сокращение времени на учет на 70%",
      "Устранение ошибок в отчетности",
      "Экономия 150 000 ₽/месяц на бухгалтерии",
    ],
    duration: "2 месяца",
  },
  {
    title: "Запуск IT-стартапа под ключ",
    client: "SaaS-платформа «TaskFlow»",
    industry: "IT / SaaS",
    challenge: "Запуск с нуля, нужна регистрация, бухгалтерия, маркетинг",
    solution: "Регистрация ООО, постановка учета, разработка финмодели, настройка CRM, маркетинговая стратегия",
    results: [
      "Старт за 3 недели вместо 3 месяцев",
      "Привлечено 50 клиентов в первый месяц",
      "Инвестиции окупились за 4 месяца",
    ],
    duration: "3 недели",
  },
  {
    title: "Увеличение продаж на 300% через CRM",
    client: "Строительная компания «ДомСтрой»",
    industry: "Строительство",
    challenge: "Теряются заявки, нет контроля сделок, низкая конверсия",
    solution: "Внедрение amoCRM, настройка воронок продаж, интеграция с сайтом, обучение менеджеров",
    results: [
      "Рост продаж на 300% за 6 месяцев",
      "Конверсия выросла с 3% до 18%",
      "Окупаемость проекта за 1,5 месяца",
    ],
    duration: "1 месяц",
  },
  {
    title: "Юридическое сопровождение госконтракта",
    client: "ООО «Поставка+»",
    industry: "Оптовая торговля",
    challenge: "Первый опыт работы с госзакупками, сложная документация",
    solution: "Подготовка документов, сопровождение тендера, поддержка при исполнении контракта",
    results: [
      "Выигран тендер на 12 млн рублей",
      "Контракт исполнен без штрафов",
      "Установлены долгосрочные отношения с заказчиком",
    ],
    duration: "3 месяца",
  },
];

const reviews = [
  {
    author: "Михаил Петров",
    company: "ООО «ТехноМир»",
    rating: 5,
    text: "Отличная команда! Помогли быстро наладить учет и избежать штрафов. Особенно понравилась оперативность и внимание к деталям.",
    date: "Декабрь 2025",
  },
  {
    author: "Елена Сидорова",
    company: "ИП Сидорова Е.А.",
    rating: 5,
    text: "Зарегистрировали ИП за 3 дня, помогли с выбором налогового режима. Сейчас ведут мою бухгалтерию - всё четко и в срок!",
    date: "Ноябрь 2025",
  },
  {
    author: "Дмитрий Козлов",
    company: "Агентство «МаркетПро»",
    rating: 5,
    text: "Внедрили CRM и настроили автоматизацию. Продажи выросли в 2 раза! Ребята знают свое дело на 100%.",
    date: "Октябрь 2025",
  },
  {
    author: "Анна Волкова",
    company: "ООО «Инновации»",
    rating: 5,
    text: "Спасибо за профессиональное юридическое сопровождение! Все вопросы решаются быстро, консультируют круглосуточно.",
    date: "Сентябрь 2025",
  },
];

export default function CasesPage() {
  return (
    <div className="relative min-h-screen">
      <ShaderBackground />
      
      <div className="relative z-10">
        <PageHeader />
        
        <main className="pt-24 md:pt-32 pb-20 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            
            <Breadcrumbs items={[
              { label: 'Главная', href: '/' },
              { label: 'Кейсы и отзывы', href: '/cases' },
            ]} />

            {/* Hero Section */}
            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <div className="inline-block p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 mb-6">
                <Award className="w-12 h-12 text-purple-300" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-purple-blue">
                Кейсы и отзывы
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
                Реальные истории успеха наших клиентов и отзывы о нашей работе
              </p>
            </GlassCard>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <GlassCard animationDelay={100} hover={false} className="text-center">
                <div className="text-4xl font-bold text-purple-300 mb-2">500+</div>
                <div className="text-white/80">довольных клиентов</div>
              </GlassCard>
              <GlassCard animationDelay={150} hover={false} className="text-center">
                <div className="text-4xl font-bold text-blue-300 mb-2">10</div>
                <div className="text-white/80">лет опыта</div>
              </GlassCard>
              <GlassCard animationDelay={200} hover={false} className="text-center">
                <div className="text-4xl font-bold text-purple-300 mb-2">98%</div>
                <div className="text-white/80">положительных отзывов</div>
              </GlassCard>
              <GlassCard animationDelay={250} hover={false} className="text-center">
                <div className="text-4xl font-bold text-blue-300 mb-2">24/7</div>
                <div className="text-white/80">поддержка клиентов</div>
              </GlassCard>
            </div>

            {/* Cases Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Наши кейсы
              </h2>
              
              <div className="space-y-8">
                {cases.map((caseItem, index) => (
                  <GlassCard key={index} animationDelay={300 + index * 100}>
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                            <TrendingUp className="w-5 h-5 text-purple-300" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                              {caseItem.title}
                            </h3>
                            <div className="text-purple-300 font-medium">{caseItem.client}</div>
                            <div className="text-white/60 text-sm">{caseItem.industry}</div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="text-sm font-semibold text-purple-300 mb-1">Задача:</div>
                            <p className="text-white/80">{caseItem.challenge}</p>
                          </div>

                          <div>
                            <div className="text-sm font-semibold text-purple-300 mb-1">Решение:</div>
                            <p className="text-white/80">{caseItem.solution}</p>
                          </div>

                          <div>
                            <div className="text-sm font-semibold text-purple-300 mb-2">Результаты:</div>
                            <ul className="space-y-2">
                              {caseItem.results.map((result, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-white/80">
                                  <span className="text-green-400 mt-1">✓</span>
                                  {result}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="md:w-40">
                        <div className="glassmorphism-card p-4 text-center">
                          <div className="text-sm text-white/60 mb-1">Срок реализации</div>
                          <div className="text-xl font-bold text-purple-300">{caseItem.duration}</div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Отзывы клиентов
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {reviews.map((review, index) => (
                  <GlassCard key={index} animationDelay={100 + index * 50}>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <p className="text-white/90 mb-4 leading-relaxed">
                      "{review.text}"
                    </p>
                    
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <div className="p-2 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                        <Users className="w-5 h-5 text-purple-300" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{review.author}</div>
                        <div className="text-sm text-white/60">{review.company}</div>
                        <div className="text-xs text-white/40">{review.date}</div>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <GlassCard className="text-center" animationDelay={500}>
              <h2 className="text-3xl font-bold text-white mb-4">
                Станьте следующей историей успеха!
              </h2>
              <p className="text-white/80 mb-6">
                Расскажите о своем проекте, и мы поможем достичь ваших целей
              </p>
              <a 
                href="/contacts"
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 
                           rounded-lg text-white font-semibold
                           hover:from-purple-700 hover:to-blue-700 
                           transform hover:scale-105 transition-all duration-200
                           shadow-lg shadow-purple-500/50"
              >
                Начать сотрудничество
              </a>
            </GlassCard>

          </div>
        </main>
      </div>
    </div>
  );
}

