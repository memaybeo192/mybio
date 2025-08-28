// app/components/SplashScreen.js
"use client";

import { motion } from 'framer-motion';

const SplashScreen = ({ onEnter }) => {
  return (
    // --- THAY ĐỔI LỚP CSS Ở ĐÂY ---
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer bg-black/25 backdrop-blur-xl" 
      onClick={onEnter}
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <p className="mt-2 text-lg text-white/70 animate-pulse">Click anywhere to enter</p>
      </motion.div>
    </div>
  );
};

export default SplashScreen;