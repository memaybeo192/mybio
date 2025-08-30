// app/hooks/useIsMobile.js
"use client";

import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768; // Ngưỡng pixel cho thiết bị di động (chuẩn của tablet)

export const useIsMobile = () => {
  // Khởi tạo state là false để tránh lỗi hydration khi render phía server
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Hàm này chỉ chạy ở phía client
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Chạy lần đầu khi component được mount
    handleResize();

    // Thêm listener để theo dõi sự thay đổi kích thước cửa sổ
    window.addEventListener('resize', handleResize);

    // Dọn dẹp listener khi component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Mảng rỗng đảm bảo useEffect chỉ chạy một lần khi mount và unmount

  return isMobile;
};