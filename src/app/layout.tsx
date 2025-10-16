import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PerformanceProvider } from '@/components/providers/PerformanceProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false, // Only preload primary font
});

export const metadata: Metadata = {
  title: 'Portfolio - Full Stack Developer',
  description: 'Professional portfolio showcasing modern web development skills and projects. Experienced in React, Next.js, TypeScript, and full-stack development.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PerformanceProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </PerformanceProvider>
      </body>
    </html>
  );
}
