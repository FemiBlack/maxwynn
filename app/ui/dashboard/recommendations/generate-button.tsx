"use client";

import { getRecommendations } from "@/app/lib/actions";
import { useLocalStorageContext } from "@/app/lib/contexts/localStorage";
import { SearchRes } from "@/app/lib/definitions";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function GenerateButton() {
  const { storage: result, setRecommendations } =
    useLocalStorageContext<SearchRes>();
  const handleRecommendations = async () => {
    const totalSeeds = Object.entries(result)
      .flatMap((i) => [...i[1]])
      .map((i) => i.id);

    const response = await getRecommendations({
      tracks: totalSeeds,
    });
    setRecommendations(response.tracks);
  };
  return (
    <button
      className="bg-zinc-900 p-2 text-zinc-100 rounded-md flex items-center gap-2"
      onClick={async () => {
        await handleRecommendations();
      }}
    >
      <Cog6ToothIcon className="h-5 w-5" />
      Generate
    </button>
  );
}
