import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CameraOff, Volume2, VolumeX, Mic, MicOff, Sparkles, Navigation, Zap, AlertCircle } from 'lucide-react';

// Global Session Flag: Guarantees initial voice greeting plays EXACTLY ONCE per session
let HAS_GLOBAL_SPOKEN_HI = true;

// User API Key from .env with fallback
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

export default function HeroRobotShowcase({ theme = 'dark', onOpenBooking }) {
  const isLight = theme === 'light';
  const navigate = useNavigate();

  // Refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const webcamVideoRef = useRef(null);
  const animFrameRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const hasSpokenHiRef = useRef(true);
  const recognitionRef = useRef(null);
  const lastProcessedTimeRef = useRef(0);

  // States
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [cameraError, setCameraError] = useState(false);
  const [isListening, setIsListening] = useState(true);
  const [micState, setMicState] = useState('listening'); // 'listening' | 'denied'
  const [liveTranscript, setLiveTranscript] = useState('');
  const [lastUserSpeech, setLastUserSpeech] = useState('');
  const [robotSpeechBubble, setRobotSpeechBubble] = useState('');
  const [isProcessingAI, setIsProcessingAI] = useState(false);

  // Audio Synthesizer Beep Sound
  const playCuteRobotAudioChirp = (freq = 850) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.12);

        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {
      console.log("Audio Chirp Error:", e);
    }
  };

  // स्टेटस अपडेट करण्यासाठी युटिलिटी (updateRobotStatus)
  const updateRobotStatus = (text) => {
    setRobotSpeechBubble(`🤖 ${text}`);
    let statusElem = document.getElementById("statusText");
    if (!statusElem) statusElem = document.getElementById("robotStatus");
    if (statusElem) {
      statusElem.innerText = text;
    }
  };

  // [Step 5 & 6] DOM Action & Navigation Execution
  const executeAssistantAction = (speechText, sectionId) => {
    if (!speechText) return;

    console.log("🤖 [executeAssistantAction]:", speechText, "Target Section ID:", sectionId);
    updateRobotStatus(speechText);
    playCuteRobotAudioChirp(880);

    let hasNavigated = false;
    const triggerNavigation = () => {
      if (hasNavigated) return;
      hasNavigated = true;

      if (sectionId && sectionId !== "unknown" && sectionId !== "none") {
        console.log("🚀 [Step 5 DOM Action Executing for Section]:", sectionId);

        // [Step 5] DOM Action: Scroll smoothly to About section / target section
        const aboutSection = document.getElementById(sectionId);
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });

          // Visual highlight effect
          aboutSection.style.border = "2px solid #4F46E5";
          setTimeout(() => {
            if (aboutSection) aboutSection.style.border = "none";
          }, 2000);
        }

        // SPA Navigation
        if (sectionId === "home") {
          navigate('/');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (sectionId === "start_project" || sectionId === "schedule") {
          if (onOpenBooking) onOpenBooking();
        } else {
          navigate('/' + sectionId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }

        const cleanText = speechText.replace(/^[🤖👋🗣️ℹ️📁⚡📅🎙️]\s*/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.pitch = 1.25;
        utterance.rate = 1.0;
        utterance.volume = 1.0;
        utterance.lang = 'en-US';

        utterance.onend = function () {
          triggerNavigation();
        };

        setTimeout(() => {
          triggerNavigation();
        }, 600);

        window.speechSynthesis.speak(utterance);
      } else {
        triggerNavigation();
      }
    } catch (error) {
      console.error("SpeechSynthesis Error:", error);
      triggerNavigation();
    }
  };

  // [Step 4] Intent Processing & Keyword Matching
  const processIntent = (text) => {
    if (!text) return;
    const cleanText = text.toLowerCase().trim();

    console.log("🤖 [processIntent Captured Text]:", cleanText);

    let targetPage = "none";
    let speechResponse = "";

    // Check if the command contains keywords like "about" or Marathi "अबाउट" / "आऊट"
    if (
      cleanText.includes('about') ||
      cleanText.includes('आऊट') ||
      cleanText.includes('अबाउट') ||
      cleanText.includes('company') ||
      cleanText.includes('who we are') ||
      cleanText.includes('माहिती')
    ) {
      targetPage = "about";
      speechResponse = "✨ Success: About section opened on screen!";
    } else if (
      cleanText.includes('portfolio') ||
      cleanText.includes('port') ||
      cleanText.includes('project') ||
      cleanText.includes('work') ||
      cleanText.includes('पोर्टफोलिओ') ||
      cleanText.includes('काम')
    ) {
      targetPage = "portfolio";
      speechResponse = "✨ Success: Portfolio section opened on screen!";
    } else if (
      cleanText.includes('service') ||
      cleanText.includes('offering') ||
      cleanText.includes('सर्व्हिसेस') ||
      cleanText.includes('सेवा')
    ) {
      targetPage = "services";
      speechResponse = "✨ Success: Services section opened on screen!";
    } else if (
      cleanText.includes('career') ||
      cleanText.includes('job') ||
      cleanText.includes('hiring') ||
      cleanText.includes('करिअर') ||
      cleanText.includes('नोकरी')
    ) {
      targetPage = "careers";
      speechResponse = "✨ Success: Careers section opened on screen!";
    } else if (
      cleanText.includes('contact') ||
      cleanText.includes('phone') ||
      cleanText.includes('email') ||
      cleanText.includes('संपर्क')
    ) {
      targetPage = "contact";
      speechResponse = "✨ Success: Contact section opened on screen!";
    } else if (
      cleanText.includes('home') ||
      cleanText.includes('start') ||
      cleanText.includes('होम')
    ) {
      targetPage = "home";
      speechResponse = "Navigating to Home section.";
    } else if (cleanText.includes('hello') || cleanText.includes('hi')) {
      speechResponse = "Hello! Say Open About or about section ughad!";
    }

    if (targetPage !== "none") {
      // [Step 5] DOM Action Execution
      executeAssistantAction(speechResponse, targetPage);
    }
  };

  // Gemini 3.6 Flash API Processor
  const processVoiceCommand = async (commandText) => {
    if (!commandText) return;

    setIsProcessingAI(true);
    setLastUserSpeech(commandText);
    setLiveTranscript('');

    console.log("User Command Heard: ", commandText);

    try {
      const backendRes = await fetch("http://localhost:5000/api/voice-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: commandText })
      });

      if (backendRes.ok) {
        const parsedData = await backendRes.json();
        if (parsedData.speech) {
          executeAssistantAction(parsedData.speech, parsedData.page);
          setIsProcessingAI(false);
          return;
        }
      }
    } catch (backendErr) {
      console.log("Backend offline, processIntent running directly.");
    }

    processIntent(commandText);
    setIsProcessingAI(false);
  };

  // [Step 1, 2, 3] Web Speech API Recognition Engine (startVoiceRecognition)
  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicState('denied');
      console.log("Speech Recognition is not supported in this browser. Try Google Chrome.");
      return;
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) { }
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.continuous = true;

      // [Step 1] Listening starts
      recognition.onstart = function () {
        console.log("Listening... Speak now!");
        setIsListening(true);
        setMicState('listening');
      };

      // [Step 3] Text String Captured when user speaks
      recognition.onresult = function (event) {
        let fullTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          fullTranscript += event.results[i][0].transcript.toLowerCase() + ' ';
        }

        const spokenText = fullTranscript.trim();
        if (!spokenText) return;

        console.log("Captured Text:", spokenText);
        setLiveTranscript(spokenText);

        const now = Date.now();
        if (now - lastProcessedTimeRef.current > 1200) {
          lastProcessedTimeRef.current = now;
          setLastUserSpeech(spokenText);
          setLiveTranscript('');

          // [Step 4] Intent Processing / Keyword Matching
          processIntent(spokenText);
        }
      };

      recognition.onerror = function (event) {
        console.log("Error occurred in recognition: " + event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setMicState('denied');
        }
      };

      recognition.onend = function () {
        if (micState !== 'denied') {
          setTimeout(() => {
            try { recognition.start(); } catch (e) { }
          }, 300);
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      console.log("Recognition Exception:", err);
      setMicState('denied');
    }
  };

  // Robot Interactive Click Reply
  const handleRobotClick = () => {
    playCuteRobotAudioChirp(900);
    startVoiceRecognition();
    executeAssistantAction("Hello! Say Open About or about section ughad!", "none");
  };

  // WEBCAM & AUTO OPEN MICROPHONE CONTROLLER
  useEffect(() => {
    let activeStream = null;

    startVoiceRecognition();

    navigator.mediaDevices
      .getUserMedia({ video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" }, audio: true })
      .then((stream) => {
        activeStream = stream;
        mediaStreamRef.current = stream;
        setCameraError(false);
        setMicState('listening');

        if (webcamVideoRef.current) {
          webcamVideoRef.current.srcObject = stream;
          webcamVideoRef.current.play().catch(() => { });
        }

        startVoiceRecognition();
      })
      .catch((err) => {
        console.log("WebCam/Mic error:", err);
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((aStream) => {
            activeStream = aStream;
            mediaStreamRef.current = aStream;
            startVoiceRecognition();
          })
          .catch(() => { });
      });

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Real-Time Canvas White-Background Removal
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

      {/* FLOATING ROBOT CONTAINER */}
      <div className="relative z-40 mb-3 flex flex-col items-center space-y-2 pointer-events-auto w-full max-w-xl px-2">
        {/* Hidden status text element */}
        <span id="statusText" className="hidden"></span>
        <span id="robotStatus" className="hidden"></span>
      </div>

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

          {/* 100% Real-Time Transparent Canvas rendering ONLY the TALL 3D Motion Robot */}
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
