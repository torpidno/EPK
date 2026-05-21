import { useState, useCallback, useEffect } from 'react';

export interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  label: string;
}

export const usePhotoGallery = (photos: PhotoItem[]) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const showNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % photos.length;
    });
  }, [selectedIndex, photos.length]);

  const showPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + photos.length) % photos.length;
    });
  }, [selectedIndex, photos.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, showNext, showPrev, closeLightbox]);

  return {
    selectedIndex,
    selectedPhoto: selectedIndex !== null ? photos[selectedIndex] : null,
    openLightbox,
    closeLightbox,
    showNext,
    showPrev,
  };
};
