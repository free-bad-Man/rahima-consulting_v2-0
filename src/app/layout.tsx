import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/session-provider";
import ConditionalFooter from "@/components/conditional-footer";
import PageLoader from "@/components/ui/page-loader";
import PWAInstallModal from "@/components/pwa-install-modal";
import PWARegister from "@/components/pwa-register";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://rahima-consulting.ru").replace(/\/+$/, "");
const OG_IMAGE = `${SITE_URL}/logo.png`;

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
  preload: false,
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rahima Consulting — бухгалтерское сопровождение и автоматизация бизнеса",
    template: "%s | Rahima Consulting",
  },
  description:
    "Профессиональное бухгалтерское сопровождение, регистрация бизнеса, юридические услуги, автоматизация и ИИ-решения для вашего бизнеса в Крыму.",
  applicationName: "Rahima Consulting",
  keywords: [
    "бухгалтерские услуги",
    "бухгалтерское сопровождение",
    "регистрация ООО",
    "регистрация ИП",
    "юридические услуги",
    "автоматизация бизнеса",
    "CRM",
    "n8n",
    "ИИ для бизнеса",
    "Крым",
    "Симферополь",
  ],
  authors: [{ name: "Rahima Consulting" }],
  creator: "Rahima Consulting",
  publisher: "Rahima Consulting",
  category: "business",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Rahima Consulting",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "Rahima Consulting",
    title: "Rahima Consulting — бухгалтерское сопровождение и автоматизация бизнеса",
    description:
      "Бухгалтерское сопровождение, автоматизация, ИИ-решения и юридическая поддержка для бизнеса.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Rahima Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahima Consulting — бухгалтерское сопровождение и автоматизация бизнеса",
    description:
      "Бухгалтерское сопровождение, автоматизация, ИИ-решения и юридическая поддержка для бизнеса.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Rahima Consulting",
    url: SITE_URL,
    logo: OG_IMAGE,
    image: OG_IMAGE,
    description:
      "Бухгалтерское сопровождение, регистрация бизнеса, юридические услуги, автоматизация и ИИ-решения для бизнеса.",
    telephone: "+7-978-998-72-22",
    email: "info@rahima-consulting.ru",
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Республика Крым",
      },
      {
        "@type": "City",
        name: "Симферополь",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "RU",
      addressRegion: "Республика Крым",
      addressLocality: "Симферополь",
      streetAddress: "ул. им Мате Залки 1",
    },
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "₽₽",
    sameAs: ["https://t.me/centr_reg"],
  };

  return (
    <html lang="ru">
      <head>
        <script src="/tv-detect.js" defer />
        <link rel="stylesheet" href="/tv-fallback.css" />

        <meta name="theme-color" content="#0b1020" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Rahima Consulting" />

        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased`}>
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