"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { User, LogOut, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AuthButtonProps {
  onSignInClick?: () => void;
  onRegisterClick?: () => void;
}

export default function AuthButton({ onSignInClick, onRegisterClick }: AuthButtonProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 animate-pulse" />
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-1 sm:gap-1.5 md:gap-2 text-white/70 hover:text-white text-xs sm:text-sm transition-colors"
          title="Личный кабинет"
        >
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || session.user.email || "User"}
              width={32}
              height={32}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-white/20 object-cover hover:border-white/40 transition-colors"
              unoptimized
            />
          ) : (
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors">
              <User className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white/70" />
            </div>
          )}
          <span className="hidden sm:inline text-white/90 truncate max-w-[120px] md:max-w-none">
            {session.user.name || session.user.email}
          </span>
        </Link>
        <Link
          href="/dashboard"
          className="hidden sm:flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm transition-colors"
          title="Личный кабинет"
        >
          <LayoutDashboard className="w-4 h-4 sm:w-4" />
          <span className="hidden md:inline">Кабинет</span>
        </Link>
        <button
          onClick={() => signOut()}
          className="flex items-center justify-center gap-1 sm:gap-1.5 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-white text-xs sm:text-sm transition-colors touch-manipulation"
          title="Выйти"
          aria-label="Выйти из аккаунта"
        >
          <LogOut className="w-4 h-4 sm:w-4" />
          <span className="hidden sm:inline">Выйти</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={() => signIn("google")}
        className="group relative flex items-center justify-center gap-2 min-h-[44px] sm:min-h-0 px-4 py-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-white/20 backdrop-blur-md text-white text-xs font-semibold transition-all duration-300 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25 hover:scale-105 whitespace-nowrap w-full touch-manipulation overflow-hidden"
        aria-label="Войти через Google"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 transition-all duration-300"></div>
        <svg className="w-4 h-4 flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span className="truncate relative z-10">Войти с Google</span>
      </button>
      <button
        onClick={onRegisterClick || (() => window.location.href = "/auth/register")}
        className="group relative flex items-center justify-center min-h-[44px] sm:min-h-0 px-4 py-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-white/20 backdrop-blur-md text-white text-xs font-semibold transition-all duration-300 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/25 hover:scale-105 whitespace-nowrap w-full touch-manipulation overflow-hidden"
        aria-label="Зарегистрироваться"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/20 group-hover:to-pink-600/20 transition-all duration-300"></div>
        <span className="relative z-10">Регистрация</span>
      </button>
      <button
        onClick={onSignInClick || (() => window.location.href = "/auth/signin")}
        className="group relative flex items-center justify-center min-h-[44px] sm:min-h-0 px-4 py-2.5 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 hover:from-indigo-500/30 hover:to-blue-500/30 border border-white/20 backdrop-blur-md text-white text-xs font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/25 hover:scale-105 whitespace-nowrap w-full touch-manipulation overflow-hidden"
        aria-label="Войти в аккаунт"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-blue-600/0 group-hover:from-indigo-600/20 group-hover:to-blue-600/20 transition-all duration-300"></div>
        <span className="relative z-10">Вход</span>
      </button>
    </div>
  );
}

