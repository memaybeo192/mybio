// app/components/LiveBackground.js
"use client"; 

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 

// Thêm prop isMobile
const LiveBackground = ({ isMobile }) => { 
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(() => {
    // Cấu hình siêu nhẹ cho di động
    const mobileOptions = {
      fpsLimit: 60,
      particles: {
        number: {
          value: 20, // Giảm mạnh số lượng hạt
        },
        move: {
          enable: true,
          speed: 0.5, // Giảm tốc độ
          direction: "none",
          random: true,
          straight: false,
          outModes: "out",
        },
        opacity: {
          value: { min: 0.3, max: 0.7 },
        },
        size: {
          value: { min: 1, max: 3 },
        },
        // Tắt hoàn toàn đường nối - phần nặng nhất
        links: {
          enable: false,
        },
      },
      // Tắt hoàn toàn tương tác
      interactivity: {
        enable: false,
      },
      detectRetina: true,
    };

    // Cấu hình đầy đủ cho desktop
    const desktopOptions = {
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          resize: true,
        },
        modes: {
          grab: { distance: 200, links: { opacity: 0.5 } },
        },
      },
      particles: {
        color: { value: "#ffffff" },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.15,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: true,
          speed: 1,
          straight: false,
        },
        number: {
          density: { enable: true, area: 700 },
          value: 100,
        },
        opacity: {
          value: { min: 0.2, max: 0.6 },
          animation: { enable: true, speed: 1, minimumValue: 0.2, sync: false },
        },
        shape: { type: "circle" },
        size: {
          value: { min: 1, max: 3 },
          animation: { enable: true, speed: 2, minimumValue: 0.5, sync: false },
        },
      },
      detectRetina: true,
    };

    // Trả về cấu hình phù hợp
    return isMobile ? mobileOptions : desktopOptions;

  }, [isMobile]); // Chạy lại khi isMobile thay đổi

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={options}
        className="absolute top-0 left-0 w-full h-full z-[-1]"
      />
    );
  }

  return <></>;
};

export default LiveBackground;