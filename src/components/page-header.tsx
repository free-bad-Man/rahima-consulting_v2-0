"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Home } from "lucide-react";

export default function PageHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const navItems = [
    { label: "Услуги", href: "/services" },
    { label: "Решения", href: "/solutions" },
    { label: "ИИ-Ассистенты", href: "/ai-assistants" },
    { label: "Кейсы", href: "/cases" },
    { label: "Контакты", href: "/contacts" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-12 py-2 backdrop-blur-md bg-black/25 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center lg:justify-center min-h-[52px] relative">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {!isHomePage && (
              <Link
                href="/"
                className="text-white/90 hover:text-white transition-colors duration-200 font-semibold flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20"
              >
                <Home className="w-4 h-4" />
                <span>На главную</span>
              </Link>
            )}

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden absolute right-0 p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pb-3 animate-slide-down">
            <nav className="flex flex-col space-y-2">
              {!isHomePage && (
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/90 hover:text-white transition-colors duration-200 font-semibold px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  <span>На главную</span>
                </Link>
              )}

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/80 hover:text-white transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}