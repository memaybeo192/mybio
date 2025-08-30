// app/components/CursorLight.js
"use client";

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CursorLight = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  // --- THAY ĐỔI QUAN TRỌNG Ở ĐÂY ---
  // Sử dụng useTransform để tạo ra một motion value mới cho thuộc tính 'background'.
  // Nó sẽ lắng nghe sự thay đổi từ smoothMouse.x và smoothMouse.y
  // và trả về một chuỗi CSS hoàn chỉnh.
  const background = useTransform(
    [smoothMouse.x, smoothMouse.y],
    ([x, y]) => `radial-gradient(800px at ${x}px ${y}px, rgba(255, 255, 255, 0.15), transparent 80%)`
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    setIsMounted(true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouse.x, mouse.y]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30"
      // --- ÁP DỤNG THAY ĐỔI ---
      // Giờ đây chúng ta truyền trực tiếp motion value 'background' vào style.
      style={{ background }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isMounted ? 1 : 0 }}
      transition={{ duration: 1 }}
    />
  );
};

export default CursorLight;