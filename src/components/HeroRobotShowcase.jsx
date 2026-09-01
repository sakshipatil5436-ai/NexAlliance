import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';

// Global Session Flag to ensure entry speech plays once on load
let HAS_GLOBAL_SPOKEN_HI = false;

export default function HeroRobotShowcase({ theme = 'dark' }) {
  const isLight = theme === 'light';

  // Canvas & Video Refs for Transparent 3D Motion Robot
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // Web Audio API Context Ref for bypassing mobile HTML5 autoplay restrictions without touch
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);

  // Preload Audio ArrayBuffer for Web Audio API
  useEffect(() => {
    const preloadBuffer = async () => {
      try {
        const response = await fetch('/hello_nexalliance.mp3');
        const arrayBuffer = await response.arrayBuffer();
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          const ctx = new AudioContext();
          audioContextRef.current = ctx;
          const decoded = await ctx.decodeAudioData(arrayBuffer);
          audioBufferRef.current = decoded;
          // Attempt immediate zero-touch Web Audio API buffer play
          playWebAudioBuffer();
        }
      } catch (e) {
        console.log("WebAudio Preload info:", e);
      }
    };
    preloadBuffer();
  }, []);

  const playWebAudioBuffer = () => {
    try {
      if (audioContextRef.current && audioBufferRef.current) {
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const source = ctx.createBufferSource();
        source.buffer = audioBufferRef.current;
        source.connect(ctx.destination);
        source.start(0);
        return true;
      }
    } catch (e) {
      console.log("WebAudio Buffer Play error:", e);
    }
    return false;
  };

  // Robust Zero-Touch Speech & Audio Playback
  const speakHelloFromNexAlliance = () => {
    // 1. Try Web Audio API Buffer (Bypasses mobile media autoplay restriction)
    const success = playWebAudioBuffer();
    if (success) return;

    // 2. Try HTML5 Audio
    try {
      const audio = new Audio('/hello_nexalliance.mp3');
      audio.volume = 1.0;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          playWebSpeechFallback();
        });
      }
    } catch (err) {
      playWebSpeechFallback();
    }
  };

  const playWebSpeechFallback = () => {
    try {
      if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        if (synth.paused) synth.resume();
        if (synth.speaking) synth.cancel();

        const utterance = new SpeechSynthesisUtterance("Hello from NexAlliance");
        utterance.pitch = 1.1;
        utterance.rate = 1.0;
        utterance.lang = 'en-US';

        const voices = synth.getVoices();
        if (voices && voices.length > 0) {
          const englishVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
          if (englishVoice) utterance.voice = englishVoice;
        }

        synth.speak(utterance);
      }
    } catch (e) {}
  };

  // Entry Greeting on Website Initial Open & Refresh (Zero-Touch Mobile Autoplay Sequence)
  useEffect(() => {
    let played = false;

    const executeGreeting = () => {
      if (played) return;
      played = true;

      speakHelloFromNexAlliance();
    };

    // 1. Immediate zero-touch play attempt on mount
    executeGreeting();

    // 2. Automatic retries at 100ms, 300ms, 600ms without touch
    const t1 = setTimeout(executeGreeting, 100);
    const t2 = setTimeout(executeGreeting, 300);
    const t3 = setTimeout(executeGreeting, 600);

    // 3. Fallback gesture listeners
    ['touchstart', 'touchend', 'pointerdown', 'click', 'scroll'].forEach(evt => {
      window.addEventListener(evt, executeGreeting, { passive: true });
      document.addEventListener(evt, executeGreeting, { passive: true });
    });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      ['touchstart', 'touchend', 'pointerdown', 'click', 'scroll'].forEach(evt => {
        window.removeEventListener(evt, executeGreeting);
        document.removeEventListener(evt, executeGreeting);
      });
    };
  }, []);

  // Robot Click & Touch Handler
  const handleRobotClick = (e) => {
    if (e) e.stopPropagation();
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
    let lastFrameTime = 0;

    const renderTransparentFrame = (timestamp) => {
      const isMobile = window.innerWidth < 768;
      const targetFPS = isMobile ? 30 : 60;
      const frameInterval = 1000 / targetFPS;

      if (timestamp - lastFrameTime >= frameInterval) {
        lastFrameTime = timestamp;

        if (video && video.readyState >= 2 && !video.paused && !video.ended) {
          const rawWidth = video.videoWidth || 640;
          const rawHeight = video.videoHeight || 480;

          // Cap processing resolution on mobile to max 360px width, desktop max 640px width
          const maxProcessingWidth = isMobile ? 360 : 640;
          let scale = 1;
          if (rawWidth > maxProcessingWidth) {
            scale = maxProcessingWidth / rawWidth;
          }

          const targetWidth = Math.floor(rawWidth * scale);
          const targetHeight = Math.floor(rawHeight * scale);

          if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
            canvas.width = targetWidth;
            canvas.height = targetHeight;
          }

          try {
            ctx.drawImage(video, 0, 0, targetWidth, targetHeight);

            const frameData = ctx.getImageData(0, 0, targetWidth, targetHeight);
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
            ctx.drawImage(video, 0, 0, targetWidth, targetHeight);
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(renderTransparentFrame);
    };

    const startPlay = () => {
      if (video && video.paused) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener('canplay', startPlay);
    video.addEventListener('loadeddata', startPlay);
    window.addEventListener('touchstart', startPlay, { passive: true });
    window.addEventListener('pointerdown', startPlay, { passive: true });
    window.addEventListener('scroll', startPlay, { passive: true });

    video.play().catch(() => { });
    animFrameRef.current = requestAnimationFrame(renderTransparentFrame);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      if (video) {
        video.removeEventListener('canplay', startPlay);
        video.removeEventListener('loadeddata', startPlay);
      }
      window.removeEventListener('touchstart', startPlay);
      window.removeEventListener('pointerdown', startPlay);
      window.removeEventListener('scroll', startPlay);
    };
  }, []);

  return (
    <div className="robot-container relative w-full max-w-4xl mx-auto mt-2 sm:-mt-8 lg:-mt-16 flex flex-col items-center select-none z-30 overflow-visible px-2 sm:px-4">

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
            playsInline={true}
            webkit-playsinline="true"
            className="hidden"
          />

          {/* 100% Real-Time Transparent Canvas rendering ONLY the 3D Motion Robot */}
          <canvas
            ref={canvasRef}
            onClick={handleRobotClick}
            onTouchEnd={handleRobotClick}
            className="animated-robot w-[280px] xs:w-[320px] sm:w-[600px] md:w-[720px] lg:w-[800px] max-w-[90vw] sm:max-w-[94vw] h-auto object-contain relative z-20 cursor-pointer drop-shadow-[0_25px_45px_rgba(0,136,255,0.4)] transition-transform duration-300 hover:scale-[1.03]"
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

          {/* Sound Voice Activation Badge for Instant Mobile Audio */}
          <div
            onClick={handleRobotClick}
            onTouchEnd={handleRobotClick}
            className="mt-1 sm:mt-2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#0088FF] to-[#2563EB] text-white text-[10px] sm:text-xs font-black tracking-widest uppercase shadow-lg shadow-sky-500/30 cursor-pointer animate-pulse z-30 hover:scale-105 transition-transform"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>ROBOT VOICE: HELLO FROM NEXALLIANCE</span>
          </div>

        </div>
      </motion.div>

    </div>
  );
}
