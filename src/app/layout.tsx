import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PerformanceProvider } from '@/components/providers/PerformanceProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import "./globals.css";
import enTranslations from '../../locales/en.json';

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
  title: enTranslations.seo.title,
  description: enTranslations.seo.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
