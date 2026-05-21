import React, { useRef } from 'react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

interface AudioPlayerProps {
  songUrl: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ songUrl }) => {
  const {
    isPlaying,
    currentTime,
    duration,
    progress,
    togglePlay,
    seek,
    formatTime
  } = useAudioPlayer(songUrl);

  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickPercent = clickX / width;
    seek(clickPercent);
  };

  return (
    <div className="flex flex-col gap-6 transform md:rotate-1">
      <div className="bg-surface-container p-6 border border-white/10 flex flex-col sm:flex-row items-center gap-6 shadow-[4px_4px_0_0_rgba(0,242,255,1)]">
        <img
          alt="Single cover"
          className={`w-32 h-32 object-cover rounded-full border-2 border-primary-container shadow-[0_0_15px_rgba(0,242,255,0.3)] transition-transform duration-500 ${isPlaying ? 'animate-slow-spin' : ''}`}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSWWlxBCKwtYlPU-oWbeRHrm5S9Kh1DrgCGpQy6vWAfaUUhC5UQY5a51aW8jRL5rkuArb3CfCcERBhProtoav-_3bvi2o8_Lr0QT6Qejh4ljMbfKn_XcVv_ks_EeD0Qcgy-0rVmBbWf-q6-VGjGu3YAZOqaxUeNUE255cITsEJSOOcqSMRsiiz4aFIzjo3nJYDoPAufcu124BgqcqzF8IgC0gE6pe-WK5q5KXBynq3q7GqGqnfeCbk-X_pFHfeRSUfYD6o1ncHECgh"
        />
        
        <div className="flex-1 w-full">
          <h3 className="font-headline-md text-headline-md text-primary uppercase mb-2">The Empty Yards</h3>
          <p className="font-label-caps text-label-caps text-on-surface-variant mb-4">Noah Withers</p>
          
          {/* Active Audio Playback Deck */}
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="text-primary hover:text-white hover:scale-110 active:scale-95 transition-all focus:outline-none"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '48px' }}>
                {isPlaying ? 'pause_circle' : 'play_circle'}
              </span>
            </button>
            
            {/* Click-to-Scrub Progress Bar */}
            <div
              ref={progressBarRef}
              onClick={handleProgressBarClick}
              className="flex-1 h-3 bg-surface-variant cursor-pointer relative overflow-hidden group hover:h-4 transition-all"
            >
              <div
                className="h-full bg-primary-container group-hover:bg-primary transition-colors"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <span className="font-label-caps text-label-caps text-on-surface-variant min-w-[70px] text-right">
              {formatTime(currentTime)} / {formatTime(duration || 225)}
            </span>
          </div>
        </div>
      </div>
      
      <a
        className="block bg-surface p-4 border border-white/10 hover:border-primary hover:text-primary transition-all text-center font-label-caps text-label-caps text-on-surface hover:skew-x-[-3deg]"
        href={songUrl}
        download="The_Empty_Yards_Single.mp3"
        target="_blank"
        rel="noopener noreferrer"
      >
        LADDA NER WAV (PRESS ONLY) <span className="material-symbols-outlined align-middle ml-2 text-sm">download</span>
      </a>
    </div>
  );
};
