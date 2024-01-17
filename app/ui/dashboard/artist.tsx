import { Artist } from "@spotify/web-api-ts-sdk";
import Image from "next/image";

export default function Artist({ artist }: { artist: Artist }) {
  return (
    <div>
      <p>{artist.name}</p>
      <p>{artist.popularity}</p>
      <p>{artist.followers.total}</p>
      <Image
        src={artist.images[0].url}
        width={200}
        height={200}
        alt={`${artist.name}'s profile pic`}
      />
    </div>
  );
}
