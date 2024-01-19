"use client";

import { useLocalStorageContext } from "@/app/lib/contexts/localStorage";
import { PlayIcon } from "@heroicons/react/24/outline";

export default function TrackPlayButton({ url }: { url: string }) {
  const { setCurrentlyPlaying } = useLocalStorageContext();
  const playSound = () => {
    setCurrentlyPlaying({ url });
  };

  return (
    <button onClick={playSound} className="flex items-center gap-2">
      <PlayIcon className="h-5 w-5" />
      <p>Preview</p>
    </button>
  );
}
