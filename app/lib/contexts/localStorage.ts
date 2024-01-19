"use client";

import { Track } from "@spotify/web-api-ts-sdk";
import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { CurrentlyPlaying } from "../definitions";

type LocalStorageType<T> = {
  storage: T;
  setStorage: Dispatch<SetStateAction<T>>;
  setRecommendations: Dispatch<SetStateAction<Track[]>>;
  recommendations: Track[];
  currentlyPlaying: CurrentlyPlaying;
  setCurrentlyPlaying: Dispatch<CurrentlyPlaying>;
};

export const LocalStorageContext = createContext<LocalStorageType<any>>(
  undefined as any
);

export const useLocalStorageContext = <T>() => {
  const context = useContext<LocalStorageType<T>>(LocalStorageContext);
  if (context === undefined) {
    // assert if context is available
    throw new Error("No context provided");
  }
  return context;
};
