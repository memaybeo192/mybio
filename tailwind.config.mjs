/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        // === THAY ĐỔI HIỆU ỨNG GLOW Ở ĐÂY ===
        glow: {
          '0%, 100%': { 
            // Ánh sáng nhỏ, màu tím nhạt
            filter: 'drop-shadow(0 0 4px rgba(192, 132, 252, 0.6))' 
          },
          '50%': { 
            // Ánh sáng lớn hơn, rực rỡ hơn
            filter: 'drop-shadow(0 0 10px rgba(192, 132, 252, 0.9))' 
          },
        }
      },
      animation: {
        glow: 'glow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};

export default config;
