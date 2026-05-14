import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import LiquidEther from "@/components/ui/LiquidEther";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohamed Aathif | Full Stack Web Developer",
  description: "Crafting exceptional digital experiences with modern technologies, building scalable applications from concept to deployment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen flex flex-col font-sans selection:bg-accent-purple/30 selection:text-white">
        <CustomCursor />
        
        {/* Full-screen background interactive layer */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
          <LiquidEther
            colors={[ '#5227FF', '#FF9FFC', '#B497CF' ]}
            mouseForce={42}
            cursorSize={75}
            isViscous
            viscous={22}
            iterationsViscous={15}
            iterationsPoisson={28}
            resolution={0.5}
            isBounce
            autoDemo
            autoSpeed={0.4}
            autoIntensity={1.4}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>

        {children}
      </body>
    </html>
  );
}
