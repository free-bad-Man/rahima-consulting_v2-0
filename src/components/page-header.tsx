"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import AuthButton from "./auth-button";
import NotificationsDropdown from "./notifications-dropdown";

export default function PageHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Услуги", href: "/services" },
    { label: "Решения", href: "/solutions" },
    { label: "ИИ-Ассистенты", href: "/ai-assistants" },
    { label: "Кейсы", href: "/cases" },
    { label: "Контакты", href: "/contacts" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-12 py-3 md:py-4 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="/logo.png"
              alt="Rahima Consulting"
              className="h-14 md:h-16 w-auto object-contain"
              style={{
                filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(2000%) hue-rotate(250deg) brightness(1.5) contrast(1.1)',
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
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

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <NotificationsDropdown />
            <AuthButton
              onSignInClick={() => window.location.href = '/auth/signin'}
              onRegisterClick={() => window.location.href = '/auth/register'}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-slide-down">
            <nav className="flex flex-col space-y-3">
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
            <div className="mt-4 px-4 flex flex-col gap-3">
              <NotificationsDropdown />
              <AuthButton
                onSignInClick={() => window.location.href = '/auth/signin'}
                onRegisterClick={() => window.location.href = '/auth/register'}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

