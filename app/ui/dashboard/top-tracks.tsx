import { getTopTracks } from "@/app/lib/actions";
import Track from "@/app/ui/dashboard/track";

export default async function TopTracks() {
  const tracks = await getTopTracks();

  return (
    <>
      {tracks.items?.map((track) => (
        <Track track={track} key={track.id} />
      ))}
    </>
  );
}
