"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

type NavChild = {
  label: string;
  href: string;
  description?: string;
};

type ServicesHub = {
  label: string;
  href: string;
  description: string;
  children: NavChild[];
};

type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  megaGroups?: ServicesHub[];
};

const SERVICES_GROUPS: ServicesHub[] = [
  {
    label: "Бухгалтерское сопровождение",
    href: "/services",
    description:
      "Бухгалтерия, отчётность, восстановление учёта и сопровождение бизнеса на постоянной основе.",
    children: [
      {
        label: "Бухгалтерская и налоговая отчетность ООО",
        href: "/services/buhnalogotchetooo",
        description: "ООО: ведение учёта, отчётность, налоги, зарплатный блок.",
      },
      {
        label: "Бухгалтерское и налоговое сопровождение ИП",
        href: "/services/buhassistip",
        description: "ИП: КУДиР, налоги, взносы, декларации и сверка с ФНС.",
      },
      {
        label: "Восстановление бухгалтерского и налогового учета",
        href: "/services/restorebuhnalogychet",
        description: "Восстановление базы, первички, отчётности и налоговой истории.",
      },
      {
        label: "Подготовка и подача налоговой декларации по УСН",
        href: "/services/preparenalogdeclarationusn",
        description: "Декларация УСН, КУДиР, ЕНС и камеральная проверка.",
      },
      {
        label: "Подготовка и подача нулевой отчетности для ООО",
        href: "/services/zsummery",
        description: "Нулевая отчётность для компаний без движения.",
      },
      {
        label: "Срочная подготовка и подача отчетности для ИП",
        href: "/services/expressotchetip",
        description: "Экспресс-отчётность и закрытие просрочек по ИП.",
      },
    ],
  },
  {
    label: "Налоги и отчётность",
    href: "/services",
    description:
      "Налоговые декларации, 3-НДФЛ, отчётность по сотрудникам и сопровождение отчётных задач.",
    children: [
      {
        label: "Подготовка и подача налоговой декларации 3-НДФЛ",
        href: "/services/preparenalogdeclaration-",
        description: "3-НДФЛ для доходов, вычетов и возврата налога.",
      },
      {
        label: "Подготовка и подача налоговой декларации по УСН",
        href: "/services/preparenalogdeclarationusn",
        description: "Годовая декларация УСН для ИП и ООО.",
      },
      {
        label: "Подготовка и сдача отчетности по сотрудникам",
        href: "/services/prepareotchetstaff",
        description: "ЕФС-1, персонифицированные сведения, НДФЛ и взносы.",
      },
      {
        label: "Подготовка и подача нулевой отчетности для ООО",
        href: "/services/zsummery",
        description: "Нулевая отчётность при отсутствии деятельности.",
      },
      {
        label: "Срочная подготовка и подача отчетности для ИП",
        href: "/services/expressotchetip",
        description: "Срочная сдача пропущенной отчётности.",
      },
      {
        label: "Бухгалтерская и налоговая отчетность ООО",
        href: "/services/buhnalogotchetooo",
        description: "Комплексная налоговая и бухгалтерская отчётность для ООО.",
      },
    ],
  },
  {
    label: "Кадры и зарплата",
    href: "/services",
    description:
      "Кадровая и зарплатная отчётность, блок сотрудников и обязательные сведения в СФР и ФНС.",
    children: [
      {
        label: "Подготовка и сдача отчетности по сотрудникам",
        href: "/services/prepareotchetstaff",
        description: "ЕФС-1, стаж, зарплата, персонифицированные сведения.",
      },
      {
        label: "Бухгалтерская и налоговая отчетность ООО",
        href: "/services/buhnalogotchetooo",
        description: "Зарплатный блок и отчётность по сотрудникам для ООО.",
      },
      {
        label: "Бухгалтерское и налоговое сопровождение ИП",
        href: "/services/buhassistip",
        description: "Отчётность ИП с сотрудниками, НДФЛ и страховые взносы.",
      },
      {
        label: "Срочная подготовка и подача отчетности для ИП",
        href: "/services/expressotchetip",
        description: "Срочное закрытие кадрово-отчётных обязательств.",
      },
      {
        label: "Закрытие ИП",
        href: "/services/closeip",
        description: "Финальная отчётность, увольнения и корректное завершение статуса ИП.",
      },
      {
        label: "Восстановление бухгалтерского и налогового учета",
        href: "/services/restorebuhnalogychet",
        description: "Восстановление кадрового и зарплатного контура.",
      },
    ],
  },
  {
    label: "Регистрация и изменения",
    href: "/services",
    description:
      "Регистрация ООО и ИП, смены, изменения в ЕГРЮЛ, адрес, директор, устав и корпоративные действия.",
    children: [
      {
        label: "Регистрация ООО «под ключ»",
        href: "/services/registrationooo",
        description: "Комплексная регистрация ООО с нуля.",
      },
      {
        label: "Регистрация ООО через ЭЦП",
        href: "/services/registrationooodistination",
        description: "Дистанционная регистрация ООО через электронную подпись.",
      },
      {
        label: "Регистрация ИП «под ключ»",
        href: "/services/registrationip",
        description: "Открытие ИП с подбором режима и стартовой настройкой.",
      },
      {
        label: "Смена юридического адреса организации",
        href: "/services/changeadress",
        description: "Смена адреса и регистрация изменений в реестре.",
      },
      {
        label: "Смена генерального директора",
        href: "/services/changehead",
        description: "Смена единоличного исполнительного органа.",
      },
      {
        label: "Внесение изменений в ЕГРЮЛ и учредительные документы",
        href: "/services/checkegrurl2",
        description: "Комплексная регистрация изменений по компании.",
      },
    ],
  },
  {
    label: "Юридическое сопровождение",
    href: "/services",
    description:
      "Корпоративные документы, участники, устав, ликвидация, НКО и правовое сопровождение бизнеса.",
    children: [
      {
        label: "Разработка и регистрация изменений в Устав ООО",
        href: "/services/changeystav",
        description: "Подготовка новой редакции устава и регистрация.",
      },
      {
        label: "Приведение учредительных документов и сведений ЕГРЮЛ в соответствие",
        href: "/services/checkegrurl",
        description: "Аудит и легализация корпоративных документов.",
      },
      {
        label: "Выход участника из состава ООО",
        href: "/services/outmember",
        description: "Выход участника, расчёт доли и оформление изменений.",
      },
      {
        label: "Сопровождение купли-продажи доли в ООО",
        href: "/services/assistsellbuy",
        description: "Нотариальная сделка и переход доли в ООО.",
      },
      {
        label: "Добровольная ликвидация ООО «под ключ»",
        href: "/services/destroyooounderkey",
        description: "Ликвидация компании с бухгалтерским и юридическим сопровождением.",
      },
      {
        label: "Регистрация НКО «под ключ»",
        href: "/services/registrationnko",
        description: "Создание НКО, АНО, фонда, ассоциации.",
      },
    ],
  },
  {
    label: "Банки / 115-ФЗ / гарантии",
    href: "/services",
    description:
      "Расчётные счета, банковое сопровождение, юридический адрес и смежные банковые сценарии.",
    children: [
      {
        label: "Открытие расчетного счета (РКО)",
        href: "/services/openbankaccaunt",
        description: "Подбор банка, тарифов и открытие счёта.",
      },
      {
        label: "Предоставление юридического адреса",
        href: "/services/cowork",
        description: "Юридический адрес для регистрации и работы компании.",
      },
      {
        label: "Предоставление юридического адреса с почтовым сопровождением",
        href: "/services/uradress",
        description: "Адрес регистрации с почтовым и секретарским обслуживанием.",
      },
      {
        label: "Устранение записи о недостоверности сведений в ЕГРЮЛ",
        href: "/services/checkegrurl3",
        description: "Снятие метки недостоверности для банков и ФНС.",
      },
      {
        label: "Изготовление печатей и штампов для бизнеса",
        href: "/services/pechatshtamp",
        description: "Печати, штампы и офисные атрибуты для запуска бизнеса.",
      },
      {
        label: "Закрытие ИП",
        href: "/services/closeip",
        description: "Финальное сопровождение закрытия бизнеса и счёта.",
      },
    ],
  },
];

