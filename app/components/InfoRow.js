"use client";

import { useState } from 'react';
import { motion } from 'framer-motion'; // Import motion

const InfoRow = ({ icon, text, copyText, variants }) => { // Thêm variants vào props
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div // Chuyển div thành motion.div
      onClick={handleCopy}
      className="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] cursor-pointer"
      title="Click to copy"
      variants={variants} // Áp dụng variants
    >
      {/* THÊM HIỆU ỨNG VÀO ICON */}
      <span className="animate-glow">{icon}</span>
      <span className="font-medium">{copied ? 'Copied!' : text}</span>
    </motion.div>
  );
};

export default InfoRow;