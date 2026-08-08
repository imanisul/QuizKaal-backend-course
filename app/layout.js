import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import dynamic from "next/dynamic";
import TopNav from "@/components/TopNav";
import AuroraBackground from "@/components/ui/AuroraBackground";
import LenisProvider from "@/components/LenisProvider";
import { generateSchema, siteConfig } from "@/lib/seo";


const CursorSpotlightWrapper = dynamic(() => import("@/components/CursorSpotlightWrapper"), { ssr: false });
const SupportModal = dynamic(() => import("@/components/ui/SupportModal"), { ssr: false });
const LegalModalManager = dynamic(() => import("@/components/legal/LegalModalManager"), { ssr: false });
const CookieBanner = dynamic(() => import("@/components/legal/CookieBanner"), { ssr: false });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "QuizKaal Learn — Premium Backend & AI Engineering Courses",
  description: siteConfig.description,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/android-chrome-512x512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon.png',
      },
    ],
  },
  verification: {
    google: "4eXEaFD7fJjwoB4ZxH7MaZksb6s65-xRPLC-xHviR4k",
  },
};

export default function RootLayout({ children }) {
  const orgSchema = generateSchema("Organization");
  const websiteSchema = generateSchema("WebSite");

  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX"} />
        <Script id="schema-organization" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(orgSchema)}
        </Script>
        <Script id="schema-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(websiteSchema)}
        </Script>
      </head>
      <body className="font-ui" suppressHydrationWarning>
        <LenisProvider>
          <AuroraBackground />
          <CursorSpotlightWrapper />
          <TopNav />
          <SupportModal />
          <LegalModalManager />
          <CookieBanner />
          <div className="relative z-[2] min-h-screen flex flex-col " suppressHydrationWarning>
            <main className="flex-grow" suppressHydrationWarning>
              {children}
            </main>
          </div>
        </LenisProvider>

      </body>
    </html>
  );
}
