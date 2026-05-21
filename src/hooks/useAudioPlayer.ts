import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseAudioPlayerResult {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  progress: number;
  volume: number;
  isMuted: boolean;
  togglePlay: () => void;
  seek: (percent: number) => void;
  adjustVolume: (volume: number) => void;
  toggleMute: () => void;
  formatTime: (time: number) => string;
}

export const useAudioPlayer = (audioUrl: string): UseAudioPlayerResult => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    audio.volume = volume;

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    // If already loaded
    if (audio.readyState >= 1) {
      setDuration(audio.duration || 0);
    }

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audioRef.current = null;
    };
  }, [audioUrl]);

  // Handle Play/Pause
  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => {
        console.warn('Playback block or error:', err);
      });
      setIsPlaying(true);
    }
  }, [isPlaying]);

  // Seek/Scrub to percentage (0 to 1)
  const seek = useCallback((percent: number) => {
    if (!audioRef.current || duration === 0) return;
    const clickTime = percent * duration;
    audioRef.current.currentTime = clickTime;
    setCurrentTime(clickTime);
  }, [duration]);

  // Adjust Volume (0 to 1)
  const adjustVolume = useCallback((val: number) => {
    if (!audioRef.current) return;
    const clamped = Math.max(0, Math.min(1, val));
    audioRef.current.volume = clamped;
    setVolume(clamped);
    if (clamped > 0) {
      setIsMuted(false);
      audioRef.current.muted = false;
    }
  }, []);

  // Toggle Mute
  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    audioRef.current.muted = nextMute;
    setIsMuted(nextMute);
  }, [isMuted]);

  // Format Time Helper
  const formatTime = useCallback((time: number): string => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return {
    isPlaying,
    duration,
    currentTime,
    progress,
    volume,
    isMuted,
    togglePlay,
    seek,
    adjustVolume,
    toggleMute,
    formatTime
  };
};
