"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, WifiOff, Bell, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallModal() {
  const [showModal, setShowModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Проверяем, что код выполняется на клиенте
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return;
    }

    // Проверяем, что это мобильное устройство
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Проверяем, что PWA ещё не установлено
    const isInstalled = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    
    // Проверяем, что пользователь не закрывал модалку ранее
    const hasClosedModal = sessionStorage.getItem('pwa-modal-closed');

    console.log('PWA Check:', { isMobile, isInstalled, hasClosedModal });

    if (isMobile && !isInstalled && !hasClosedModal) {
      // Ловим событие beforeinstallprompt
      const handleBeforeInstallPrompt = (e: Event) => {
        console.log('beforeinstallprompt event fired');
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        
        // Показываем модалку СРАЗУ
        setShowModal(true);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      // Для iOS (они не поддерживают beforeinstallprompt)
      // Показываем модалку с инструкцией
      if (isMobile && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        setTimeout(() => {
          setShowModal(true);
        }, 1000);
      }

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Android/Chrome - используем стандартный промпт
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log(`User response: ${outcome}`);
      
      if (outcome === 'accepted') {
        console.log('✅ PWA установлено!');
      }
      
      setDeferredPrompt(null);
      setShowModal(false);
      sessionStorage.setItem('pwa-modal-closed', 'true');
    } else {
      // iOS - просто закрываем (они сами добавят через Safari)
      setShowModal(false);
      sessionStorage.setItem('pwa-modal-closed', 'true');
    }
  };

  const handleClose = () => {
    setShowModal(false);
    sessionStorage.setItem('pwa-modal-closed', 'true');
  };

  // Определяем, это iOS или Android
  const isIOS = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent);

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md"
          >
            <div className="relative bg-gradient-to-br from-[#0A0A0A]/95 via-purple-900/10 to-blue-900/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden backdrop-blur-xl">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/20 animate-pulse" />
              
              <div className="relative p-8 md:p-10">
                {/* Logo/Icon */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="flex justify-center mb-6"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-2xl opacity-50 animate-pulse" />
                    <div className="relative w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center">
                      <Smartphone className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl md:text-3xl font-bold text-center mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                >
                  Открыть Rahima Consulting
                  <br />
                  на мобильном
                </motion.h2>

                {/* Features */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4 mb-8"
                >
                  <div className="flex items-center gap-3 text-white">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                      <Zap className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="text-lg">Быстрый доступ</span>
                  </div>

                  <div className="flex items-center gap-3 text-white">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                      <WifiOff className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="text-lg">Работает офлайн</span>
                  </div>

                  <div className="flex items-center gap-3 text-white">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                      <Bell className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="text-lg">Push-уведомления</span>
                  </div>
                </motion.div>

                {/* iOS specific instruction */}
                {isIOS && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl"
                  >
                    <p className="text-sm text-white/80 text-center">
                      Нажмите <span className="font-bold">📤 Поделиться</span> → <span className="font-bold">На экран "Домой"</span>
                    </p>
                  </motion.div>
                )}

                {/* Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
                >
                  <button
                    onClick={handleInstall}
                    className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg shadow-purple-500/50 transition-all transform hover:scale-105 active:scale-95"
                  >
                    {isIOS ? 'Понятно' : 'Установить приложение'}
                  </button>

                  <button
                    onClick={handleClose}
                    className="w-full py-3 px-6 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm font-medium rounded-xl border border-white/10 transition-all"
                  >
                    Продолжить в браузере
                  </button>
                </motion.div>

                {/* Note */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-xs text-white/40 text-center mt-4"
                >
                  Занимает всего ~1 МБ
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

