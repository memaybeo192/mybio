// app/components/InfoRow.js
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedText from './AnimatedText';

const InfoRow = ({ icon, text, copyText, variants, className, isMobile }) => {
  const [copied, setCopied] = useState(false);

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
        <span className={!isMobile ? 'animate-glow' : ''}>{icon}</span>
        
        {/* --- GIẢI PHÁP GRID TRICK --- */}
        {/* Container này sẽ chứa 2 lớp text chồng lên nhau */}
        <div className="relative font-medium w-full grid place-items-center">
          
          {/* LỚP 1: Text gốc (email, discord). Luôn ở đây để giữ layout. */}
          {/* Nó sẽ bị làm mờ đi khi 'copied' là true */}
          <div
            aria-hidden={copied} // Ẩn khỏi trình đọc màn hình khi không hiển thị
            className={`transition-opacity duration-300 col-start-1 row-start-1 w-full ${copied ? 'opacity-0' : 'opacity-100'}`}
          >
            <AnimatedText text={text} />
          </div>

          {/* LỚP 2: Text "Đã sao chép!". Chỉ hiện ra khi 'copied' là true */}
          <AnimatePresence>
            {copied && (
              <motion.div
                // Các class này đảm bảo nó nằm chồng chính xác lên lớp 1
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