import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "German mit Fun - A1 Level",
  description: "Free German learning app with TTS",
  manifest: "/manifest.json", // 👈 YE LINE ADD KAR DI
  themeColor: "#7c3aed", // 👈 YE BHI ADD
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "GermanFun"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex-col">
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-EFJV4ZLZT6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());
            gtag('config', 'G-EFJV4ZLZT6');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}