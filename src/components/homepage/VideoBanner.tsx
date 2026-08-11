"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Maximize2, Minimize2, Pause, Play, Volume2, VolumeX, X } from "lucide-react";

type VideoBannerProps = {
  posterUrl: string;
  videoUrl: string | null;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function VideoBanner({ posterUrl, videoUrl }: VideoBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [seekPreview, setSeekPreview] = useState(0);

  useEffect(() => {
    const onFullscreenChange = () => {
      setFullscreen(document.fullscreenElement === sectionRef.current);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

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

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      sectionRef.current?.requestFullscreen();
    }
  };

  const handleSeekPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeeking(true);
    setSeekPreview(Number(e.target.value));
  };

  const commitSeek = () => {
    if (!seeking) return;
    const video = videoRef.current;
    if (video) video.currentTime = seekPreview;
    setCurrentTime(seekPreview);
    setSeeking(false);
  };

  return (
    <section
      ref={sectionRef}
      className="cursor-visf-white relative w-full h-[330px] sm:h-[440px] lg:h-[672px] overflow-hidden bg-black"
    >
      {/* Below sm: the poster stays put — cropping a landscape video into this
          tall, narrow band loses too much of the frame on a phone. The
          ambient background video only takes over from sm: up, where the
          crop still reads fine. */}
      <Image
        src={posterUrl}
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        className="object-cover"
      />

      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          muted={muted}
          loop
          playsInline
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onDurationChange={(e) => setDuration(e.currentTarget.duration)}
          className={`hidden sm:block absolute inset-0 w-full h-full ${fullscreen ? "object-contain" : "object-cover"}`}
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
          <div className="hidden sm:flex absolute bottom-0 left-0 right-0 flex-col gap-3 px-6 pb-6">
            {playing && (
              <div className="flex items-center gap-3 text-white text-xs font-visf-text tabular-nums">
                <span>{formatTime(seeking ? seekPreview : currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={Number.isFinite(duration) ? duration : 0}
                  step={0.1}
                  value={seeking ? seekPreview : currentTime}
                  onChange={handleSeekPreview}
                  onMouseUp={commitSeek}
                  onTouchEnd={commitSeek}
                  onKeyUp={commitSeek}
                  aria-label="Seek video"
                  className="flex-1 h-4 accent-white cursor-pointer"
                />
                <span>{formatTime(duration)}</span>
              </div>
            )}

            <div className="flex justify-end gap-3">
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
              {playing && (
                <button
                  onClick={toggleFullscreen}
                  aria-label={fullscreen ? "Exit fullscreen" : "Expand video"}
                  className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition"
                >
                  {fullscreen ? (
                    <Minimize2 size={20} className="text-neutral-900" />
                  ) : (
                    <Maximize2 size={20} className="text-neutral-900" />
                  )}
                </button>
              )}
            </div>
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
