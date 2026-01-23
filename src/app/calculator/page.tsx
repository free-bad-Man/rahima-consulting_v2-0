'use client';

import { useState, useEffect } from 'react';
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import { Calculator, CheckCircle2, AlertCircle } from "lucide-react";

// ============ ТИПЫ ============
type EntityType = 'IP' | 'OOO' | null;
type TaxSystem = 'USN_6' | 'USN_15' | 'OSNO' | 'PATENT' | null;

interface CalculationResult {
  oneTime: number;
  monthly: number;
  breakdown: {
    category: string;
    items: { name: string; price: number; type: 'one-time' | 'monthly' }[];
  }[];
}

// ============ ПРАЙС-ЛИСТ ============
const PRICES = {
  // Бухгалтерское сопровождение (ежемесячно)
  accounting: {
    IP: {
      USN_6: 8000,
      USN_15: 10000,
      OSNO: 18000,
      PATENT: 6000,
    },
    OOO: {
      USN_6: 12000,
      USN_15: 15000,
      OSNO: 25000,
    },
  },
  // Надбавки
  surcharges: {
    perEmployee: 500, // за каждого сотрудника
    nds: 0.4, // +40% за НДС
    ved: 0.3, // +30% за ВЭД
    operations: [
      { max: 20, multiplier: 0 },
      { max: 50, multiplier: 0.2 },
      { max: 100, multiplier: 0.4 },
      { max: 300, multiplier: 0.7 },
      { max: Infinity, multiplier: 1.0 },
    ],
  },
  // Только отчётность (ежемесячно)
  reportingOnly: {
    IP: 4000,
    OOO: 6000,
  },
  // Зарплата и кадры (ежемесячно)
  payroll: {
    base: 2000,
    perEmployee: 400,
  },
  // Разовые услуги
  oneTime: {
    restoreAccounting: {
      IP: 12000, // за квартал
      OOO: 18000,
    },
    setupAccounting: {
      IP: 15000,
      OOO: 25000,
    },
    registration: {
      IP: 5000,
      OOO: 12000,
    },
    changes: 5000, // изменения в ЕГРЮЛ/ЕГРИП
    liquidation: {
      IP: 8000,
      OOO: 25000,
    },
    ecp: 3500, // электронная подпись
    legalAddress: 15000, // юр. адрес (год)
    legalAudit: 35000,
    marketingStrategy: 50000,
  },
  // Юридические (ежемесячно)
  legal: {
    support: 15000,
    contracts: 8000, // до 5 договоров
    additionalContract: 2000,
    tenders: 25000,
  },
  // Автоматизация
  automation: {
    crm: { oneTime: 45000, monthly: 10000 },
    integrations: { oneTime: 30000, monthly: 8000 },
    aiAssistant: 5000, // ежемесячно
    dashboards: 20000, // разово
  },
  // Маркетинг (ежемесячно)
  marketing: {
    smm: 25000,
    ads: 15000, // + бюджет
  },
};

