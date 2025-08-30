// app/components/SplashScreen.js
"use client";

import { motion, AnimatePresence } from 'framer-motion';

const title = "Shizuna";

const titleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -25,
    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
};

const ReadyPrompt = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="text-center"
  >
    <motion.h1
      className="text-7xl font-bold tracking-wider text-white"
      variants={titleVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      aria-label={title}
    >
      {title.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
          style={{ willChange: 'transform, opacity' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.h1>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="mt-8 text-lg text-white/70"
    >
      Nhấn vào đâu đó để vào trang
    </motion.p>
  </motion.div>
);

const LoadingIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="flex items-center justify-center gap-2 text-lg text-white/70"
  >
    <span>Đang khởi tạo</span>
    <span className="animate-pulse-dot delay-0">.</span>
    <span className="animate-pulse-dot" style={{ animationDelay: '0.2s' }}>.</span>
    <span className="animate-pulse-dot" style={{ animationDelay: '0.4s' }}>.</span>
  </motion.div>
);

const SplashScreen = ({ onEnter, isLoading }) => {
  return (
    <div
      // --- ĐÃ KHÔI PHỤC GIAO DIỆN ---
      // Trả lại hiệu ứng làm mờ đẹp mắt.
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-2xl transition-opacity duration-500 ${isLoading ? 'cursor-wait' : 'cursor-pointer'}`}
      onClick={!isLoading ? onEnter : undefined}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingIndicator key="loading" />
        ) : (
          <ReadyPrompt key="ready" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SplashScreen;