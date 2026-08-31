import React from 'react';

export default function NexLogo({ theme = "light", size = "normal" }) {
  const heightClass = size === "large" ? "h-16 sm:h-20" : "h-11 sm:h-13 md:h-15";

  return (
    <div className="flex items-center cursor-pointer select-none">
      <img
        src="/logo.webp"
        alt="NexAlliance Official Logo"
        className={`${heightClass} max-w-[130px] sm:max-w-[160px] md:max-w-[180px] w-auto object-contain drop-shadow-sm`}
      />
    </div>
  );
}
