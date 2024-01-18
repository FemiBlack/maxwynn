"use client";

import { ItemTypes } from "@spotify/web-api-ts-sdk";
import clsx from "clsx";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchTypePicker() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleType = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    const i = searchParams.get("types");
    if (i) {
      const paramsSplit = i.split(",");
      const alreadySet = paramsSplit.includes(term);

      if (alreadySet) {
        params.set("types", paramsSplit.filter((p) => p !== term).join(","));
      } else {
        params.set("types", [...paramsSplit, term].join(","));
      }
    } else {
      params.set("types", term);
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  interface SearchOptions {
    name: string;
    value: ItemTypes;
  }
  const types: SearchOptions[] = [
    {
      name: "Artist",
      value: "artist",
    },
    {
      name: "Track",
      value: "track",
    },
    {
      name: "Album",
      value: "album",
    },
  ];

  const isActive = (value: string) => {
    const params = searchParams.get("types");
    if (!params) return false;
    const paramsSplit = params.split(",");
    return paramsSplit.includes(value);
  };
  return (
    <div className="relative flex flex-1 flex-shrink-0 items-center gap-3 my-3">
      <p className="font-semibold">Filter By: </p>
      <div className="flex items-center gap-2">
        {types.map((type) => (
          <button
            onClick={() => handleType(type.value)}
            key={type.value}
            className={clsx("rounded-full py-1 px-5 bg-zinc-300 text-sm", {
              "bg-purple-300": isActive(type.value),
            })}
          >
            <p>{type.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
