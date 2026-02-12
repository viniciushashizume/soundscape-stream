import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { Music } from '@/data/types';

interface PlayerState {
  currentTrack: Music | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  queue: Music[];
  queueIndex: number;
}

interface PlayerContextType extends PlayerState {
  play: (track: Music, queue?: Music[]) => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  seek: (value: number) => void;
  setVolume: (value: number) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
};

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    progress: 0,
    volume: 70,
    queue: [],
    queueIndex: 0,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    intervalRef.current = setInterval(() => {
      setState(prev => {
        if (!prev.currentTrack) return prev;
        const next = prev.progress + 1;
        if (next >= prev.currentTrack.duration) {
          return { ...prev, progress: 0, isPlaying: false };
        }
        return { ...prev, progress: next };
      });
    }, 1000);
  }, [stopTimer]);

  useEffect(() => {
    if (state.isPlaying) startTimer();
    else stopTimer();
    return stopTimer;
  }, [state.isPlaying, startTimer, stopTimer]);

  // Auto-next when song ends
  useEffect(() => {
    if (state.currentTrack && state.progress >= state.currentTrack.duration && !state.isPlaying) {
      // Try next track
      if (state.queueIndex < state.queue.length - 1) {
        setState(prev => {
          const nextIdx = prev.queueIndex + 1;
          return { ...prev, currentTrack: prev.queue[nextIdx], queueIndex: nextIdx, progress: 0, isPlaying: true };
        });
      }
    }
  }, [state.progress, state.isPlaying, state.currentTrack, state.queueIndex, state.queue.length]);

  const play = useCallback((track: Music, queue?: Music[]) => {
    const q = queue || [track];
    const idx = q.findIndex(m => m.id === track.id);
    setState(prev => ({ ...prev, currentTrack: track, queue: q, queueIndex: idx >= 0 ? idx : 0, progress: 0, isPlaying: true }));
  }, []);

  const togglePlay = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const next = useCallback(() => {
    setState(prev => {
      if (prev.queueIndex < prev.queue.length - 1) {
        const nextIdx = prev.queueIndex + 1;
        return { ...prev, currentTrack: prev.queue[nextIdx], queueIndex: nextIdx, progress: 0, isPlaying: true };
      }
      return prev;
    });
  }, []);

  const previous = useCallback(() => {
    setState(prev => {
      if (prev.queueIndex > 0) {
        const prevIdx = prev.queueIndex - 1;
        return { ...prev, currentTrack: prev.queue[prevIdx], queueIndex: prevIdx, progress: 0, isPlaying: true };
      }
      return { ...prev, progress: 0 };
    });
  }, []);

  const seek = useCallback((value: number) => {
    setState(prev => ({ ...prev, progress: value }));
  }, []);

  const setVolume = useCallback((value: number) => {
    setState(prev => ({ ...prev, volume: value }));
  }, []);

  return (
    <PlayerContext.Provider value={{ ...state, play, togglePlay, next, previous, seek, setVolume }}>
      {children}
    </PlayerContext.Provider>
  );
};
