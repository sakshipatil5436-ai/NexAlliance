import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Sparkles, Volume2 } from 'lucide-react';

export default function RobotVoiceAssistant({ theme = 'dark' }) {
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const isUserTurnedOffRef = useRef(false);
  const isLight = theme === 'light';

  // Entry Welcome Greeting & ALWAYS ON Microphone Loop Initialization
  useEffect(() => {
    speak("Hi, I am Nex from NexAlliance. How can I help you?");

    // Start continuous mic listening loop
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

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
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

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.log("SpeechSynthesis Error:", err);
      }
    }
  };

  const startContinuousListening = () => {
    if (isUserTurnedOffRef.current) return;

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
        if (isUserTurnedOffRef.current) {
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

  // Keyword Matching Logic
  const handleVoiceCommand = (text) => {
    if (text.includes('portfolio') || text.includes('work') || text.includes('projects')) {
      speak("Sure! Let me show you our portfolio.");
      setTimeout(() => navigate('/portfolio'), 800);
    } 
    else if (text.includes('about') || text.includes('who are you') || text.includes('company')) {
      speak("Sure, taking you to our About page.");
      setTimeout(() => navigate('/about'), 800);
    } 
    else if (text.includes('service') || text.includes('solutions') || text.includes('what do you do')) {
      speak("Here are our core digital services.");
      setTimeout(() => navigate('/services'), 800);
    } 
    else if (text.includes('contact') || text.includes('call') || text.includes('book') || text.includes('hire')) {
      speak("Let's get in touch. Opening contact page.");
      setTimeout(() => navigate('/contact'), 800);
    } 
    else if (text.includes('client') || text.includes('partner') || text.includes('brand')) {
      speak("Opening our clients and partners page.");
      setTimeout(() => navigate('/clients'), 800);
    }
    else if (text.includes('career') || text.includes('job') || text.includes('hiring')) {
      speak("Opening our careers page.");
      setTimeout(() => navigate('/careers'), 800);
    }
    else {
      speak("I heard you! Try saying Show portfolio, Services, or Contact.");
    }
  };

  return (
    <div className="fixed bottom-28 right-4 sm:bottom-32 sm:right-6 z-50 flex flex-col items-end select-none">
      {/* Floating Sticky AI Mic Button (No Text Bubble, No Rotation, Toggle ON/OFF) */}
      <button
        onClick={toggleMicrophone}
        className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border border-white/40 ${
          isListening
            ? 'bg-gradient-to-r from-rose-500 to-red-600 shadow-rose-500/40'
            : 'bg-gradient-to-tr from-[#0066FF] via-[#0088FF] to-[#00FFCC] shadow-cyan-500/30'
        }`}
        title={isListening ? "Microphone ON (Click to turn off)" : "Microphone OFF (Click to turn on)"}
        aria-label="Toggle Microphone"
      >
        {isListening ? (
          <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        ) : (
          <MicOff className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
        )}
      </button>
    </div>
  );
}
