"use client";

import { ReactNode } from "react";
import { SearchRes } from "./lib/definitions";
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
  return (
    <LocalStorageContext.Provider
      value={{ storage, setStorage, recommendations, setRecommendations }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
}
