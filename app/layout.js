// app/layout.js

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundVideo from "./components/BackgroundVideo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://mybio-lvve.vercel.app'),
  title: "Shizuna | Just a normal person",
  description: "Trang bio cá nhân của Shizuna (Vương Lâm).",
  openGraph: {
    title: "Shizuna | Just a normal person",
    description: "Trang bio cá nhân của Shizuna (Vương Lâm).",
    url: 'https://mybio-lvve.vercel.app/',
    siteName: 'Shizuna Bio',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* --- SỬA LỖI: TRẢ VIDEO NỀN VỀ ĐÂY --- */}
        {/* Đảm bảo video nền luôn có sẵn để chuyển cảnh mượt mà */}
        <BackgroundVideo />
        
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-[-1]"></div>
        
        {children}
      </body>
    </html>
  );
}