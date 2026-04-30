import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TeeBeeU | Full Stack Web Developer",
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
        {children}
      </body>
    </html>
  );
}
