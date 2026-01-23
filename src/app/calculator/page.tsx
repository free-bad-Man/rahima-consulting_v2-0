"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import { Calculator, Check, Phone, Mail, Loader2, CheckCircle2 } from "lucide-react";

interface Service {
  id: string;
  title: string;
  price: number;
  category: string;
}

const services: Service[] = [
  { id: "buh-ip", title: "Бухгалтерское сопровождение ИП", price: 5000, category: "Бухгалтерия" },
  { id: "buh-ooo", title: "Бухгалтерское сопровождение ООО", price: 10000, category: "Бухгалтерия" },
  { id: "reg-ip", title: "Регистрация ИП", price: 3000, category: "Регистрация" },
  { id: "reg-ooo", title: "Регистрация ООО", price: 8000, category: "Регистрация" },
  { id: "null-report", title: "Нулевая отчетность", price: 1000, category: "Бухгалтерия" },
  { id: "staff-report", title: "Отчетность по сотрудникам", price: 2500, category: "Бухгалтерия" },
  { id: "tax-opt", title: "Налоговая оптимизация", price: 15000, category: "Консультации" },
  { id: "legal", title: "Юридическое сопровождение", price: 20000, category: "Юриспруденция" },
  { id: "crm", title: "Внедрение CRM", price: 50000, category: "Автоматизация" },
  { id: "ai-assistant", title: "ИИ Ассистент для бизнеса", price: 30000, category: "ИИ" },
];

