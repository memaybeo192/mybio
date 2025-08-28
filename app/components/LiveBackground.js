// app/components/LiveBackground.js

"use client"; // Rất quan trọng! Component này cần chạy ở phía client.

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // Tải phiên bản slim nhẹ hơn

const LiveBackground = () => {
  const [init, setInit] = useState(false);

  // Khởi tạo engine một lần duy nhất
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  // Cấu hình cho các hạt
  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent", // Nền trong suốt để thấy được CSS phía sau
        },
      },
      fpsLimit: 60, // Giới hạn FPS để tối ưu hiệu năng
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse", // Hiệu ứng khi di chuột vào: đẩy các hạt ra xa
          },
          resize: true,
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff", // Màu của các hạt
        },
        links: {
          color: "#ffffff", // Màu của các đường nối
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1, // Tốc độ di chuyển của hạt
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80, // Số lượng hạt
        },
        opacity: {
          value: 0.3,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute top-0 left-0 w-full h-full z-[-1]" // Quan trọng: Đặt background ra sau cùng
      />
    );
  }

  return <></>;
};

export default LiveBackground;