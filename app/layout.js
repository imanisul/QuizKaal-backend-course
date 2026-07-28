import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";
import AuroraBackground from "@/components/ui/AuroraBackground";
import CursorSpotlightWrapper from "@/components/CursorSpotlightWrapper";
import SupportModal from "@/components/ui/SupportModal";
import LenisProvider from "@/components/LenisProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata = {
  metadataBase: new URL("https://quizkaal.in"),
  title: "QuizKaal — Backend Engineering from Fundamentals to Production",
  description: "QuizKaal Learn: An immersive, interactive backend engineering course. Master HTTP, auth, databases, caching, scaling, and more. Build it, watch it run.",
  keywords: ["QuizKaal", "backend engineering", "learn backend", "HTTP", "REST API", "databases", "Node.js", "CI/CD", "DevOps"],
  icons: { icon: "/logo.png" },
  openGraph: {
    title: "QuizKaal — Backend Engineering from Fundamentals to Production",
    description: "An immersive, interactive backend engineering course.",
    url: "https://quizkaal.in",
    siteName: "QuizKaal",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "QuizKaal Backend Course Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuizKaal — Backend Engineering",
    description: "Master backend systems with interactive visualizers and real code.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "8J4P9t283cluCF9q1jsjgE-zgATbfDdXXE2KN4wBMVU",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="font-ui" suppressHydrationWarning>
        <LenisProvider>
          <AuroraBackground />
          <CursorSpotlightWrapper />
          <TopNav />
          <SupportModal />
          <div className="relative z-[2]">{children}</div>
        </LenisProvider>
      </body>
    </html>
  );
}
