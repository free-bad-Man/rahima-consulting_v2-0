"use client";

import { useState } from "react";
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
  loading: () => <div className="fixed inset-0 h-full w-full -z-10 bg-[#0a0a1e]" />,
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

const LOGO_FILTER =
  "brightness(0) saturate(100%) invert(34%) sepia(89%) saturate(1789%) hue-rotate(253deg) brightness(108%) contrast(101%)";

export default function Page() {
  const router = useRouter();
  const [showCallOrderModal, setShowCallOrderModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [startAIChatWithVoice, setStartAIChatWithVoice] = useState(false);

  const handleServiceClick = (serviceTitle: string) => {
    router.push(`/services/${slugify(serviceTitle)}`);
  };

  return (
    <main className="relative h-screen overflow-hidden text-white">
      <ShaderBackground />

      {showCallOrderModal && (
        <CallOrderModal isOpen={showCallOrderModal} onClose={() => setShowCallOrderModal(false)} />
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

      <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 lg:px-20 py-2">
        <div className="md:hidden flex items-center justify-between">
          <Link href="/">
            <img
              src="/logo.png"
              alt="Rahima Consulting"
              className="h-14 w-auto"
              style={{ filter: LOGO_FILTER }}
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/20"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="hidden md:flex items-center justify-between gap-8">
          <Link href="/" className="group relative">
            <img
              src="/logo.png"
              alt="Rahima Consulting"
              className="h-28 lg:h-32 w-auto transition-transform group-hover:scale-105"
              style={{ filter: LOGO_FILTER }}
            />
          </Link>

          <MegaMenu
            items={navItems}
            onServiceClick={handleServiceClick}
            onCasesAndReviewsClick={() => router.push("/cases")}
            onContactsClick={() => router.push("/contacts")}
          />

          <div className="flex items-center gap-3">
            <NotificationsDropdown />
            <AuthButton
              onSignInClick={() => router.push("/auth/signin")}
              onRegisterClick={() => router.push("/auth/register")}
            />
          </div>
        </div>
      </header>

      <div className="relative z-10 h-full">
        <section className="absolute left-1/2 bottom-[198px] -translate-x-1/2 w-full max-w-7xl px-4 text-center">
          <h1
            className="font-bold tracking-tight bg-gradient-to-r from-purple-200 via-blue-200 to-purple-400 bg-clip-text text-transparent leading-[0.96] mb-5"
            style={{
              fontFamily: "var(--font-orbitron), sans-serif",
              fontSize: "clamp(2.1rem, 3.05vw, 3.55rem)",
            }}
          >
            Автоматизация бизнеса и
            <br />
            бухгалтерское сопровождение в Крыму
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Ваш персональный ИИ-Ассистент и команда экспертов для масштабирования бизнеса в единой цифровой экосистеме.
          </p>

          <h2 className="sr-only">
            Регистрация ИП и ООО, интеграция СБИС, автоматизация выписок в Симферополе
          </h2>
        </section>

        <div className="absolute left-1/2 bottom-[138px] -translate-x-1/2 w-full px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowCallOrderModal(true)}
              className="flex items-center gap-2 px-8 py-3 bg-purple-600/20 border border-purple-500/30 rounded-2xl backdrop-blur-md hover:bg-purple-600/30 transition-all active:scale-95"
            >
              <Phone className="w-5 h-5" /> Заказать звонок
            </button>

            <Link
              href="/calculator"
              className="flex items-center gap-2 px-8 py-3 bg-blue-600/20 border border-blue-500/30 rounded-2xl backdrop-blur-md hover:bg-blue-600/30 transition-all active:scale-95"
            >
              <Calculator className="w-5 h-5" /> Расчёт стоимости
            </Link>

            <button
              onClick={() => {
                setStartAIChatWithVoice(false);
                setShowAIChat(true);
              }}
              className="flex items-center gap-2 px-8 py-3 bg-pink-600/20 border border-pink-500/30 rounded-2xl backdrop-blur-md hover:bg-pink-600/30 transition-all active:scale-95"
            >
              <MessageCircle className="w-5 h-5" /> ИИ Ассистент
            </button>
          </div>
        </div>
      </div>

      <Drawer.Root open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[101] bg-[#0A0A0A]/90 border-t border-white/10 p-6 rounded-t-3xl">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl py-2"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </main>
  );
}