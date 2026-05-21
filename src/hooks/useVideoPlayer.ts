import { useState, useCallback } from 'react';

export const useVideoPlayer = (initialVideoId: string) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<string>(initialVideoId);

  const startPlaying = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const changeVideo = useCallback((newVideoId: string) => {
    setVideoId(newVideoId);
    setIsPlaying(false);
  }, []);

  return {
    isPlaying,
    videoId,
    startPlaying,
    changeVideo,
  };
};
