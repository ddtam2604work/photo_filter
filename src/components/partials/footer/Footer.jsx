import React from "react";
import { footerLinks } from "@/constant/data";

const Footer = () => {
  return (
    <footer id="footer" className="bg-[#FAF8F5] dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 pt-16 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Column 1: Brand & Address */}
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
              {footerLinks.company.brand}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              {footerLinks.company.address}
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              VỀ CHÚNG TÔI
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.about.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-600 hover:text-[#a67c37] dark:text-slate-300 dark:hover:text-[#c99846] transition-colors"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social Connections */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              LIÊN KẾT VỚI CHÚNG TÔI
            </h4>
            <div className="flex items-center gap-3">
              {/* YouTube Icon */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube channel"
                className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-sm transition-transform hover:scale-105"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* Facebook Icon */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook page"
                className="w-9 h-9 rounded-full bg-[#1877F2] hover:bg-blue-600 text-white flex items-center justify-center shadow-sm transition-transform hover:scale-105"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-16 pt-8 border-t border-slate-200/60 dark:border-slate-800/80">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {footerLinks.company.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
