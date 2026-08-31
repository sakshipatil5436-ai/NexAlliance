import React from 'react';

export default function NexLogo({ theme = "light", size = "normal" }) {
  const heightClass = size === "large" ? "h-24 sm:h-28" : "h-14 sm:h-16 md:h-18";

  return (
    <div className="flex items-center cursor-pointer select-none">
      <img
        src="/logo.webp"
        alt="NexAlliance Official Logo"
        className={`${heightClass} max-w-[170px] sm:max-w-[200px] md:max-w-[230px] w-auto object-contain drop-shadow-sm`}
      />
    </div>
  );
}
