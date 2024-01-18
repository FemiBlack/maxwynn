"use client";

import { SearchKeys, SearchRes } from "@/app/lib/definitions";
import { Artist, Image } from "@spotify/web-api-ts-sdk";
import { useLocalStorageContext } from "@/app/lib/contexts/localStorage";

type ParsedItem = {
  id: string;
  images: Image[];
  image?: string;
  name: string;
  artists?: Artist[];
};
export default function AddButton({
  title,
  item,
}: {
  item: ParsedItem;
  title: string;
}) {
  const { storage: value, setStorage: setValue } =
    useLocalStorageContext<SearchRes>();

  const maxedOut = Object.entries(value).flatMap((i) => [...i[1]]).length >= 5;

  const handleAdd = (title: SearchKeys, item: ParsedItem) => {
    setValue((s) => {
      console.log("exists", s);
      console.log({
        // ...s,
        [title]: [...(s[title] || []), item],
      });
      return {
        ...s,
        [title]: [...(s[title] || []), item],
      };
    });
  };

  return (
    <button
      disabled={maxedOut}
      className="bg-zinc-300 py-1 px-4 rounded-full disabled:opacity-30 disabled:pointer-events-none"
      onClick={() => handleAdd(title as SearchKeys, item)}
    >
      Add
    </button>
  );
}
