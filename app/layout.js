// app/layout.js

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
  title: "Me May Beo | Developer", // Bạn có thể đổi title ở đây
  description: "My personal bio page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* LỚP 1 (Dưới cùng): VIDEO BACKGROUND */}
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>

        {/* LỚP 2 (Ở giữa): HẠT PARTICLES */}
        <LiveBackground />
        
        {/* LỚP 3 (Trên cùng): NỘI DUNG TRANG */}
        {children}
      </body>
    </html>
  );
}