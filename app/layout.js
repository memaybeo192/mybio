import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CursorLight from "./components/CursorLight";
import LiveBackground from "./components/LiveBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Metadata: Cấu hình thông tin SEO và chia sẻ mạng xã hội cho trang web.
 * === CÁC THAY ĐỔI CỦA BẠN NẰM Ở ĐÂY ===
 */
export const metadata = {
  // Tiêu đề hiển thị trên tab trình duyệt
  title: "Shizuna | Just a normal person",
  
  // Mô tả ngắn cho công cụ tìm kiếm
  description: "Trang bio cá nhân của Shizuna (Vương Lâm).",
  
  // Cấu hình Open Graph (dành cho Discord, Facebook, v.v.)
  openGraph: {
    title: "Shizuna | Just a normal person", // Tiêu đề lớn khi chia sẻ link
    description: "Trang bio cá nhân của Shizuna (Vương Lâm).", // Mô tả nhỏ bên dưới
    url: 'https://shizuna-bio.vercel.app/', // URL trang web của bạn
    siteName: 'Shizuna Bio', // Tên trang web
    images: [
      {
        url: '/og-image.png', // Ảnh xem trước khi chia sẻ link
        width: 1200,
        height: 630,
      },
    ],
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
        <CursorLight />
        <LiveBackground />

        <video 
          autoPlay 
          loop 
          muted 
          preload="auto"
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