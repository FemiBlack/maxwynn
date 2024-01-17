import { getTopTracks } from "@/app/lib/actions";
import { TimeRange } from "@/app/lib/definitions";
import Track from "@/app/ui/dashboard/track";

export default async function TopTracks({
  timeRange,
  currentPage,
}: {
  timeRange?: TimeRange;
  currentPage: number;
}) {
  const limit = 20;
  const offset = currentPage * limit - limit;
  const tracks = await getTopTracks({ timeRange, offset });

  return (
    <>
      {tracks.items?.map((track) => (
        <Track track={track} key={track.id} />
      ))}
    </>
  );
}
