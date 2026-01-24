"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/page-header";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import { downloadCalculationPDF } from "@/lib/pdf-generator";
import { 
  Calculator, 
  Download, 
  Mail, 
  Share2, 
  CheckCircle2, 
  Building2,
  Users,
  TrendingUp,
  Clock,
  AlertCircle
} from "lucide-react";

interface CalculationData {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  businessType: string;
  taxSystem: string;
  employeesCount: number;
  hasNDS: boolean;
  hasVED: boolean;
  operationsCount: number;
  services: any[];
  surcharges: any;
  breakdown: any;
  totalMonthly: number;
  totalOneTime: number;
  totalYearly: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  IP: "Индивидуальный предприниматель (ИП)",
  OOO: "Общество с ограниченной ответственностью (ООО)",
};

const TAX_SYSTEM_LABELS: Record<string, string> = {
  USN_6: "УСН 6% (Доходы)",
  USN_15: "УСН 15% (Доходы минус расходы)",
  OSNO: "ОСНО (Общая система налогообложения)",
  PATENT: "Патентная система налогообложения",
};

const OPERATIONS_RANGES: Record<string, string> = {
  "0-20": "0-20 операций в месяц",
  "20-50": "20-50 операций в месяц",
  "50-100": "50-100 операций в месяц",
  "100-300": "100-300 операций в месяц",
  "300+": "более 300 операций в месяц",
};

