'use client';

import { WifiOff } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
          <WifiOff className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Нет подключения
        </h1>
        
        <p className="text-lg text-white/70 mb-8 max-w-md">
          Вы находитесь в офлайн-режиме. Некоторые функции могут быть недоступны.
        </p>
        
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
        >
          Попробовать снова
        </button>
        
        <p className="text-sm text-white/50 mt-8">
          Сохранённые страницы доступны для просмотра
        </p>
      </div>
    </div>
  );
}

