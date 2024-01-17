"use client";

import {
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import SpotifyLogo from "../ui/spotify-logo";
import { useRef, useState } from "react";
import { authenticate } from "../lib/actions";

export default function Page() {
  const audioRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(true);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsPaused(!audioRef.current.paused);
    }
  };
  return (
    <main className="grid place-items-center place-content-center h-screen">
      <video
        className="fixed object-cover w-full h-full -z-10"
        autoPlay
        muted
        loop
        ref={audioRef}
      >
        <source src="/drake-og-vid.mp4" type="video/mp4" />
      </video>
      <form action={authenticate} className="flex flex-col items-center">
        <div className="flex gap-3">
          <button
            className="rounded-full bg-zinc-900/50 h-20 w-20 flex justify-center items-center"
            type="button"
            onClick={toggleMute}
          >
            {isMuted ? (
              <SpeakerXMarkIcon className="h-16 w-16 text-gray-100" />
            ) : (
              <SpeakerWaveIcon className="h-16 w-16 text-gray-100" />
            )}
          </button>
          <button
            className="rounded-full bg-zinc-900/50 h-20 w-20 flex justify-center items-center"
            type="button"
            onClick={togglePlay}
          >
            {isPaused ? (
              <PauseIcon className="h-16 w-16 text-gray-100" />
            ) : (
              <PlayIcon className="h-16 w-16 text-gray-100" />
            )}
          </button>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <Image
            src="/amw-logo.png"
            alt="AMW Logo"
            width={100}
            height={100}
            priority
          />
          <button
            type="submit"
            className="bg-green-400 rounded-full p-4 text-zinc-100 font-bold text-2xl flex gap-2 items-center"
          >
            <SpotifyLogo />
            Login with Spotify
          </button>
        </div>
      </form>
    </main>
  );
}
