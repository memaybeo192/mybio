"use client";

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion'; // Import motion
import CursorLight from './CursorLight';

const LiveBackground = dynamic(() => import('./LiveBackground'), {
  ssr: false,
});

export default function ClientEffects() {
  return (
    <>
      <CursorLight />
      {/* Bọc LiveBackground trong motion.div để làm nó mờ dần xuất hiện */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // Xuất hiện sau 1 giây, khi các animation chính đã xong
        transition={{ delay: 1, duration: 1.5 }} 
      >
        <LiveBackground />
      </motion.div>
    </>
  );
}