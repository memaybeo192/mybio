// app/components/InfoRow.js
"use client"; // Rất quan trọng vì component này dùng useState

import { useState } from 'react';

const InfoRow = ({ icon, text, copyText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    // Reset thông báo "Copied!" sau 2 giây
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={handleCopy}
      className="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] cursor-pointer"
      title="Click to copy"
    >
      {icon}
      <span className="font-medium">{copied ? 'Copied!' : text}</span>
    </div>
  );
};

export default InfoRow;