import { getTopArtists } from "@/app/lib/actions";
import { TimeRange } from "@/app/lib/definitions";
import Artist from "@/app/ui/dashboard/artists/artist";

export default async function TopArtists({
  timeRange,
  currentPage,
}: {
  timeRange?: TimeRange;
  currentPage: number;
}) {
  const limit = 20;
  const offset = currentPage * limit - limit;
  const artists = await getTopArtists({ timeRange, offset });

  return (
    <>
      {artists.items?.map((artist) => (
        <Artist artist={artist} key={artist.id} />
      ))}
    </>
  );
}
