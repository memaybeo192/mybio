// app/components/BackgroundVideo.js
"use client";

// Component giờ đây cực kỳ đơn giản.
// Nó không cần biết về việc tải file, chỉ cần hiển thị.
const BackgroundVideo = () => {
  return (
    <video 
      autoPlay 
      loop 
      muted 
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
      // Trỏ trực tiếp đến file. Trình duyệt sẽ tự động lấy nó từ
      // bộ nhớ cache đã được preload từ file layout.js.
      src="/background.mp4" 
    />
  );
};

export default BackgroundVideo;