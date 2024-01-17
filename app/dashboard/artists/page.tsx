import TopArtists from "@/app/ui/dashboard/top-artists";
import { TrackCardsSkeleton } from "@/app/ui/skeleton";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="mt-8">
      <h2 className="font-bold text-2xl">Top Artists</h2>
      <div className="grid grid-cols-6 gap-4 mt-3">
        <Suspense fallback={<TrackCardsSkeleton />}>
          <TopArtists />
        </Suspense>
      </div>
    </div>
  );
}
