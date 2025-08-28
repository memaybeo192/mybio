// app/components/MusicPlayer.js
"use client";

import { useState, useRef, useEffect } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  // --- THAY ĐỔI DUY NHẤT Ở ĐÂY ---
  const [volume, setVolume] = useState(0.6); // <-- Âm lượng mặc định là 60%
  // ---------------------------------
  const [isHovering, setIsHovering] = useState(false);
  const audioRef = useRef(null);

  // Tự động phát nhạc khi trang tải
  useEffect(() => {
    const attemptAutoplay = async () => {
      if (audioRef.current) {
        try {
          // Cập nhật âm lượng trước khi phát
          audioRef.current.volume = 0.6; 
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Autoplay was prevented. User needs to interact with the page first.");
          setIsPlaying(false);
        }
      }
    };
    attemptAutoplay();
  }, []);

  // Cập nhật âm lượng khi người dùng kéo thanh trượt
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
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
    <div 
      className="fixed bottom-6 right-6 z-50"
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
    </div>
  );
};

export default MusicPlayer;