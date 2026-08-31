import React from 'react';

export default function NexLogo({ theme = "light", size = "normal" }) {
  const heightClass = size === "large" ? "h-16 sm:h-20" : "h-14 sm:h-16";

  return (
    <div className="flex items-center cursor-pointer select-none">
      <img
        src="/logo.png"
        alt="NexAlliance Official Logo"
        className={`${heightClass} w-auto object-contain drop-shadow-sm`}
      />
    </div>
  );
}
