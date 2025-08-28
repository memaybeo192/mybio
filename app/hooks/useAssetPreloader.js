// app/hooks/useAssetPreloader.js
"use client";

import { useState, useEffect } from 'react';

export const useAssetPreloader = (assetUrls) => {
  const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const preloadAsset = (url) => {
      return new Promise((resolve, reject) => {
        const fileExtension = url.split('.').pop();
        
        if (['mp4', 'webm'].includes(fileExtension)) {
          const video = document.createElement('video');
          video.src = url;
          // 'canplaythrough' đảm bảo video đã được buffer đủ để phát mượt mà
          video.oncanplaythrough = () => resolve(url);
          video.onerror = () => reject(url);
        } else if (['mp3', 'wav', 'ogg'].includes(fileExtension)) {
          const audio = new Audio();
          audio.src = url;
          audio.oncanplaythrough = () => resolve(url);
          audio.onerror = () => reject(url);
        } else {
          // Có thể mở rộng cho các loại file khác như ảnh nếu cần
          resolve(url); 
        }
      });
    };

    const startPreloading = async () => {
      try {
        // Chờ cho TẤT CẢ các asset được tải xong
        await Promise.all(assetUrls.map(preloadAsset));
        
        if (isMounted) {
          // Chỉ khi tất cả hoàn tất, ta mới báo là đã xong
          setIsPreloading(false);
        }
      } catch (error) {
        console.error("Failed to preload asset:", error);
        // Ngay cả khi có lỗi, vẫn cho phép người dùng vào
        if (isMounted) {
          setIsPreloading(false);
        }
      }
    };

    startPreloading();

    return () => {
      isMounted = false;
    };
  }, [assetUrls]); // Chỉ chạy lại khi danh sách asset thay đổi

  return isPreloading;
};