const NAV_ITEMS: NavItem[] = [
  {
    label: "Услуги",
    href: "/services",
    megaGroups: SERVICES_GROUPS,
  },
  {
    label: "СЭЗ / Субсидии",
    href: "/sez-subsidii/",
    children: [
      {
        label: "Вступление в СЭЗ",
        href: "/sez-subsidii/vstuplenie-v-sez/",
        description: "Подготовка проекта, инвестдекларации и пакета документов.",
      },
      {
        label: "Сопровождение резидентов",
        href: "/sez-subsidii/soprovozhdenie-rezidentov/",
        description: "Раздельный учёт, KPI, реестры и контроль обязательств.",
      },
      {
        label: "Отчётность резидента",
        href: "/sez-subsidii/otchetnost-rezidenta/",
        description: "Комплект за период и подтверждение исполнения условий.",
      },
      {
        label: "Проверки резидентов",
        href: "/sez-subsidii/proverki-rezidentov/",
        description: "Подготовка к запросам и проверкам, сбор доказательств.",
      },
      {
        label: "Получение субсидий",
        href: "/sez-subsidii/subsidii-poluchenie/",
        description: "Скрининг мер поддержки, заявка и сопровождение уточнений.",
      },
      {
        label: "Отчётность по субсидиям",
        href: "/sez-subsidii/otchetnost-po-subsidiyam/",
        description: "Реестр подтверждений и контроль целевого использования.",
      },
    ],
  },
  {
    label: "Автоматизация и ИИ",
    href: "/automation-ai/",
    children: [
      {
        label: "CRM",
        href: "/automation-ai/crm/",
        description: "Внедрение CRM как системы контроля продаж и данных.",
      },
      {
        label: "Сайт → CRM",
        href: "/automation-ai/site-crm-integration/",
        description: "Маршрут лида от сайта до CRM без потерь.",
      },
      {
        label: "n8n",
        href: "/automation-ai/n8n/",
        description: "Управляемая автоматизация между системами.",
      },
      {
        label: "Интеграции",
        href: "/automation-ai/integrations/",
        description: "Телефония, мессенджеры, почта и связность каналов.",
      },
      {
        label: "ИИ-аналитика",
        href: "/automation-ai/ai-assistants/",
        description: "Причины проигрыша, контроль менеджеров, рекомендации.",
      },
      {
        label: "Аудит и план",
        href: "/automation-ai/audit-plan/",
        description: "Первый шаг для смешанного спроса по автоматизации.",
      },
    ],
  },
  {
    label: "Кейсы",
    href: "/cases",
    children: [
      {
        label: "Кейсы по бухгалтерии",
        href: "/cases/accounting/",
        description: "Сопровождение, восстановление учёта и разовые задачи.",
      },
      {
        label: "Кейсы по налогам",
        href: "/cases/taxes/",
        description: "Отчётность, требования ИФНС, декларации и сверки.",
      },
      {
        label: "Кейсы по СЭЗ",
        href: "/cases/sez/",
        description: "Вступление, сопровождение, отчётность и проверки.",
      },
      {
        label: "Кейсы по субсидиям",
        href: "/cases/subsidies/",
        description: "Получение мер поддержки и отчётный контур.",
      },
      {
        label: "Кейсы по автоматизации",
        href: "/cases/automation/",
        description: "CRM, интеграции, n8n и ИИ-аналитика на практике.",
      },
      {
        label: "Отзывы",
        href: "/reviews/",
        description: "Доверительный контур с отзывами клиентов.",
      },
    ],
  },
  {
    label: "О компании",
    href: "/about/",
    children: [
      {
        label: "О компании",
        href: "/about/",
        description: "Кто такая Rahima Consulting и как мы работаем.",
      },
      {
        label: "Команда",
        href: "/about/team/",
        description: "Эксперты и роли по ключевым направлениям.",
      },
      {
        label: "Партнёры",
        href: "/about/partners/",
        description: "Банки, сервисы и платформы, с которыми мы работаем.",
      },
      {
        label: "Документы",
        href: "/about/documents/",
        description: "Документы компании и trust-контур.",
      },
      {
        label: "Вакансии",
        href: "/about/vacancies/",
        description: "Открытые роли и кадровый резерв.",
      },
      {
        label: "Блог",
        href: "/blog/",
        description: "Разборы, инструкции и AEO-материалы.",
      },
    ],
  },
  {
    label: "Контакты",
    href: "/contacts",
    children: [
      {
        label: "Контакты",
        href: "/contacts/",
        description: "Главная витрина каналов связи и маршрутов обращения.",
      },
      {
        label: "Симферополь",
        href: "/contacts/simferopol/",
        description: "Офис в Симферополе, NAP и очный формат работы.",
      },
      {
        label: "Удалённо по РФ",
        href: "/contacts/remote/",
        description: "Документы, контроль и удалённый формат сопровождения.",
      },
      {
        label: "Регионы",
        href: "/contacts/regions/",
        description: "География услуг без геоспама и клонов.",
      },
      {
        label: "Реквизиты",
        href: "/contacts/requisites/",
        description: "Реквизиты для договоров, оплат и ЭДО.",
      },
      {
        label: "Оставить заявку",
        href: "/contacts/ask/",
        description: "Главная конверсионная точка сайта.",
      },
    ],
  },
];