export default function CalculationViewPage() {
  const params = useParams();
  const router = useRouter();
  const [calculation, setCalculation] = useState<CalculationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const fetchCalculation = async () => {
      try {
        const response = await fetch(`/api/calculator/${params.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Не удалось загрузить расчёт");
        }

        setCalculation(data.calculation);
      } catch (err: any) {
        setError(err.message || "Произошла ошибка");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCalculation();
    }
  }, [params.id]);

  const handleDownloadPDF = () => {
    if (calculation) {
      downloadCalculationPDF(calculation, `расчет-${calculation.id}.pdf`);
    }
  };

  const handleSendEmail = () => {
    // TODO: Реализовать отправку на email
    const email = prompt("Введите ваш email:");
    if (email) {
      alert(`Расчёт будет отправлен на ${email}`);
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  if (loading) {
    return (
      <>
        <PageHeader />
        <ShaderBackground />
        <main className="pt-24 md:pt-32 pb-48 md:pb-60 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto text-center">
            <div className="text-white text-xl">Загрузка расчёта...</div>
          </div>
        </main>
      </>
    );
  }

  if (error || !calculation) {
    return (
      <>
        <PageHeader />
        <ShaderBackground />
        <main className="pt-24 md:pt-32 pb-48 md:pb-60 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <GlassCard>
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">Расчёт не найден</h1>
                <p className="text-white/70 mb-6">{error || "Возможно, ссылка устарела или расчёт был удалён"}</p>
                <button
                  onClick={() => router.push("/calculator")}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Создать новый расчёт
                </button>
              </div>
            </GlassCard>
          </div>
        </main>
      </>
    );
  }

  const getOperationsRange = () => {
    const count = calculation.operationsCount;
    if (count <= 20) return OPERATIONS_RANGES["0-20"];
    if (count <= 50) return OPERATIONS_RANGES["20-50"];
    if (count <= 100) return OPERATIONS_RANGES["50-100"];
    if (count <= 300) return OPERATIONS_RANGES["100-300"];
    return OPERATIONS_RANGES["300+"];
  };

  return (
    <>
      <PageHeader />
      <ShaderBackground />
      <main className="pt-24 md:pt-32 pb-48 md:pb-60 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-4">
              <Calculator className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Ваш расчёт стоимости услуг
            </h1>
            <p className="text-xl text-white/70">
              Детализированный расчёт с учётом всех параметров вашего бизнеса
            </p>
          </div>

          {/* Кнопки действий */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <Download className="w-5 h-5" />
              Скачать PDF
            </button>
            <button
              onClick={handleSendEmail}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl hover:bg-white/20 transition-all"
            >
              <Mail className="w-5 h-5" />
              Отправить на email
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl hover:bg-white/20 transition-all relative"
            >
              {copySuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  Скопировано!
                </>
              ) : (
                <>
                  <Share2 className="w-5 h-5" />
                  Скопировать ссылку
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Левая колонка: Итоговая стоимость */}
            <div className="lg:col-span-1 space-y-6">
              <GlassCard>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                  Итоговая стоимость
                </h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                    <div className="text-sm text-white/70 mb-1">Ежемесячно</div>
                    <div className="text-3xl font-bold text-white">
                      {calculation.totalMonthly.toLocaleString('ru-RU')} ₽
                    </div>
                  </div>

                  {calculation.totalOneTime > 0 && (
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-sm text-white/70 mb-1">Разовые платежи</div>
                      <div className="text-2xl font-bold text-white">
                        {calculation.totalOneTime.toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-sm text-white/70 mb-1">В год</div>
                    <div className="text-2xl font-bold text-white">
                      {calculation.totalYearly.toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Параметры бизнеса */}
              <GlassCard>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-400" />
                  Параметры
                </h2>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-white/50 mb-1">Тип бизнеса</div>
                    <div className="text-white font-medium">{BUSINESS_TYPE_LABELS[calculation.businessType]}</div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-1">Система налогообложения</div>
                    <div className="text-white font-medium">{TAX_SYSTEM_LABELS[calculation.taxSystem]}</div>
                  </div>
                  {calculation.employeesCount > 0 && (
                    <div>
                      <div className="text-white/50 mb-1">Сотрудников</div>
                      <div className="text-white font-medium flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {calculation.employeesCount} чел.
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="text-white/50 mb-1">Операций в месяц</div>
                    <div className="text-white font-medium">{getOperationsRange()}</div>
                  </div>
                  {calculation.hasNDS && (
                    <div className="flex items-center gap-2 text-purple-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Работа с НДС</span>
                    </div>
                  )}
                  {calculation.hasVED && (
                    <div className="flex items-center gap-2 text-purple-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Внешнеэкономическая деятельность</span>
                    </div>
                  )}
                </div>
              </GlassCard>

              {/* Информация о расчёте */}
              <GlassCard>
                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-2 text-white/50">
                    <Clock className="w-4 h-4" />
                    <span>Создан: {new Date(calculation.createdAt).toLocaleString('ru-RU')}</span>
                  </div>
                  <div className="text-white/50">
                    Просмотров: {calculation.viewCount}
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Правая колонка: Детализация */}
            <div className="lg:col-span-2 space-y-6">
              {/* Выбранные услуги */}
              {calculation.services && calculation.services.length > 0 && (
                <GlassCard>
                  <h2 className="text-2xl font-bold text-white mb-6">Выбранные услуги</h2>
                  <div className="space-y-4">
                    {calculation.services.map((service: any, index: number) => (
                      <div
                        key={index}
                        className="p-4 bg-white/5 rounded-xl border border-white/10"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                          <div className="text-right">
                            {service.monthly > 0 && (
                              <div className="text-white font-bold">
                                {service.monthly.toLocaleString('ru-RU')} ₽/мес
                              </div>
                            )}
                            {service.oneTime > 0 && (
                              <div className="text-white/70 text-sm">
                                {service.oneTime.toLocaleString('ru-RU')} ₽ разово
                              </div>
                            )}
                          </div>
                        </div>
                        {service.description && (
                          <p className="text-white/60 text-sm">{service.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* Надбавки */}
              {calculation.surcharges && Object.keys(calculation.surcharges).length > 0 && (
                <GlassCard>
                  <h2 className="text-2xl font-bold text-white mb-6">Надбавки</h2>
                  <div className="space-y-3">
                    {Object.entries(calculation.surcharges).map(([key, value]: [string, any]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center p-3 bg-white/5 rounded-lg"
                      >
                        <span className="text-white/80">{value.name}</span>
                        <span className="text-white font-semibold">
                          {value.amount ? `${value.amount.toLocaleString('ru-RU')} ₽` : value.percentage}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* Детализация расчёта */}
              {calculation.breakdown && Object.keys(calculation.breakdown).length > 0 && (
                <GlassCard>
                  <h2 className="text-2xl font-bold text-white mb-6">Детализация расчёта</h2>
                  <div className="space-y-2 text-sm">
                    {Object.entries(calculation.breakdown).map(([key, value]: [string, any]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center py-2 border-b border-white/10 last:border-0"
                      >
                        <span className="text-white/70">{key}</span>
                        <span className="text-white font-medium">
                          {typeof value === 'number' ? `${value.toLocaleString('ru-RU')} ₽` : value}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* Призыв к действию */}
              <GlassCard>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">Готовы начать?</h2>
                  <p className="text-white/70 mb-6">
                    Оставьте заявку, и наш менеджер свяжется с вами в течение 2 часов
                  </p>
                  <button
                    onClick={() => router.push("/calculator")}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold rounded-xl hover:shadow-lg transition-all"
                  >
                    Оставить заявку
                  </button>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

