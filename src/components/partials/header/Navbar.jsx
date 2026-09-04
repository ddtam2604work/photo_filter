import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useDarkMode from "@/hooks/useDarkMode";
import Icon from "@/components/ui/Icon";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setDarkMode] = useDarkMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isScrolledRef = useRef(false);
  const userMenuRef = useRef(null);

  // Hiệu ứng kiểm soát cuộn trang chính xác từ E:\SpintX
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;

          if (currentY > 50 && !isScrolledRef.current) {
            isScrolledRef.current = true;
            setIsScrolled(true);
          } else if (currentY < 15 && isScrolledRef.current) {
            isScrolledRef.current = false;
            setIsScrolled(false);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Album", href: "/album" },
    { name: "Giá sự kiện", href: "/#packages" },
    { name: "Liên hệ", href: "/#footer" },
  ];

  const handleNavClick = (e, href) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const elem = document.getElementById(targetId);
          elem?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 w-full z-50 pointer-events-none flex justify-center transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        isScrolled
          ? "py-2 sm:py-2.5 px-3 sm:px-6"
          : "py-4 sm:py-5 px-4 sm:px-8"
      }`}
    >
      {/* Floating Pill Capsule Navbar chuẩn hiệu ứng E:\SpintX */}
      <header
        className={`pointer-events-auto w-full max-w-7xl mx-auto rounded-full flex items-center justify-between transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isScrolled
            ? "h-14 sm:h-[58px] bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl shadow-[0_12px_32px_-4px_rgba(15,23,42,0.12)] border border-slate-200/90 dark:border-slate-700/80 px-5 sm:px-8"
            : "h-16 sm:h-[68px] bg-white/92 dark:bg-slate-900/90 backdrop-blur-md shadow-[0_10px_30px_-4px_rgba(15,23,42,0.07)] border border-slate-200/70 dark:border-slate-800 px-6 sm:px-10"
        }`}
      >
        {/* Brand Logo: Golden Star with Orbital Ring + PhotoFlow text matching user image */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group select-none flex-shrink-0"
          aria-label="PhotoFlow"
        >
          {/* Stylized Golden Star & Orbit Logo */}
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <svg
              className="w-full h-full"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Metallic Gold Gradients */}
                <linearGradient id="goldStarGrad" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="35%" stopColor="#F59E0B" />
                  <stop offset="70%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#92400E" />
                </linearGradient>
                <linearGradient id="goldFacetGrad" x1="30" y1="10" x2="30" y2="50" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFBEB" />
                  <stop offset="45%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#78350F" />
                </linearGradient>
                <linearGradient id="goldRingGrad" x1="8" y1="16" x2="52" y2="44" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FEF3C7" />
                  <stop offset="50%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#78350F" />
                </linearGradient>
              </defs>

              {/* Back side of the tilted orbit ring */}
              <path
                d="M 11 36 C 6 27 18 18 36 17 C 48 16 55 22 51 28"
                stroke="url(#goldRingGrad)"
                strokeWidth="2.8"
                fill="none"
                strokeLinecap="round"
              />

              {/* 4-Point Golden Star Facets */}
              <path d="M 30 7 L 33 26 L 30 30 L 27 26 Z" fill="url(#goldFacetGrad)" />
              <path d="M 30 53 L 33 34 L 30 30 L 27 34 Z" fill="url(#goldStarGrad)" />
              <path d="M 7 30 L 26 27 L 30 30 L 26 33 Z" fill="url(#goldStarGrad)" />
              <path d="M 53 30 L 34 27 L 30 30 L 34 33 Z" fill="url(#goldFacetGrad)" />

              {/* Volumetric Center shading */}
              <path d="M 30 30 L 33 26 L 34 27 Z" fill="#FDE68A" />
              <path d="M 30 30 L 34 33 L 33 34 Z" fill="#92400E" />
              <path d="M 30 30 L 27 34 L 26 33 Z" fill="#B45309" />
              <path d="M 30 30 L 26 27 L 27 26 Z" fill="#FBBF24" />

              {/* Front side of the orbit ring */}
              <path
                d="M 51 28 C 47 36 33 43 19 42 C 11 41 8 36 11 31"
                stroke="url(#goldRingGrad)"
                strokeWidth="2.8"
                fill="none"
                strokeLinecap="round"
              />

              {/* Satellite golden particle on ring */}
              <circle cx="12" cy="22" r="2.8" fill="#FDE68A" stroke="#92400E" strokeWidth="1" />
            </svg>
          </div>

          {/* Brand Name Text */}
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white font-heading">
            PhotoFlow
          </span>
        </Link>

        {/* Desktop Navigation Links matching user image (Trang chủ, Album, Giá sự kiện, Liên hệ) */}
        <nav aria-label="Menu chính" className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm sm:text-base font-semibold transition-colors duration-150 ${
                  isActive
                    ? "text-[#A67C37] dark:text-[#FBBF24]"
                    : "text-slate-900 dark:text-slate-100 hover:text-[#A67C37] dark:hover:text-[#FBBF24]"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Dark Mode Toggle + User Icon with Dropdown Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={() => setDarkMode(!isDark)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle dark mode"
          >
            <Icon icon={isDark ? "sun" : "moon"} size={19} />
          </button>

          {/* User Account Icon Button with Dropdown Popup Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                userMenuOpen
                  ? "bg-[#A67C37] text-white shadow-md scale-105"
                  : "text-slate-800 dark:text-slate-200 hover:text-[#A67C37] hover:bg-black/5 dark:hover:bg-white/10"
              }`}
              aria-label="Tài khoản người dùng"
            >
              <Icon icon="user" size={21} />
            </button>

            {/* Dropdown Card matching user request */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-3 w-60 sm:w-64 bg-[#FAF5EE] dark:bg-slate-800 rounded-3xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.15)] border border-amber-900/10 dark:border-slate-700 z-50 animate-[fadeIn_0.15s_ease-out] flex flex-col gap-4">
                {/* Item 1: Đăng kí */}
                <a
                  href="#hero"
                  onClick={() => {
                    setUserMenuOpen(false);
                    toast.success("Chuyển tới phần Đăng ký tài khoản!");
                  }}
                  className="flex items-center gap-3.5 group text-slate-800 dark:text-slate-100 hover:text-[#A67C37] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#A67C37] text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Icon icon="lock" size={18} />
                  </div>
                  <span className="font-semibold text-sm">Đăng kí</span>
                </a>

                {/* Item 2: Hồ sơ cá nhân */}
                <a
                  href="#profile"
                  onClick={() => {
                    setUserMenuOpen(false);
                    toast.info("Đang mở Hồ sơ cá nhân!");
                  }}
                  className="flex items-center gap-3.5 group text-slate-800 dark:text-slate-100 hover:text-[#A67C37] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#A67C37] text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Icon icon="user" size={18} />
                  </div>
                  <span className="font-semibold text-sm">Hồ sơ cá nhân</span>
                </a>

                {/* Item 3: Đến trang Quản lý */}
                <a
                  href="#banner"
                  onClick={() => {
                    setUserMenuOpen(false);
                    toast.info("Đang điều hướng đến trang Quản lý album!");
                  }}
                  className="flex items-center gap-3.5 group text-slate-800 dark:text-slate-100 hover:text-[#A67C37] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#A67C37] text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Icon icon="arrow-right" size={18} />
                  </div>
                  <span className="font-semibold text-sm">Đến trang Quản lý</span>
                </a>

                {/* Item 4: Nút Đăng xuất viền đỏ */}
                <button
                  type="button"
                  onClick={() => {
                    setUserMenuOpen(false);
                    toast.warning("Bạn đã đăng xuất tài khoản!");
                  }}
                  className="mt-1 w-full border border-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-500 rounded-full py-2.5 px-4 flex items-center justify-center gap-2 text-sm font-bold shadow-xs hover:shadow transition-all active:scale-95"
                >
                  <svg
                    className="w-4 h-4 fill-none stroke-current stroke-2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Mở menu"
          >
            <Icon icon={mobileMenuOpen ? "x" : "menu"} size={20} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-4 right-4 bg-white/98 dark:bg-slate-800/98 backdrop-blur-lg rounded-3xl p-5 shadow-2xl border border-slate-200/80 dark:border-slate-700 space-y-2 animate-[fadeIn_0.15s_ease-out] pointer-events-auto">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, link.href);
                }}
                className={`block px-4 py-2.5 text-base font-semibold rounded-2xl transition-colors ${
                  isActive
                    ? "text-[#A67C37] bg-amber-50 dark:text-[#FBBF24] dark:bg-slate-700"
                    : "text-slate-800 hover:text-[#A67C37] hover:bg-amber-50 dark:text-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Navbar;
