// app/components/MusicPlayer.js
"use client";

import { useState, useRef, useEffect } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { motion } from 'framer-motion'; // <-- THÊM DÒNG NÀY ĐỂ SỬA LỖI

const MusicPlayer = () => {
  // Bắt đầu với trạng thái ĐANG PHÁT
  const [isPlaying, setIsPlaying] = useState(true); 
  const [volume, setVolume] = useState(0.6);
  const [isHovering, setIsHovering] = useState(false);
  const audioRef = useRef(null);

  // Tự động phát nhạc khi component được mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
    }
  }, [volume]);

  const togglePlayPause = () => {
    const newIsPlaying = !isPlaying;
    if (newIsPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(newIsPlaying);
  };

  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }} // Xuất hiện sau thẻ bio một chút
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <audio ref={audioRef} src="/background-music.mp3" loop />
      
      <div 
        className="flex items-center justify-end bg-black/25 backdrop-blur-lg border border-white/10 rounded-full transition-all duration-300 ease-in-out overflow-hidden"
        style={{ height: '56px', width: isHovering ? '220px' : '56px' }}
      >
        <div className="flex-1 flex items-center px-5 min-w-0">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className={`w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white transition-opacity duration-200 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        <div className="flex-shrink-0">
          <button
            onClick={togglePlayPause}
            className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <FaPause size={22} /> : <FaPlay size={22} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;