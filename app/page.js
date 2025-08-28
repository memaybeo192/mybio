import Image from "next/image";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

// Component cho một liên kết mạng xã hội
const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 p-3 rounded-lg transition-colors duration-300 hover:bg-white/[.08]"
    aria-label={label}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </a>
);

export default function BioPage() {
  const socialLinks = [
    {
      href: "https://github.com/memaybeo192", // <-- Thay bằng link GitHub của bạn
      icon: <FaGithub size={20} />,
      label: "GitHub",
    },
    {
      href: "https://twitter.com/your-profile", // <-- Thay bằng link Twitter của bạn
      icon: <FaTwitter size={20} />,
      label: "Twitter",
    },
    {
      href: "https://linkedin.com/in/your-profile", // <-- Thay bằng link LinkedIn của bạn
      icon: <FaLinkedin size={20} />,
      label: "LinkedIn",
    },
    {
      href: "mailto:your-email@example.com", // <-- Thay bằng email của bạn
      icon: <FaEnvelope size={20} />,
      label: "Email",
    },
  ];

  return (
    <div className="bg-[#0a0a0a] text-[#ededed] font-sans flex items-center justify-center min-h-screen p-4">
      <main className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Avatar */}
          <Image
            src="/avatar.png" // <-- Tạo một ảnh avatar.png và đặt trong thư mục /public
            alt="Your Name Avatar"
            width={120}
            height={120}
            className="rounded-full border-2 border-white/[.15] shadow-lg"
            priority
          />

          {/* Thông tin cá nhân */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Your Name {/* <-- Thay bằng tên của bạn */}
            </h1>
            <p className="text-md text-white/60">
              Full-stack Developer | UI/UX Enthusiast {/* <-- Thay bằng mô tả của bạn */}
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