"use client"; // <-- Đánh dấu đây là một Client Component

import dynamic from 'next/dynamic';
import CursorLight from './CursorLight';

// Tải động LiveBackground bên trong Client Component
const LiveBackground = dynamic(() => import('./LiveBackground'), {
  ssr: false,
});

export default function ClientEffects() {
  return (
    <>
      <CursorLight />
      <LiveBackground />
    </>
  );
}