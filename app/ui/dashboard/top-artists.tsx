import { getTopArtists } from "@/app/lib/actions";
import Artist from "@/app/ui/dashboard/artist";

export default async function TopArtists() {
  const artists = await getTopArtists();

  return (
    <>
      {artists.items?.map((artist) => (
        <Artist artist={artist} key={artist.id} />
      ))}
    </>
  );
}
