"use client";

import { ReactNode } from "react";
import { CurrentlyPlaying, SearchRes } from "./lib/definitions";
import { useLocalStorage } from "./lib/hooks/useLocalStorage";
import { LocalStorageContext } from "./lib/contexts/localStorage";
import { Track } from "@spotify/web-api-ts-sdk";

export function Providers({ children }: { children: ReactNode }) {
  const [storage, setStorage] = useLocalStorage<SearchRes>(
    "selectedTracks",
    []
  );
  const [recommendations, setRecommendations] = useLocalStorage<Track[]>(
    "recommendations",
    []
  );
  const [currentlyPlaying, setCurrentlyPlaying] =
    useLocalStorage<CurrentlyPlaying>("currentlyPlaying", []);
  return (
    <LocalStorageContext.Provider
      value={{
        storage,
        setStorage,
        recommendations,
        setRecommendations,
        currentlyPlaying,
        setCurrentlyPlaying,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
}
