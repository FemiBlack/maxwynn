"use client";

import { Image as SpotifyImage, Artist } from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import { SearchKeys, SearchRes } from "../../../lib/definitions";
import { useLocalStorageContext } from "../../../lib/contexts/localStorage";

type ParsedItem = {
  id: string;
  images: SpotifyImage[];
  image?: string;
  name: string;
  artists?: Artist[];
};

export default function RecommendationResults() {
  const { recommendations } = useLocalStorageContext();

  return (
    <>
      <h3 className="font-semibold text-lg">Tracks</h3>
      {recommendations ? (
        <div className="max-h-96 overflow-auto">
          {recommendations.map((track) => (
            <div className="grid gap-3 mt-2" key={track.id}>
              <div className="flex gap-2 items-center">
                <Image
                  src={track.album.images.at(-1)?.url || "/amw-logo.png"}
                  alt="track image"
                  className="rounded-full aspect-square object-cover h-8 w-8"
                  width={32}
                  height={32}
                />
                <div>
                  <p>{track.name}</p>
                  <p className="text-sm text-zinc-400">
                    {track.artists?.map((a) => a.name).join(", ")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No results</p>
      )}
    </>
  );
}
