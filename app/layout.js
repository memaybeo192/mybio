// app/layout.js

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundVideo from "./components/BackgroundVideo";
import { DeviceProvider } from "./context/DeviceContext";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DeviceProvider>
          <BackgroundVideo />
          <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-[-1]"></div>
          {children}
        </DeviceProvider>
      </body>
    </html>
  );
}