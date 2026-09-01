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
    <div className="flex flex-col items-center justify-center my-3 select-none z-30">
      {/* Robot Mic Action Button */}
      <button
        onClick={startListening}
        className={`group relative flex items-center gap-2.5 px-6 py-2.5 rounded-full font-heading font-extrabold text-xs uppercase tracking-wider shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border ${
          isListening
            ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white border-rose-400 shadow-rose-500/40 animate-pulse'
            : isLight
            ? 'bg-gradient-to-r from-[#0088FF] via-[#0077E6] to-[#2563EB] text-white border-sky-300 shadow-sky-500/25 hover:shadow-sky-500/40'
            : 'bg-gradient-to-r from-[#0088FF] via-[#3B82F6] to-[#2563EB] text-white border-[#1E3A8A] shadow-blue-500/30 hover:shadow-cyan-500/40'
        }`}
      >
        <div className={`p-1 rounded-full ${isListening ? 'bg-white/20 animate-spin' : 'bg-white/10'}`}>
          {isListening ? (
            <MicOff className="w-4 h-4 text-white" />
          ) : (
            <Mic className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
          )}
        </div>
        <span>{isListening ? "🎙️ Listening..." : "🎤 Speak to Robot"}</span>
        <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
      </button>

      {/* Assistant Feedback Box */}
      {assistantMessage && (
        <div className={`mt-2.5 px-4 py-2 rounded-2xl border backdrop-blur-md max-w-sm text-center shadow-md transition-all ${
          isLight
            ? 'bg-white/90 border-sky-200 text-slate-800 shadow-sky-500/5'
            : 'bg-[#0B172E]/90 border-[#1E3A8A] text-sky-200 shadow-blue-500/10'
        }`}>
          <p className="text-xs font-semibold leading-relaxed flex items-center justify-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-[#0088FF] shrink-0" />
            <span>{assistantMessage}</span>
          </p>
          {transcript && (
            <p className="text-[10px] text-slate-400 font-mono mt-1">
              You said: "{transcript}"
            </p>
          )}
        </div>
      )}
    </div>
  );
}
