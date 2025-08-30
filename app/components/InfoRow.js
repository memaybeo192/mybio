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
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      onClick={handleCopy}
      className={`shine-effect interactive-item flex items-center gap-4 p-3 rounded-lg cursor-pointer ${className || ''}`}
      title="Click to copy"
      variants={variants}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="flex items-center gap-4">
        {/* Áp dụng class 'animate-glow' có điều kiện */}
        <span className={!isMobile ? 'animate-glow' : ''}>{icon}</span>
        
        <div className="relative font-medium w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={copied ? 'copied' : 'text'}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {copied ? (
                <span>Đã sao chép!</span>
              ) : (
                <AnimatedText text={text} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default InfoRow;