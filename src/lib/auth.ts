// Настройка прокси должна быть выполнена первой
import "./setup-proxy";

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Yandex from "next-auth/providers/yandex";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const isDevelopment = process.env.NODE_ENV === "development";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const yandexClientId = process.env.YANDEX_CLIENT_ID;
const yandexClientSecret = process.env.YANDEX_CLIENT_SECRET;

// Для локальной разработки даем безопасные fallback-значения,
// чтобы проект не шумел в логах и не падал из-за пустого env.
const nextAuthSecret =
  process.env.NEXTAUTH_SECRET || (isDevelopment ? "local-dev-secret-not-for-production" : undefined);

const nextAuthUrl =
  process.env.NEXTAUTH_URL || (isDevelopment ? "http://localhost:3000" : undefined);

if (isDevelopment) {
  if (!process.env.NEXTAUTH_URL) {
    console.info("ℹ️ NEXTAUTH_URL не задан, используется локальный fallback: http://localhost:3000");
  } else {
    console.info(`✅ NEXTAUTH_URL установлен: ${process.env.NEXTAUTH_URL}`);
  }

  if (!process.env.NEXTAUTH_SECRET) {
    console.info("ℹ️ NEXTAUTH_SECRET не задан, используется локальный dev-secret");
  }

  if (!googleClientId || !googleClientSecret) {
    console.info("ℹ️ Google OAuth отключен локально: GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET не заданы");
  } else {
    console.info("✅ Google OAuth настроен");
  }

  if (!yandexClientId || !yandexClientSecret) {
    console.info("ℹ️ Yandex OAuth отключен локально: YANDEX_CLIENT_ID / YANDEX_CLIENT_SECRET не заданы");
  } else {
    console.info("✅ Yandex OAuth настроен");
  }
} else {
  if (!nextAuthSecret) {
    console.error("❌ NEXTAUTH_SECRET не установлен!");
    console.error("   Для production: установите переменную окружения NEXTAUTH_SECRET");
    console.error("   Для генерации: openssl rand -base64 32");
  }

  if (!nextAuthUrl) {
    console.error("❌ NEXTAUTH_URL не установлен!");
  }
}

const providers: any[] = [];

if (googleClientId && googleClientSecret) {
  providers.push(
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  );
}

if (yandexClientId && yandexClientSecret) {
  providers.push(
    Yandex({
      clientId: yandexClientId,
      clientSecret: yandexClientSecret,
    }),
  );
}

providers.push(
  Credentials({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null;
      }

      const user = await prisma.user.findUnique({
        where: { email: credentials.email as string },
      });

      if (!user || !user.password) {
        return null;
      }

      const isPasswordValid = await bcrypt.compare(
        credentials.password as string,
        user.password,
      );

      if (!isPasswordValid) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      };
    },
  }),
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  providers,
  callbacks: {
    async signIn({ user, account }) {
      if ((account?.provider === "google" || account?.provider === "yandex") && user.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser) {
          const existingAccount = await prisma.account.findFirst({
            where: {
              userId: existingUser.id,
              provider: account.provider,
            },
          });

          if (!existingAccount && account.providerAccountId) {
            try {
              await prisma.account.create({
                data: {
                  userId: existingUser.id,
                  type: account.type || "oauth",
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  refresh_token: account.refresh_token || null,
                  access_token: account.access_token || null,
                  expires_at: account.expires_at || null,
                  token_type: account.token_type || null,
                  scope: account.scope || null,
                  id_token: account.id_token || null,
                  session_state:
                    typeof account.session_state === "string" ? account.session_state : null,
                },
              });

              console.log(
                `✅ ${account.provider} аккаунт связан с существующим пользователем: ${user.email}`,
              );
            } catch (error) {
              console.error("❌ Ошибка при связывании аккаунта:", error);
            }
          }

          return true;
        }
      }

      return true;
    },

    async session({ session, token, user }) {
      if (token) {
        (session.user as any).id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
      }

      if (user) {
        (session.user as any).id = user.id;
        if (user.image) session.user.image = user.image;
        if (user.name) session.user.name = user.name;
        if (user.email) session.user.email = user.email;
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }

      return token;
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
  },

  secret: nextAuthSecret,
  trustHost: true,
  debug: isDevelopment,
});