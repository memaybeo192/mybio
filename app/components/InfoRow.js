// app/components/InfoRow.js
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedText from './AnimatedText';
import { useDevice } from '../context/DeviceContext'; // <-- CẢI TIẾN: Import hook từ Context

const InfoRow = ({ icon, text, copyText, variants, className }) => {
  const [copied, setCopied] = useState(false);
  
  // <-- CẢI TIẾN: Lấy trạng thái isMobile từ Context thay vì props
  const isMobile = useDevice();

  const handleCopy = () => {
    if (copied) return;

    navigator.clipboard.writeText(copyText);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <motion.div
      onClick={handleCopy}
      className={`shine-effect interactive-item flex items-center gap-4 p-3 rounded-lg cursor-pointer w-full ${className || ''}`}
      title="Click to copy"
      variants={variants}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="flex items-center gap-4 w-full min-w-0">
        {/* Sử dụng isMobile từ Context để quyết định class */}
        <span className={!isMobile ? 'animate-glow' : ''}>{icon}</span>
        
        <div className="relative font-medium w-full grid place-items-center">
          <div
            aria-hidden={copied}
            className={`transition-opacity duration-300 col-start-1 row-start-1 w-full ${copied ? 'opacity-0' : 'opacity-100'}`}
          >
            <AnimatedText text={text} />
          </div>

          <AnimatePresence>
            {copied && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <span>Đã sao chép!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default InfoRow;