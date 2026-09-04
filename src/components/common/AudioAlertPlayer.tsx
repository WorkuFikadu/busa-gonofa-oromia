import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Pause, Play, Radio } from 'lucide-react';

interface AudioPlayerProps {
  text: string;
  lang?: 'om' | 'en' | 'am';
  label?: string;
  compact?: boolean;
}

const AudioAlertPlayer: React.FC<AudioPlayerProps> = ({ text, lang = 'om', label, compact = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = () => {
    if (!isSupported) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    // Language voice mapping
    if (lang === 'en') {
      utterance.lang = 'en-US';
    } else if (lang === 'am') {
      utterance.lang = 'am-ET';
    } else {
      // Afaan Oromoo / Ethiopian accent
      utterance.lang = 'om-ET';
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handleStop = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  if (!isSupported) return null;

  if (compact) {
    return (
      <button
        onClick={handleSpeak}
        title={isPlaying ? 'Pause Audio Alert' : 'Listen Aloud'}
        className={`p-1 rounded-full transition-colors ${
          isPlaying ? 'bg-white text-red-700 animate-pulse' : 'bg-white/20 text-white hover:bg-white/30'
        }`}
      >
        {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      </button>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 bg-slate-800 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
      <button
        onClick={handleSpeak}
        className="flex items-center gap-1.5 hover:text-gadaa-gold transition-colors"
      >
        {isPlaying ? (
          <>
            <Pause className="w-3.5 h-3.5 text-amber-400" />
            <span>Pause</span>
          </>
        ) : isPaused ? (
          <>
            <Play className="w-3.5 h-3.5 text-emerald-400" />
            <span>Resume</span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 text-gadaa-gold" />
            <span>{label || 'Listen Alert'}</span>
          </>
        )}
      </button>

      {/* Animated Waveform indicator when speaking */}
      {isPlaying && (
        <div className="flex items-center gap-0.5 ml-1">
          <span className="w-1 h-3 bg-gadaa-gold rounded-full animate-[bounce_0.6s_infinite]" />
          <span className="w-1 h-4 bg-emerald-400 rounded-full animate-[bounce_0.8s_infinite]" />
          <span className="w-1 h-2 bg-red-500 rounded-full animate-[bounce_0.7s_infinite]" />
        </div>
      )}

      {(isPlaying || isPaused) && (
        <button onClick={handleStop} className="text-slate-400 hover:text-white text-[10px] ml-1">
          ✕
        </button>
      )}
    </div>
  );
};

export default AudioAlertPlayer;
