import React, { useState, useEffect, useRef, useMemo } from "react";
import Navbar from "@/components/partials/header/Navbar";
import Footer from "@/components/partials/footer/Footer";
import Card from "@/components/ui/Card";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import ParticlesEffect from "@/components/ui/ParticlesEffect";
import { toast } from "react-toastify";
import {
  CONTACT_OFFICE_INFO,
  CONTACT_MAP_CONFIG,
  COUNTRY_DIAL_CODES,
} from "@/constant/data";
import { submitContactInquiryApi } from "@/api/core/contactApi";

/**
 * Dropdown chọn mã vùng quốc gia kèm quốc kỳ và ô tìm kiếm
 */
const CountryCodePicker = ({ selectedCode, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const selectedCountry = useMemo(() => {
    return (
      COUNTRY_DIAL_CODES.find((c) => c.dialCode === selectedCode) ||
      COUNTRY_DIAL_CODES[0]
    );
  }, [selectedCode]);

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return COUNTRY_DIAL_CODES;
    const q = searchQuery.toLowerCase().trim();
    return COUNTRY_DIAL_CODES.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.dialCode.includes(q) ||
        item.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative flex-shrink-0" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 sm:h-11 px-2.5 sm:px-3.5 inline-flex items-center gap-1.5 border border-r-0 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-l-lg hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors focus:outline-none"
        title={`${selectedCountry.name} (${selectedCountry.dialCode})`}
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg leading-none">{selectedCountry.flag}</span>
        <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
          {selectedCountry.dialCode}
        </span>
        <Icon
          icon={isOpen ? "chevron-up" : "chevron-down"}
          size={14}
          className="text-slate-400"
        />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+6px)] left-0 z-50 w-72 max-w-[calc(100vw-32px)] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden animate-[fadeIn_0.15s_ease-out]">
          {/* Ô tìm kiếm quốc gia */}
          <div className="p-2 border-b border-slate-100 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/90">
            <div className="relative">
              <input
                type="text"
                autoFocus
                placeholder="Tìm quốc gia hoặc mã..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm py-1.5 pl-8 pr-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
              />
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Icon icon="search" size={13} />
              </span>
            </div>
          </div>

          {/* Danh sách quốc gia */}
          <ul className="max-h-56 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/50 py-1 text-xs sm:text-sm">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => {
                const isSelected = c.code === selectedCountry.code;
                return (
                  <li
                    key={c.code}
                    onClick={() => {
                      onSelect(c.dialCode);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    className={`flex items-center justify-between px-3.5 py-2 cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-amber-50 text-amber-900 font-semibold dark:bg-slate-700 dark:text-amber-300"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span className="text-base">{c.flag}</span>
                      <span className="truncate">{c.name}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-400 flex-shrink-0">
                      {c.dialCode}
                    </span>
                  </li>
                );
              })
            ) : (
              <li className="p-4 text-center text-xs text-slate-400">
                Không tìm thấy quốc gia
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

const Contact = () => {
  // SEO title setup
  useEffect(() => {
    document.title = "Liên Hệ & Tư Vấn Giải Pháp - SpintX PhotoFlow";
    window.scrollTo(0, 0);
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phoneCountryCode: "+84",
    phoneNumber: "",
    email: "",
    studioName: "",
    consultationContent: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [submissionTicket, setSubmissionTicket] = useState(null);

  // Định dạng số điện thoại tự động chuẩn: 0912 345 678
  const formatPhoneNumber = (val) => {
    const clean = val.replace(/\D/g, "").slice(0, 11);
    if (clean.length <= 4) return clean;
    if (clean.length <= 7) return `${clean.slice(0, 4)} ${clean.slice(4)}`;
    return `${clean.slice(0, 4)} ${clean.slice(4, 7)} ${clean.slice(7)}`;
  };

  const handleInputChange = (field, value) => {
    let finalVal = value;
    if (field === "phoneNumber") {
      finalVal = formatPhoneNumber(value);
    }
    setFormData((prev) => ({ ...prev, [field]: finalVal }));

    // Xóa thông báo lỗi khi người dùng bắt đầu nhập
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Xác thực biểu mẫu
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập Họ và Tên của bạn";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Họ và tên tối thiểu 2 ký tự";
    }

    const cleanPhone = formData.phoneNumber.replace(/\s+/g, "");
    if (!cleanPhone) {
      newErrors.phoneNumber = "Vui lòng nhập số điện thoại liên hệ";
    } else if (!/^[0-9]{7,15}$/.test(cleanPhone)) {
      newErrors.phoneNumber = "Số điện thoại chưa hợp lệ (VD: 0912 345 678)";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập địa chỉ email của bạn";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Định dạng email không hợp lệ (VD: name@domain.com)";
    }

    if (!formData.consultationContent.trim()) {
      newErrors.consultationContent = "Vui lòng nhập nội dung bạn cần tư vấn";
    } else if (formData.consultationContent.trim().length < 10) {
      newErrors.consultationContent = "Nội dung cần tư vấn tối thiểu 10 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.warning("Vui lòng hoàn thiện đúng các trường bắt buộc!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitContactInquiryApi(formData);
      const ticketId =
        response?.data?.ticketId || `PTF-${Math.floor(100000 + Math.random() * 900000)}`;

      setSubmissionTicket(ticketId);
      setSuccessModalOpen(true);
      toast.success("Gửi thông tin liên hệ thành công! PhotoFlow sẽ liên hệ sớm nhất.");

      // Reset form sau khi gửi thành công
      setFormData({
        fullName: "",
        phoneCountryCode: "+84",
        phoneNumber: "",
        email: "",
        studioName: "",
        consultationContent: "",
      });
      setErrors({});
    } catch (err) {
      toast.error(
        err?.message || "Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại sau!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-slate-900 transition-colors duration-200">
      {/* 1. Header Navigation */}
      <Navbar />

      <main className="flex-grow pt-16 sm:pt-20 pb-16">
        {/* ========================================================================= */}
        {/* 2. HERO BANNER & BREADCRUMB SECTION (ĐỒNG BỘ VỚI ALBUM VÀ HOMEPAGE) */}
        {/* ========================================================================= */}
        <section
          aria-label="Contact Banner"
          className="relative w-full border-b border-slate-200/70 dark:border-slate-800 pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-12 bg-[#FBF9F5] dark:bg-slate-950 transition-colors overflow-hidden"
        >
          {/* Nền làm mờ nghệ thuật đồng bộ với Album.jsx */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-[7px] scale-105 opacity-75 dark:opacity-30 pointer-events-none transition-all duration-500"
            style={{
              backgroundImage: "url('/images/banner_couple_embrace.jpg')",
            }}
          />

          {/* Lớp phủ chuyển sắc bảo đảm tương phản */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/40 dark:from-slate-950/90 dark:via-slate-950/75 dark:to-slate-900/50 pointer-events-none" />

          {/* Vệt sáng ấm phim ảnh cổ điển (Ambient Warm Film Flare) */}
          <div className="absolute -top-16 -right-16 w-96 h-96 bg-amber-400/20 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Hiệu ứng hạt phát sáng Cinema */}
          <ParticlesEffect particleCount={45} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-3 text-center sm:text-left">
              {/* Primary SEO Heading (H1) chuẩn SEO SGE */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading leading-tight">
                Liên Hệ &amp; Tư Vấn
              </h1>

              {/* SGE Atomic Answer Hook (40-60 từ theo tiêu chuẩn /seo-sge-master) */}
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Kết nối trực tiếp cùng đội ngũ SPINTX để được tư vấn lộ trình số hóa giao ảnh, quản lý album thông minh và giải pháp vận hành tối ưu cho Studio ảnh cưới và Photographer chuyên nghiệp.
              </p>

              {/* Breadcrumb: Trang chủ > Liên hệ */}
              <div className="flex justify-center sm:justify-start pt-1">
                <Breadcrumb
                  items={[
                    { label: "Trang chủ", link: "/" },
                    { label: "Liên hệ" },
                  ]}
                  separator="chevron"
                  className="text-xs sm:text-sm font-medium"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. MAIN 2-COLUMN SECTION: THÔNG TIN VĂN PHÒNG & FORM LIÊN HỆ */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* =================================================================== */}
            {/* CỘT TRÁI: THẺ THÔNG TIN VĂN PHÒNG (CONTACT INFO CARD) */}
            {/* =================================================================== */}
            <aside className="lg:col-span-5 w-full">
              <Card
                className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 p-6 sm:p-8 shadow-[0_10px_35px_-5px_rgba(15,23,42,0.06)] hover:shadow-xl transition-all duration-300"
                bodyClass="!p-0 space-y-6"
              >
                {/* Badge đầu thẻ */}
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-3.5 py-1.5 rounded-full border border-amber-200/80 dark:border-amber-800/50">
                    • {CONTACT_OFFICE_INFO.badgeTitle} •
                  </span>
                </div>

                {/* Tiêu đề & Giới thiệu */}
                <div className="space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading tracking-tight">
                    {CONTACT_OFFICE_INFO.heading}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {CONTACT_OFFICE_INFO.description}
                  </p>
                </div>

                {/* Danh sách chi tiết liên hệ */}
                <div className="space-y-3.5 pt-2">
                  {/* Văn phòng */}
                  <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-100 dark:border-slate-700/60 hover:border-amber-400/50 dark:hover:border-amber-500/40 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[#A67C37] dark:text-amber-400 flex-shrink-0 shadow-sm">
                      <Icon icon="map-pin" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">
                        Văn phòng PhotoFlow
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                        {CONTACT_OFFICE_INFO.address}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-100 dark:border-slate-700/60 hover:border-amber-400/50 dark:hover:border-amber-500/40 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[#A67C37] dark:text-amber-400 flex-shrink-0 shadow-sm">
                      <Icon icon="mail" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">
                        Email liên hệ
                      </span>
                      <a
                        href={`mailto:${CONTACT_OFFICE_INFO.email}`}
                        className="text-xs sm:text-sm font-semibold text-slate-800 hover:text-[#A67C37] dark:text-slate-200 dark:hover:text-amber-400 transition-colors break-all"
                      >
                        {CONTACT_OFFICE_INFO.email}
                      </a>
                    </div>
                  </div>

                  {/* Điện thoại */}
                  <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-100 dark:border-slate-700/60 hover:border-amber-400/50 dark:hover:border-amber-500/40 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[#A67C37] dark:text-amber-400 flex-shrink-0 shadow-sm">
                      <Icon icon="phone" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">
                        Hotline hỗ trợ
                      </span>
                      <a
                        href={`tel:${CONTACT_OFFICE_INFO.phone.replace(/\s+/g, "")}`}
                        className="text-xs sm:text-sm font-bold text-[#A67C37] hover:underline dark:text-amber-400 transition-colors"
                      >
                        {CONTACT_OFFICE_INFO.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Google Maps Embed trực quan */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Vị trí trên bản đồ
                    </span>
                    <a
                      href={CONTACT_MAP_CONFIG.googleMapDirectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-[#A67C37] hover:underline dark:text-amber-400 flex items-center gap-1"
                    >
                      <span>Mở Google Maps</span>
                      <Icon icon="external-link" size={12} />
                    </a>
                  </div>
                  <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-inner bg-slate-100 dark:bg-slate-900">
                    <iframe
                      title="Google Map SpintX Office"
                      src={CONTACT_MAP_CONFIG.googleMapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full filter saturate-[0.85] contrast-[1.05]"
                    />
                  </div>
                </div>
              </Card>
            </aside>

            {/* =================================================================== */}
            {/* CỘT PHẢI: FORM ĐIỀN THÔNG TIN LIÊN HỆ (CONTACT FORM CARD) */}
            {/* =================================================================== */}
            <section className="lg:col-span-7 w-full">
              <Card
                className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 p-6 sm:p-8 lg:p-10 shadow-[0_10px_35px_-5px_rgba(15,23,42,0.06)] hover:shadow-xl transition-all duration-300"
                bodyClass="!p-0"
              >
                {/* Badge đầu thẻ */}
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#1e40af] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3.5 py-1.5 rounded-full border border-blue-200/80 dark:border-blue-800/50">
                    • THÔNG TIN LIÊN HỆ •
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-[1.75rem] font-bold text-slate-900 dark:text-white font-heading tracking-tight mb-6">
                  Kết nối với PhotoFlow
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Trường Họ và Tên */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      HỌ VÀ TÊN <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="fullName"
                        type="text"
                        placeholder="Nhập họ và tên của bạn"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className={`w-full h-11 px-4 text-sm sm:text-base rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all focus:outline-none ${
                          errors.fullName
                            ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-slate-300 dark:border-slate-700 focus:border-[#a67c37] focus:ring-2 focus:ring-[#a67c37]/20"
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-medium">
                          <Icon icon="alert-circle" size={13} />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Trường Số điện thoại kèm chọn Mã quốc gia */}
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      ĐIỆN THOẠI <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-stretch w-full">
                      <CountryCodePicker
                        selectedCode={formData.phoneCountryCode}
                        onSelect={(code) =>
                          setFormData((prev) => ({ ...prev, phoneCountryCode: code }))
                        }
                      />
                      <input
                        id="phoneNumber"
                        type="tel"
                        placeholder="0912 345 678"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          handleInputChange("phoneNumber", e.target.value)
                        }
                        className={`flex-1 h-10 sm:h-11 px-3.5 text-sm sm:text-base rounded-r-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all focus:outline-none ${
                          errors.phoneNumber
                            ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-slate-300 dark:border-slate-700 focus:border-[#a67c37] focus:ring-2 focus:ring-[#a67c37]/20"
                        }`}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-medium">
                        <Icon icon="alert-circle" size={13} />
                        <span>{errors.phoneNumber}</span>
                      </p>
                    )}
                  </div>

                  {/* Trường Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      EMAIL <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="example@domain.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`w-full h-11 px-4 text-sm sm:text-base rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all focus:outline-none ${
                        errors.email
                          ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                          : "border-slate-300 dark:border-slate-700 focus:border-[#a67c37] focus:ring-2 focus:ring-[#a67c37]/20"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-medium">
                        <Icon icon="alert-circle" size={13} />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Trường Tên Studio (Không bắt buộc) */}
                  <div>
                    <label
                      htmlFor="studioName"
                      className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      TÊN STUDIO <span className="text-xs font-normal text-slate-400 lowercase">(tùy chọn)</span>
                    </label>
                    <input
                      id="studioName"
                      type="text"
                      placeholder="Nhập tên Studio của bạn (nếu có)"
                      value={formData.studioName}
                      onChange={(e) => handleInputChange("studioName", e.target.value)}
                      className="w-full h-11 px-4 text-sm sm:text-base rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#a67c37] focus:ring-2 focus:ring-[#a67c37]/20 transition-all focus:outline-none"
                    />
                  </div>

                  {/* Trường Nội dung cần tư vấn */}
                  <div>
                    <label
                      htmlFor="consultationContent"
                      className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      NỘI DUNG CẦN TƯ VẤN <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="consultationContent"
                      rows={4}
                      placeholder="Mô tả nhu cầu, bài toán quản trị vận hành Studio bạn muốn SPINTX hỗ trợ..."
                      value={formData.consultationContent}
                      onChange={(e) =>
                        handleInputChange("consultationContent", e.target.value)
                      }
                      className={`w-full p-3.5 text-sm sm:text-base rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-y transition-all focus:outline-none leading-relaxed ${
                        errors.consultationContent
                          ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                          : "border-slate-300 dark:border-slate-700 focus:border-[#a67c37] focus:ring-2 focus:ring-[#a67c37]/20"
                      }`}
                    />
                    {errors.consultationContent && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-medium">
                        <Icon icon="alert-circle" size={13} />
                        <span>{errors.consultationContent}</span>
                      </p>
                    )}
                  </div>

                  {/* Nút gửi thông tin */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 !h-12 !bg-[#a67c37] hover:!bg-[#916a2d] active:!bg-[#7a5722] !text-white !rounded-xl text-base font-bold shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Đang gửi thông tin...</span>
                        </>
                      ) : (
                        <>
                          <span>Gửi thông tin</span>
                          <Icon icon="send" size={16} />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Card>
            </section>
          </div>
        </section>
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Modal thông báo gửi thành công (TrialSuccessModal) */}
      <Modal
        activeModal={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        title="Gửi Yêu Cầu Thành Công"
        className="max-w-md"
      >
        <div className="text-center p-4 sm:p-6 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 mx-auto flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Icon icon="check-circle" size={36} />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-heading">
              Cảm ơn bạn đã kết nối với PhotoFlow!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Chúng tôi đã tiếp nhận thông tin yêu cầu của bạn. Chuyên viên tư vấn của PhotoFlow sẽ liên hệ lại qua điện thoại hoặc email trong vòng 24 giờ làm việc.
            </p>
          </div>

          {submissionTicket && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
              Mã yêu cầu hỗ trợ: <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{submissionTicket}</span>
            </div>
          )}

          <div className="pt-2">
            <Button
              className="w-full !bg-[#a67c37] hover:!bg-[#916a2d] !text-white !rounded-xl font-semibold py-2.5"
              text="Đã hiểu &amp; Đóng"
              onClick={() => setSuccessModalOpen(false)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Contact;
