import React from 'react';
import { usePhotoGallery, PhotoItem } from '../hooks/usePhotoGallery';

const PHOTOS: PhotoItem[] = [
  {
    id: 'press-1',
    src: '/Artist-pic.png',
    alt: 'Band alleyway',
    label: 'HI-RES',
  },
  {
    id: 'press-2',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSWWlxBCKwtYlPU-oWbeRHrm5S9Kh1DrgCGpQy6vWAfaUUhC5UQY5a51aW8jRL5rkuArb3CfCcERBhProtoav-_3bvi2o8_Lr0QT6Qejh4ljMbfKn_XcVv_ks_EeD0Qcgy-0rVmBbWf-q6-VGjGu3YAZOqaxUeNUE255cITsEJSOOcqSMRsiiz4aFIzjo3nJYDoPAufcu124BgqcqzF8IgC0gE6pe-WK5q5KXBynq3q7GqGqnfeCbk-X_pFHfeRSUfYD6o1ncHECgh',
    alt: 'Cover art atmosphere',
    label: 'COVER ART',
  },
];

export const PhotoGallery: React.FC = () => {
  const {
    selectedIndex,
    selectedPhoto,
    openLightbox,
    closeLightbox,
    showNext,
    showPrev,
  } = usePhotoGallery(PHOTOS);

  const handleDownload = (src: string, filename: string) => {
    // Standard trigger for download in new window/tab
    const link = document.createElement('a');
    link.href = src;
    link.target = '_blank';
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="px-margin-mobile md:px-margin-desktop py-32 relative" id="foton">
      <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-12 uppercase drop-shadow-[4px_4px_0_#1e1e1e]">
        Pressbilder
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Main Press Pic */}
        <div
          onClick={() => openLightbox(0)}
          className="md:col-span-2 lg:col-span-2 relative group overflow-hidden border border-white/10 cursor-pointer"
        >
          <img
            alt={PHOTOS[0].alt}
            className="w-full h-[500px] object-cover grayscale group-hover:grayscale-0 transition-all duration-500 hover:scale-105"
            src={PHOTOS[0].src}
          />
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center z-20">
            <span className="font-label-caps text-label-caps bg-primary-container text-background px-2 py-1">
              {PHOTOS[0].label} ↓
            </span>
            <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
              zoom_in
            </span>
          </div>
        </div>

        {/* B-Roll / Atmosphere */}
        <div
          onClick={() => openLightbox(1)}
          className="relative group overflow-hidden border border-white/10 transform rotate-1 cursor-pointer"
        >
          <img
            alt={PHOTOS[1].alt}
            className="w-full h-full min-h-[300px] md:h-[500px] object-cover contrast-150 saturate-50 group-hover:saturate-100 transition-all duration-500 hover:scale-105"
            src={PHOTOS[1].src}
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:opacity-0 transition-opacity"></div>
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center z-20">
            <span className="font-label-caps text-label-caps bg-primary-container text-background px-2 py-1">
              {PHOTOS[1].label} ↓
            </span>
            <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
              zoom_in
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <a
          href={PHOTOS[0].src}
          download="the_empty_yards_presskit.zip"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-transparent border-2 border-on-surface text-on-surface font-label-caps text-label-caps px-8 py-3 uppercase hover:bg-on-surface hover:text-background transition-colors cursor-pointer"
        >
          LADDA NER PRESSKIT.ZIP
        </a>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col justify-between p-6 animate-fade-in backdrop-blur-md">
          {/* Top Bar */}
          <div className="flex justify-between items-center w-full z-10">
            <span className="font-label-caps text-label-caps text-primary">
              {selectedIndex! + 1} / {PHOTOS.length} — {selectedPhoto.label}
            </span>
            <button
              onClick={closeLightbox}
              className="text-white hover:text-primary-container p-2 focus:outline-none transition-colors"
              title="Close (Esc)"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '36px' }}>
                close
              </span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex justify-between items-center relative max-h-[80vh]">
            {/* Left Nav */}
            <button
              onClick={showPrev}
              className="text-white hover:text-primary-container p-4 focus:outline-none transition-colors z-10 select-none hidden sm:block"
              title="Previous (Arrow Left)"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>
                arrow_back_ios
              </span>
            </button>

            {/* Image Container */}
            <div className="relative flex justify-center items-center w-full h-full p-2">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="max-w-full max-h-[75vh] object-contain border border-white/20 shadow-2xl"
              />
            </div>

            {/* Right Nav */}
            <button
              onClick={showNext}
              className="text-white hover:text-primary-container p-4 focus:outline-none transition-colors z-10 select-none hidden sm:block"
              title="Next (Arrow Right)"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>
                arrow_forward_ios
              </span>
            </button>
          </div>

          {/* Bottom Control Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full z-10 border-t border-white/10 pt-4">
            <p className="font-body-md text-body-md text-on-surface-variant">
              {selectedPhoto.alt}
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleDownload(selectedPhoto.src, `${selectedPhoto.id}.jpg`)}
                className="bg-primary-container text-background font-label-caps text-label-caps px-4 py-2 uppercase font-bold hover:bg-white transition-colors flex items-center gap-2"
              >
                LADDA NER <span className="material-symbols-outlined text-sm">download</span>
              </button>
              {/* Swipe/navigation tips for small devices */}
              <div className="flex sm:hidden gap-4">
                <button onClick={showPrev} className="text-white p-2">
                  <span className="material-symbols-outlined">navigate_before</span>
                </button>
                <button onClick={showNext} className="text-white p-2">
                  <span className="material-symbols-outlined">navigate_next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
