// app/components/InfoRow.js
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedText from './AnimatedText';

const InfoRow = ({ icon, text, copyText, variants, className }) => {
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
      className={`shine-effect flex items-center gap-4 p-3 rounded-lg transition-colors duration-300 hover:bg-white/20 cursor-pointer ${className || ''}`}
      title="Click to copy"
      variants={variants}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      // TỐI ƯU: Thêm will-change để tăng tốc GPU
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="flex items-center gap-4">
        <span className="animate-glow">{icon}</span>
        
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