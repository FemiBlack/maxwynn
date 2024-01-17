import { Artist } from "@spotify/web-api-ts-sdk";
import Image from "next/image";

export default function Artist({ artist }: { artist: Artist }) {
  return (
    <article className="p-3 bg-zinc-100 rounded-lg grid place-items-center">
      <div className="min-w-0 w-full">
        <Image
          src={artist.images[0].url}
          width={200}
          height={200}
          className="rounded-full aspect-square object-cover"
          alt={`${artist.name}'s profile pic`}
        />
        <p className="font-semibold text-lg mt-3 truncate text-center">
          {artist.name}
        </p>
      </div>
    </article>
  );
}
