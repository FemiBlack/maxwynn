"use client";

import { TimeRange } from "@/app/lib/definitions";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function TimeRangeFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilter = useDebouncedCallback((range: TimeRange) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (range) {
      params.set("time_range", range);
    } else {
      params.delete("time_range", range);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="time_range" className="font-medium">
        Filter By:
      </label>
      <select
        name="time_range"
        id="time_range"
        defaultValue="medium_term"
        className="p-3 border border-zinc-200 rounded-md"
        onChange={(e) => handleFilter(e.target.value as TimeRange)}
      >
        <option value="short_term">Last 4 weeks</option>
        <option value="medium_term">Last 6 months</option>
        <option value="long_term">All time</option>
      </select>
    </div>
  );
}
