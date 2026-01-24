import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/session-provider";
import ConditionalFooter from "@/components/conditional-footer";
import PageLoader from "@/components/ui/page-loader";
import PWAInstallModal from "@/components/pwa-install-modal";
import PWARegister from "@/components/pwa-register";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Не критичный шрифт
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true, // Критичный для заголовков
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'),
  title: {
    default: "Rahima Consulting - Бухгалтерское сопровождение и автоматизация бизнеса",
    template: "%s | Rahima Consulting",
  },
  description: "Профессиональное бухгалтерское сопровождение, регистрация бизнеса, юридические услуги, автоматизация и ИИ-решения для вашего бизнеса в Крыму",
  keywords: ["бухгалтерские услуги", "регистрация ООО", "регистрация ИП", "автоматизация бизнеса", "CRM", "ИИ для бизнеса", "юридические услуги", "Крым", "Симферополь"],
  authors: [{ name: "Rahima Consulting" }],
  creator: "Rahima Consulting",
  publisher: "Rahima Consulting",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Rahima Consulting",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: "Rahima Consulting",
    title: "Rahima Consulting - Комплексные решения для вашего бизнеса",
    description: "Бухгалтерское сопровождение, автоматизация, ИИ-решения и юридическая поддержка",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Rahima Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahima Consulting - Комплексные решения для бизнеса",
    description: "Бухгалтерское сопровождение, автоматизация, ИИ-решения",
    images: ["/logo.png"],
  },
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        {/* tv detect + fallback for TV browsers */}
        <script src="/tv-detect.js" defer />
        <link rel="stylesheet" href="/tv-fallback.css" />
        
        {/* PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Rahima" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-192x192.png" />
        
        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Rahima Consulting",
              "description": "Бухгалтерское сопровождение, автоматизация и юридические услуги для бизнеса",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com",
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"}/logo.png`,
              "image": `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"}/logo.png`,
              "telephone": "+7-978-998-72-22",
              "email": "info@rahima-consulting.ru",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "RU",
                "addressRegion": "Республика Крым",
                "addressLocality": "Симферополь",
              },
              "priceRange": "₽₽",
              "openingHours": "Mo-Su 00:00-23:59",
              "sameAs": [
                "https://t.me/centr_reg",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased`}
      >
        <PageLoader />
        <Providers>
          {children}
          <ConditionalFooter />
          <PWAInstallModal />
          <PWARegister />
        </Providers>
      </body>
    </html>
  );
}
