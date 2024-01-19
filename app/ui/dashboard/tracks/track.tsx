import { Track } from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import TrackPlayButton from "./track-play-button";

export default function Track({ track }: { track: Track }) {
  return (
    <article className="p-3 bg-zinc-100 rounded-lg grid place-items-center">
      <div className="min-w-0 w-full">
        <Image
          src={track.album.images[0].url}
          alt={`${track.name}' album cover`}
          className="rounded-md w-full"
          width={200}
          height={150}
        />
        <p className="font-semibold text-lg mt-3 truncate">{track.name}</p>
        <p className="text-zinc-400 truncate">
          {track.artists.map((a) => a.name).join(", ")}
        </p>
        <TrackPlayButton url={track.preview_url || ""} />
      </div>
    </article>
  );
}
