"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export type MegaMenuSubItem = {
  label: string;
  description: string;
  icon: React.ElementType;
  link?: string;
};

export type MegaMenuItem = {
  id: number;
  label: string;
  link?: string;
  subMenus?: {
    title: string;
    items: MegaMenuSubItem[];
  }[];
};

export interface MegaMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  items: MegaMenuItem[];
  className?: string;
  onServiceClick?: (serviceTitle: string) => void;
  onCasesAndReviewsClick?: () => void;
  onContactsClick?: () => void;
}

const MegaMenu = React.forwardRef<HTMLUListElement, MegaMenuProps>(
  ({ items, className, onServiceClick, onCasesAndReviewsClick, onContactsClick, ...props }, ref) => {
    const [openMenu, setOpenMenu] = React.useState<string | null>(null);
    const [hoverId, setHoverId] = React.useState<number | null>(null);

    const handleOpen = (label: string | null) => {
      setOpenMenu(label);
    };

    const handleTopLevelClick = (item: MegaMenuItem, e: React.MouseEvent) => {
      if (item.label === "Кейсы и отзывы" && onCasesAndReviewsClick) {
        e.preventDefault();
        onCasesAndReviewsClick();
        return;
      }

      if (item.label === "Контакты" && onContactsClick) {
        e.preventDefault();
        onContactsClick();
        return;
      }
    };

    const handleSubItemClick = (parentLabel: string, item: MegaMenuSubItem, e: React.MouseEvent) => {
      if (parentLabel === "Услуги" && !item.link && onServiceClick) {
        e.preventDefault();
        onServiceClick(item.label);
        setOpenMenu(null);
      }
    };

    return (
      <ul
        ref={ref}
        className={`relative flex items-center gap-2 ${className || ""}`}
        {...props}
      >
        {items.map((navItem) => {
          const isOpen = openMenu === navItem.label;
          const hasSubmenu = !!navItem.subMenus?.length;
          const isServicesMenu = navItem.label === "Услуги";

          return (
            <li
              key={navItem.id}
              className="relative"
              onMouseEnter={() => hasSubmenu && handleOpen(navItem.label)}
              onMouseLeave={() => hasSubmenu && handleOpen(null)}
            >
              {navItem.link ? (
                <Link
                  href={navItem.link}
                  onClick={(e) => handleTopLevelClick(navItem, e)}
                  onMouseEnter={() => setHoverId(navItem.id)}
                  onMouseLeave={() => setHoverId(null)}
                  className="relative flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-xl border border-white/20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md shadow-lg shadow-purple-500/10 hover:from-purple-500/30 hover:to-blue-500/30 hover:shadow-purple-500/20 hover:scale-[1.03] overflow-hidden"
                >
                  <span className="relative z-10 whitespace-nowrap">{navItem.label}</span>
                  {hasSubmenu && (
                    <ChevronDown
                      className={`relative z-10 h-4 w-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                  {(hoverId === navItem.id || isOpen) && (
                    <motion.div
                      layoutId="menu-pill-bg"
                      className="absolute inset-0 bg-white/10"
                      style={{ borderRadius: 12 }}
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                </Link>
              ) : (
                <button
                  type="button"
                  onMouseEnter={() => setHoverId(navItem.id)}
                  onMouseLeave={() => setHoverId(null)}
                  className="relative flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-xl border border-white/20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md shadow-lg shadow-purple-500/10 hover:from-purple-500/30 hover:to-blue-500/30 hover:shadow-purple-500/20 hover:scale-[1.03] overflow-hidden"
                >
                  <span className="relative z-10 whitespace-nowrap">{navItem.label}</span>
                  {hasSubmenu && (
                    <ChevronDown
                      className={`relative z-10 h-4 w-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                  {(hoverId === navItem.id || isOpen) && (
                    <motion.div
                      layoutId="menu-pill-bg"
                      className="absolute inset-0 bg-white/10"
                      style={{ borderRadius: 12 }}
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                </button>
              )}

              <AnimatePresence>
                {isOpen && hasSubmenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="absolute left-1/2 top-full z-50 pt-3 -translate-x-1/2"
                  >
                    <div
                      className={`rounded-2xl border border-white/10 bg-black/45 p-5 backdrop-blur-2xl shadow-2xl shadow-black/35 ${
                        isServicesMenu
                          ? "min-w-[1180px] max-w-[1320px]"
                          : "min-w-[760px] max-w-[920px]"
                      }`}
                    >
                      <div
                        className={`gap-8 ${
                          isServicesMenu
                            ? "grid grid-cols-4"
                            : "grid md:grid-cols-2 xl:grid-cols-3"
                        }`}
                      >
                        {navItem.subMenus?.map((group) => (
                          <div key={group.title} className="min-w-0">
                            <h3 className="mb-4 text-sm font-medium text-white/55">
                              {group.title}
                            </h3>

                            <ul className="space-y-4">
                              {group.items.map((item) => {
                                const Icon = item.icon;
                                const content = (
                                  <>
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white transition-all duration-300 group-hover:bg-white/95 group-hover:text-[#0A0A0A]">
                                      <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-sm font-medium text-white">{item.label}</p>
                                      <p className="text-xs leading-5 text-white/55 transition-colors duration-300 group-hover:text-white/85">
                                        {item.description}
                                      </p>
                                    </div>
                                  </>
                                );

                                if (item.link) {
                                  return (
                                    <li key={item.label}>
                                      <Link
                                        href={item.link}
                                        className="group flex items-start gap-3 rounded-xl p-2 transition-colors duration-200 hover:bg-white/6"
                                        onClick={() => setOpenMenu(null)}
                                      >
                                        {content}
                                      </Link>
                                    </li>
                                  );
                                }

                                return (
                                  <li key={item.label}>
                                    <button
                                      type="button"
                                      onClick={(e) => handleSubItemClick(navItem.label, item, e)}
                                      className="group flex w-full items-start gap-3 rounded-xl p-2 text-left transition-colors duration-200 hover:bg-white/6"
                                    >
                                      {content}
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    );
  }
);

MegaMenu.displayName = "MegaMenu";

export default MegaMenu;