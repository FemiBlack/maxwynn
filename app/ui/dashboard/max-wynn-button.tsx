"use client";

import { useLocalStorageContext } from "@/app/lib/contexts/localStorage";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";

export default function MaxWynnPlayButton() {
  const { setCurrentlyPlaying } = useLocalStorageContext();

  const playSound = () => {
    setCurrentlyPlaying({
      url: "/drake-audio.mp3",
    });
  };
  return (
    <button
      className="rounded-full bg-zinc-900 h-8 w-8 flex justify-center items-center"
      onClick={playSound}
    >
      <SpeakerWaveIcon className="h-5 w-5 text-gray-100" />
    </button>
  );
}
