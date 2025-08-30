// app/components/BackgroundVideo.js
"use client";

import { useState, useEffect } from 'react';

const BackgroundVideo = () => {
  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {
    let blobUrl = '';

    const fetchVideoAndSetSrc = async () => {
      try {
        // --- CẬP NHẬT DÒNG NÀY ---
        const response = await fetch('/api/media?file=background.mp4');
        // -------------------------
        const videoBlob = await response.blob();
        blobUrl = URL.createObjectURL(videoBlob);
        setVideoSrc(blobUrl);
      } catch (error) {
        console.error("Lỗi khi tải video nền:", error);
      }
    };

    fetchVideoAndSetSrc();

    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, []);

  if (!videoSrc) {
    return null;
  }

  return (
    <video 
      autoPlay 
      loop 
      muted 
      preload="auto"
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
      src={videoSrc} 
    />
  );
};

export default BackgroundVideo;