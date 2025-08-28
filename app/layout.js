import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. Import component "cầu nối"
import ClientEffects from "./components/ClientEffects";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 2. Gọi ClientEffects ở đây. Mọi thứ sẽ hoạt động đúng */}
        <ClientEffects />

        <video 
          autoPlay 
          loop 
          muted 
          preload="auto"
          playsInline // Thêm thuộc tính này để tối ưu cho mobile
          className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-[-1]"></div>
        
        {children}
      </body>
    </html>
  );
}