import React from 'react';

export default function NexLogo({ theme = "light", size = "normal" }) {
  const heightClass = size === "large" ? "h-14 sm:h-18" : "h-10 sm:h-12 md:h-14";

  return (
    <div className="flex items-center cursor-pointer select-none">
      <img
        src="/logo.webp"
        alt="NexAlliance Official Logo"
        className={`${heightClass} max-w-[180px] sm:max-w-[220px] md:max-w-[260px] w-auto object-contain drop-shadow-sm`}
      />
    </div>
  );
}
