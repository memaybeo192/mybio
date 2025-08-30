// app/components/ClientEffects.js
"use client";

import CursorLight from './CursorLight';
import { useIsMobile } from '../hooks/useIsMobile'; // Import hook

export default function ClientEffects() {
  const isMobile = useIsMobile();

  // Chỉ render CursorLight nếu không phải là thiết bị di động
  return (
    <>
      {!isMobile && <CursorLight />}
    </>
  );
}