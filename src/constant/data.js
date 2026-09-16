/**
 * CỜ CẤU HÌNH HIỂN THỊ GIÁ SỰ KIỆN
 * Khi có cập nhật bảng giá trong tương lai, chỉ cần đổi thành true để hiển thị lại
 */
export const SHOW_EVENT_PRICING = false;

// Danh sách các mục điều hướng gốc
const RAW_NAV_ITEMS = [
  { title: "Trang chủ", href: "/" },
  { title: "Album", href: "/album" },
  { title: "Giá sự kiện", href: "/#packages", isEventPricing: true },
  { title: "Liên hệ", href: "/lien-he" },
];

// Danh sách điều hướng đã lọc theo cờ SHOW_EVENT_PRICING
export const navItems = RAW_NAV_ITEMS.filter(
  (item) => !item.isEventPricing || SHOW_EVENT_PRICING
);

export const footerLinks = {
  about: navItems,
  socials: [
    { name: "YouTube", href: "https://youtube.com", icon: "youtube", color: "text-red-500 bg-red-50 dark:bg-red-950/40" },
    { name: "Facebook", href: "https://facebook.com", icon: "facebook", color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40" },
  ],
  company: {
    brand: "SpintX",
    address: "1 Đ.số 1, Khu Tây Sông Hậu, Long Xuyên, An Giang, Việt Nam",
    copyright: "© 2026 SpintX. All rights reserved.",
  },
};

// Dữ liệu văn phòng & liên hệ chuẩn PhotoFlow
export const CONTACT_OFFICE_INFO = {
  badgeTitle: "ĐỂ LẠI THÔNG TIN",
  heading: "Nhận tư vấn từ PhotoFlow",
  description:
    "Anh/chị vui lòng điền thông tin bên dưới. Đội ngũ PhotoFlow sẽ liên hệ lại để nắm nhu cầu và tư vấn hướng giải pháp phù hợp.",
  address: "1 Đ.số 1, Khu Tây Sông Hậu, Long Xuyên, An Giang, Việt Nam",
  email: "Giaiphapvanhanh.VOS360@gmail.com",
  phone: "0901 666 360",
  facebookUrl: "https://facebook.com/spintx",
};

export const CONTACT_MAP_CONFIG = {
  addressTitle: "PhotoFlow - Văn phòng An Giang",
  addressDetail: "1 Đ.số 1, Khu Tây Sông Hậu, Long Xuyên, An Giang, Việt Nam",
  latitude: 10.3725708,
  longitude: 105.432678,
  googleMapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.2343282240974!2d105.43853587570997!3d10.370339989755173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a731b814a0047%3A0xc3af8c46002fec5c!2zTeG7uSBRdcO9LCBMb25nIFh1ecOqbiwgQW4gR2lhbmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s",
  googleMapDirectUrl:
    "https://maps.google.com/?q=1+Đường+số+1+Khu+Tây+Sông+Hậu+Long+Xuyên+An+Giang",
};

export const COUNTRY_DIAL_CODES = [
  { code: "VN", name: "Việt Nam", dialCode: "+84", flag: "🇻🇳" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", dialCode: "+82", flag: "🇰🇷" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
  { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
  { code: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩" },
  { code: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭" },
  { code: "TW", name: "Taiwan", dialCode: "+886", flag: "🇹🇼" },
  { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
];

