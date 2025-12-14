
import type { Metadata } from "next";
import { Cairo, Dancing_Script } from "next/font/google";
import "../../globals.css";
import { ThemeProvider } from '@/components/common/ThemeContext';
import { ToastProvider } from '@/components/common/ToastContext';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
import { MerchantProvider } from '@/context/MerchantContext';
import GeminiAssistant from '@/components/common/GeminiAssistant';

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: '--font-cairo' });
const dancing = Dancing_Script({ subsets: ["latin"], variable: '--font-dancing' });

export const metadata: Metadata = {
  title: "RAY - راي | نور طريق نجاحك",
  description: "المنصة الرقمية المتكاملة للتجار والمستهلكين في مصر. نظام إدارة (ERP/POS) ومتجر إلكتروني.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={`${cairo.variable} ${dancing.variable} font-sans bg-gray-50 text-ray-black dark:bg-gray-950 dark:text-gray-100`}>
        <MerchantProvider>
          <AuthProvider>
            <LanguageProvider>
              <ThemeProvider>
                <ToastProvider>
                  <CartProvider>
                    {children}
                    <GeminiAssistant context="customer" />
                  </CartProvider>
                </ToastProvider>
              </ThemeProvider>
            </LanguageProvider>
          </AuthProvider>
        </MerchantProvider>
      </body>
    </html>
  );
}
