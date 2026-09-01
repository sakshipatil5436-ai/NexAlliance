import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot } from 'lucide-react';

export default function RobotVoiceAssistant({ theme = 'dark' }) {
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const isUserTurnedOffRef = useRef(false);

  // Entry Welcome Greeting & ALWAYS ON Microphone Loop Initialization
  useEffect(() => {
    // Immediate AI Assistant welcome speech on website load/refresh
    speak("Hi, I am Nex from NexAlliance. How can I help you?");

    startContinuousListening();

    const unlockAndStartMic = () => {
      if (!isUserTurnedOffRef.current) {
        startContinuousListening();
      }
    };

    ['click', 'touchstart', 'pointerdown'].forEach(evt => {
      document.addEventListener(evt, unlockAndStartMic, { passive: true });
      window.addEventListener(evt, unlockAndStartMic, { passive: true });
    });

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      ['click', 'touchstart', 'pointerdown'].forEach(evt => {
        document.removeEventListener(evt, unlockAndStartMic);
        window.removeEventListener(evt, unlockAndStartMic);
      });
    };
  }, []);

  const isSpeakingRef = useRef(false);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }

        // Pause microphone while speaking to prevent feedback loop
        isSpeakingRef.current = true;
        if (recognitionRef.current) {
          try {
            recognitionRef.current.stop();
          } catch (e) {}
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.1;
        utterance.lang = 'en-US';

        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          const englishVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
          if (englishVoice) utterance.voice = englishVoice;
        }

        utterance.onend = () => {
          isSpeakingRef.current = false;
          if (!isUserTurnedOffRef.current) {
            startContinuousListening();
          }
        };

        utterance.onerror = () => {
          isSpeakingRef.current = false;
          if (!isUserTurnedOffRef.current) {
            startContinuousListening();
          }
        };

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.log("SpeechSynthesis Error:", err);
        isSpeakingRef.current = false;
      }
    }
  };

  const startContinuousListening = () => {
    if (isUserTurnedOffRef.current || isSpeakingRef.current) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        return;
      } catch (e) {
        // Already active
      }
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = true;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        if (isSpeakingRef.current) return;
        const lastIndex = event.results.length - 1;
        const spokenText = event.results[lastIndex][0].transcript.toLowerCase().trim();
        handleVoiceCommand(spokenText);
      };

      recognition.onerror = (event) => {
        console.log("Speech recognition error:", event.error);
        if (event.error === 'not-allowed') {
          setIsListening(false);
        }
      };

      recognition.onend = () => {
        if (isUserTurnedOffRef.current || isSpeakingRef.current) {
          setIsListening(false);
          return;
        }
        try {
          recognition.start();
        } catch (e) {
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.log("Mic init error:", e);
    }
  };

  // Toggle Mic ON/OFF when user clicks button
  const toggleMicrophone = () => {
    if (isListening) {
      isUserTurnedOffRef.current = true;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      setIsListening(false);
    } else {
      isUserTurnedOffRef.current = false;
      startContinuousListening();
    }
  };

  const performNavigation = (path, message) => {
    speak(message);
    window.scrollTo(0, 0);
    navigate(path);
  };

  // Keyword Matching Logic (Strict Matching without annoying fallback speech loops)
  const handleVoiceCommand = (text) => {
    const cleanText = text.toLowerCase().trim();
    if (!cleanText) return;

    if (cleanText.includes('portfolio') || cleanText.includes('port') || cleanText.includes('work') || cleanText.includes('projects')) {
      performNavigation('/portfolio', "Sure! Let me show you our portfolio.");
    } 
    else if (cleanText.includes('about') || cleanText.includes('who are you') || cleanText.includes('company')) {
      performNavigation('/about', "Sure, taking you to our About page.");
    } 
    else if (cleanText.includes('service') || cleanText.includes('solutions') || cleanText.includes('what do you do')) {
      performNavigation('/services', "Here are our core digital services.");
    } 
    else if (cleanText.includes('contact') || cleanText.includes('call') || cleanText.includes('book') || cleanText.includes('hire')) {
      performNavigation('/contact', "Let's get in touch. Opening contact page.");
    } 
    else if (cleanText.includes('client') || cleanText.includes('partner') || cleanText.includes('brand')) {
      performNavigation('/clients', "Opening our clients and partners page.");
    }
    else if (cleanText.includes('career') || cleanText.includes('job') || cleanText.includes('hiring')) {
      performNavigation('/careers', "Opening our careers page.");
    }
    else if (cleanText.includes('home') || cleanText.includes('main')) {
      performNavigation('/', "Taking you to the home page.");
    }
    // No fallback speak repetition! Unmatched words are silently ignored.
  };

  return (
    <button
      onClick={toggleMicrophone}
      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer border border-white/40 ${
        isListening
          ? 'bg-gradient-to-r from-cyan-500 via-[#0088FF] to-blue-600 shadow-cyan-500/50'
          : 'bg-slate-800/90 hover:bg-slate-700/90 shadow-slate-900/40'
      }`}
      title={isListening ? "Nex AI Voice Active (Click to turn off)" : "Nex AI Voice Off (Click to turn on)"}
      aria-label="Toggle Nex AI Assistant"
    >
      <Bot className={`w-5 h-5 sm:w-6 sm:h-6 ${isListening ? 'text-white' : 'text-white/50'}`} />
    </button>
  );
}
