// app/hooks/useAssetPreloader.js
"use client";

import { useState, useEffect } from 'react';

export const useAssetPreloader = (assetPaths) => {
  const [isLoading, setIsLoading] = useState(true);
  const [assetUrls, setAssetUrls] = useState({});

  useEffect(() => {
    let isMounted = true;
    const createdBlobUrls = []; 

    const preloadAsset = (path) => {
      return new Promise(async (resolve, reject) => {
        try {
          // CẬP NHẬT: Lấy tài nguyên thông qua API Route để bypass IDM
          // path.substring(1) để loại bỏ dấu "/" ở đầu (ví dụ: /avatar.mp4 -> avatar.mp4)
          const response = await fetch(`/api/media?file=${path.substring(1)}`);

          if (!response.ok) {
            throw new Error(`Không thể tải tài nguyên qua API: ${path}`);
          }
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          createdBlobUrls.push(blobUrl);
          resolve({ path, blobUrl });
        } catch (error) {
          reject({ path, error });
        }
      });
    };

    const startPreloading = async () => {
      try {
        // Tải tất cả các tài sản một cách song song
        const loadedAssets = await Promise.all(assetPaths.map(preloadAsset));
        
        if (isMounted) {
          // Tạo một map từ path gốc đến blob URL an toàn
          const urlMap = loadedAssets.reduce((acc, asset) => {
            acc[asset.path] = asset.blobUrl;
            return acc;
          }, {});
          
          setAssetUrls(urlMap);
          setIsLoading(false); // Báo hiệu đã tải xong
        }
      } catch (error) {
        console.error("Lỗi khi tải trước tài nguyên:", error.path, error.error);
        if (isMounted) {
          setIsLoading(false); 
        }
      }
    };

    startPreloading();

    // Dọn dẹp tất cả các blob URL đã tạo khi component unmount
    return () => {
      isMounted = false;
      createdBlobUrls.forEach(URL.revokeObjectURL);
    };
  }, [assetPaths]); // Hook sẽ chạy lại nếu assetPaths thay đổi

  return { isLoading, assetUrls };
};