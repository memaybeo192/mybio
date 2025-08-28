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
        <CursorLight />
        <LiveBackground />

        <video 
          autoPlay 
          loop 
          muted 
          preload="auto" // Tải trước video
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