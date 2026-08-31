import React from 'react';

export default function NexLogo({ theme = "light", size = "normal" }) {
  const heightClass = size === "large" ? "h-28 sm:h-36" : "h-20 sm:h-24 md:h-28";

  return (
    <div className="flex items-center cursor-pointer select-none">
      <img
        src="/logo.webp"
        alt="NexAlliance Official Logo"
        className={`${heightClass} max-w-[240px] sm:max-w-[300px] md:max-w-[360px] w-auto object-contain drop-shadow-md`}
      />
    </div>
  );
}
