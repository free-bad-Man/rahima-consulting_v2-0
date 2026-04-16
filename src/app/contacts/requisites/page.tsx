import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GlassCard from "@/components/ui/glass-card";
import ShaderBackground from "@/components/ui/shader-background";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Copy,
  FileText,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Реквизиты Rahima Consulting для договоров и оплат",
  description:
    "Официальные реквизиты Rahima Consulting для договоров, оплат и документооборота: ИНН, ОГРНИП, банковские данные, адрес и контактный email.",
  openGraph: {
    title: "Реквизиты Rahima Consulting для договоров и оплат",
    description:
      "Официальные реквизиты для договоров, оплат и документооборота: ИНН, ОГРНИП, расчётный счёт, банк и контактные данные.",
    type: "website",
  },
};

const REQUISITES = [
  {
    label: "Полное наименование",
    value: "Индивидуальный предприниматель Баркова Рахима Садыковна",
  },
  {
    label: "Краткое наименование",
    value: "ИП Баркова Р.С.",
  },
  {
    label: "ИНН",
    value: "910216386365",
  },
  {
    label: "КПП",
    value: "Не применяется",
  },
  {
    label: "ОГРНИП",
    value: "317910200135408",
  },
  {
    label: "Юридический адрес",
    value: "295010, Республика Крым, г. Симферополь, ул. Им. Матэ Залки, д. 1",
  },
  {
    label: "Фактический адрес",
    value: "Совпадает с юридическим",
  },
  {
    label: "Расчётный счёт",
    value: "40802810952000121157",
  },
  {
    label: "Банк",
    value: "ЮГО-ЗАПАДНЫЙ БАНК ПАО СБЕРБАНК",
  },
  {
    label: "БИК",
    value: "046015602",
  },
  {
    label: "Корреспондентский счёт",
    value: "30101810600000000602",
  },
  {
    label: "Руководитель / основание",
    value: "ИП Баркова Рахима Садыковна, действует на основании записи в ЕГРИП",
  },
  {
    label: "Email для документооборота",
    value: "mz9102@yandex.ru",
  },
  {
    label: "Телефон",
    value: "+7 978 998-72-22",
  },
  {
    label: "ЭДО",
    value: "Да",
  },
];

const COPY_BLOCK = `Полное наименование: Индивидуальный предприниматель Баркова Рахима Садыковна
Краткое наименование: ИП Баркова Р.С.
ИНН: 910216386365
КПП: не применяется
ОГРНИП: 317910200135408
Юридический адрес: 295010, Республика Крым, г. Симферополь, ул. Им. Матэ Залки, д. 1
Фактический адрес: совпадает с юридическим
Расчётный счёт: 40802810952000121157
Банк: ЮГО-ЗАПАДНЫЙ БАНК ПАО СБЕРБАНК
БИК: 046015602
Корреспондентский счёт: 30101810600000000602
Руководитель / основание: ИП Баркова Рахима Садыковна, действует на основании записи в ЕГРИП
Email для документооборота: mz9102@yandex.ru
Телефон: +7 978 998-72-22
ЭДО: да`;

const FAQ = [
  {
    question: "Для чего нужна эта страница?",
    answer:
      "Страница собрана для договоров, оплат, проверки контрагента и обмена документами. Здесь размещены официальные реквизиты в текстовом виде, чтобы ими было удобно пользоваться.",
  },
  {
    question: "Можно ли использовать эти данные для выставления счёта или договора?",
    answer:
      "Да, реквизиты размещены именно для документооборота, подготовки договоров и корректного оформления платёжных документов.",
  },
  {
    question: "Как быстрее отправить документы на согласование?",
    answer:
      "Если нужно направить проект договора, счёт или комплект документов, удобнее сразу написать на email для документооборота и продублировать задачу через страницу контактов.",
  },
  {
    question: "Что делать, если нужен не только реквизит, но и расчёт стоимости?",
    answer:
      "В этом случае лучше сразу перейти в контакты или калькулятор, чтобы описать задачу и получить следующий рабочий шаг.",
  },
  {
    question: "Можно ли работать удалённо?",
    answer:
      "Да, Rahima Consulting работает как в офисном формате в Симферополе, так и удалённо по РФ.",
  },
];

