import { getTopTracks } from "@/app/lib/actions";
import Track from "@/app/ui/dashboard/track";

export default async function TopTracks() {
  const tracks = await getTopTracks();

  return (
    <div>
      <h2 className="font-bold text-2xl">Top Tracks</h2>
      <div className="grid grid-cols-6 gap-4 mt-3">
        {tracks.items?.map((track) => (
          <Track track={track} key={track.id} />
        ))}
      </div>
    </div>
  );
}