const CTA_LINK = "/contacts/ask/";
const LOGO_FILTER =
  "brightness(0) saturate(100%) invert(34%) sepia(89%) saturate(1789%) hue-rotate(253deg) brightness(108%) contrast(101%)";

function normalizePath(path: string) {
  if (!path) return "/";
  return path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
}

function isCurrentPath(pathname: string, href: string) {
  const current = normalizePath(pathname);
  const target = normalizePath(href);
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

function ServicesMegaMenu({
  item,
  pathname,
  isOpen,
  onOpen,
  onClose,
}: {
  item: NavItem;
  pathname: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const initialGroup =
    item.megaGroups?.find(
      (group) =>
        isCurrentPath(pathname, group.href) ||
        group.children.some((child) => isCurrentPath(pathname, child.href)),
    ) ||
    item.megaGroups?.[0] ||
    null;

  const [selectedGroupHref, setSelectedGroupHref] = useState(initialGroup?.href ?? "");

  const selectedGroup =
    item.megaGroups?.find((group) => group.href === selectedGroupHref) ||
    initialGroup ||
    null;

  const active =
    isCurrentPath(pathname, item.href) ||
    item.megaGroups?.some(
      (group) =>
        isCurrentPath(pathname, group.href) ||
        group.children.some((child) => isCurrentPath(pathname, child.href)),
    );

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (!selectedGroup && item.megaGroups?.[0]) {
          setSelectedGroupHref(item.megaGroups[0].href);
        }
        onOpen();
      }}
      onMouseLeave={onClose}
    >
      <Link
        href={item.href}
        className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
          active
            ? "border-purple-400/40 bg-white/15 text-white"
            : "border-white/15 bg-white/5 text-white/85 hover:bg-white/10 hover:text-white"
        }`}
      >
        <span>{item.label}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Link>

      {isOpen && selectedGroup && (
        <div className="absolute left-1/2 top-full z-50 w-[980px] max-w-[calc(100vw-32px)] -translate-x-1/2 pt-3">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1020]/95 shadow-2xl backdrop-blur-xl">
            <div className="border-b border-white/10 px-6 py-5">
              <div className="text-base font-semibold text-white">Услуги</div>
              <div className="mt-1 text-sm text-white/55">
                Все ссылки ведут на реальные страницы услуг `/services/[slug]` без 404.
              </div>
            </div>

            <div className="grid h-[70vh] min-h-[420px] grid-cols-[280px_minmax(0,1fr)] overflow-hidden">
              <div className="min-w-0 h-full overflow-y-auto border-r border-white/10 bg-white/5 p-4 pr-2">
                <div className="space-y-2">
                  {item.megaGroups?.map((group) => {
                    const groupActive =
                      selectedGroup.href === group.href ||
                      isCurrentPath(pathname, group.href) ||
                      group.children.some((child) => isCurrentPath(pathname, child.href));

                    return (
                      <button
                        key={group.label}
                        type="button"
                        onMouseEnter={() => setSelectedGroupHref(group.href)}
                        onFocus={() => setSelectedGroupHref(group.href)}
                        onClick={() => setSelectedGroupHref(group.href)}
                        className={`w-full rounded-2xl border px-4 py-4 text-left transition-colors ${
                          groupActive
                            ? "border-purple-400/30 bg-white/10"
                            : "border-white/10 bg-white/5 hover:bg-white/8"
                        }`}
                      >
                        <div className="text-sm font-semibold text-white">{group.label}</div>
                        <div className="mt-2 text-xs leading-5 text-white/55">
                          {group.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="min-w-0 h-full overflow-y-auto p-5">
                <div className="mb-5">
                  <Link
                    href={selectedGroup.href}
                    className="text-xl font-semibold text-white transition-colors hover:text-purple-200"
                  >
                    {selectedGroup.label}
                  </Link>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
                    {selectedGroup.description}
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {selectedGroup.children.map((child) => {
                    const childActive = isCurrentPath(pathname, child.href);

                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`rounded-2xl border px-4 py-4 text-sm transition-colors ${
                          childActive
                            ? "border-purple-400/30 bg-white/12 text-white"
                            : "border-white/10 bg-white/5 text-white/80 hover:bg-white/8 hover:text-white"
                        }`}
                      >
                        <div className="font-medium">{child.label}</div>
                        {child.description ? (
                          <div className="mt-2 text-xs leading-5 text-white/55">
                            {child.description}
                          </div>
                        ) : null}
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-5 border-t border-white/10 pt-4">
                  <Link
                    href={selectedGroup.href}
                    className="text-sm font-medium text-purple-300 transition-colors hover:text-purple-200"
                  >
                    Открыть раздел услуг
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 p-3">
              <Link
                href={item.href}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-purple-300 transition-colors hover:bg-white/8 hover:text-purple-200"
              >
                Открыть весь раздел услуг
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StandardDropdown({
  item,
  pathname,
  isOpen,
  onOpen,
  onClose,
}: {
  item: NavItem;
  pathname: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const active =
    isCurrentPath(pathname, item.href) ||
    item.children?.some((child) => isCurrentPath(pathname, child.href));

  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <Link
        href={item.href}
        className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
          active
            ? "border-purple-400/40 bg-white/15 text-white"
            : "border-white/15 bg-white/5 text-white/85 hover:bg-white/10 hover:text-white"
        }`}
      >
        <span>{item.label}</span>
        {!!item.children?.length && (
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        )}
      </Link>

      {isOpen && !!item.children?.length && (
        <div className="absolute left-1/2 top-full z-50 w-[520px] max-w-[calc(100vw-32px)] -translate-x-1/2 pt-3">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]/95 shadow-2xl backdrop-blur-xl">
            <div className="border-b border-white/10 px-5 py-4">
              <div className="text-sm font-semibold text-white">{item.label}</div>
              <div className="mt-1 text-xs text-white/55">Разделы и сценарии</div>
            </div>

            <div className="max-h-[68vh] overflow-y-auto p-2">
              <div className="grid gap-1">
                {item.children.map((child) => {
                  const childActive = isCurrentPath(pathname, child.href);

                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`rounded-xl px-4 py-3 transition-colors ${
                        childActive ? "bg-white/12" : "hover:bg-white/8"
                      }`}
                    >
                      <div className="text-sm font-medium text-white">{child.label}</div>
                      {child.description ? (
                        <div className="mt-1 text-xs leading-5 text-white/55">
                          {child.description}
                        </div>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-white/10 p-2">
              <Link
                href={item.href}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-purple-300 transition-colors hover:bg-white/8 hover:text-purple-200"
              >
                Открыть раздел полностью
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileMenuItem({
  item,
  pathname,
  isOpen,
  onToggle,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const active =
    isCurrentPath(pathname, item.href) ||
    item.children?.some((child) => isCurrentPath(pathname, child.href)) ||
    item.megaGroups?.some(
      (group) =>
        isCurrentPath(pathname, group.href) ||
        group.children.some((child) => isCurrentPath(pathname, child.href)),
    );

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5">
      <div className="flex items-stretch">
        <Link
          href={item.href}
          onClick={onNavigate}
          className={`flex-1 rounded-l-2xl px-4 py-3 text-sm font-semibold transition-colors ${
            active ? "text-white" : "text-white/85 hover:text-white"
          }`}
        >
          {item.label}
        </Link>

        {(!!item.children?.length || !!item.megaGroups?.length) && (
          <button
            type="button"
            onClick={onToggle}
            className="rounded-r-2xl border-l border-white/10 px-4 text-white/70 transition-colors hover:bg-white/8 hover:text-white"
            aria-label={`Открыть подразделы: ${item.label}`}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>

      {isOpen && !!item.megaGroups?.length && (
        <div className="border-t border-white/10 px-2 py-2">
          <div className="max-h-[65vh] space-y-3 overflow-y-auto">
            {item.megaGroups.map((group) => (
              <div key={group.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <Link
                  href={group.href}
                  onClick={onNavigate}
                  className="block text-sm font-semibold text-white"
                >
                  {group.label}
                </Link>
                <div className="mt-1 text-xs leading-5 text-white/55">{group.description}</div>

                <div className="mt-3 space-y-1">
                  {group.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onNavigate}
                      className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                        isCurrentPath(pathname, child.href)
                          ? "bg-white/10 text-white"
                          : "text-white/75 hover:bg-white/8 hover:text-white"
                      }`}
                    >
                      <div>{child.label}</div>
                      {child.description ? (
                        <div className="mt-1 text-xs leading-5 text-white/50">
                          {child.description}
                        </div>
                      ) : null}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isOpen && !item.megaGroups?.length && !!item.children?.length && (
        <div className="border-t border-white/10 px-2 py-2">
          <div className="max-h-[65vh] space-y-1 overflow-y-auto">
            {item.children.map((child) => {
              const childActive = isCurrentPath(pathname, child.href);

              return (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onNavigate}
                  className={`block rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    childActive
                      ? "bg-white/10 text-white"
                      : "text-white/75 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <div>{child.label}</div>
                  {child.description ? (
                    <div className="mt-1 text-xs leading-5 text-white/50">
                      {child.description}
                    </div>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PageHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);

  const visibleNavItems = useMemo(() => NAV_ITEMS, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/25 px-4 py-2 backdrop-blur-md sm:px-6 lg:px-12">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid min-h-[72px] grid-cols-[auto_1fr_auto] items-center gap-6">
          <div className="flex items-center">
            <Link href="/" className="inline-flex items-center">
              <img
                src="/logo.png"
                alt="Rahima Consulting"
                className="h-12 w-auto sm:h-14 lg:h-16"
                style={{ filter: LOGO_FILTER }}
              />
            </Link>
          </div>

          <nav className="hidden items-center justify-center gap-3 xl:flex">
            {visibleNavItems.map((item) =>
              item.megaGroups?.length ? (
                <ServicesMegaMenu
                  key={item.label}
                  item={item}
                  pathname={pathname}
                  isOpen={openDesktopMenu === item.label}
                  onOpen={() => setOpenDesktopMenu(item.label)}
                  onClose={() => setOpenDesktopMenu(null)}
                />
              ) : (
                <StandardDropdown
                  key={item.label}
                  item={item}
                  pathname={pathname}
                  isOpen={openDesktopMenu === item.label}
                  onOpen={() => setOpenDesktopMenu(item.label)}
                  onClose={() => setOpenDesktopMenu(null)}
                />
              ),
            )}
          </nav>

          <div className="hidden justify-end xl:flex">
            <Link
              href={CTA_LINK}
              className="inline-flex items-center rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/30 transition-all duration-200 hover:scale-[1.02] hover:from-purple-700 hover:to-blue-700"
            >
              Рассчитать стоимость
            </Link>
          </div>

          <div className="flex justify-end xl:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="animate-slide-down border-t border-white/10 pb-4 pt-4 xl:hidden">
            <div className="space-y-3">
              {visibleNavItems.map((item) => (
                <MobileMenuItem
                  key={item.label}
                  item={item}
                  pathname={pathname}
                  isOpen={openMobileMenu === item.label}
                  onToggle={() =>
                    setOpenMobileMenu((prev) => (prev === item.label ? null : item.label))
                  }
                  onNavigate={() => setMobileMenuOpen(false)}
                />
              ))}

              <Link
                href={CTA_LINK}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-purple-900/30 transition-all duration-200 hover:from-purple-700 hover:to-blue-700"
              >
                Рассчитать стоимость
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}