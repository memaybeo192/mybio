import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CursorLight from "./components/CursorLight";
import LiveBackground from "./components/LiveBackground"; // Kích hoạt component nền hạt

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Memaybo | Full-stack Developer",
  description: "Trang bio cá nhân của Memaybo (Vương Lâm), giới thiệu các dự án và thông tin liên hệ.",
  openGraph: {
    title: "Memaybo | Full-stack Developer",
    description: "Trang bio cá nhân của Memaybo (Vương Lâm).",
    url: 'https://mybio-lvve.vercel.app/',
    siteName: 'Memaybo Bio',
    images: [
      {
        url: '/og-image.png',
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
        {/* Các hiệu ứng nằm ở lớp trên cùng */}
        <CursorLight />
        <LiveBackground />

        {/* Lớp nền video, nằm ở phía sau cùng */}
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        
        {/* LỚP PHỦ TỐI ĐƯỢC THÊM VÀO ĐÂY */}
        {/* Lớp này làm video tối đi, giúp các hiệu ứng và chữ trắng nổi bật hơn */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-[-1]"></div>
        
        {/* Nội dung chính của trang */}
        {children}
      </body>
    </html>
  );
}