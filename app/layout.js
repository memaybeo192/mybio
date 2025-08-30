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
        {/* --- BẮT ĐẦU THAY ĐỔI: "RA LỆNH" CHO TRÌNH DUYỆT TẢI TRƯỚC --- */}
        {/* Yêu cầu trình duyệt tải các tài nguyên quan trọng ngay lập tức */}
        <link 
          rel="preload" 
          href="/background.mp4" 
          as="video" 
          type="video/mp4" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href="/avatar.mp4" 
          as="video" 
          type="video/mp4" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href="/background-music.mp3" 
          as="audio" 
          type="audio/mpeg" 
          crossOrigin="anonymous" 
        />
        {/* --- KẾT THÚC THAY ĐỔI --- */}
        
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BackgroundVideo />
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-[-1]"></div>
        {children}
      </body>
    </html>
  );
}