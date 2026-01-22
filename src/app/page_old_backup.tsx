"use client";

import { useState, Suspense, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Menu, User as UserIcon, Calculator, MessageCircle, Phone } from "lucide-react";
import { Drawer } from "vaul";
import MegaMenu, { type MegaMenuItem } from "@/components/ui/mega-menu";
import AuthButton from "@/components/auth-button";
import NotificationsDropdown from "@/components/notifications-dropdown";
 

// Lazy loading для тяжелых компонентов
const ShaderBackground = dynamic(() => import("@/components/ui/shader-background"), { 
  ssr: false,
  loading: () => (
    <div 
      className="fixed inset-0 h-full w-full -z-10"
      style={{
        background: 'linear-gradient(135deg, rgba(10, 10, 30, 0.95) 0%, rgba(30, 10, 50, 0.95) 100%)',
      }}
    />
  )
});

// Lazy loading для модальных окон - загружаются только при необходимости
const AuthModal = dynamic(() => import("@/components/auth-modal").then(mod => ({ default: mod.default })), { ssr: false });
const ServiceModal = dynamic(() => import("@/components/service-modal").then(mod => ({ default: mod.default })), { ssr: false });
const CasesAndReviewsModal = dynamic(() => import("@/components/cases-and-reviews-modal").then(mod => ({ default: mod.default })), { ssr: false });
const ContactsModal = dynamic(() => import("@/components/contacts-modal").then(mod => ({ default: mod.default })), { ssr: false });
const CallOrderModal = dynamic(() => import("@/components/call-order-modal").then(mod => ({ default: mod.default })), { ssr: false });
const AIChatAssistant = dynamic(() => import("@/components/ai-chat-assistant").then(mod => ({ default: mod.default })), { ssr: false });
const CalculatorModal = dynamic(() => import("@/components/calculator/calculator-modal").then(mod => ({ default: mod.default })), { ssr: false });

const sections = [
  {
    title: "",
    text: "",
  },
];

