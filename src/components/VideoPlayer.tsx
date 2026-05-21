import React from 'react';
import { useVideoPlayer } from '../hooks/useVideoPlayer';

interface VideoPlayerProps {
  initialVideoId?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ initialVideoId = '1M025MzIbQQ' }) => {
  const { isPlaying, videoId, startPlaying } = useVideoPlayer(initialVideoId);

  return (
    <section className="px-margin-mobile md:px-margin-desktop py-20 bg-surface-container" id="video">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-stretch">
        <div className="lg:col-span-1 flex flex-col justify-center transform -rotate-1 md:-rotate-tilt-angle mb-8 lg:mb-0">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background uppercase mb-4">
            Video
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            Live från replokalen, officiella musikvideor och behind-the-scenes kaos.
          </p>
          <a
            className="inline-flex items-center gap-2 text-primary hover:text-white font-label-caps text-label-caps uppercase w-fit hover:translate-x-2 transition-transform"
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            MER PÅ YOUTUBE <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>

        <div className="lg:col-span-2 relative aspect-video bg-black border border-white/20 shadow-[8px_8px_0_0_#1e1e1e] group overflow-hidden">
          {isPlaying ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title="The Empty Yards - Official Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="w-full h-full cursor-pointer relative" onClick={startPlaying}>
              <img
                alt="Video thumbnail placeholder"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity blur-[2px] group-hover:blur-0 duration-500 scale-105 group-hover:scale-100"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlcjT6pHfQ_hAWPapH0koUbLKo1tWoYq2iXNkCaOFPCih3Oat1IG1s2_QXTdtIuClJOBkXR38W3B6jXisFxuxJ8WZwO0GSlhgRowndr56MOVg4pH2Y62RJYS8qgNNz8iAPPxqQL7E9LX-gl4eMU4RxLX9R2wqWRacXrhys956PfpWguAu0CfSFL7V2QAFDGUPdmBVmO_U73oyR9qpLsUy6pso-Zq_vOh8N8TZF39RrSa-Xpu2fM1aKq-9FQcu8l1AOLWiII6YwgIha"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-primary-container/80 rounded-full flex items-center justify-center group-hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,242,255,0.4)]">
                  <span className="material-symbols-outlined text-background" style={{ fontVariationSettings: "'FILL' 1", fontSize: '40px' }}>
                    play_arrow
                  </span>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 z-10">
                <span className="bg-black/80 px-3 py-1 font-label-caps text-label-caps text-primary border border-primary/50">
                  OFFICIELL VIDEO
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
