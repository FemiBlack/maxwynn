import { getTopArtists } from "@/app/lib/actions";
import { TimeRange } from "@/app/lib/definitions";
import Pagination from "@/app/ui/dashboard/pagination";
import TimeRangeFilter from "@/app/ui/dashboard/time-range-filter";
import TopArtists from "@/app/ui/dashboard/top-artists";
import { TrackCardsSkeleton } from "@/app/ui/skeleton";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    time_range?: string;
    page?: string;
  };
}) {
  const timeRange = searchParams?.time_range as TimeRange;
  const currentPage = Number(searchParams?.page) || 1;

  const { total, limit } = await getTopArtists({ timeRange });
  const totalPages = Math.round(total / limit);

  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">Top Artists</h2>
        <div className="flex gap-8">
          <TimeRangeFilter />
          <Pagination totalPages={totalPages} />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 mt-3">
        <Suspense fallback={<TrackCardsSkeleton />}>
          <TopArtists timeRange={timeRange} currentPage={currentPage} />
        </Suspense>
      </div>
    </div>
  );
}