export default function CalculatorPage() {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Калькулятор", href: "/calculator" },
  ];

  // ============ СОСТОЯНИЕ ============
  // Основные параметры
  const [entityType, setEntityType] = useState<EntityType>(null);
  const [taxSystem, setTaxSystem] = useState<TaxSystem>(null);
  const [employees, setEmployees] = useState<number>(0);
  const [operations, setOperations] = useState<number>(0);
  const [hasNDS, setHasNDS] = useState(false);
  const [hasVED, setHasVED] = useState(false);

  // Основная услуга
  const [mainService, setMainService] = useState<'full' | 'reporting' | 'none'>('none');

  // Дополнительные услуги
  const [payroll, setPayroll] = useState(false);
  const [restoreAccounting, setRestoreAccounting] = useState(false);
  const [setupAccounting, setSetupAccounting] = useState(false);
  const [registration, setRegistration] = useState(false);
  const [changes, setChanges] = useState(false);
  const [liquidation, setLiquidation] = useState(false);
  const [ecp, setEcp] = useState(false);
  const [legalAddress, setLegalAddress] = useState(false);
  const [legalSupport, setLegalSupport] = useState(false);
  const [contracts, setContracts] = useState(false);
  const [additionalContracts, setAdditionalContracts] = useState<number>(0);
  const [tenders, setTenders] = useState(false);
  const [legalAudit, setLegalAudit] = useState(false);
  const [crm, setCrm] = useState(false);
  const [integrations, setIntegrations] = useState(false);
  const [aiAssistant, setAiAssistant] = useState(false);
  const [dashboards, setDashboards] = useState(false);
  const [smm, setSmm] = useState(false);
  const [ads, setAds] = useState(false);
  const [marketingStrategy, setMarketingStrategy] = useState(false);

  // Форма заявки
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // ============ РАСЧЁТ ============
  const calculateTotal = (): CalculationResult => {
    const breakdown: CalculationResult['breakdown'] = [];
    let oneTimeTotal = 0;
    let monthlyTotal = 0;

    // 1. БУХГАЛТЕРСКОЕ СОПРОВОЖДЕНИЕ
    if (mainService === 'full' && entityType && taxSystem) {
      const accountingItems: { name: string; price: number; type: 'monthly' }[] = [];
      
      // Базовая стоимость
      let basePrice = 0;
      if (entityType === 'IP') {
        basePrice = PRICES.accounting.IP[taxSystem] || 0;
      } else if (entityType === 'OOO' && taxSystem !== 'PATENT') {
        basePrice = PRICES.accounting.OOO[taxSystem] || 0;
      }

      if (basePrice > 0) {
        accountingItems.push({
          name: `Бухгалтерское сопровождение (${entityType} ${taxSystem.replace('_', ' ')})`,
          price: basePrice,
          type: 'monthly',
        });

        // Надбавки
        let totalSurcharge = 0;

        // Сотрудники
        if (employees > 0) {
          const empSurcharge = employees * PRICES.surcharges.perEmployee;
          totalSurcharge += empSurcharge;
          accountingItems.push({
            name: `Надбавка за сотрудников (${employees} чел.)`,
            price: empSurcharge,
            type: 'monthly',
          });
        }

        // НДС
        if (hasNDS) {
          const ndsSurcharge = basePrice * PRICES.surcharges.nds;
          totalSurcharge += ndsSurcharge;
          accountingItems.push({
            name: 'Надбавка за НДС (+40%)',
            price: ndsSurcharge,
            type: 'monthly',
          });
        }

        // ВЭД
        if (hasVED) {
          const vedSurcharge = basePrice * PRICES.surcharges.ved;
          totalSurcharge += vedSurcharge;
          accountingItems.push({
            name: 'Надбавка за ВЭД (+30%)',
            price: vedSurcharge,
            type: 'monthly',
          });
        }

        // Операции
        if (operations > 0) {
          const opRange = PRICES.surcharges.operations.find(r => operations <= r.max)!;
          if (opRange.multiplier > 0) {
            const opSurcharge = basePrice * opRange.multiplier;
            totalSurcharge += opSurcharge;
            accountingItems.push({
              name: `Надбавка за операции (${operations} шт, +${opRange.multiplier * 100}%)`,
              price: opSurcharge,
              type: 'monthly',
            });
          }
        }

        monthlyTotal += basePrice + totalSurcharge;
      }

      if (accountingItems.length > 0) {
        breakdown.push({ category: '📊 Бухгалтерское сопровождение', items: accountingItems });
      }
    }

    // 2. ТОЛЬКО ОТЧЁТНОСТЬ
    if (mainService === 'reporting' && entityType) {
      const reportingPrice = PRICES.reportingOnly[entityType] || 0;
      if (reportingPrice > 0) {
        breakdown.push({
          category: '📋 Отчётность',
          items: [{
            name: `Сдача отчётности (${entityType})`,
            price: reportingPrice,
            type: 'monthly',
          }],
        });
        monthlyTotal += reportingPrice;
      }
    }

    // 3. ЗАРПЛАТА И КАДРЫ
    if (payroll) {
      const payrollPrice = PRICES.payroll.base + (employees * PRICES.payroll.perEmployee);
      breakdown.push({
        category: '👥 Зарплата и кадры',
        items: [{
          name: `Зарплата и кадры (${employees} сотр.)`,
          price: payrollPrice,
          type: 'monthly',
        }],
      });
      monthlyTotal += payrollPrice;
    }

    // 4. РАЗОВЫЕ БУХГАЛТЕРСКИЕ УСЛУГИ
    const oneTimeAccounting: { name: string; price: number; type: 'one-time' }[] = [];
    
    if (restoreAccounting && entityType) {
      const price = PRICES.oneTime.restoreAccounting[entityType] || 0;
      oneTimeAccounting.push({ name: `Восстановление учёта (${entityType}, за квартал)`, price, type: 'one-time' });
      oneTimeTotal += price;
    }

    if (setupAccounting && entityType) {
      const price = PRICES.oneTime.setupAccounting[entityType] || 0;
      oneTimeAccounting.push({ name: `Постановка учёта с нуля (${entityType})`, price, type: 'one-time' });
      oneTimeTotal += price;
    }

    if (oneTimeAccounting.length > 0) {
      breakdown.push({ category: '🔧 Разовые бухгалтерские услуги', items: oneTimeAccounting });
    }

    // 5. РЕГИСТРАЦИЯ БИЗНЕСА
    const registrationItems: { name: string; price: number; type: 'one-time' }[] = [];

    if (registration && entityType) {
      const price = PRICES.oneTime.registration[entityType] || 0;
      registrationItems.push({ name: `Регистрация ${entityType}`, price, type: 'one-time' });
      oneTimeTotal += price;
    }

    if (changes) {
      registrationItems.push({ name: 'Внесение изменений в ЕГРЮЛ/ЕГРИП', price: PRICES.oneTime.changes, type: 'one-time' });
      oneTimeTotal += PRICES.oneTime.changes;
    }

    if (liquidation && entityType) {
      const price = PRICES.oneTime.liquidation[entityType] || 0;
      registrationItems.push({ name: `Ликвидация ${entityType}`, price, type: 'one-time' });
      oneTimeTotal += price;
    }

    if (ecp) {
      registrationItems.push({ name: 'Электронная подпись (ЭЦП)', price: PRICES.oneTime.ecp, type: 'one-time' });
      oneTimeTotal += PRICES.oneTime.ecp;
    }

    if (legalAddress) {
      registrationItems.push({ name: 'Юридический адрес (год)', price: PRICES.oneTime.legalAddress, type: 'one-time' });
      oneTimeTotal += PRICES.oneTime.legalAddress;
    }

    if (registrationItems.length > 0) {
      breakdown.push({ category: '🏢 Регистрация бизнеса', items: registrationItems });
    }

    // 6. ЮРИДИЧЕСКИЕ УСЛУГИ
    const legalItems: { name: string; price: number; type: 'monthly' | 'one-time' }[] = [];

    if (legalSupport) {
      legalItems.push({ name: 'Юридическое сопровождение', price: PRICES.legal.support, type: 'monthly' });
      monthlyTotal += PRICES.legal.support;
    }

    if (contracts) {
      legalItems.push({ name: 'Договорная работа (до 5 договоров)', price: PRICES.legal.contracts, type: 'monthly' });
      monthlyTotal += PRICES.legal.contracts;
    }

    if (additionalContracts > 0) {
      const price = additionalContracts * PRICES.legal.additionalContract;
      legalItems.push({ name: `Дополнительные договоры (${additionalContracts} шт)`, price, type: 'monthly' });
      monthlyTotal += price;
    }

    if (tenders) {
      legalItems.push({ name: 'Участие в тендерах', price: PRICES.legal.tenders, type: 'monthly' });
      monthlyTotal += PRICES.legal.tenders;
    }

    if (legalAudit) {
      legalItems.push({ name: 'Юридический аудит', price: PRICES.oneTime.legalAudit, type: 'one-time' });
      oneTimeTotal += PRICES.oneTime.legalAudit;
    }

    if (legalItems.length > 0) {
      breakdown.push({ category: '⚖️ Юридические услуги', items: legalItems });
    }

    // 7. АВТОМАТИЗАЦИЯ
    const automationItems: { name: string; price: number; type: 'monthly' | 'one-time' }[] = [];

    if (crm) {
      automationItems.push({ name: 'Внедрение CRM (amoCRM)', price: PRICES.automation.crm.oneTime, type: 'one-time' });
      automationItems.push({ name: 'Поддержка CRM', price: PRICES.automation.crm.monthly, type: 'monthly' });
      oneTimeTotal += PRICES.automation.crm.oneTime;
      monthlyTotal += PRICES.automation.crm.monthly;
    }

    if (integrations) {
      automationItems.push({ name: 'Интеграции (базовый пакет)', price: PRICES.automation.integrations.oneTime, type: 'one-time' });
      automationItems.push({ name: 'Поддержка интеграций', price: PRICES.automation.integrations.monthly, type: 'monthly' });
      oneTimeTotal += PRICES.automation.integrations.oneTime;
      monthlyTotal += PRICES.automation.integrations.monthly;
    }

    if (aiAssistant) {
      automationItems.push({ name: 'ИИ-ассистент', price: PRICES.automation.aiAssistant, type: 'monthly' });
      monthlyTotal += PRICES.automation.aiAssistant;
    }

    if (dashboards) {
      automationItems.push({ name: 'Дашборды и аналитика', price: PRICES.automation.dashboards, type: 'one-time' });
      oneTimeTotal += PRICES.automation.dashboards;
    }

    if (automationItems.length > 0) {
      breakdown.push({ category: '🤖 Автоматизация', items: automationItems });
    }

    // 8. МАРКЕТИНГ
    const marketingItems: { name: string; price: number; type: 'monthly' | 'one-time' }[] = [];

    if (smm) {
      marketingItems.push({ name: 'Ведение соцсетей (SMM)', price: PRICES.marketing.smm, type: 'monthly' });
      monthlyTotal += PRICES.marketing.smm;
    }

    if (ads) {
      marketingItems.push({ name: 'Реклама (+ бюджет отдельно)', price: PRICES.marketing.ads, type: 'monthly' });
      monthlyTotal += PRICES.marketing.ads;
    }

    if (marketingStrategy) {
      marketingItems.push({ name: 'Маркетинговая стратегия', price: PRICES.oneTime.marketingStrategy, type: 'one-time' });
      oneTimeTotal += PRICES.oneTime.marketingStrategy;
    }

    if (marketingItems.length > 0) {
      breakdown.push({ category: '📈 Маркетинг', items: marketingItems });
    }

    return { oneTime: oneTimeTotal, monthly: monthlyTotal, breakdown };
  };

  const result = calculateTotal();

  // ============ ОТПРАВКА ФОРМЫ ============
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const servicesDescription = result.breakdown
        .map(cat => `${cat.category}:\n${cat.items.map(item => `  - ${item.name}: ${item.price.toLocaleString('ru-RU')} руб.`).join('\n')}`)
        .join('\n\n');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          comment: `Расчёт из калькулятора:\n\n📊 ИТОГО:\n- Разовые платежи: ${result.oneTime.toLocaleString('ru-RU')} руб.\n- Ежемесячные платежи: ${result.monthly.toLocaleString('ru-RU')} руб./мес\n\n${servicesDescription}\n\nКомментарий клиента:\n${comment}`,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setSubmitStatus('success');
      // Очистка формы
      setName('');
      setPhone('');
      setEmail('');
      setComment('');

      // Сброс статуса через 5 секунд
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Ошибка отправки:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ShaderBackground />
      <PageHeader />
      <main className="pt-24 md:pt-32 pb-48 md:pb-60 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs items={breadcrumbs} className="mb-8" />

          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-4">
              <Calculator className="w-8 h-8 text-purple-300" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Калькулятор услуг
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Рассчитайте стоимость услуг по автоматизации, бухгалтерии и юридической поддержке.
              Выберите нужные опции и получите детальную смету.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ЛЕВАЯ КОЛОНКА: Настройки */}
            <div className="lg:col-span-2 space-y-6">
              {/* 1. ТИП БИЗНЕСА */}
              <GlassCard delay={0}>
                <h2 className="text-2xl font-bold text-white mb-6">1️⃣ Тип бизнеса</h2>
                <div className="grid grid-cols-2 gap-4">
                  {(['IP', 'OOO'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setEntityType(type);
                        if (type === 'OOO' && taxSystem === 'PATENT') setTaxSystem(null);
                      }}
                      className={`p-4 rounded-lg border-2 transition ${
                        entityType === type
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <span className="text-white font-semibold text-lg">{type}</span>
                    </button>
                  ))}
                </div>
              </GlassCard>

              {/* 2. СИСТЕМА НАЛОГООБЛОЖЕНИЯ */}
              {entityType && (
                <GlassCard delay={100}>
                  <h2 className="text-2xl font-bold text-white mb-6">2️⃣ Система налогообложения</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {(['USN_6', 'USN_15', 'OSNO', ...(entityType === 'IP' ? ['PATENT'] : [])] as TaxSystem[]).map((tax) => (
                      <button
                        key={tax}
                        onClick={() => setTaxSystem(tax)}
                        className={`p-4 rounded-lg border-2 transition ${
                          taxSystem === tax
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <span className="text-white font-semibold">
                          {tax === 'USN_6' && 'УСН 6%'}
                          {tax === 'USN_15' && 'УСН 15%'}
                          {tax === 'OSNO' && 'ОСНО'}
                          {tax === 'PATENT' && 'Патент'}
                        </span>
                      </button>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* 3. ОСНОВНАЯ УСЛУГА */}
              {entityType && taxSystem && (
                <GlassCard delay={200}>
                  <h2 className="text-2xl font-bold text-white mb-6">3️⃣ Основная услуга</h2>
                  <div className="space-y-3">
                    {(['full', 'reporting', 'none'] as const).map((service) => (
                      <button
                        key={service}
                        onClick={() => setMainService(service)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition ${
                          mainService === service
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="text-white font-semibold">
                          {service === 'full' && '📊 Полное бухгалтерское сопровождение'}
                          {service === 'reporting' && '📋 Только сдача отчётности'}
                          {service === 'none' && '❌ Не требуется'}
                        </div>
                        {service !== 'none' && (
                          <div className="text-white/60 text-sm mt-1">
                            {service === 'full' && `от ${entityType === 'IP' ? PRICES.accounting.IP[taxSystem] : PRICES.accounting.OOO[taxSystem]} руб./мес`}
                            {service === 'reporting' && `${PRICES.reportingOnly[entityType]} руб./мес`}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* 4. ПАРАМЕТРЫ БУХГАЛТЕРИИ */}
              {mainService === 'full' && (
                <GlassCard delay={300}>
                  <h2 className="text-2xl font-bold text-white mb-6">4️⃣ Параметры бухгалтерии</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white mb-2">Количество сотрудников:</label>
                      <input
                        type="number"
                        min="0"
                        value={employees}
                        onChange={(e) => setEmployees(parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                      />
                      <p className="text-white/60 text-sm mt-1">+{PRICES.surcharges.perEmployee} руб./мес за каждого</p>
                    </div>

                    <div>
                      <label className="block text-white mb-2">Количество операций в месяц:</label>
                      <input
                        type="number"
                        min="0"
                        value={operations}
                        onChange={(e) => setOperations(parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                      />
                      <p className="text-white/60 text-sm mt-1">
                        {operations === 0 && 'Без надбавки'}
                        {operations > 0 && operations <= 20 && 'Без надбавки'}
                        {operations > 20 && operations <= 50 && '+20% к базовой стоимости'}
                        {operations > 50 && operations <= 100 && '+40% к базовой стоимости'}
                        {operations > 100 && operations <= 300 && '+70% к базовой стоимости'}
                        {operations > 300 && '+100% к базовой стоимости'}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="nds"
                        checked={hasNDS}
                        onChange={(e) => setHasNDS(e.target.checked)}
                        className="w-5 h-5"
                      />
                      <label htmlFor="nds" className="text-white cursor-pointer">
                        Работа с НДС <span className="text-white/60">(+40% к базовой стоимости)</span>
                      </label>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="ved"
                        checked={hasVED}
                        onChange={(e) => setHasVED(e.target.checked)}
                        className="w-5 h-5"
                      />
                      <label htmlFor="ved" className="text-white cursor-pointer">
                        Внешнеэкономическая деятельность (ВЭД) <span className="text-white/60">(+30%)</span>
                      </label>
                    </div>
                  </div>
                </GlassCard>
              )}

              {/* 5. ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ */}
              {entityType && (
                <GlassCard delay={400}>
                  <h2 className="text-2xl font-bold text-white mb-6">5️⃣ Дополнительные услуги</h2>
                  
                  {/* Бухгалтерия */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">📊 Бухгалтерия</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={payroll} onChange={(e) => setPayroll(e.target.checked)} className="w-5 h-5" />
                        <span className="text-white">Зарплата и кадры <span className="text-white/60">({PRICES.payroll.base} + {PRICES.payroll.perEmployee}×сотр. руб./мес)</span></span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={restoreAccounting} onChange={(e) => setRestoreAccounting(e.target.checked)} className="w-5 h-5" />
                        <span className="text-white">Восстановление учёта <span className="text-white/60">({PRICES.oneTime.restoreAccounting[entityType]} руб./квартал)</span></span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={setupAccounting} onChange={(e) => setSetupAccounting(e.target.checked)} className="w-5 h-5" />
                        <span className="text-white">Постановка учёта с нуля <span className="text-white/60">({PRICES.oneTime.setupAccounting[entityType]} руб.)</span></span>
                      </label>
                    </div>
                  </div>

                  {/* Регистрация */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">🏢 Регистрация</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={registration} onChange={(e) => setRegistration(e.target.checked)} className="w-5 h-5" />
                        <span className="text-white">Регистрация {entityType} <span className="text-white/60">({PRICES.oneTime.registration[entityType]} руб.)</span></span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={changes} onChange={(e) => setChanges(e.target.checked)} className="w-5 h-5" />
                        <span className="text-white">Изменения в ЕГРЮЛ/ЕГРИП <span className="text-white/60">({PRICES.oneTime.changes} руб.)</span></span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={liquidation} onChange={(e) => setLiquidation(e.target.checked)} className="w-5 h-5" />
                        <span className="text-white">Ликвидация {entityType} <span className="text-white/60">({PRICES.oneTime.liquidation[entityType]} руб.)</span></span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={ecp} onChange={(e) => setEcp(e.target.checked)} className="w-5 h-5" />
                        <span className="text-white">Электронная подпись (ЭЦП) <span className="text-white/60">({PRICES.oneTime.ecp} руб.)</span></span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={legalAddress} onChange={(e) => setLegalAddress(e.target.checked)} className="w-5 h-5" />
                        <span className="text-white">Юридический адрес <span className="text-white/60">({PRICES.oneTime.legalAddress} руб./год)</span></span>
                      </label>
                    </div>
                  </div>

                  {/* Юридические */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">⚖️ Юридические услуги</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={legalSupport} onChange={(e) => setLegalSupport(e.target.checked)} className="w-5 h-5" />
                        <span className="text-white">Юридическое сопровождение <span className="text-white/60">({PRICES.legal.support} руб./мес)</span></span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={contracts} onChange={(e) => setContracts(e.target.checked)} className="w-5 h-5" />
                        <span className="text-white">Договорная работа (до 5) <span className="text-white/60">({PRICES.legal.contracts} руб./мес)</span></span>
                      </label>
                      {contracts && (
                        <div className="ml-8">
                          <label className="block text-white/80 text-sm mb-1">Дополнительные договоры:</label>
                          <input
                            type="number"
                            min="0"
                            value={additionalContracts}
                            onChange={(e) => setAdditionalContracts(parseInt(e.target.value) || 0)}
                            className="w-32 px-3 py-1 rounded bg-white/5 border border-white/10 text-white"
                          />
                          <span className="text-white/60 text-sm ml-2">(+{PRICES.legal.additionalContract} руб./шт)</span>
                        </div>
                      )}
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={tenders} onChange={(e) => setTenders(e.target.checked)} className="w-5 h-5" />
                        <span className="text-white">Участие в тендерах <span className="text-white/60">({PRICES.legal.tenders} руб./мес)</span></span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={legalAudit} onChange={(e) => setLegalAudit(e.target.checked)} className="w-5 h-5" />
                        <span className="text-white">Юридический аудит <span className="text-white/60">({PRICES.oneTime.legalAudit} руб.)</span></span>
                      </label>
                    </div>
                  </div>

                  {/* Автоматизация */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">🤖 Автоматизация</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={crm} onChange={(e) => setCrm(e.target.checked)} className="w-5 h-5" />
                        <span className="text-white">Внедрение CRM <span className="text-white/60">({PRICES.automation.crm.oneTime} руб. + {PRICES.automation.crm.monthly} руб./мес)</span></span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={integrations} onChange={(e) => setIntegrations(e.target.checked)} className="w-5 h-5" />
                        <span className="text-white">Интеграции <span className="text-white/60">({PRICES.automation.integrations.oneTime} руб. + {PRICES.automation.integrations.monthly} руб./мес)</span></span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={aiAssistant} onChange={(e) => setAiAssistant(e.target.checked)} className="w-5 h-5" />
                        <span className="text-white">ИИ-ассистент <span className="text-white/60">({PRICES.automation.aiAssistant} руб./мес)</span></span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={dashboards} onChange={(e) => setDashboards(e.target.checked)} className="w-5 h-5" />
                        <span className="text-white">Дашборды и аналитика <span className="text-white/60">({PRICES.automation.dashboards} руб.)</span></span>
                      </label>
                    </div>
                  </div>

                  {/* Маркетинг */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">📈 Маркетинг</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={smm} onChange={(e) => setSmm(e.target.checked)} className="w-5 h-5" />
                        <span className="text-white">Ведение соцсетей (SMM) <span className="text-white/60">({PRICES.marketing.smm} руб./мес)</span></span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={ads} onChange={(e) => setAds(e.target.checked)} className="w-5 h-5" />
                        <span className="text-white">Реклама <span className="text-white/60">({PRICES.marketing.ads} руб./мес + бюджет)</span></span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={marketingStrategy} onChange={(e) => setMarketingStrategy(e.target.checked)} className="w-5 h-5" />
                        <span className="text-white">Маркетинговая стратегия <span className="text-white/60">({PRICES.oneTime.marketingStrategy} руб.)</span></span>
                      </label>
                    </div>
                  </div>
                </GlassCard>
              )}
            </div>

            {/* ПРАВАЯ КОЛОНКА: Итоги и форма */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Итоги */}
                <GlassCard delay={500}>
                  <h2 className="text-2xl font-bold text-white mb-6">💰 Итого</h2>
                  
                  {result.oneTime > 0 && (
                    <div className="mb-4 p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                      <div className="text-white/70 text-sm mb-1">Разовые платежи:</div>
                      <div className="text-3xl font-bold text-white">
                        {result.oneTime.toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                  )}

                  {result.monthly > 0 && (
                    <div className="mb-4 p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                      <div className="text-white/70 text-sm mb-1">Ежемесячно:</div>
                      <div className="text-3xl font-bold text-white">
                        {result.monthly.toLocaleString('ru-RU')} ₽
                      </div>
                      <div className="text-white/50 text-xs mt-1">в месяц</div>
                    </div>
                  )}

                  {result.oneTime === 0 && result.monthly === 0 && (
                    <div className="text-center text-white/50 py-8">
                      Выберите услуги для расчёта
                    </div>
                  )}

                  {/* Детализация */}
                  {result.breakdown.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">Детализация:</h3>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {result.breakdown.map((cat, i) => (
                          <div key={i}>
                            <div className="text-white font-semibold mb-2">{cat.category}</div>
                            <div className="space-y-1">
                              {cat.items.map((item, j) => (
                                <div key={j} className="flex justify-between text-sm">
                                  <span className="text-white/70">{item.name}</span>
                                  <span className="text-white font-mono">
                                    {item.price.toLocaleString('ru-RU')} ₽
                                    {item.type === 'monthly' && <span className="text-white/50">/мес</span>}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <p className="text-yellow-200/80 text-xs">
                      💡 При комплексном заказе возможны скидки. Финальная стоимость обсуждается индивидуально.
                    </p>
                  </div>
                </GlassCard>

                {/* Форма заявки */}
                {(result.oneTime > 0 || result.monthly > 0) && (
                  <GlassCard delay={600}>
                    <h2 className="text-xl font-bold text-white mb-4">📝 Оставить заявку</h2>
                    
                    {submitStatus === 'success' && (
                      <div className="mb-4 p-4 rounded-lg bg-green-500/20 border border-green-500/30 flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div className="text-green-100 text-sm">
                          <strong>Спасибо!</strong> Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.
                        </div>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="mb-4 p-4 rounded-lg bg-red-500/20 border border-red-500/30 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div className="text-red-100 text-sm">
                          <strong>Ошибка!</strong> Не удалось отправить заявку. Попробуйте позже.
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-white/80 text-sm mb-1">Имя *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-purple-500/50 focus:outline-none"
                          placeholder="Иван Иванов"
                        />
                      </div>

                      <div>
                        <label className="block text-white/80 text-sm mb-1">Телефон *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-purple-500/50 focus:outline-none"
                          placeholder="+7 (999) 123-45-67"
                        />
                      </div>

                      <div>
                        <label className="block text-white/80 text-sm mb-1">Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-purple-500/50 focus:outline-none"
                          placeholder="ivan@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-white/80 text-sm mb-1">Комментарий</label>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-purple-500/50 focus:outline-none resize-none"
                          placeholder="Дополнительные пожелания..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                      </button>
                    </form>
                  </GlassCard>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
