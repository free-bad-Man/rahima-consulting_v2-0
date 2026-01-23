import { Metadata } from "next";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Контакты | Rahima Consulting",
  description: "Свяжитесь с нами: телефон, email, адрес офиса. Работаем 24/7 для вашего удобства",
  openGraph: {
    title: "Контакты | Rahima Consulting",
    description: "Свяжитесь с нами любым удобным способом",
    type: "website",
  },
};

export default function ContactsPage() {
  return (
    <div className="relative min-h-screen">
      <ShaderBackground />
      
      <div className="relative z-10">
        <PageHeader />
        
        <main className="pt-24 md:pt-32 pb-48 md:pb-60 px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            
            <Breadcrumbs items={[
              { label: 'Главная', href: '/' },
              { label: 'Контакты', href: '/contacts' },
            ]} />

            {/* Hero Section */}
            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-purple-blue">
                Свяжитесь с нами
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
                Мы всегда готовы ответить на ваши вопросы и помочь с решением бизнес-задач
              </p>
            </GlassCard>

            {/* Contact Methods */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <GlassCard animationDelay={100} className="text-center">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 mb-4">
                  <Phone className="w-6 h-6 text-purple-300" />
                </div>
                <div className="text-sm text-white/60 mb-2">Телефон</div>
                <a href="tel:+79000000000" className="text-lg font-semibold text-white hover:text-purple-300 transition-colors">
                  +7 (900) 000-00-00
                </a>
              </GlassCard>

              <GlassCard animationDelay={150} className="text-center">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 mb-4">
                  <Mail className="w-6 h-6 text-purple-300" />
                </div>
                <div className="text-sm text-white/60 mb-2">Email</div>
                <a href="mailto:info@rahima.ru" className="text-lg font-semibold text-white hover:text-purple-300 transition-colors">
                  info@rahima.ru
                </a>
              </GlassCard>

              <GlassCard animationDelay={200} className="text-center">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 mb-4">
                  <MessageCircle className="w-6 h-6 text-purple-300" />
                </div>
                <div className="text-sm text-white/60 mb-2">Telegram</div>
                <a href="https://t.me/rahima_consulting" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-white hover:text-purple-300 transition-colors">
                  @rahima_consulting
                </a>
              </GlassCard>

              <GlassCard animationDelay={250} className="text-center">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 mb-4">
                  <Clock className="w-6 h-6 text-purple-300" />
                </div>
                <div className="text-sm text-white/60 mb-2">Режим работы</div>
                <div className="text-lg font-semibold text-white">
                  24/7
                </div>
              </GlassCard>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Contact Form */}
              <GlassCard animationDelay={300}>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Напишите нам
                </h2>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                                 text-white placeholder-white/40
                                 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20
                                 transition-all"
                      placeholder="Иван Иванов"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                                 text-white placeholder-white/40
                                 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20
                                 transition-all"
                      placeholder="+7 (900) 000-00-00"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                                 text-white placeholder-white/40
                                 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20
                                 transition-all"
                      placeholder="ivan@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                      Сообщение *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                                 text-white placeholder-white/40
                                 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20
                                 transition-all resize-none"
                      placeholder="Расскажите о вашей задаче..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 
                               bg-gradient-to-r from-purple-600 to-blue-600 
                               rounded-lg text-white font-semibold
                               hover:from-purple-700 hover:to-blue-700 
                               transform hover:scale-[1.02] transition-all duration-200
                               shadow-lg shadow-purple-500/50"
                  >
                    <Send className="w-5 h-5" />
                    Отправить сообщение
                  </button>

                  <p className="text-xs text-white/60 text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              </GlassCard>

              {/* Office Address */}
              <GlassCard animationDelay={350}>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Наш офис
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex-shrink-0">
                      <MapPin className="w-6 h-6 text-purple-300" />
                    </div>
                    <div>
                      <div className="text-sm text-white/60 mb-1">Адрес</div>
                      <div className="text-white font-medium">
                        Республика Крым, г. Симферополь<br />
                        ул. Примерная, д. 1, офис 101
                      </div>
                    </div>
                  </div>

                  <div className="h-64 rounded-lg bg-white/5 border border-white/10 overflow-hidden">
                    {/* Placeholder for map - replace with actual map integration */}
                    <div className="w-full h-full flex items-center justify-center text-white/40">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 mx-auto mb-2 opacity-40" />
                        <p>Интерактивная карта</p>
                        <p className="text-sm">(подключите Яндекс.Карты или Google Maps)</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20">
                    <div className="text-sm font-semibold text-purple-300 mb-2">
                      📍 Как добраться
                    </div>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li>• 5 минут пешком от станции метро «Центральная»</li>
                      <li>• Автобусы: 12, 45, 67</li>
                      <li>• Парковка для клиентов</li>
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Why Choose Us */}
            <GlassCard animationDelay={400}>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                Почему выбирают нас
              </h2>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-300 mb-2">10+</div>
                  <div className="text-white/80">лет на рынке</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-300 mb-2">500+</div>
                  <div className="text-white/80">довольных клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-300 mb-2">24/7</div>
                  <div className="text-white/80">поддержка</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-300 mb-2">98%</div>
                  <div className="text-white/80">рекомендуют нас</div>
                </div>
              </div>
            </GlassCard>

          </div>
        </main>
      </div>
    </div>
  );
}

