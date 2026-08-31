import React from 'react';

export default function NexLogo({ theme = "light", size = "normal" }) {
  const heightClass = size === "large" ? "h-20 sm:h-24" : "h-14 sm:h-16 md:h-18";

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
