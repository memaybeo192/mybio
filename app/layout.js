import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CursorLight from "./components/CursorLight"; // Import component vầng sáng

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
 */
export const metadata = {
  title: "Memaybo | Full-stack Developer",
  description: "Trang bio cá nhân của Memaybo (Vương Lâm), giới thiệu các dự án và thông tin liên hệ.",
  openGraph: {
    title: "Memaybo | Full-stack Developer",
    description: "Trang bio cá nhân của Memaybo (Vương Lâm).",
    url: 'https://mybio-lvve.vercel.app/', // URL trang web của bạn
    siteName: 'Memaybo Bio',
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

/**
 * RootLayout: Component layout gốc cho toàn bộ ứng dụng.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Lớp hiệu ứng vầng sáng, nằm trên video nhưng dưới nội dung chính */}
        <CursorLight />
        
        {/* Lớp nền video, nằm ở phía sau cùng */}
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        
        {/* {children} sẽ render nội dung từ page.js lên trên cùng */}
        {children}
      </body>
    </html>
  );
}