import TopTracks from "@/app/ui/dashboard/top-tracks";
import { TrackCardsSkeleton } from "@/app/ui/skeleton";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="mt-8">
      <h2 className="font-bold text-2xl">Top Tracks</h2>
      <div className="grid grid-cols-6 gap-4 mt-3">
        <Suspense fallback={<TrackCardsSkeleton />}>
          <TopTracks />
        </Suspense>
      </div>
    </div>
  );
}
