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
          // --- THAY ĐỔI DUY NHẤT Ở ĐÂY ---
          // Thay vì fetch(path), chúng ta fetch qua API Route
          // path.substring(1) để loại bỏ dấu "/" ở đầu (ví dụ: /avatar.mp4 -> avatar.mp4)
          const response = await fetch(`/api/media?file=${path.substring(1)}`);
          // ------------------------------------

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
        const loadedAssets = await Promise.all(assetPaths.map(preloadAsset));
        
        if (isMounted) {
          const urlMap = loadedAssets.reduce((acc, asset) => {
            acc[asset.path] = asset.blobUrl;
            return acc;
          }, {});
          
          setAssetUrls(urlMap);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Lỗi khi tải trước tài nguyên:", error.path, error.error);
        if (isMounted) {
          setIsLoading(false); 
        }
      }
    };

    startPreloading();

    return () => {
      isMounted = false;
      createdBlobUrls.forEach(URL.revokeObjectURL);
    };
  }, [assetPaths]);

  return { isLoading, assetUrls };
};