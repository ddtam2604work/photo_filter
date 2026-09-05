import React, { useEffect, useRef } from "react";
import useDarkMode from "@/hooks/useDarkMode";

/**
 * ParticlesEffect: Hiệu ứng hạt phát sáng nghệ thuật (Cinema Floating Stardust & Grain)
 * Tự động kích hoạt khi chuyển sang giao diện tối (Dark Mode) cho các Banner.
 */
const ParticlesEffect = ({
  particleCount = 55,
  className = "",
  speed = 1,
}) => {
  const canvasRef = useRef(null);
  const [isDark] = useDarkMode();
  const animationFrameId = useRef(null);

  useEffect(() => {
    // Chỉ kích hoạt hoạt họa khi ở chế độ Dark Mode
    if (!isDark) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Bảng màu hạt: Tone vàng kim, hổ phách và ánh sao cinema
    const colors = [
      { r: 245, g: 158, b: 11 },  // amber-500
      { r: 217, g: 119, b: 6 },   // amber-600
      { r: 166, g: 124, b: 55 },  // #a67c37 champagne gold
      { r: 251, g: 191, b: 36 },  // amber-400
      { r: 255, g: 255, b: 255 }, // pure white sparkle
    ];

    // Khởi tạo các hạt
    const particles = Array.from({ length: particleCount }, () => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        baseAlpha: Math.random() * 0.45 + 0.25,
        alpha: Math.random() * 0.45 + 0.25,
        speedY: -(Math.random() * 0.35 + 0.12) * speed,
        speedX: (Math.random() - 0.5) * 0.25 * speed,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulse: Math.random() * Math.PI * 2,
        r: color.r,
        g: color.g,
        b: color.b,
      };
    });

    // Vòng lặp hoạt họa 60FPS GPU
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Cập nhật vị trí trôi lơ lửng nhẹ nhàng
        p.y += p.speedY;
        p.pulse += p.pulseSpeed;
        p.x += p.speedX + Math.sin(p.pulse) * 0.18;

        // Cập nhật độ sáng nhấp nháy êm dịu (Breathing twinkle)
        p.alpha = Math.max(0.08, Math.min(0.9, p.baseAlpha + Math.sin(p.pulse) * 0.28));

        // Tái tạo hạt khi bay ra khỏi vùng hiển thị
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        // Vẽ hạt phát sáng
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        // Hiệu ứng hào quang tỏa sáng (Soft Ambient Glow)
        ctx.shadowBlur = p.radius > 1.3 ? 7 : 3;
        ctx.shadowColor = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha * 0.8})`;

        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha})`;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isDark, particleCount, speed]);

  if (!isDark) return null;

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden z-[2] transition-opacity duration-500 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Lớp Canvas hạt lơ lửng phát sáng */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 2. Lớp Texture Hạt Film Grain Cinema Tinh Tế */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
};

export default ParticlesEffect;
