// app/layout.js

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        {/* --- TỐI ƯU HYBRID: YÊU CẦU TRÌNH DUYỆT TẢI TRƯỚC CÁC TÀI NGUYÊN QUAN TRỌNG --- */}
        {/* Trình duyệt sẽ bắt đầu tải các file này với ưu tiên cao ngay khi đọc HTML */}
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
        
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Layout giờ đây chỉ là một cái vỏ, nội dung cụ thể (bao gồm cả video nền) 
            sẽ do page.js quyết định, giúp kiến trúc sạch sẽ hơn. */}
        {children}
      </body>
    </html>
  );
}