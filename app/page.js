"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import { FaGithub, FaYoutube, FaFacebook, FaDiscord, FaEnvelope } from "react-icons/fa";
import MusicPlayer from './components/MusicPlayer';

/**
 * Component SocialLink: Hiển thị một liên kết mạng xã hội có thể click.
 */
const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-white/20 hover:scale-[1.02]"
    aria-label={label}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </a>
);

/**
 * Component InfoRow: Hiển thị một dòng thông tin. Khi click, nội dung sẽ được sao chép.
 */
const InfoRow = ({ icon, text, copyText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    // Reset thông báo "Copied!" sau 2 giây
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={handleCopy}
      className="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] cursor-pointer"
      title="Click to copy"
    >
      {icon}
      <span className="font-medium">{copied ? 'Copied!' : text}</span>
    </div>
  );
};

/**
 * Component BioPage: Trang bio chính của bạn.
 */
export default function BioPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Bắt đầu animation của thẻ bio sau 1 giây,
    // để animation fade-in của cả trang (trong globals.css) có thời gian chạy trước.
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer); // Cleanup function
  }, []);

  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-4 text-white">
      {/* Trình phát nhạc, nằm cố định ở góc màn hình */}
      <MusicPlayer />
      
      {/* Thẻ bio chính, chứa animation vào trang */}
      <main 
        className={`w-full max-w-md mx-auto p-8 rounded-2xl shadow-lg
                   bg-black/25 backdrop-blur-lg border border-white/10
                   transition-all ease-out
                   duration-1000 
                   ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div className="flex flex-col items-center text-center gap-6">
          {/* --- AVATAR GIF ĐÃ ĐƯỢC CẬP NHẬT --- */}
          <Image
            src="/avatar.gif" 
            alt="Memaybo Avatar"
            width={120}
            height={120}
            className="rounded-full border-2 border-white/20 shadow-lg"
            priority
            unoptimized // Quan trọng: Giữ cho ảnh GIF hoạt động
          />
          {/* Thông tin cá nhân */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Memaybo
            </h1>
            <p className="text-md text-white/70">
              Full-stack Developer | Birthday 18/01
            </p>
          </div>
        </div>

        {/* Danh sách các liên kết đã được cập nhật label */}
        <div className="mt-10 flex flex-col gap-3">
          <SocialLink href="https://www.youtube.com/@Memayybo" icon={<FaYoutube size={24} />} label="Memaybo" />
          <SocialLink href="https://www.facebook.com/vuonglamzz/" icon={<FaFacebook size={24} />} label="Vuong Lam Nguyen" />
          <SocialLink href="https://github.com/memaybeo192" icon={<FaGithub size={24} />} label="Memaybeo192" />
          <InfoRow icon={<FaDiscord size={24} />} text="lam017367" copyText="lam017367" />
          <InfoRow icon={<FaEnvelope size={24} />} text="nguyenvuonglam74@gmail.com" copyText="nguyenvuonglam74@gmail.com" />
        </div>
      </main>
    </div>
  );
}