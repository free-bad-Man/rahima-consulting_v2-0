"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Calculator, MessageCircle, Phone } from "lucide-react";
import { Drawer } from "vaul";
import MegaMenu, { type MegaMenuItem } from "@/components/ui/mega-menu";
import AuthButton from "@/components/auth-button";
import NotificationsDropdown from "@/components/notifications-dropdown";
import { slugify } from "@/lib/slugify";

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

// Lazy loading для модальных окон - только нужные
const CallOrderModal = dynamic(() => import("@/components/call-order-modal").then(mod => ({ default: mod.default })), { ssr: false });
const AIChatAssistant = dynamic(() => import("@/components/ai-chat-assistant").then(mod => ({ default: mod.default })), { ssr: false });

const sections = [
  {
    title: "",
    text: "",
  },
];

// Выносим navItems за пределы компонента
const navItems: MegaMenuItem[] = [
  {
    id: 1,
    label: "Услуги",
    link: "/services",
    subMenus: [
      {
        title: "Бухгалтерия",
        items: [
          { label: "Бухгалтерское сопровождение ООО", description: "Полное ведение бухгалтерского учета для ООО.", icon: "FileText" },
          { label: "Бухгалтерское сопровождение ИП", description: "Ведение учета и отчетности для индивидуальных предпринимателей.", icon: "FileText" },
          { label: "Постановка учёта с нуля", description: "Организация системы учета для нового бизнеса.", icon: "Settings" },
          { label: "Восстановление учёта", description: "Восстановление утерянных или некорректных записей.", icon: "RotateCcw" },
          { label: "Кадровый учёт и зарплата", description: "Ведение кадрового делопроизводства и расчет заработной платы.", icon: "Users" },
          { label: "Сдача отчётности", description: "Подготовка и сдача всех видов отчетности в срок.", icon: "Send" },
        ],
      },
      {
        title: "Регистрация бизнеса",
        items: [
          { label: "Регистрация ИП", description: "Быстрая регистрация индивидуального предпринимателя.", icon: "Building2" },
          { label: "Регистрация ООО", description: "Полное сопровождение регистрации общества с ограниченной ответственностью.", icon: "Building2" },
          { label: "Изменения в ЕГРЮЛ/ЕГРИП", description: "Внесение изменений в единый государственный реестр.", icon: "FileCheck" },
          { label: "Ликвидация ИП и ООО", description: "Профессиональное закрытие бизнеса и ликвидация компании.", icon: "Trash2" },
          { label: "Юридический адрес", description: "Предоставление юридического адреса для регистрации.", icon: "MapPin" },
          { label: "Электронная подпись (ЭЦП)", description: "Получение и настройка электронной цифровой подписи.", icon: "Key" },
        ],
      },
    ],
  },
  { id: 2, label: "Решения", link: "/solutions" },
  { id: 3, label: "ИИ-Ассистенты", link: "/ai-assistants" },
  { id: 4, label: "Кейсы и отзывы", link: "/cases" },
  { id: 7, label: "Контакты", link: "/contacts" },
];

