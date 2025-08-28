"use client";

import { useState } from 'react';
import Image from "next/image";
import { FaGithub, FaYoutube, FaFacebook, FaDiscord, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import ParallaxTilt from 'react-parallax-tilt';
import InfoRow from './components/InfoRow';
import MusicPlayer from './components/MusicPlayer';
import SplashScreen from './components/SplashScreen';

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

// Cấu hình cho animation xuất hiện lần lượt (Staggered Animation)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Mỗi phần tử con sẽ xuất hiện cách nhau 0.1 giây
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * Component BioPage: Trang bio chính của bạn.
 */
export default function BioPage() {
  const [isEntered, setIsEntered] = useState(false);

  // Hàm được gọi khi người dùng click vào màn hình chờ
  const handleEnter = () => {
    setIsEntered(true);
  };

  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-4 text-white">
      {/* AnimatePresence xử lý animation khi một component bị xóa khỏi cây DOM */}
      <AnimatePresence>
        {!isEntered && (
          <motion.div
            key="splash"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SplashScreen onEnter={handleEnter} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chỉ render nội dung chính sau khi người dùng đã "Enter" */}
      {isEntered && (
        <>
          <MusicPlayer />
          
          <ParallaxTilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareEnable={true}
            glareMaxOpacity={0.15}
            glarePosition="all"
            scale={1.02}
          >
            <motion.main 
              className="w-full max-w-md mx-auto p-8 rounded-2xl shadow-lg bg-black/25 backdrop-blur-lg border border-white/10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="flex flex-col items-center text-center gap-6">
                
                {/* Hiệu ứng "Breathing" cho Avatar */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1], // Phóng to rồi thu nhỏ
                    rotate: [0, 0.5, -0.5, 0.5, 0], // Xoay nhẹ
                  }}
                  transition={{
                    duration: 5, // Kéo dài 5 giây cho mỗi chu kỳ
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src="/avatar.gif" 
                    alt="Memaybo Avatar"
                    width={120}
                    height={120}
                    className="rounded-full border-2 border-white/20"
                    // Thêm shadow động để tạo hiệu ứng "phát sáng"
                    style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}
                    priority
                    unoptimized
                  />
                </motion.div>

                <div className="flex flex-col gap-2">
                  <motion.h1 variants={itemVariants} className="text-3xl font-bold tracking-tight text-white">
                    Memayboo (Lam)
                  </motion.h1>
                  <motion.p variants={itemVariants} className="text-md text-white/70">
                    Just a normal person | Birthday 18/1
                  </motion.p>
                </div>
              </motion.div>

              <motion.div variants={containerVariants} className="mt-10 flex flex-col gap-3">
                <motion.div variants={itemVariants}><SocialLink href="https://www.youtube.com/@Memayybo" icon={<FaYoutube size={24} />} label="Memayybo" /></motion.div>
                <motion.div variants={itemVariants}><SocialLink href="https://www.facebook.com/vuonglamzz/" icon={<FaFacebook size={24} />} label="Vuong Lam Nguyen" /></motion.div>
                <motion.div variants={itemVariants}><SocialLink href="https://github.com/memaybeo192" icon={<FaGithub size={24} />} label="Memaybeo192" /></motion.div>
                <motion.div variants={itemVariants}><InfoRow icon={<FaDiscord size={24} />} text="lam017367" copyText="lam017367" /></motion.div>
                <motion.div variants={itemVariants}><InfoRow icon={<FaEnvelope size={24} />} text="nguyenvuonglam74@gmail.com" copyText="nguyenvuonglam74@gmail.com" /></motion.div>
              </motion.div>
            </motion.main>
          </ParallaxTilt>
        </>
      )}
    </div>
  );
}