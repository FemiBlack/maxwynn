import { Providers } from "@/app/providers";
import GenerateButton from "@/app/ui/dashboard/recommendations/generate-button";
import Search from "@/app/ui/dashboard/search";
import SearchResults from "@/app/ui/dashboard/recommendations/search-results";
import SelectedResults from "@/app/ui/dashboard/recommendations/selected-results";
import { ItemTypes } from "@spotify/web-api-ts-sdk";
import RecommendationResults from "@/app/ui/dashboard/recommendations/recommendation-results";
import SavePlaylistButton from "@/app/ui/dashboard/recommendations/save-playlist-button";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    types?: string;
  };
}) {
  const query = searchParams?.query || "";
  const searchTypes = (searchParams?.types || "artist,track").split(
    ","
  ) as ItemTypes[];

  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">Get Recommendations</h2>
        {/* <div className="flex gap-8">
          <p>filter</p>
        </div> */}
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-3 gap-10">
          <Providers>
            <div>
              <p>Search for album, track or genre</p>
              <Search />

              <SearchResults query={query} types={searchTypes} />
              <p>Scroll in box</p>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <p>Selected tracks appear here (Max: 5)</p>
                <GenerateButton />
              </div>
              <SelectedResults />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <p>Generated tracks appear here</p>
                <SavePlaylistButton />
              </div>
              <RecommendationResults />
            </div>
          </Providers>
        </div>
      </div>
    </div>
  );
}
