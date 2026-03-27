import type { Metadata } from "next";
import Script from "next/script";
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
    default: "Rahima Consulting — Бухгалтерские услуги и автоматизация бизнеса в Крыму",
    template: "%s | Rahima Consulting",
  },
  description:
    "Профессиональное бухгалтерское сопровождение, регистрация бизнеса и автоматизация процессов через СБИС и ИИ в Симферополе. Режим одного окна для вашего бизнеса.",
  applicationName: "Rahima Consulting",
  keywords: [
    "бухгалтерские услуги симферополь",
    "бухгалтерское сопровождение крым",
    "автоматизация бизнеса сбис",
    "регистрация ООО и ИП симферополь",
    "внедрение ИИ для бизнеса",
    "интеграция банковских выписок",
    "налоговый консалтинг крым",
    "n8n интеграции",
    "рахима консалтинг",
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
    title: "Rahima Consulting — Бухгалтерские услуги и автоматизация в Крыму",
    description:
      "Бухгалтерское сопровождение, автоматизация СБИС, ИИ-решения и юридическая поддержка бизнеса в режиме одного окна.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Rahima Consulting — автоматизация и бухгалтерия",
      },
    ],
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
      "Бухгалтерское сопровождение, регистрация бизнеса, юридические услуги, автоматизация и ИИ-решения для бизнеса в Крыму.",
    telephone: "+7-978-998-72-22",
    email: "info@rahima-consulting.ru",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Республика Крым" },
      { "@type": "City", name: "Симферополь" },
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
        <Script
          id="yandex-metrika"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=108266849', 'ym');

              ym(108266849, 'init', {
                ssr: true,
                webvisor: true,
                clickmap: true,
                ecommerce: "dataLayer",
                referrer: document.referrer,
                url: location.href,
                accurateTrackBounce: true,
                trackLinks: true
              });
            `,
          }}
        />
        <script src="/tv-detect.js" defer />
        <link rel="stylesheet" href="/tv-fallback.css" />
        <meta name="theme-color" content="#0b1020" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased`}>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/108266849"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>

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