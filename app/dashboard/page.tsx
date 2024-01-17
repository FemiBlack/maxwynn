import TopTracks from "@/app/ui/dashboard/top-tracks";
import TopArtists from "@/app/ui/dashboard/top-artists";
import { TrackCardsSkeleton } from "../ui/skeleton";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div>
      <Suspense fallback={<TrackCardsSkeleton />}>
        <TopTracks />
      </Suspense>
      <TopArtists />
    </div>
  );
}
