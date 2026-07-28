import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";
import AuroraBackground from "@/components/ui/AuroraBackground";
import CursorSpotlightWrapper from "@/components/CursorSpotlightWrapper";
import LenisProvider from "@/components/LenisProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata = {
  title: "QuizKaal Learn — Backend Engineering from Fundamentals to Production",
  description: "QuizKaal Learn: An immersive, interactive backend engineering course. Master HTTP, auth, databases, caching, scaling, and more. Build it, watch it run.",
  keywords: ["QuizKaal", "backend engineering", "learn backend", "HTTP", "REST API", "databases", "Node.js"],
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="font-ui" suppressHydrationWarning>
        <LenisProvider>
          <AuroraBackground />
          <CursorSpotlightWrapper />
          <TopNav />
          <div className="relative z-[2]">{children}</div>
        </LenisProvider>
      </body>
    </html>
  );
}
