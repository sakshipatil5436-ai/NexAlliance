import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Sparkles, Volume2 } from 'lucide-react';

export default function RobotVoiceAssistant({ theme = 'dark' }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [assistantMessage, setAssistantMessage] = useState('Hi, I am Nex from NexAlliance. How can I help you?');
  const navigate = useNavigate();

  const isLight = theme === 'light';

  // Entry Welcome Greeting on Website Load
  useEffect(() => {
    speak("Hi, I am Nex from NexAlliance. How can I help you?");
  }, []);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel(); // Cancel previous audio
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

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      const errorMsg = "Speech Recognition is not supported in this browser. Please try Google Chrome.";
      setAssistantMessage(errorMsg);
      speak("Speech recognition is not supported in this browser. Please try Google Chrome.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setAssistantMessage("Listening... Speak now!");
      };

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript.toLowerCase();
        setTranscript(spokenText);
        handleVoiceCommand(spokenText);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        setAssistantMessage("Sorry, I didn't hear that. Tap the mic to try again.");
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  // Keyword Matching Logic (Pure Client-Side Navigation & Speech)
  const handleVoiceCommand = (text) => {
    if (text.includes('portfolio') || text.includes('work') || text.includes('projects')) {
      const reply = "Sure! Let me show you our portfolio.";
      setAssistantMessage(reply);
      speak(reply);
      setTimeout(() => navigate('/portfolio'), 800);
    } 
    else if (text.includes('about') || text.includes('who are you') || text.includes('company')) {
      const reply = "Sure, taking you to our About page.";
      setAssistantMessage(reply);
      speak(reply);
      setTimeout(() => navigate('/about'), 800);
    } 
    else if (text.includes('service') || text.includes('solutions') || text.includes('what do you do')) {
      const reply = "Here are our core digital services.";
      setAssistantMessage(reply);
      speak(reply);
      setTimeout(() => navigate('/services'), 800);
    } 
    else if (text.includes('contact') || text.includes('call') || text.includes('book') || text.includes('hire')) {
      const reply = "Let's get in touch. Opening contact page.";
      setAssistantMessage(reply);
      speak(reply);
      setTimeout(() => navigate('/contact'), 800);
    } 
    else if (text.includes('client') || text.includes('partner') || text.includes('brand')) {
      const reply = "Opening our clients and partners page.";
      setAssistantMessage(reply);
      speak(reply);
      setTimeout(() => navigate('/clients'), 800);
    }
    else if (text.includes('career') || text.includes('job') || text.includes('hiring')) {
      const reply = "Opening our careers page.";
      setAssistantMessage(reply);
      speak(reply);
      setTimeout(() => navigate('/careers'), 800);
    }
    else {
      const reply = 'I didn\'t catch that. Try saying "Show portfolio", "Services", or "Contact".';
      setAssistantMessage(reply);
      speak(reply);
    }
  };

  return (
    <div className="fixed bottom-28 right-4 sm:bottom-32 sm:right-6 z-50 flex flex-col items-end select-none">
      {/* Speech Transcript & Assistant Reply Tooltip Popup */}
      {assistantMessage && (
        <div className={`mb-2.5 px-3.5 py-2 rounded-2xl border backdrop-blur-md max-w-[230px] text-right shadow-xl transition-all animate-in fade-in slide-in-from-bottom-2 ${
          isLight
            ? 'bg-white/95 border-sky-200 text-slate-800 shadow-sky-500/10'
            : 'bg-[#0B172E]/95 border-[#1E3A8A] text-sky-100 shadow-blue-500/20'
        }`}>
          <p className="text-[11px] font-semibold leading-tight flex items-center justify-end gap-1">
            <span>{assistantMessage}</span>
            <Volume2 className="w-3 h-3 text-[#0088FF] shrink-0" />
          </p>
          {transcript && (
            <p className="text-[9px] text-sky-400 font-mono mt-0.5">
              "{transcript}"
            </p>
          )}
        </div>
      )}

      {/* Floating Sticky AI Robot Assistant Button */}
      <button
        onClick={startListening}
        className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer border border-white/40 ${
          isListening
            ? 'bg-gradient-to-r from-rose-500 to-red-600 shadow-rose-500/50 animate-pulse'
            : 'bg-gradient-to-tr from-[#0066FF] via-[#0088FF] to-[#00FFCC] shadow-cyan-500/40 hover:shadow-cyan-400/60'
        }`}
        title="Nex AI Voice Assistant"
        aria-label="Nex AI Voice Assistant"
      >
        {isListening ? (
          <span className="animate-spin text-lg">🎙️</span>
        ) : (
          <span className="hover:rotate-12 transition-transform">🤖</span>
        )}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
        </span>
      </button>
    </div>
  );
}
