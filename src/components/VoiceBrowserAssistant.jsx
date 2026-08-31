import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  X,
  Send,
  Maximize2,
  Minimize2,
  Compass,
} from 'lucide-react';

export default function VoiceBrowserAssistant({ onOpenBooking }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [inputText, setInputText] = useState('');
  const [selectedLang, setSelectedLang] = useState('mr-IN');
  const [statusMessage, setStatusMessage] = useState('Tap Mic Button below to Speak');

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: "👋 Mic बटणावर क्लिक करा आणि बोला (किंवा खालील 1-Click बटने वापरा)!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, transcript]);

  // Audio Cue Feedback
  const playAudioCue = (type) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'start') {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'action') {
        osc.frequency.setValueAtTime(550, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch (e) { }
  };

  const startRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.');
      setStatusMessage('API Not Supported');
      return;
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) { }
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLang || 'mr-IN';

      // Set active listening state instantly on user click
      setIsListening(true);
      setStatusMessage('🔴 Mic Active: Speak command now!');
      playAudioCue('start');

      recognition.onstart = () => {
        setIsListening(true);
        setStatusMessage('🔴 ऐकत आहे... बोला!');
      };

      recognition.onresult = (event) => {
        let interimText = '';
        let finalText = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalText += event.results[i][0].transcript;
          } else {
            interimText += event.results[i][0].transcript;
          }
        }

        if (interimText) setTranscript(interimText);

        if (finalText) {
          setTranscript(finalText);
          handleUserCommand(finalText.trim());
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          return; // Ignore silence
        }
        if (event.error === 'not-allowed') {
          alert('मायक्रोफोन परमिशन विंडोज किंवा ब्राउझरमध्ये ब्लॉक आहे. कृपया Windows Settings > Privacy & Security > Microphone अलाऊ करा.');
        } else if (event.error === 'network') {
          setStatusMessage('Network Speech Error. Tap Mic to retry.');
        }
        setIsListening(false);
        setStatusMessage('Tap Mic Button below to Speak');
      };

      recognition.onend = () => {
        setIsListening(false);
        setStatusMessage('Tap Mic Button below to Speak');
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Mic start error:', err);
      setIsListening(false);
      setStatusMessage('Error starting mic');
    }
  };

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) { }
      }
      setIsListening(false);
      setStatusMessage('Tap Mic Button below to Speak');
      return;
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          stream.getTracks().forEach(t => t.stop());
          startRecognition();
        })
        .catch((err) => {
          console.warn('getUserMedia error:', err);
          // Fallback direct start
          startRecognition();
        });
    } else {
      startRecognition();
    }
  };

  const speakResponse = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'assistant',
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);

    if (isMuted || !synthRef.current) return;
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLang;
    synthRef.current.speak(utterance);
  };

  const handleUserCommand = (rawText) => {
    const text = rawText.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);

    playAudioCue('action');
    const lower = text.toLowerCase();

    // 1. Navigation
    if (lower.includes('home') || lower.includes('होम')) {
      navigate('/');
      speakResponse('होम पेजवर जात आहे.');
      return;
    }
    if (lower.includes('about') || lower.includes('अबाउट') || lower.includes('आमच्याबद्दल')) {
      navigate('/about');
      speakResponse('अबाउट पेज उघडत आहे.');
      return;
    }
    if (lower.includes('service') || lower.includes('सेवा')) {
      navigate('/services');
      speakResponse('सेवा पेज उघडत आहे.');
      return;
    }
    if (lower.includes('contact') || lower.includes('संपर्क')) {
      navigate('/contact');
      speakResponse('संपर्क पेज उघडत आहे.');
      return;
    }

    // 2. Actions
    if (lower.includes('call') || lower.includes('फोन')) {
      speakResponse('Nex Alliance ला कॉल करत आहे.');
      window.location.href = 'tel:+916351178511';
      return;
    }
    if (lower.includes('whatsapp') || lower.includes('व्हॉट्सॲप')) {
      speakResponse('व्हॉट्सॲप चॅट उघडत आहे.');
      window.open('https://wa.me/916351178511?text=Hello%20NexAlliance!', '_blank');
      return;
    }
    if (lower.includes('scroll down') || lower.includes('खाली')) {
      window.scrollBy({ top: 500, behavior: 'smooth' });
      speakResponse('पेज खाली करत आहे.');
      return;
    }

    speakResponse(`कमांड समजली: "${text}". कृपया योग्य कमांड द्या.`);
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    handleUserCommand(inputText);
    setInputText('');
  };

  const quickActions = [
    { label: '🏠 Home', cmd: 'Home' },
    { label: 'ℹ️ About', cmd: 'About' },
    { label: '💼 Services', cmd: 'Services' },
    { label: '📞 Call', cmd: 'Call' },
    { label: '💬 WhatsApp', cmd: 'WhatsApp' },
    { label: '📜 Scroll Down', cmd: 'Scroll Down' },
  ];

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-4 left-4 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 text-white shadow-xl border border-blue-500/40 hover:scale-105 transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-cyan-400 animate-spin" />
            <span className="text-xs font-bold text-cyan-300">Voice Assistant</span>
          </button>
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-4 left-4 z-[9999] w-[330px] h-[390px] bg-slate-900 text-white rounded-2xl border border-blue-500/30 shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-3 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="text-xs font-bold">Browser Controller</h3>
                <p className={`text-[9px] ${isListening ? 'text-emerald-400 font-bold' : 'text-cyan-300'}`}>
                  {statusMessage}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="bg-slate-700 text-white text-[10px] rounded px-1 py-0.5"
              >
                <option value="mr-IN">मराठी (MR)</option>
                <option value="hi-IN">हिंदी (HI)</option>
                <option value="en-US">English (EN)</option>
              </select>
              <button onClick={() => setIsMuted(!isMuted)} className="p-1">
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
              <button onClick={() => setIsOpen(false)} className="p-1 text-slate-300 hover:text-rose-400">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Active Listening High Contrast Banner */}
          {isListening && (
            <div className="px-3 py-1 bg-rose-600 text-white text-[10px] font-black flex items-center justify-between animate-pulse">
              <span>🔴 MIC IS ON: Speak your command!</span>
              <span className="bg-black/30 px-1.5 py-0.5 rounded text-[8px]">Active</span>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-[11px]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[88%] px-3 py-1.5 rounded-xl ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-100 border border-slate-700'}`}>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          {/* Chips */}
          <div className="px-2 py-1.5 bg-slate-950 border-t border-slate-800 flex gap-1 overflow-x-auto">
            {quickActions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleUserCommand(item.cmd)}
                className="px-2 py-1 bg-slate-800 hover:bg-blue-600 rounded-full text-[10px] whitespace-nowrap cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Footer Input & Mic */}
          <div className="p-2 bg-slate-900 border-t border-slate-800 flex items-center gap-1.5">
            <button
              onClick={toggleListening}
              className={`p-2.5 rounded-xl flex items-center justify-center cursor-pointer transition-all ${isListening ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-500/40' : 'bg-blue-600 text-white'
                }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <form onSubmit={handleTextSubmit} className="flex-1 flex items-center bg-slate-800 rounded-xl px-2 py-1 border border-slate-700">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="कमांड टाइप करा किंवा Mic दाबा..."
                className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-[11px] focus:outline-none"
              />
              <button type="submit" className="p-1 text-blue-400 cursor-pointer">
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
