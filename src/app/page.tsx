"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Calculator, MessageCircle, Phone } from "lucide-react";
import PageHeader from "@/components/page-header";

const ShaderBackground = dynamic(() => import("@/components/ui/shader-background"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 h-full w-full -z-10 bg-[#0a0a1e]" />,
});

const CallOrderModal = dynamic(() => import("@/components/call-order-modal"), { ssr: false });
const AIChatAssistant = dynamic(() => import("@/components/ai-chat-assistant"), { ssr: false });

export default function Page() {
  const [showCallOrderModal, setShowCallOrderModal] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [startAIChatWithVoice, setStartAIChatWithVoice] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
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

      <div className="relative z-10 min-h-screen">
        <PageHeader />

        <main className="relative min-h-screen">
          <section className="absolute left-1/2 bottom-[198px] w-full max-w-7xl -translate-x-1/2 px-4 text-center">
            <h1
              className="mb-5 bg-gradient-to-r from-purple-200 via-blue-200 to-purple-400 bg-clip-text font-bold tracking-tight text-transparent leading-[0.96]"
              style={{
                fontFamily: "var(--font-orbitron), sans-serif",
                fontSize: "clamp(2.1rem, 3.05vw, 3.55rem)",
              }}
            >
              Автоматизация бизнеса и
              <br />
              бухгалтерское сопровождение в Крыму
            </h1>

            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">
              Ваш персональный ИИ-Ассистент и команда экспертов для масштабирования бизнеса в
              единой цифровой экосистеме.
            </p>

            <h2 className="sr-only">
              Регистрация ИП и ООО, интеграция СБИС, автоматизация выписок в Симферополе
            </h2>
          </section>

          <div className="absolute left-1/2 bottom-[138px] w-full -translate-x-1/2 px-4">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setShowCallOrderModal(true)}
                className="flex items-center gap-2 rounded-2xl border border-purple-500/30 bg-purple-600/20 px-8 py-3 backdrop-blur-md transition-all active:scale-95 hover:bg-purple-600/30"
              >
                <Phone className="h-5 w-5" />
                Заказать звонок
              </button>

              <Link
                href="/calculator"
                className="flex items-center gap-2 rounded-2xl border border-blue-500/30 bg-blue-600/20 px-8 py-3 backdrop-blur-md transition-all active:scale-95 hover:bg-blue-600/30"
              >
                <Calculator className="h-5 w-5" />
                Расчёт стоимости
              </Link>

              <button
                onClick={() => {
                  setStartAIChatWithVoice(false);
                  setShowAIChat(true);
                }}
                className="flex items-center gap-2 rounded-2xl border border-pink-500/30 bg-pink-600/20 px-8 py-3 backdrop-blur-md transition-all active:scale-95 hover:bg-pink-600/30"
              >
                <MessageCircle className="h-5 w-5" />
                ИИ Ассистент
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}