import Image from "next/image";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

// Component cho một liên kết mạng xã hội (Thêm hiệu ứng hover)
const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-white/20 hover:scale-[1.02]" // <-- THÊM HIỆU ỨNG
    aria-label={label}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </a>
);

export default function BioPage() {
  const socialLinks = [
    {
      href: "https://github.com/memaybeo192",
      icon: <FaGithub size={24} />,
      label: "GitHub",
    },
    {
      href: "https://twitter.com/your-profile",
      icon: <FaTwitter size={24} />,
      label: "Twitter",
    },
    {
      href: "https://linkedin.com/in/your-profile",
      icon: <FaLinkedin size={24} />,
      label: "LinkedIn",
    },
    {
      href: "mailto:your-email@example.com",
      icon: <FaEnvelope size={24} />,
      label: "Email",
    },
  ];

  return (
    // Bọc toàn bộ trang trong một div để căn giữa
    <div className="font-sans flex items-center justify-center min-h-screen p-4">
      
      {/* ĐÂY LÀ TẤM THẺ KÍNH MỜ */}
      <main 
        className="w-full max-w-md mx-auto p-8 rounded-2xl shadow-lg
                   bg-black/25          
                   backdrop-blur-lg     
                   border border-white/10"
      >
        <div className="flex flex-col items-center text-center gap-6">
          {/* Avatar */}
          <Image
            src="/avatar.png" 
            alt="Your Name Avatar"
            width={120}
            height={120}
            className="rounded-full border-2 border-white/20 shadow-lg"
            priority
          />

          {/* Thông tin cá nhân */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Me May Beo {/* <-- Thay bằng tên của bạn */}
            </h1>
            <p className="text-md text-white/70">
              Full-stack Developer | Next.js Enthusiast {/* <-- Thay bằng mô tả của bạn */}
            </p>
          </div>
        </div>

        {/* Danh sách liên kết */}
        <div className="mt-10 flex flex-col gap-3">
          {socialLinks.map((link) => (
            <SocialLink key={link.label} {...link} />
          ))}
        </div>
      </main>
    </div>
  );
}