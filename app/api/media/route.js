// app/api/media/route.js
import { NextResponse } from 'next/server';
import fs from 'fs/promises'; // <-- THAY ĐỔI: Sử dụng 'fs/promises'
import path from 'path';

const ALLOWED_FILES = [
  'background.mp4',
  'avatar.mp4',
  'background-music.mp3'
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get('file');

  if (!fileName || !ALLOWED_FILES.includes(fileName)) {
    return new NextResponse('Tệp không hợp lệ hoặc bị cấm', { status: 403 });
  }

  const filePath = path.join(process.cwd(), 'public', fileName);

  try {
    // --- THAY ĐỔI CHÍNH ---
    // Đọc file một cách bất đồng bộ, không làm block server
    const fileBuffer = await fs.readFile(filePath);

    const contentType = 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    if (error.code === 'ENOENT') {
      return new NextResponse('Không tìm thấy tệp', { status: 404 });
    }
    return new NextResponse('Lỗi server nội bộ', { status: 500 });
  }
}