"use client";

import { saveAsPlaylist } from "@/app/lib/actions";
import { useLocalStorageContext } from "@/app/lib/contexts/localStorage";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SavePlaylistButton() {
  const { recommendations } = useLocalStorageContext();
  //   const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const recommendationsUri = recommendations.map((track) => track.uri);
  const handlePlaylistSave = async () => {
    await saveAsPlaylist(recommendationsUri);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <button
      className="bg-zinc-900 p-2 text-zinc-100 rounded-md flex items-center gap-2"
      onClick={handlePlaylistSave}
    >
      <SquaresPlusIcon className="h-5 w-5" />
      {success ? "Saved!" : "Save to Playlist"}
    </button>
  );
}
