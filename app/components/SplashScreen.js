"use client";

import { motion } from 'framer-motion';

// Component giờ sẽ nhận thêm prop `isLoading`
const SplashScreen = ({ onEnter, isLoading }) => {
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-xl ${isLoading ? 'cursor-wait' : 'cursor-pointer'}`} 
      // Chỉ cho phép click khi đã hết loading
      onClick={!isLoading ? onEnter : undefined}
    >
      <motion.div
        key={isLoading ? 'loading' : 'enter'} // Key thay đổi để trigger animation
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1.5 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center"
      >
        {isLoading ? (
          <p className="mt-2 text-lg text-white/70">Loading assets...</p>
        ) : (
          <p className="mt-2 text-lg text-white/70 animate-pulse">Click anywhere to enter</p>
        )}
      </motion.div>
    </div>
  );
};

export default SplashScreen;