export default function CalculatorPage() {
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleService = (serviceId: string) => {
    const newSelected = new Set(selectedServices);
    if (newSelected.has(serviceId)) {
      newSelected.delete(serviceId);
    } else {
      newSelected.add(serviceId);
    }
    setSelectedServices(newSelected);
  };

  const totalPrice = Array.from(selectedServices).reduce((sum, serviceId) => {
    const service = services.find(s => s.id === serviceId);
    return sum + (service?.price || 0);
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedServices.size === 0) {
      setErrorMessage("Выберите хотя бы одну услугу");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const selectedServicesList = Array.from(selectedServices).map(id => {
        const service = services.find(s => s.id === id);
        return service ? `${service.title} (${service.price.toLocaleString()} ₽)` : '';
      }).filter(Boolean);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: `Расчёт стоимости: ${selectedServicesList.join(', ')}`,
          comment: `${formData.comment}\n\nОбщая стоимость: ${totalPrice.toLocaleString()} ₽`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка отправки");
      }

      setSubmitStatus("success");
      setFormData({ name: "", phone: "", email: "", comment: "" });
      setSelectedServices(new Set());
      
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Произошла ошибка");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Группировка услуг по категориям
  const servicesByCategory = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <>
      <ShaderBackground />
      
      <div className="min-h-screen relative z-10">
        <PageHeader />
        
        <main className="pt-24 md:pt-32 pb-48 md:pb-60 px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            
            <Breadcrumbs items={[
              { label: 'Главная', href: '/' },
              { label: 'Калькулятор стоимости', href: '/calculator' },
            ]} />

            <GlassCard className="mb-8" animationDelay={0}>
              <div className="flex items-center gap-4 mb-6">
                <Calculator className="w-12 h-12 text-purple-300" />
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Калькулятор стоимости
                  </h1>
                  <p className="text-white/70 mt-2">
                    Выберите услуги и рассчитайте примерную стоимость
                  </p>
                </div>
              </div>
            </GlassCard>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Выбор услуг */}
              <div className="lg:col-span-2 space-y-6">
                {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
                  <GlassCard key={category} animationDelay={100}>
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Check className="w-5 h-5 text-purple-300" />
                      {category}
                    </h2>
                    
                    <div className="space-y-2">
                      {categoryServices.map((service) => (
                        <label
                          key={service.id}
                          className={`
                            flex items-center justify-between p-4 rounded-lg cursor-pointer
                            transition-all duration-200
                            ${selectedServices.has(service.id)
                              ? 'bg-purple-500/20 border-2 border-purple-500'
                              : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={selectedServices.has(service.id)}
                              onChange={() => toggleService(service.id)}
                              className="w-5 h-5 rounded border-white/20 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-white font-medium">{service.title}</span>
                          </div>
                          <span className="text-purple-300 font-bold">
                            {service.price.toLocaleString()} ₽
                          </span>
                        </label>
                      ))}
                    </div>
                  </GlassCard>
                ))}
              </div>

              {/* Итого и форма */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Итоговая стоимость */}
                  <GlassCard animationDelay={200}>
                    <h2 className="text-xl font-bold text-white mb-4">Итого</h2>
                    
                    {selectedServices.size === 0 ? (
                      <p className="text-white/60 text-sm">Выберите услуги для расчёта</p>
                    ) : (
                      <>
                        <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                          {Array.from(selectedServices).map(serviceId => {
                            const service = services.find(s => s.id === serviceId);
                            return service ? (
                              <div key={serviceId} className="flex justify-between text-sm">
                                <span className="text-white/80">{service.title}</span>
                                <span className="text-white font-medium">
                                  {service.price.toLocaleString()} ₽
                                </span>
                              </div>
                            ) : null;
                          })}
                        </div>
                        
                        <div className="border-t border-white/20 pt-4 mt-4">
                          <div className="flex justify-between items-baseline">
                            <span className="text-white/80">Общая стоимость:</span>
                            <span className="text-3xl font-bold text-purple-300">
                              {totalPrice.toLocaleString()} ₽
                            </span>
                          </div>
                          <p className="text-white/50 text-xs mt-2">
                            * Итоговая стоимость может отличаться в зависимости от специфики проекта
                          </p>
                        </div>
                      </>
                    )}
                  </GlassCard>

                  {/* Форма заявки */}
                  {selectedServices.size > 0 && (
                    <GlassCard animationDelay={250}>
                      <h3 className="text-lg font-bold text-white mb-4">Оставить заявку</h3>
                      
                      {submitStatus === "success" ? (
                        <div className="text-center py-8">
                          <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
                          <p className="text-white text-lg font-medium mb-2">Заявка отправлена!</p>
                          <p className="text-white/60 text-sm">Мы свяжемся с вами в ближайшее время</p>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                            <label className="block text-white/80 text-sm mb-2">
                              Ваше имя *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20
                                       text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                              placeholder="Иван Иванов"
                            />
                          </div>

                          <div>
                            <label className="block text-white/80 text-sm mb-2">
                              Телефон *
                            </label>
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20
                                       text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                              placeholder="+7 (999) 123-45-67"
                            />
                          </div>

                          <div>
                            <label className="block text-white/80 text-sm mb-2">
                              Email
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20
                                       text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                              placeholder="email@example.com"
                            />
                          </div>

                          <div>
                            <label className="block text-white/80 text-sm mb-2">
                              Комментарий
                            </label>
                            <textarea
                              value={formData.comment}
                              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                              rows={3}
                              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20
                                       text-white placeholder-white/40 focus:outline-none focus:border-purple-500 resize-none"
                              placeholder="Дополнительная информация..."
                            />
                          </div>

                          {submitStatus === "error" && (
                            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                              {errorMessage || "Произошла ошибка при отправке"}
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600
                                     hover:from-purple-700 hover:to-blue-700 disabled:opacity-50
                                     text-white font-medium transition-all transform hover:scale-105
                                     disabled:transform-none flex items-center justify-center gap-2"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Отправка...
                              </>
                            ) : (
                              <>
                                <Phone className="w-5 h-5" />
                                Отправить заявку
                              </>
                            )}
                          </button>

                          <p className="text-white/50 text-xs text-center">
                            Нажимая кнопку, вы соглашаетесь с{' '}
                            <a href="/privacy" className="text-purple-300 hover:text-purple-200">
                              политикой конфиденциальности
                            </a>
                          </p>
                        </form>
                      )}
                    </GlassCard>
                  )}
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}

