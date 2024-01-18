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

export default function SelectedResults() {
  const { storage: result, setStorage: setValue } =
    useLocalStorageContext<SearchRes>();
  const handleRemove = (title: SearchKeys, id: string) => {
    setValue((s) => {
      return {
        ...s,
        [title]: s[title]?.filter((i) => i.id !== id),
      };
    });
  };

  return (
    <>
      {result ? (
        Object.entries(result).map(([title, res]) => (
          <div key={title}>
            <h3 className="font-semibold text-lg">
              {title[0].toUpperCase() + title.slice(1)}
            </h3>
            <div className="grid gap-3 mt-2">
              {res.map((i) => {
                const item = i as ParsedItem;
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex gap-2 items-center">
                      <Image
                        src={item.image || "/amw-logo.png"}
                        alt="item image"
                        className="rounded-full aspect-square object-cover h-8 w-8"
                        width={32}
                        height={32}
                      />
                      <div>
                        <p>{item.name}</p>
                        <p className="text-sm text-zinc-400">
                          {item.artists?.map((a) => a.name).join(", ")}
                        </p>
                      </div>
                    </div>
                    <button
                      className="bg-zinc-300 py-1 px-4 rounded-full"
                      onClick={() => handleRemove(title as SearchKeys, item.id)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <p>No results</p>
      )}
    </>
  );
}
