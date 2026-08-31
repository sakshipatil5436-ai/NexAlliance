import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Global Session Flag to ensure entry speech plays once on load
let HAS_GLOBAL_SPOKEN_HI = false;

export default function HeroRobotShowcase({ theme = 'dark' }) {
  const isLight = theme === 'light';

  // Canvas & Video Refs for Transparent 3D Motion Robot
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // Play entry greeting speech: "Hello from NexAlliance"
  const speakHelloFromNexAlliance = () => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        const utterance = new SpeechSynthesisUtterance("Hello from NexAlliance");
        utterance.pitch = 1.2;
        utterance.rate = 1.0;
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    } catch (err) {
      console.log("SpeechSynthesis Error:", err);
    }
  };

  // Entry Greeting on Website Initial Open ONLY
  useEffect(() => {
    // If already spoken in this session or during SPA navigation, DO NOT speak again
    if (HAS_GLOBAL_SPOKEN_HI || sessionStorage.getItem('nexalliance_has_spoken_hi')) {
      return;
    }

    const triggerGreeting = () => {
      if (HAS_GLOBAL_SPOKEN_HI || sessionStorage.getItem('nexalliance_has_spoken_hi')) {
        return;
      }
      HAS_GLOBAL_SPOKEN_HI = true;
      try {
        sessionStorage.setItem('nexalliance_has_spoken_hi', 'true');
      } catch (e) { }

      speakHelloFromNexAlliance();

      window.removeEventListener('pointerdown', triggerGreeting);
      window.removeEventListener('click', triggerGreeting);
      window.removeEventListener('scroll', triggerGreeting);
      window.removeEventListener('keydown', triggerGreeting);
    };

    // Try to speak immediately on initial website open
    const t1 = setTimeout(triggerGreeting, 400);
    const t2 = setTimeout(triggerGreeting, 1200);

    // Browser Autoplay Policy Fallback on initial load
    window.addEventListener('pointerdown', triggerGreeting, { once: true });
    window.addEventListener('click', triggerGreeting, { once: true });
    window.addEventListener('scroll', triggerGreeting, { once: true });
    window.addEventListener('keydown', triggerGreeting, { once: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('pointerdown', triggerGreeting);
      window.removeEventListener('click', triggerGreeting);
      window.removeEventListener('scroll', triggerGreeting);
      window.removeEventListener('keydown', triggerGreeting);
    };
  }, []);

  // Robot Click Handler
  const handleRobotClick = () => {
    speakHelloFromNexAlliance();
  };

  // Real-Time Canvas White-Background Removal for 3D Motion Robot
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    video.muted = true;
    video.volume = 0;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const renderTransparentFrame = () => {
      if (video && video.readyState >= 2 && !video.paused && !video.ended) {
        const width = video.videoWidth || 640;
        const height = video.videoHeight || 480;

        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }

        try {
          ctx.drawImage(video, 0, 0, width, height);

          const frameData = ctx.getImageData(0, 0, width, height);
          const data = frameData.data;
          const len = data.length;

          for (let i = 0; i < len; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            if (r > 220 && g > 220 && b > 220) {
              const avg = (r + g + b) / 3;
              if (avg > 240) {
                data[i + 3] = 0;
              } else {
                const alpha = Math.max(0, Math.floor(255 - (avg - 220) * 12.75));
                data[i + 3] = alpha;
              }
            }
          }

          ctx.putImageData(frameData, 0, 0);
        } catch (e) {
          // Fallback draw without pixel manipulation if tainted canvas
          ctx.drawImage(video, 0, 0, width, height);
        }
      }

      animFrameRef.current = requestAnimationFrame(renderTransparentFrame);
    };

    video.play().catch(() => { });
    animFrameRef.current = requestAnimationFrame(renderTransparentFrame);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-2 sm:-mt-8 lg:-mt-16 flex flex-col items-center select-none z-30 overflow-visible px-2 sm:px-4">

      {/* Volumetric Ambient Glow Projection */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] xs:w-[320px] sm:w-[500px] h-[280px] xs:h-[320px] sm:h-[500px] rounded-full pointer-events-none z-0 ${isLight ? 'bg-sky-200/40 blur-3xl' : 'bg-[#0088FF]/20 blur-3xl'
        }`} />

      {/* SMOOTH ROBOT DISPLAY CONTAINER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative flex flex-col items-center justify-center z-10 w-full max-w-full overflow-hidden"
      >
        {/* Stable Centered Robot + Stage Container */}
        <div className="relative flex flex-col items-center justify-center z-10 w-full max-w-full transform-gpu">

          {/* Hidden Source MP4 Video */}
          <video
            ref={videoRef}
            src="/ha_roboat_motion_madhe_hava_ah.mp4"
            autoPlay
            loop
            muted={true}
            playsInline
            crossOrigin="anonymous"
            className="hidden"
          />

          {/* 100% Real-Time Transparent Canvas rendering ONLY the 3D Motion Robot */}
          <canvas
            ref={canvasRef}
            onClick={handleRobotClick}
            className="w-[280px] xs:w-[360px] sm:w-[600px] md:w-[720px] lg:w-[800px] max-w-[94vw] h-auto object-contain relative z-20 cursor-pointer drop-shadow-[0_25px_45px_rgba(0,136,255,0.4)] transition-transform duration-300 hover:scale-[1.03]"
          />

          {/* Futuristic Round Space Podium Platform Stage under Feet */}
          <div className="relative w-[240px] xs:w-[280px] sm:w-[460px] max-w-[90vw] h-[40px] sm:h-[68px] -mt-10 sm:-mt-18 flex items-center justify-center pointer-events-none z-10">

            {/* Floor Shadow */}
            <div className="absolute bottom-0 w-[200px] xs:w-[220px] sm:w-[360px] max-w-[85vw] h-[20px] sm:h-[38px] rounded-[100%] bg-[#0088FF]/40 blur-md" />

            {/* Outer Stage Disc */}
            <div className={`w-[220px] xs:w-[250px] sm:w-[420px] max-w-[88vw] h-[32px] sm:h-[54px] rounded-[100%] border backdrop-blur-md shadow-2xl transition-all ${isLight
              ? 'bg-gradient-to-b from-sky-100/95 via-sky-200/50 to-blue-300/30 border-sky-300 shadow-sky-500/30'
              : 'bg-gradient-to-b from-[#0F224A]/95 via-[#0B172E]/80 to-cyan-950/40 border-[#1E3A8A] shadow-blue-500/40'
              }`} />

            {/* Inner Glowing Ring */}
            <div className="absolute w-[160px] xs:w-[180px] sm:w-[300px] max-w-[80vw] h-[20px] sm:h-[36px] rounded-[100%] border-2 border-cyan-400/70 bg-gradient-to-r from-cyan-400/20 via-[#0088FF]/30 to-indigo-500/20 shadow-[0_0_15px_rgba(0,240,255,0.5)] blur-[0.5px]" />

          </div>

        </div>
      </motion.div>

    </div>
  );
}