// Выносим navItems за пределы компонента, чтобы не пересоздавать при каждом рендере
const navItems: MegaMenuItem[] = [
    {
      id: 1,
      label: "Услуги",
      subMenus: [
        {
          title: "Бухгалтерия",
          items: [
            {
              label: "Бухгалтерское сопровождение ООО",
              description: "Полное ведение бухгалтерского учета для ООО.",
              icon: "FileText",
            },
            {
              label: "Бухгалтерское сопровождение ИП",
              description: "Ведение учета и отчетности для индивидуальных предпринимателей.",
              icon: "FileText",
            },
            {
              label: "Постановка учёта с нуля",
              description: "Организация системы учета для нового бизнеса.",
              icon: "Settings",
            },
            {
              label: "Восстановление учёта",
              description: "Восстановление утерянных или некорректных записей.",
              icon: "RotateCcw",
            },
            {
              label: "Кадровый учёт и зарплата",
              description: "Ведение кадрового делопроизводства и расчет заработной платы.",
              icon: "Users",
            },
            {
              label: "Сдача отчётности",
              description: "Подготовка и сдача всех видов отчетности в срок.",
              icon: "Send",
            },
          ],
        },
        {
          title: "Регистрация бизнеса",
          items: [
            {
              label: "Регистрация ИП",
              description: "Быстрая регистрация индивидуального предпринимателя.",
              icon: "Building2",
            },
            {
              label: "Регистрация ООО",
              description: "Полное сопровождение регистрации общества с ограниченной ответственностью.",
              icon: "Building2",
            },
            {
              label: "Изменения в ЕГРЮЛ/ЕГРИП",
              description: "Внесение изменений в единый государственный реестр.",
              icon: "FileCheck",
            },
            {
              label: "Ликвидация ИП и ООО",
              description: "Профессиональное закрытие бизнеса и ликвидация компании.",
              icon: "Trash2",
            },
            {
              label: "Юридический адрес",
              description: "Предоставление юридического адреса для регистрации.",
              icon: "MapPin",
            },
            {
              label: "Электронная подпись (ЭЦП)",
              description: "Получение и настройка электронной цифровой подписи.",
              icon: "Key",
            },
          ],
        },
        {
          title: "Юридическое сопровождение",
          items: [
            {
              label: "Абонентское юрсопровождение",
              description: "Комплексное юридическое обслуживание на постоянной основе.",
              icon: "Shield",
            },
            {
              label: "Госзакупки под ключ",
              description: "Полное сопровождение участия в государственных закупках.",
              icon: "Briefcase",
            },
            {
              label: "Корпоративное право",
              description: "Юридическая поддержка корпоративных отношений и сделок.",
              icon: "Building2",
            },
            {
              label: "Договорная работа",
              description: "Разработка, проверка и сопровождение договоров.",
              icon: "FileText",
            },
            {
              label: "Правовой аудит бизнеса",
              description: "Комплексная проверка правовых аспектов деятельности компании.",
              icon: "Eye",
            },
          ],
        },
        {
          title: "Автоматизация бизнеса",
          items: [
            {
              label: "Аудит процессов и отдела продаж",
              description: "Анализ и оптимизация бизнес-процессов и работы отдела продаж.",
              icon: "Eye",
            },
            {
              label: "Внедрение и настройка amoCRM",
              description: "Полное внедрение и настройка системы amoCRM для вашего бизнеса.",
              icon: "Settings",
            },
            {
              label: "Автоматизация отдела продаж",
              description: "Автоматизация процессов продаж и повышение эффективности.",
              icon: "Zap",
            },
            {
              label: "Интеграции на базе n8n",
              description: "Создание интеграций между различными системами на базе n8n.",
              icon: "Cpu",
            },
            {
              label: "Дашборды и отчёты для руководителя",
              description: "Создание информативных дашбордов и аналитических отчётов.",
              icon: "BarChart3",
            },
            {
              label: "Обучение сотрудников работе с CRM",
              description: "Профессиональное обучение персонала работе с CRM-системами.",
              icon: "GraduationCap",
            },
          ],
        },
        {
          title: "Маркетинг и SMM",
          items: [
            {
              label: "Разработка маркетинговой стратегии",
              description: "Создание комплексной стратегии продвижения вашего бизнеса.",
              icon: "TrendingUp",
            },
            {
              label: "Ведение социальных сетей",
              description: "Профессиональное управление аккаунтами в социальных сетях.",
              icon: "Users",
            },
            {
              label: "Контент-маркетинг",
              description: "Создание и распространение ценного контента для привлечения клиентов.",
              icon: "Newspaper",
            },
            {
              label: "Реклама в интернете",
              description: "Настройка и ведение рекламных кампаний в интернете.",
              icon: "Rocket",
            },
            {
              label: "Аналитика и отчёты",
              description: "Анализ эффективности маркетинговых кампаний и отчёты.",
              icon: "BarChart3",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Решения",
      subMenus: [
        {
          title: "Для старта бизнеса",
          items: [
            {
              label: "Бизнес-старт под ключ",
              description: "Полное сопровождение запуска нового бизнеса.",
              icon: "Rocket",
            },
            {
              label: "Финансовая модель для нового бизнеса",
              description: "Разработка финансовой модели и планирование.",
              icon: "Calculator",
            },
            {
              label: "Базовая упаковка: сайт + Яндекс.Бизнес + VK",
              description: "Комплексная упаковка бизнеса в интернете.",
              icon: "Globe",
            },
          ],
        },
        {
          title: "Для действующего бизнеса",
          items: [
            {
              label: "Искусственный интеллект в твоей бухгалтерии",
              description: "Внедрение ИИ для автоматизации бухгалтерских процессов.",
              icon: "Cpu",
            },
            {
              label: "Перевод бухгалтерии в облачную 1С",
              description: "Миграция бухгалтерского учета в облачные решения 1С.",
              icon: "Box",
            },
            {
              label: "Комплексное сопровождение бизнеса (бухгалтер + юрист)",
              description: "Полная поддержка бизнеса с привлечением бухгалтера и юриста.",
              icon: "Users",
            },
          ],
        },
        {
          title: "Продажи и маркетинг",
          items: [
            {
              label: "Автоматизированный отдел продаж",
              description: "Настройка и внедрение автоматизированных систем для отдела продаж.",
              icon: "Zap",
            },
            {
              label: "Маркетинг под ключ",
              description: "Разработка и реализация комплексных маркетинговых стратегий.",
              icon: "Palette",
            },
            {
              label: "CRM + сайт + сквозная аналитика",
              description: "Интеграция CRM, сайта и сквозной аналитики для повышения эффективности.",
              icon: "BarChart3",
            },
          ],
        },
        {
          title: "Контроль и безопасность",
          items: [
            {
              label: "Бизнес без штрафов",
              description: "Системы контроля и аудита для предотвращения штрафов.",
              icon: "Shield",
            },
            {
              label: "Аудит договоров и корпоративных документов",
              description: "Юридическая экспертиза документов для минимизации рисков.",
              icon: "FileCheck",
            },
            {
              label: "Настройка ИИ-ассистентов под процессы компании",
              description: "Индивидуальная настройка ИИ-помощников для оптимизации внутренних процессов.",
              icon: "Settings",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      label: "ИИ - Ассистенты",
      subMenus: [
        {
          title: "Бухгалтерия",
          items: [
            {
              label: "ИИ-ассистент для бухгалтерии",
              description: "Автоматизация рутинных бухгалтерских операций с помощью ИИ.",
              icon: "Calculator",
            },
            {
              label: "Анализ 1С, банка и ЭДО",
              description: "ИИ-анализ данных из 1С, банковских выписок и систем ЭДО.",
              icon: "Search",
            },
            {
              label: "Подсказки по проводкам и отчётности",
              description: "ИИ-подсказки для корректного формирования проводок и отчётности.",
              icon: "BookOpen",
            },
            {
              label: "Формирование задач для бухгалтера и помощника",
              description: "Автоматическая генерация задач для сотрудников бухгалтерии.",
              icon: "FileText",
            },
          ],
        },
        {
          title: "Регистрация и юрподдержка",
          items: [
            {
              label: "ИИ-ассистент по регистрации и изменениям",
              description: "Помощь ИИ в подготовке документов для регистрации и внесения изменений.",
              icon: "Building2",
            },
            {
              label: "ИИ-ассистент для госзакупок",
              description: "ИИ-анализ тендеров и подготовка документации для госзакупок.",
              icon: "Briefcase",
            },
            {
              label: "ИИ-ассистент по корпоративным документам",
              description: "Генерация и проверка корпоративных документов с помощью ИИ.",
              icon: "FileCheck",
            },
          ],
        },
        {
          title: "Автоматизация и CRM",
          items: [
            {
              label: "ИИ-ассистент по автоматизации бизнес-процессов",
              description: "Умный помощник для автоматизации и оптимизации бизнес-процессов.",
              icon: "Zap",
            },
            {
              label: "Генерация ТЗ для amoCRM и n8n",
              description: "Автоматическое создание технических заданий для настройки CRM и интеграций.",
              icon: "Settings",
            },
            {
              label: "Предложения по улучшению воронок и конверсий",
              description: "Анализ и рекомендации по оптимизации воронок продаж и повышению конверсий.",
              icon: "TrendingUp",
            },
          ],
        },
        {
          title: "Маркетинг и контент",
          items: [
            {
              label: "ИИ-ассистент по контенту и SMM",
              description: "Помощник для создания контента и управления социальными сетями.",
              icon: "Newspaper",
            },
            {
              label: "Генерация контент-планов и постов",
              description: "Автоматическое создание контент-планов и постов для соцсетей.",
              icon: "Palette",
            },
            {
              label: "Анализ откликов и рекомендации",
              description: "ИИ-анализ реакции аудитории и рекомендации по улучшению контента.",
              icon: "BarChart3",
            },
          ],
        },
      ],
    },
    { id: 4, label: "Кейсы и отзывы", link: "#" },
    { id: 7, label: "Контакты", link: "#" },
];

export default function Page() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState<"signin" | "register">("signin");
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const [showCasesAndReviewsModal, setShowCasesAndReviewsModal] = useState(false);
  const [showContactsModal, setShowContactsModal] = useState(false);
  const [showCallOrderModal, setShowCallOrderModal] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileAuth, setShowMobileAuth] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [startAIChatWithVoice, setStartAIChatWithVoice] = useState(false);
  const logoTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => {
      const track = logoTrackRef.current;
      if (!track) return;
      const firstSet = track.querySelector('.logo-set') as HTMLElement | null;
      if (!firstSet) return;
      const distance = firstSet.offsetWidth;
      // px per second — регулирует скорость прокрутки
      const pxPerSec = 80;
      const durationSec = Math.max(10, Math.round(distance / pxPerSec));
      track.style.setProperty('--scroll-distance', `${distance}px`);
      track.style.setProperty('--scroll-duration', `${durationSec}s`);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

 

  return (
    <main className="relative h-screen overflow-hidden text-white">
      <ShaderBackground />
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialType={authModalType}
        />
      )}
      {showServiceModal && (
        <ServiceModal
          isOpen={showServiceModal}
          onClose={() => setShowServiceModal(false)}
          serviceTitle={selectedService}
          onOpenCalculator={() => setShowCalculator(true)}
          onOpenCallOrder={() => setShowCallOrderModal(true)}
        />
      )}
      {showCasesAndReviewsModal && (
        <CasesAndReviewsModal
          isOpen={showCasesAndReviewsModal}
          onClose={() => setShowCasesAndReviewsModal(false)}
        />
      )}
      {showContactsModal && (
        <ContactsModal
          isOpen={showContactsModal}
          onClose={() => setShowContactsModal(false)}
        />
      )}
      {showCallOrderModal && (
        <CallOrderModal
          isOpen={showCallOrderModal}
          onClose={() => setShowCallOrderModal(false)}
        />
      )}
      {showCalculator && (
        <CalculatorModal
          isOpen={showCalculator}
          onClose={() => setShowCalculator(false)}
          onAuthRequired={() => {
            setShowAuthModal(true);
            setAuthModalType("register");
          }}
        />
      )}
      {showAIChat && (
        <AIChatAssistant
          isOpen={showAIChat}
          onOpenChange={(open) => {
            setShowAIChat(open);
            if (!open) {
              setStartAIChatWithVoice(false);
            }
          }}
          hideButton={true}
          startWithVoice={startAIChatWithVoice}
        />
      )}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-2 sm:px-3 md:px-6 lg:px-12 xl:px-20 py-1 md:py-1">
        {/* Мобильная версия: логотип по центру, бургер-меню справа */}
        <div className="md:hidden flex items-center justify-between">
          <div className="flex-1"></div>
          <div className="flex items-center justify-center flex-1">
            <img
              src="/logo.png"
              alt="Логотип компании"
              className="h-18 sm:h-21 w-auto object-contain"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{ 
                backgroundColor: 'transparent',
                background: 'transparent',
                display: 'block',
                filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(2000%) hue-rotate(250deg) brightness(1.5) contrast(1.1)',
                WebkitFilter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(2000%) hue-rotate(250deg) brightness(1.5) contrast(1.1)'
              }}
            />
          </div>
          <div className="flex items-center justify-end flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
              aria-label="Открыть меню"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Мобильное меню в Drawer */}
        <Drawer.Root open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[101] mt-24 flex flex-col rounded-t-2xl bg-[#0A0A0A]/70 border-t border-white/10 max-h-[90vh]">
              {/* Скрытый заголовок для доступности (только для screen readers) */}
              <Drawer.Title className="sr-only">Мобильное меню навигации</Drawer.Title>
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-white/20 mb-4 mt-3" />
              <div className="px-4 py-4 overflow-y-auto">
                <div className="space-y-6">
                  {/* MegaMenu в мобильном меню - две строки */}
                  <div className="flex flex-col gap-3">
                    {/* Первая строка: Услуги, Решения, ИИ - Ассистенты */}
                    <div className="flex flex-wrap justify-center gap-2">
                      <MegaMenu 
                        items={navItems.filter(item => ["Услуги", "Решения", "ИИ - Ассистенты"].includes(item.label))} 
                        className="flex-wrap justify-center"
                        onServiceClick={(serviceTitle) => {
                          setSelectedService(serviceTitle);
                          setShowServiceModal(true);
                          setIsMobileMenuOpen(false);
                        }}
                        onCasesAndReviewsClick={() => {
                          setShowCasesAndReviewsModal(true);
                          setIsMobileMenuOpen(false);
                        }}
                        onContactsClick={() => {
                          setShowContactsModal(true);
                          setIsMobileMenuOpen(false);
                        }}
                      />
                    </div>
                    {/* Вторая строка: Кейсы и отзывы, Контакты */}
                    <div className="flex flex-wrap justify-center gap-2">
                      <MegaMenu 
                        items={navItems.filter(item => ["Кейсы и отзывы", "Контакты"].includes(item.label))} 
                        className="flex-wrap justify-center"
                        onServiceClick={(serviceTitle) => {
                          setSelectedService(serviceTitle);
                          setShowServiceModal(true);
                          setIsMobileMenuOpen(false);
                        }}
                        onCasesAndReviewsClick={() => {
                          setShowCasesAndReviewsModal(true);
                          setIsMobileMenuOpen(false);
                        }}
                        onContactsClick={() => {
                          setShowContactsModal(true);
                          setIsMobileMenuOpen(false);
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Разделитель */}
                  <div className="border-t border-white/10"></div>
                  
                  {/* Уведомления и AuthButton в мобильном меню */}
                  <div className="flex flex-col gap-2">
                    {/* Кнопка калькулятора в мобильном меню */}
                    <button
                      onClick={() => {
                        setShowCalculator(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-900/25 to-blue-900/25 hover:from-purple-900/30 hover:to-blue-900/30 text-white/90 font-medium transition-all shadow-sm shadow-black/5 hover:shadow-black/10 backdrop-blur-sm"
                    >
                      <Calculator className="w-5 h-5" />
                      Расчитать стоимость
                    </button>
                    <div className="flex items-center justify-center gap-2">
                      <NotificationsDropdown />
                    </div>
                    <AuthButton
                      onSignInClick={() => {
                        setShowAuthModal(true);
                        setAuthModalType("signin");
                        setIsMobileMenuOpen(false);
                      }}
                      onRegisterClick={() => {
                        setShowAuthModal(true);
                        setAuthModalType("register");
                        setIsMobileMenuOpen(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>

        {/* Десктопная версия: логотип слева, меню по центру, кнопки справа */}
        <div className="hidden md:flex items-start justify-between gap-8">
          <div className="flex items-start justify-center flex-1 overflow-visible">
            <img
              src="/logo.png"
              alt="Логотип компании"
              className="h-[120px] w-auto object-contain"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{ 
                backgroundColor: 'transparent',
                background: 'transparent',
                display: 'block',
                transform: 'scale(1.275)',
                transformOrigin: 'center center',
                filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(2000%) hue-rotate(250deg) brightness(1.5) contrast(1.1)',
                WebkitFilter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(2000%) hue-rotate(250deg) brightness(1.5) contrast(1.1)'
              }}
            />
          </div>
          <div className="flex items-start justify-center flex-1 pt-2">
            <MegaMenu 
              items={navItems} 
              onServiceClick={(serviceTitle) => {
                setSelectedService(serviceTitle);
                setShowServiceModal(true);
              }}
              onCasesAndReviewsClick={() => {
                setShowCasesAndReviewsModal(true);
              }}
              onContactsClick={() => {
                setShowContactsModal(true);
              }}
            />
          </div>
          <div className="flex items-start justify-end flex-1 pt-2">
            <div className="flex items-center gap-3">
              <NotificationsDropdown />
              <div className="flex flex-col items-end gap-2">
                <AuthButton
                  onSignInClick={() => {
                    setShowAuthModal(true);
                    setAuthModalType("signin");
                  }}
                  onRegisterClick={() => {
                    setShowAuthModal(true);
                    setAuthModalType("register");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="relative z-10 min-h-screen flex items-end justify-center">
        {sections.map((s, i) => (
          <section
            key={s.title}
            className={`${
              i === 0
                ? "w-full absolute bottom-[280px] md:bottom-[224px] left-0 right-0 flex items-end justify-center"
                : "py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-12 lg:px-20"
            }`}
          >
            <div className={`${
              i === 0
                ? "w-full bg-transparent px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 flex flex-col items-center justify-center text-center"
                : "max-w-4xl bg-black/50 backdrop-blur-md rounded-xl md:rounded-2xl border border-white/10 p-4 sm:p-6 md:p-8 shadow-2xl"
            }`}>
              {i === 0 ? (
                <>
                  <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium tracking-wide leading-tight bg-gradient-to-r from-purple-300 via-blue-300 via-purple-400 to-blue-400 bg-clip-text text-transparent px-4" style={{ fontFamily: 'var(--font-orbitron), monospace' }}>
                    Здесь Ваш личный ИИ-помощник для повышения производительности бизнеса.
                  </h1>

                  {/* Показать логотипы в одной строке с бесконечной прокруткой (маркировка по префиксу в public/logos) */}
                  <div className="w-full overflow-hidden mt-6 bg-transparent">
                    <div className="relative">
                      {/* Трек: дублируем набор логотипов для бесшовной прокрутки */}
                      <div ref={logoTrackRef} className="logo-track flex items-center gap-6" aria-hidden>
                        <div className="logo-set flex items-center gap-6">
                          <img src="/logos/1_1C.png" alt="1C" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/2_tailwind.png" alt="Tailwind" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/3_alfa.png" alt="Alfa" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/4_next.png" alt="Next.js" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/5_amocrm.png" alt="amoCRM" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/6_node.png" alt="Node.js" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/7_PSB.png" alt="PSB" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/8_saby.png" alt="Saby" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/9_tbank.png" alt="TBank" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/10_typescript-logo.png" alt="TypeScript" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/11_sber-856.png" alt="Sber" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/12_tochka.png" alt="Tochka" className="logo-img h-32 w-[320px] object-contain" />
                        </div>
                        <div className="logo-set flex items-center gap-6" aria-hidden>
                          <img src="/logos/1_1C.png" alt="" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/2_tailwind.png" alt="" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/3_alfa.png" alt="" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/4_next.png" alt="" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/5_amocrm.png" alt="" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/6_node.png" alt="" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/7_PSB.png" alt="" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/8_saby.png" alt="" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/9_tbank.png" alt="" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/10_typescript-logo.png" alt="" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/11_sber-856.png" alt="" className="logo-img h-32 w-[320px] object-contain" />
                          <img src="/logos/12_tochka.png" alt="" className="logo-img h-32 w-[320px] object-contain" />
                        </div>
                      </div>

                      {/* Inline styles для анимации и управления */}
                      <style jsx>{`
                        .logo-track {
                          display: flex;
                          gap: 1.5rem;
                          align-items: center;
                          width: max-content;
                          background: transparent;
                          box-shadow: none;
                          opacity: 0.5;
                          animation: scroll-logos var(--scroll-duration, 20s) linear infinite;
                          will-change: transform;
                        }
                        .logo-img {
                          background: transparent;
                          mix-blend-mode: multiply;
                          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.35));
                        }

                        .logo-track:hover {
                          animation-play-state: paused;
                        }

                        @keyframes scroll-logos {
                          0% { transform: translateX(0); }
                          100% { transform: translateX(calc(-1 * var(--scroll-distance, 100%))); }
                        }

                        /* Уменьшаем скорость и учитываем предпочтение пользователей */
                        @media (max-width: 640px) {
                          .logo-track { animation-duration: calc(var(--scroll-duration, 20s) * 1.5); }
                        }

                        @media (prefers-reduced-motion: reduce) {
                          .logo-track { animation: none; }
                        }
                      `}</style>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-purple-200/80 mb-2">
                    Блок {i + 1}
                  </p>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 md:mb-3">{s.title}</h2>
                  <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">{s.text}</p>
                </>
              )}
            </div>
          </section>
        ))}
      </div>
      
      {/* Блок кнопок над футером */}
      <div className="fixed bottom-36 sm:bottom-40 md:bottom-36 left-0 right-0 z-30 px-2 sm:px-4 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
            {/* Кнопка "Заказать звонок" (слева) */}
            <button
              onClick={() => setShowCallOrderModal(true)}
              className="flex-1 min-w-0 flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gradient-to-r from-purple-900/25 to-blue-900/25 hover:from-purple-900/30 hover:to-blue-900/30 text-white/90 font-medium transition-all shadow-sm shadow-black/5 hover:shadow-black/10 backdrop-blur-sm max-w-[360px] w-full sm:w-auto justify-center"
              title="Заказать звонок"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Заказать звонок</span>
            </button>
            
            {/* Кнопка "Расчитать стоимость" (центр) */}
            <button
              onClick={() => setShowCalculator(true)}
              className="flex-1 min-w-0 flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gradient-to-r from-purple-900/25 to-blue-900/25 hover:from-purple-900/30 hover:to-blue-900/30 text-white/90 font-medium transition-all shadow-sm shadow-black/5 hover:shadow-black/10 backdrop-blur-sm max-w-[360px] w-full sm:w-auto justify-center"
              title="Расчитать стоимость услуг"
            >
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Расчитать стоимость</span>
            </button>
            
            {/* Кнопка "ИИ Ассистент" (справа) */}
            <button
              onClick={() => {
                setStartAIChatWithVoice(false);
                setShowAIChat(true);
              }}
              className="flex-1 min-w-0 flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gradient-to-r from-purple-900/25 to-blue-900/25 hover:from-purple-900/30 hover:to-blue-900/30 text-white/90 font-medium transition-all shadow-sm shadow-black/5 hover:shadow-black/10 backdrop-blur-sm max-w-[360px] w-full sm:w-auto justify-center"
              title="ИИ Ассистент"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">ИИ Ассистент</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
