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

const ShaderBackground = dynamic(() => import("@/components/ui/shader-background"), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 h-full w-full -z-10 bg-[#0a0a1e]" />
});

const CallOrderModal = dynamic(() => import("@/components/call-order-modal"), { ssr: false });
const AIChatAssistant = dynamic(() => import("@/components/ai-chat-assistant"), { ssr: false });

const navItems: MegaMenuItem[] = [
  { id: 1, label: "Услуги", link: "/services" },
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
      track.style.setProperty('--scroll-distance', `${distance}px`);
      track.style.setProperty('--scroll-duration', `25s`);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const handleServiceClick = (serviceTitle: string) => {
    router.push(`/services/${slugify(serviceTitle)}`);
  };

  return (
    <main className="relative h-screen overflow-hidden text-white">
      <ShaderBackground />
      
      {showCallOrderModal && <CallOrderModal isOpen={showCallOrderModal} onClose={() => setShowCallOrderModal(false)} />}
      
      {showAIChat && (
        <AIChatAssistant
          isOpen={showAIChat}
          onOpenChange={(open) => { setShowAIChat(open); if (!open) setStartAIChatWithVoice(false); }}
          hideButton={true}
          startWithVoice={startAIChatWithVoice}
        />
      )}
      
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 lg:px-20 py-2">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between">
          <Link href="/"><img src="/logo.png" alt="Rahima Consulting" className="h-12 w-auto brightness-150" /></Link>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/20"><Menu className="w-6 h-6" /></button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between gap-8">
          <Link href="/" className="group relative">
            <img src="/logo.png" alt="Rahima Consulting" className="h-16 w-auto transition-transform group-hover:scale-105" />
          </Link>
          <MegaMenu items={navItems} onServiceClick={handleServiceClick} onCasesAndReviewsClick={() => router.push('/cases')} onContactsClick={() => router.push('/contacts')} />
          <div className="flex items-center gap-3">
            <NotificationsDropdown />
            <AuthButton onSignInClick={() => router.push('/auth/signin')} onRegisterClick={() => router.push('/auth/register')} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-20">
        <section className="text-center px-4 max-w-5xl">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-200 via-blue-200 to-purple-400 bg-clip-text text-transparent mb-4" style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}>
            Автоматизация бизнеса и бухгалтерское сопровождение в Крыму
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Ваш личный ИИ-помощник и команда профессионалов для масштабирования бизнеса в режиме одного окна.
          </p>
          
          {/* Скрытый текст для SEO */}
          <h2 className="sr-only">Регистрация ИП и ООО, интеграция СБИС, автоматизация выписок в Симферополе</h2>

          {/* Лента логотипов (SEO-активная) */}
          <div className="w-full mt-12 overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
            <div ref={logoTrackRef} className="logo-track flex items-center gap-12 whitespace-nowrap">
              <div className="logo-set flex items-center gap-12">
                <img src="/logos/1_1C.png" alt="Интеграция с 1С" className="h-12 w-auto opacity-70 grayscale hover:grayscale-0 transition-all" />
                <img src="/logos/3_alfa.png" alt="Синхронизация Альфа-Банк" className="h-12 w-auto opacity-70 grayscale hover:grayscale-0 transition-all" />
                <img src="/logos/8_saby.png" alt="Автоматизация СБИС Saby" className="h-12 w-auto opacity-70 grayscale hover:grayscale-0 transition-all" />
                <img src="/logos/9_tbank.png" alt="Т-Банк партнеры" className="h-12 w-auto opacity-70 grayscale hover:grayscale-0 transition-all" />
                <img src="/logos/11_sber-856.png" alt="СберБизнес консалтинг" className="h-12 w-auto opacity-70 grayscale hover:grayscale-0 transition-all" />
                <img src="/logos/5_amocrm.png" alt="Внедрение amoCRM" className="h-12 w-auto opacity-70 grayscale hover:grayscale-0 transition-all" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Buttons */}
        <div className="mt-16 flex flex-wrap justify-center gap-4 px-4 w-full">
          <button onClick={() => setShowCallOrderModal(true)} className="flex items-center gap-2 px-8 py-4 bg-purple-600/20 border border-purple-500/30 rounded-2xl backdrop-blur-md hover:bg-purple-600/30 transition-all active:scale-95">
            <Phone className="w-5 h-5" /> Заказать звонок
          </button>
          <Link href="/calculator" className="flex items-center gap-2 px-8 py-4 bg-blue-600/20 border border-blue-500/30 rounded-2xl backdrop-blur-md hover:bg-blue-600/30 transition-all active:scale-95">
            <Calculator className="w-5 h-5" /> Расчёт стоимости
          </Link>
          <button onClick={() => { setStartAIChatWithVoice(false); setShowAIChat(true); }} className="flex items-center gap-2 px-8 py-4 bg-pink-600/20 border border-pink-500/30 rounded-2xl backdrop-blur-md hover:bg-pink-600/30 transition-all active:scale-95">
            <MessageCircle className="w-5 h-5" /> ИИ Ассистент
          </button>
        </div>
      </div>

      <style jsx>{`
        .logo-track { animation: scroll var(--scroll-duration, 30s) linear infinite; width: max-content; }
        @keyframes scroll { 
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-1 * var(--scroll-distance, 100%))); }
        }
      `}</style>
      
      <Drawer.Root open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[101] bg-[#0A0A0A]/90 border-t border-white/10 p-6 rounded-t-3xl">
            <div className="flex flex-col gap-4">
              {navItems.map(item => <Link key={item.id} href={item.link} onClick={() => setIsMobileMenuOpen(false)} className="text-xl py-2">{item.label}</Link>)}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </main>
  );
}