"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import { FaGithub, FaYoutube, FaFacebook, FaDiscord, FaEnvelope, FaCube } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import ParallaxTilt from 'react-parallax-tilt';
import InfoRow from './components/InfoRow';
import MusicPlayer from './components/MusicPlayer';
import SplashScreen from './components/SplashScreen';
// 1. Import hook mới
import { useAssetPreloader } from './hooks/useAssetPreloader';

// 2. Định nghĩa danh sách các assets quan trọng cần tải trước
const criticalAssets = [
  '/background.mp4',
  '/avatar.mp4',
  '/background-music.mp3'
];

const SocialLink = ({ href, icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-4 p-3 rounded-lg"
    aria-label={label}
    whileHover={{ 
      scale: 1.05, 
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      x: 5 
    }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <span className="animate-glow">{icon}</span>
    <span className="font-medium">{label}</span>
  </motion.a>
);

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

const listContainerVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: 0.2
    },
  },
};

export default function BioPage() {
  const [showSplash, setShowSplash] = useState(true);
  // 3. Sử dụng hook để lấy trạng thái tải thực tế
  const isPreloading = useAssetPreloader(criticalAssets);

  const handleEnter = () => {
    // Chỉ cho phép vào khi đã hết preloading
    if (!isPreloading) {
      setShowSplash(false);
    }
  };

  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-4 text-white">
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* 4. Truyền trạng thái isPreloading thực tế xuống SplashScreen */}
            <SplashScreen onEnter={handleEnter} isLoading={isPreloading} />
          </motion.div>
        )}
      </AnimatePresence>

      {!showSplash && (
        <>
          <MusicPlayer />
          
          <ParallaxTilt
            className="rounded-2xl overflow-hidden"
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareEnable={true}
            glareMaxOpacity={0.15}
            glarePosition="all"
            scale={1.02}
            glareStyle={{ borderRadius: '1rem' }}
          >
            <motion.main 
              className="w-full max-w-md mx-auto p-8 rounded-2xl shadow-lg bg-black/25 backdrop-blur-lg border border-white/10"
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="flex flex-col items-center text-center gap-6">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 0.5, -0.5, 0.5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    width={120}
                    height={120}
                    className="rounded-full border-2 border-white/20"
                    style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}
                  >
                    <source src="/avatar.mp4" type="video/mp4" />
                  </video>
                </motion.div>

                <div className="flex flex-col gap-2">
                  <motion.h1 className="text-3xl font-bold tracking-tight text-white">
                    Memayboo (Lam)
                  </motion.h1>
                  <motion.p className="text-md text-white/70">
                    Just a normal person | Birthday 18/1
                  </motion.p>
                </div>
              </motion.div>

              <motion.div 
                className="mt-10 flex flex-col gap-3"
                variants={listContainerVariants}
              >
                <SocialLink href="https://www.youtube.com/@Memayybo" icon={<FaYoutube size={24} />} label="Memayybo" />
                <SocialLink href="https://www.facebook.com/vuonglamzz/" icon={<FaFacebook size={24} />} label="Vuong Lam Nguyen" />
                <SocialLink href="https://github.com/memaybeo192" icon={<FaGithub size={24} />} label="Memaybeo192" />
                <SocialLink href="https://namemc.com/profile/Sayuna_VN.1" icon={<FaCube size={24} />} label="Sayuna_VN" />
                <InfoRow icon={<FaDiscord size={24} />} text="lam017367" copyText="lam017367" />
                <InfoRow icon={<FaEnvelope size={24} />} text="nguyenvuonglam74@gmail.com" copyText="nguyenvuonglam74@gmail.com" />
              </motion.div>
            </motion.main>
          </ParallaxTilt>
        </>
      )}
    </div>
  );
}