export default function Page() {
  const router = useRouter();
  const [showCallOrderModal, setShowCallOrderModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      const pxPerSec = 80;
      const durationSec = Math.max(10, Math.round(distance / pxPerSec));
      track.style.setProperty('--scroll-distance', `${distance}px`);
      track.style.setProperty('--scroll-duration', `${durationSec}s`);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const handleServiceClick = (serviceTitle: string) => {
    const slug = slugify(serviceTitle);
    router.push(`/services/${slug}`);
  };

  const handleCasesClick = () => {
    router.push('/cases');
  };

  const handleContactsClick = () => {
    router.push('/contacts');
  };

  return (
    <main className="relative h-screen overflow-hidden text-white">
      <ShaderBackground />
      
      {showCallOrderModal && (
        <CallOrderModal
          isOpen={showCallOrderModal}
          onClose={() => setShowCallOrderModal(false)}
        />
      )}
      
      {showAIChat && (
        <AIChatAssistant
          isOpen={showAIChat}
          onOpenChange={(open) => {
            setShowAIChat(open);
            if (!open) setStartAIChatWithVoice(false);
          }}
          hideButton={true}
          startWithVoice={startAIChatWithVoice}
        />
      )}
      
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-2 sm:px-3 md:px-6 lg:px-12 xl:px-20 py-1 md:py-1">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between">
          <div className="flex-1"></div>
          <div className="flex items-center justify-center flex-1">
            <Link href="/">
              <img
                src="/logo.png"
                alt="Логотип компании"
                className="h-18 sm:h-21 w-auto object-contain"
                style={{ 
                  filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(2000%) hue-rotate(250deg) brightness(1.5) contrast(1.1)',
                }}
              />
            </Link>
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

        {/* Mobile menu drawer */}
        <Drawer.Root open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[101] mt-24 flex flex-col rounded-t-2xl bg-[#0A0A0A]/70 border-t border-white/10 max-h-[90vh]">
              <Drawer.Title className="sr-only">Мобильное меню навигации</Drawer.Title>
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-white/20 mb-4 mt-3" />
              <div className="px-4 py-4 overflow-y-auto">
                <div className="space-y-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap justify-center gap-2">
                      <MegaMenu 
                        items={navItems.filter(item => ["Услуги", "Решения", "ИИ-Ассистенты"].includes(item.label))} 
                        className="flex-wrap justify-center"
                        onServiceClick={handleServiceClick}
                        onCasesAndReviewsClick={handleCasesClick}
                        onContactsClick={handleContactsClick}
                      />
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      <MegaMenu 
                        items={navItems.filter(item => ["Кейсы и отзывы", "Контакты"].includes(item.label))} 
                        className="flex-wrap justify-center"
                        onServiceClick={handleServiceClick}
                        onCasesAndReviewsClick={handleCasesClick}
                        onContactsClick={handleContactsClick}
                      />
                    </div>
                  </div>
                  
                  <div className="border-t border-white/10"></div>
                  
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/dashboard/orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-900/25 to-blue-900/25 hover:from-purple-900/30 hover:to-blue-900/30 text-white/90 font-medium transition-all"
                    >
                      <Calculator className="w-5 h-5" />
                      Расчитать стоимость
                    </Link>
                    <div className="flex items-center justify-center gap-2">
                      <NotificationsDropdown />
                    </div>
                    <AuthButton
                      onSignInClick={() => {
                        router.push('/auth/signin');
                        setIsMobileMenuOpen(false);
                      }}
                      onRegisterClick={() => {
                        router.push('/auth/register');
                        setIsMobileMenuOpen(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>

        {/* Desktop header */}
        <div className="hidden md:flex items-start justify-between gap-8">
          <div className="flex items-start justify-center flex-1 overflow-visible">
            <Link href="/">
              <img
                src="/logo.png"
                alt="Логотип компании"
                className="h-[120px] w-auto object-contain"
                style={{ 
                  transform: 'scale(1.275)',
                  filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(2000%) hue-rotate(250deg) brightness(1.5) contrast(1.1)',
                }}
              />
            </Link>
          </div>
          <div className="flex items-start justify-center flex-1 pt-2">
            <MegaMenu 
              items={navItems} 
              onServiceClick={handleServiceClick}
              onCasesAndReviewsClick={handleCasesClick}
              onContactsClick={handleContactsClick}
            />
          </div>
          <div className="flex items-start justify-end flex-1 pt-2">
            <div className="flex items-center gap-3">
              <NotificationsDropdown />
              <div className="flex flex-col items-end gap-2">
                <AuthButton
                  onSignInClick={() => router.push('/auth/signin')}
                  onRegisterClick={() => router.push('/auth/register')}
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

                  <div className="w-full overflow-hidden mt-6 bg-transparent">
                    <div className="relative">
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
              ) : null}
            </div>
          </section>
        ))}
      </div>
      
      {/* CTA Buttons */}
      <div className="fixed bottom-36 sm:bottom-40 md:bottom-36 left-0 right-0 z-30 px-2 sm:px-4 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
            <button
              onClick={() => setShowCallOrderModal(true)}
              className="flex-1 min-w-0 flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gradient-to-r from-purple-900/25 to-blue-900/25 hover:from-purple-900/30 hover:to-blue-900/30 text-white/90 font-medium transition-all shadow-sm shadow-black/5 hover:shadow-black/10 backdrop-blur-sm max-w-[360px] w-full sm:w-auto justify-center"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Заказать звонок</span>
            </button>
            
            <Link
              href="/dashboard/orders"
              className="flex-1 min-w-0 flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gradient-to-r from-purple-900/25 to-blue-900/25 hover:from-purple-900/30 hover:to-blue-900/30 text-white/90 font-medium transition-all shadow-sm shadow-black/5 hover:shadow-black/10 backdrop-blur-sm max-w-[360px] w-full sm:w-auto justify-center"
            >
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Расчитать стоимость</span>
            </Link>
            
            <button
              onClick={() => {
                setStartAIChatWithVoice(false);
                setShowAIChat(true);
              }}
              className="flex-1 min-w-0 flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gradient-to-r from-purple-900/25 to-blue-900/25 hover:from-purple-900/30 hover:to-blue-900/30 text-white/90 font-medium transition-all shadow-sm shadow-black/5 hover:shadow-black/10 backdrop-blur-sm max-w-[360px] w-full sm:w-auto justify-center"
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

