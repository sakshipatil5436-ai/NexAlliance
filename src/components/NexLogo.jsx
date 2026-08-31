import React from 'react';

export default function NexLogo({ theme = "light", size = "normal" }) {
  const heightClass = size === "large" ? "h-16 sm:h-20" : "h-9 sm:h-11 md:h-12";

  return (
    <div className="flex items-center cursor-pointer select-none">
      <img
        src="/logo.webp"
        alt="NexAlliance Official Logo"
        className={`${heightClass} max-w-[220px] sm:max-w-[280px] md:max-w-[320px] w-auto object-contain drop-shadow-md`}
      />
    </div>
  );
}
