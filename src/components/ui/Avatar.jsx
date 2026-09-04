import React from "react";
import Icon from "./Icon";

export const Avatar = ({
  src,
  alt = "User avatar",
  initials,
  icon,
  size = "md", // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  shape = "circle", // 'circle' | 'rounded' | 'square'
  status, // 'online' | 'busy' | 'away' | 'offline'
  statusPosition = "bottom-right",
  color = "primary",
  className = "",
  onClick,
}) => {
  const sizeMap = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-xl",
    "2xl": "w-20 h-20 text-2xl",
  };

  const iconSizes = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    "2xl": 40,
  };

  const shapeMap = {
    circle: "rounded-full",
    rounded: "rounded-xl",
    square: "rounded-none",
  };

  const colorMap = {
    primary: "bg-primary-500 text-white",
    secondary: "bg-slate-600 text-white",
    success: "bg-success-500 text-white",
    danger: "bg-danger-500 text-white",
    warning: "bg-warning-500 text-white",
    info: "bg-info-500 text-white",
  };

  const statusColors = {
    online: "bg-success-500",
    busy: "bg-danger-500",
    away: "bg-warning-500",
    offline: "bg-slate-400",
  };

  const statusDotSizes = {
    xs: "w-1.5 h-1.5 ring-1",
    sm: "w-2 h-2 ring-1.5",
    md: "w-2.5 h-2.5 ring-2",
    lg: "w-3 h-3 ring-2",
    xl: "w-3.5 h-3.5 ring-2",
    "2xl": "w-4 h-4 ring-2",
  };

  const statusPositions = {
    "top-right": "top-0 right-0",
    "bottom-right": "bottom-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-left": "bottom-0 left-0",
  };

  const getInitials = (text = "") => {
    if (!text) return "U";
    return text
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center font-semibold select-none flex-shrink-0 ${
        shapeMap[shape] || shapeMap.circle
      } ${sizeMap[size] || sizeMap.md} ${
        !src ? colorMap[color] || colorMap.primary : "bg-slate-200 dark:bg-slate-700"
      } ${onClick ? "cursor-pointer hover:opacity-90" : ""} ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${shapeMap[shape] || shapeMap.circle}`}
        />
      ) : initials ? (
        <span>{getInitials(initials)}</span>
      ) : icon ? (
        <Icon icon={icon} size={iconSizes[size] || 20} />
      ) : (
        <Icon icon="user" size={iconSizes[size] || 20} />
      )}

      {status && (
        <span
          className={`absolute rounded-full ring-white dark:ring-slate-900 ${
            statusColors[status] || statusColors.online
          } ${statusDotSizes[size] || statusDotSizes.md} ${
            statusPositions[statusPosition] || statusPositions["bottom-right"]
          }`}
        />
      )}
    </div>
  );
};

export const AvatarGroup = ({
  users = [], // [{ src, initials, alt, color }]
  max = 4,
  size = "md",
  shape = "circle",
  className = "",
}) => {
  const visibleUsers = users.slice(0, max);
  const excess = users.length - max;

  const sizeMap = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  return (
    <div className={`inline-flex items-center -space-x-2.5 overflow-hidden ${className}`}>
      {visibleUsers.map((user, idx) => (
        <div key={idx} className="ring-2 ring-white dark:ring-slate-900 rounded-full">
          <Avatar
            src={user.src}
            initials={user.initials}
            alt={user.alt}
            color={user.color}
            size={size}
            shape={shape}
          />
        </div>
      ))}

      {excess > 0 && (
        <div
          className={`inline-flex items-center justify-center font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full ring-2 ring-white dark:ring-slate-900 ${
            sizeMap[size] || sizeMap.md
          }`}
        >
          +{excess}
        </div>
      )}
    </div>
  );
};

export default Avatar;
