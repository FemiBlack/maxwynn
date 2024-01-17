import { getTopArtists } from "@/app/lib/actions";
import Artist from "@/app/ui/dashboard/artist";

export default async function TopArtists() {
  const artists = await getTopArtists();

  return (
    <div>
      <h2 className="font-bold text-2xl">Top Artists</h2>
      {artists.items?.map((artist) => (
        <Artist artist={artist} key={artist.id} />
      ))}
    </div>
  );
}
