"use client";

import { useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX, X } from "lucide-react";

type VideoBannerProps = {
  posterUrl: string;
  videoUrl: string | null;
};

export default function VideoBanner({ posterUrl, videoUrl }: VideoBannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.muted = false;
      setMuted(false);
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <section className="relative w-full h-[330px] sm:h-[440px] lg:h-[672px] overflow-hidden">
      {/* Below sm: the poster stays put — cropping a landscape video into this
          tall, narrow band loses too much of the frame on a phone. The
          ambient background video only takes over from sm: up, where the
          crop still reads fine. */}
      <img
        src={posterUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          muted={muted}
          loop
          playsInline
          className="hidden sm:block absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.32), transparent 55%)",
        }}
      />

      {videoUrl && (
        <>
          <div className="hidden sm:flex absolute bottom-6 right-6 gap-3">
            <button
              onClick={togglePlay}
              aria-label={playing ? "Pause video" : "Play video"}
              className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition"
            >
              {playing ? (
                <Pause
                  size={22}
                  className="text-neutral-900"
                  fill="currentColor"
                />
              ) : (
                <Play
                  size={22}
                  className="text-neutral-900 ml-0.5"
                  fill="currentColor"
                />
              )}
            </button>
            {playing && (
              <button
                onClick={toggleMute}
                aria-label={muted ? "Unmute video" : "Mute video"}
                className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition"
              >
                {muted ? (
                  <VolumeX size={22} className="text-neutral-900" />
                ) : (
                  <Volume2 size={22} className="text-neutral-900" />
                )}
              </button>
            )}
          </div>

          <button
            onClick={() => setModalOpen(true)}
            aria-label="Watch video"
            className="sm:hidden absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition"
          >
            <Play size={22} className="text-neutral-900 ml-1" fill="currentColor" />
          </button>
        </>
      )}

      {modalOpen && videoUrl && (
        <div
          className="sm:hidden fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <video
            src={videoUrl}
            className="max-w-full max-h-full"
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setModalOpen(false)}
            aria-label="Close video"
            className="absolute top-6 right-6 text-white"
          >
            <X size={24} />
          </button>
        </div>
      )}
    </section>
  );
}
