"use client";

import { useEffect } from 'react';

export default function PWARegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('✅ Service Worker зарегистрирован:', registration.scope);
            
            // Проверяем обновления каждый час
            setInterval(() => {
              registration.update();
            }, 60 * 60 * 1000);
          })
          .catch((error) => {
            console.error('❌ Ошибка регистрации Service Worker:', error);
          });
      });
    }
  }, []);

  return null;
}