export default function ContactsRequisitesPage() {
  return (
    <div className="relative min-h-screen">
      <ShaderBackground />

      <div className="relative z-10">
        <PageHeader />

        <main className="px-4 pb-48 pt-24 sm:px-6 md:pb-60 md:pt-32 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Контакты", href: "/contacts/" },
                { label: "Реквизиты", href: "/contacts/requisites/" },
              ]}
            />

            <GlassCard className="mb-12 text-center" animationDelay={0}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <Building2 className="h-4 w-4 text-purple-300" />
                Реквизиты для договоров и оплат
              </div>

              <h1 className="gradient-text-purple-blue mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                Реквизиты Rahima Consulting
              </h1>

              <p className="mx-auto max-w-4xl text-lg leading-8 text-white/80 md:text-xl">
                Здесь собраны официальные реквизиты для договоров, счетов, оплат и
                документооборота. Данные размещены в текстовом виде, чтобы их было удобно
                копировать, проверять и использовать в работе без лишних уточнений.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <FileText className="mx-auto mb-3 h-6 w-6 text-purple-300" />
                  <div className="text-2xl font-bold text-white">Официально</div>
                  <div className="mt-2 text-sm text-white/60">
                    Данные для договоров, счетов и проверки контрагента
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Copy className="mx-auto mb-3 h-6 w-6 text-blue-300" />
                  <div className="text-2xl font-bold text-white">Удобно копировать</div>
                  <div className="mt-2 text-sm text-white/60">
                    Таблица и отдельный текстовый блок без картинок
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-green-400" />
                  <div className="text-2xl font-bold text-white">Для работы</div>
                  <div className="mt-2 text-sm text-white/60">
                    Подходит для документооборота, оплат и деловой переписки
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={100}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Официальные реквизиты
              </h2>

              <div className="overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full border-collapse">
                  <tbody>
                    {REQUISITES.map((item, index) => (
                      <tr
                        key={item.label}
                        className={index % 2 === 0 ? "bg-white/5" : "bg-white/[0.03]"}
                      >
                        <td className="w-[38%] border-b border-white/10 px-5 py-4 align-top text-sm font-medium text-white/75">
                          {item.label}
                        </td>
                        <td className="border-b border-white/10 px-5 py-4 align-top break-all text-sm text-white">
                          {item.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={160}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Реквизиты для быстрого копирования
              </h2>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <pre className="overflow-x-auto whitespace-pre-wrap break-words text-sm leading-7 text-white/85">
                  {COPY_BLOCK}
                </pre>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-2 flex items-center gap-2 text-purple-300">
                    <Mail className="h-4 w-4" />
                    <span className="font-medium">Документооборот</span>
                  </div>
                  <div className="text-sm leading-7 text-white/75">
                    Email для обмена документами:{" "}
                    <a
                      href="mailto:mz9102@yandex.ru"
                      className="text-white underline underline-offset-4"
                    >
                      mz9102@yandex.ru
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-2 flex items-center gap-2 text-purple-300">
                    <Phone className="h-4 w-4" />
                    <span className="font-medium">Телефон</span>
                  </div>
                  <div className="text-sm leading-7 text-white/75">
                    Для согласования документов и связи:{" "}
                    <a
                      href="tel:+79789987222"
                      className="text-white underline underline-offset-4"
                    >
                      +7 978 998-72-22
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={220}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Как это обычно работает
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  "Вы берёте реквизиты с этой страницы для договора, счёта или проверки контрагента.",
                  "Если нужен комплект документов или согласование договора, отправляете запрос на email для документооборота.",
                  "Если вместе с реквизитами требуется обсудить саму задачу, переходите в контакты и описываете ситуацию.",
                  "Если нужен предварительный расчёт стоимости, удобнее сразу использовать калькулятор или оставить обращение.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 font-semibold text-white">
                      {index + 1}
                    </div>
                    <div className="leading-7 text-white/80">{item}</div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={280}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Частые вопросы
              </h2>

              <div className="space-y-4">
                {FAQ.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="mb-2 text-lg font-semibold text-white">{item.question}</div>
                    <div className="leading-7 text-white/75">{item.answer}</div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="mb-12" animationDelay={340}>
              <h2 className="mb-6 text-center text-3xl font-bold text-white">
                Куда перейти дальше
              </h2>

              <div className="grid gap-4 md:grid-cols-3">
                <Link
                  href="/contacts/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Контакты</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Связаться с нами и обсудить задачу бизнеса в удобном формате.
                  </div>
                </Link>

                <Link
                  href="/about/team/"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Команда</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Посмотреть, по каким направлениям работает Rahima Consulting.
                  </div>
                </Link>

                <Link
                  href="/calculator"
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xl font-semibold text-white">Рассчитать стоимость</div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    Если вместе с реквизитами нужен расчёт по конкретной задаче.
                  </div>
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="text-center" animationDelay={400}>
              <h2 className="mb-4 text-3xl font-bold text-white">
                Нужен договор, счёт или следующий шаг по задаче?
              </h2>

              <p className="mx-auto mb-6 max-w-3xl leading-7 text-white/80">
                Для документооборота используйте реквизиты и email на этой странице. Если
                нужно не только получить данные, но и обсудить саму задачу, свяжитесь с
                нами через контакты или перейдите к расчёту стоимости.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contacts/"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-purple-500/50 transition-all duration-200 hover:scale-105 hover:from-purple-700 hover:to-blue-700"
                >
                  Связаться с нами
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/calculator"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/20"
                >
                  Перейти к калькулятору
                </Link>
              </div>
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  );
}