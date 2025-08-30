// app/components/ClientEffects.js
"use client";

import CursorLight from './CursorLight';
import { useDevice } from '../context/DeviceContext'; // Import hook từ Context

export default function ClientEffects() {
  // Lấy trạng thái isMobile từ Context thay vì nhận props
  const isMobile = useDevice();

  // Chỉ render component CursorLight nếu không phải là thiết bị di động.
  // Điều này giúp tối ưu hiệu suất và tránh các hành vi không mong muốn trên màn hình cảm ứng.
  return (
    <>
      {!isMobile && <CursorLight />}
    </>
  );
}