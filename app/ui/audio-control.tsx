"use client";

import {
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useLocalStorageContext } from "../lib/contexts/localStorage";

export default function AudioControl() {
  const { currentlyPlaying } = useLocalStorageContext();

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLProgressElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  const [startTime, setStartTime] = useState<string>("00:00");
  const [endTime, setEndTime] = useState<string>("00:00");

  function calculateTotalValue(length: number) {
    const minutes = Math.floor(length / 60) || 0;
    const seconds_int = length - minutes * 60 || 0;
    const seconds_str = seconds_int.toString();
    const seconds = seconds_str.substring(0, 2);
    const time = (minutes < 10 ? "0" + minutes : minutes) + ":" + seconds;

    return time;
  }

  function calculateCurrentValue(currentTime: number) {
    const current_hour = parseInt(currentTime / 3600 + "") % 24;
    const current_minute = parseInt(currentTime / 60 + "") % 60 || 0;
    const current_seconds_long = currentTime % 60 || 0;
    const current_seconds = +current_seconds_long.toFixed();
    const current_time =
      (current_minute < 10 ? "0" + current_minute : current_minute) +
      ":" +
      (current_seconds < 10 ? "0" + current_seconds : current_seconds);

    return current_time;
  }

  const initProgressBar = () => {
    if (!audioRef.current) return;
    if (!progressBarRef.current) return;
    const audioLength = audioRef.current.duration;
    const current_time = audioRef.current.currentTime;

    // calculate total length of value
    const totalLength = calculateTotalValue(audioLength);
    setEndTime(totalLength);

    // calculate current value time
    const currentTime = calculateCurrentValue(current_time);
    setStartTime(currentTime);

    progressBarRef.current.value =
      audioRef.current.currentTime / audioRef.current.duration || 0;
    progressBarRef.current.addEventListener("click", seek);

    if (audioRef.current.currentTime == audioRef.current.duration) {
      setIsPaused(true);
    }

    function seek(this: HTMLProgressElement, evt: MouseEvent) {
      if (!audioRef.current) return;
      if (!progressBarRef.current) return;
      var percent = evt.offsetX / this.offsetWidth;
      audioRef.current.currentTime = percent * audioRef.current.duration!;
      progressBarRef.current.value = percent / 100;
    }
  };
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused && isPaused) {
      audioRef.current.play();
    }
    if (!audioRef.current.paused && !isPaused) {
      audioRef.current.pause();
    }
  };
  useEffect(() => {
    if (!audioRef.current) return;
    // TODO: Fix user permission bug on page load
    // FIX: don't play music immediately if it's a new page load
    audioRef.current.src = currentlyPlaying.url;
    audioRef.current.pause();
    audioRef.current.play();
  }, [currentlyPlaying]);
  return (
    <div className="fixed left-0 bottom-5 mx-auto w-full animate-slide-from-bottom">
      <div className="mx-auto w-1/3 p-5 bg-zinc-300 rounded-lg flex items-center gap-3">
        <button onClick={toggleMute}>
          {isMuted ? (
            <SpeakerXMarkIcon className="h-5 w-5" />
          ) : (
            <SpeakerWaveIcon className="h-5 w-5" />
          )}
        </button>
        <button onClick={togglePlay}>
          {isPaused ? (
            <PlayIcon className="h-5 w-5" />
          ) : (
            <PauseIcon className="h-5 w-5" />
          )}
        </button>
        <audio
          id="player"
          onTimeUpdate={initProgressBar}
          ref={audioRef}
          onPlay={() => setIsPaused(false)}
          onPause={() => setIsPaused(true)}
        >
          <source src="/drake-audio.mp3" type="audio/mp3" />
        </audio>
        <span id="seekObjContainer" className="flex w-full items-center gap-4">
          <small className="start-time">{startTime}</small>
          <progress
            ref={progressBarRef}
            id="seekObj"
            value="0"
            max="1"
            className="overflow-hidden rounded-full w-4/5 appearance-none bg-white text-blue-300 h-1 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-white [&::-webkit-progress-bar]:border [&::-webkit-progress-bar]:border-[lighten(#acacac,20%)] [&::-webkit-progress-bar]:text-blue-900 [&::-webkit-progress-value]:bg-blue-500 [&::-webkit-progress-value]:transition-all [&::-webkit-progress-value]:duration-100"
          ></progress>
          <small className="end-time">{endTime}</small>
        </span>
      </div>
    </div>
  );
}
