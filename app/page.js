// app/page.js
"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MusicPlayer from './components/MusicPlayer';
import SplashScreen from './components/SplashScreen';
import { useAssetPreloader } from './hooks/useAssetPreloader';
import ClientEffects from './components/ClientEffects';
import LiveBackground from './components/LiveBackground';
import MainContent from './components/MainContent';

const criticalAssets = ['/avatar.mp4', '/background-music.mp3'];

export default function BioPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [hideParticles, setHideParticles] = useState(false);
  const { isLoading, assetUrls } = useAssetPreloader(criticalAssets);

  const handleEnter = () => {
    if (!isLoading) {
      setShowSplash(false);
      
      setTimeout(() => {
        setShowMainContent(true);
        setHideParticles(true); 
      }, 200); 
    }
  };

  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-4 text-white overflow-hidden">
      <div 
        className={`fixed inset-0 transition-opacity duration-700 ease-in-out ${showMainContent ? 'opacity-100' : 'opacity-0'}`}
        style={{ pointerEvents: showMainContent ? 'auto' : 'none' }}
      >
        <ClientEffects />
        <div className={`transition-opacity duration-500 ${hideParticles ? 'opacity-0' : 'opacity-100'}`}>
            <LiveBackground />
        </div>
      </div>

      <AnimatePresence>
        {showSplash && (
          <motion.div key="splash" exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
            <SplashScreen onEnter={handleEnter} isLoading={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showMainContent && assetUrls['/background-music.mp3'] && (
            <MusicPlayer src={assetUrls['/background-music.mp3']} startPlaying={showMainContent} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMainContent && (
          <MainContent 
            assetUrls={assetUrls}
            isAnimationDone={isAnimationDone}
            setHideParticles={setHideParticles}
            setIsAnimationDone={setIsAnimationDone}
          />
        )}
      </AnimatePresence>
    </div>
  );
}