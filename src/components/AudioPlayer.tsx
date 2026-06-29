"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string;
  episodeTitle: string;
  episodeNumber?: number;
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ audioUrl, episodeTitle, episodeNumber }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); } else { audio.play(); }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !muted;
    setMuted(!muted);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    // RTL: right edge = start (0%), left edge = end (100%)
    const x = rect.right - e.clientX;
    audio.currentTime = (x / rect.width) * audio.duration;
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seconds));
  };

  return (
    <div
      className="rounded-2xl overflow-hidden border border-yellow-400/25 shadow-2xl shadow-black/50"
      style={{ background: "linear-gradient(145deg, #0c1929 0%, #152038 50%, #1a2a4a 100%)" }}
    >
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Header */}
      <div className="px-6 pt-6 pb-5">
        <p className="text-yellow-400/70 text-xs font-semibold tracking-widest uppercase mb-3">
          האזינו לפרק
        </p>
        <div className="flex items-start gap-3">
          {episodeNumber && episodeNumber > 0 && (
            <span className="mt-0.5 flex-shrink-0 bg-yellow-400 text-zinc-950 text-xs font-black px-2.5 py-1 rounded-lg leading-none">
              #{episodeNumber}
            </span>
          )}
          <h3 className="text-white font-black text-xl leading-snug">{episodeTitle}</h3>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-6 pb-1">
        <div
          className="relative h-2 bg-white/10 rounded-full cursor-pointer group"
          onClick={seek}
        >
          <div
            className="absolute top-0 right-0 h-full bg-yellow-400 rounded-full"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ right: `${progress}%`, transform: "translate(50%, -50%)" }}
          />
        </div>
      </div>

      {/* Time */}
      <div className="flex justify-between px-6 pt-2.5 pb-5 text-sm text-white/60">
        <span>{formatTime(currentTime)}</span>
        <span>{duration > 0 ? formatTime(duration) : "--:--"}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-7 pb-7">
        <button
          onClick={() => skip(-15)}
          className="flex flex-col items-center gap-0.5 text-white/50 hover:text-white transition-colors"
          aria-label="אחורה 15 שניות"
        >
          <SkipBack className="w-6 h-6" />
          <span className="text-[9px] font-bold">15</span>
        </button>

        <button
          onClick={togglePlay}
          className="w-16 h-16 rounded-full bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-zinc-950 flex items-center justify-center transition-all shadow-xl shadow-yellow-400/20"
          aria-label={playing ? "השהה" : "נגן"}
        >
          {playing ? (
            <Pause className="w-7 h-7" fill="currentColor" />
          ) : (
            <Play className="w-7 h-7 mr-[-3px]" fill="currentColor" />
          )}
        </button>

        <button
          onClick={() => skip(30)}
          className="flex flex-col items-center gap-0.5 text-white/50 hover:text-white transition-colors"
          aria-label="קדימה 30 שניות"
        >
          <SkipForward className="w-6 h-6" />
          <span className="text-[9px] font-bold">30</span>
        </button>

        <button
          onClick={toggleMute}
          className="text-white/50 hover:text-white transition-colors"
          aria-label={muted ? "בטל השתקה" : "השתק"}
        >
          {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
