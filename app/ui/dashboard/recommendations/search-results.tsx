import { searchItems } from "@/app/lib/actions";
import {
  Image as SpotifyImage,
  ItemTypes,
  Track as SpotifyTrack,
  Artist,
} from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import AddButton from "./add-button";

type ParsedItem = {
  id: string;
  images: SpotifyImage[];
  image?: string;
  name: string;
  artists?: Artist[];
};

export default async function SearchResults({
  query,
  types,
}: {
  query: string;
  types: ItemTypes[];
}) {
  console.log("To Fetch=>", types);

  const result = await searchItems({ query, types });

  return (
    <>
      {result ? (
        Object.entries(result).map(([title, res]) => (
          <div key={title}>
            <h3 className="font-semibold text-lg">
              {title[0].toUpperCase() + title.slice(1)}
            </h3>

            <div className="grid gap-3 mt-2 max-h-96 overflow-auto">
              {res.items.map((item) => {
                const parsedItem = {
                  id: item.id,
                  name: item.name,
                  images: (item as any).images,
                  artists: (item as any).artists,
                } as ParsedItem;
                if (title === "tracks") {
                  const t_item = item as SpotifyTrack;
                  parsedItem.image = t_item.album.images.at(-1)?.url;
                } else {
                  parsedItem.image = parsedItem.images.at(-1)?.url;
                }
                return (
                  <div
                    key={parsedItem.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex gap-2 items-center">
                      <Image
                        src={parsedItem.image || "/amw-logo.png"}
                        alt="item image"
                        className="rounded-full aspect-square object-cover h-8 w-8"
                        width={32}
                        height={32}
                      />
                      <div>
                        <p>{parsedItem.name}</p>
                        <p className="text-sm text-zinc-400">
                          {parsedItem.artists?.map((a) => a.name).join(", ")}
                        </p>
                      </div>
                    </div>
                    <AddButton item={parsedItem} title={title} />
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
