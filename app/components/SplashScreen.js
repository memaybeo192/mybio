"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react'; // 1. Import thêm useState và useEffect

// 2. Danh sách các thông điệp tải trang
const loadingTexts = [
  "Đang khởi tạo trải nghiệm...",
  "Tải các hiệu ứng hình ảnh...",
  "Hòa âm phối khí...",
  "Sắp xong rồi, chờ chút nhé...",
];

const SplashScreen = ({ onEnter, isLoading }) => {
  const [loadingText, setLoadingText] = useState(loadingTexts[0]);

  // 3. Sử dụng useEffect để thay đổi chữ sau mỗi khoảng thời gian
  useEffect(() => {
    if (isLoading) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % loadingTexts.length;
        setLoadingText(loadingTexts[currentIndex]);
      }, 900); // Đổi chữ sau mỗi 900ms

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-xl ${isLoading ? 'cursor-wait' : 'cursor-pointer'}`} 
      onClick={!isLoading ? onEnter : undefined}
    >
      <motion.div
        key={isLoading ? 'loading' : 'enter'}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center"
      >
        {isLoading ? (
          // 4. Hiển thị thông điệp động
          <p className="mt-2 text-lg text-white/70">{loadingText}</p>
        ) : (
          <p className="mt-2 text-lg text-white/70 animate-pulse">Nhấn vào đâu đó để vào trang</p>
        )}
      </motion.div>
    </div>
  );
};

export default SplashScreen;