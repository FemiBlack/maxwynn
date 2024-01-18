"use client";

import {
  MusicalNoteIcon,
  UsersIcon,
  GiftIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  { name: "Top Tracks", href: "/dashboard/tracks", icon: MusicalNoteIcon },
  {
    name: "Top Artists",
    href: "/dashboard/artists",
    icon: UsersIcon,
  },
  {
    name: "Recommendations",
    href: "/dashboard/recommendations",
    icon: GiftIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex items-center gap-2 p-2 rounded-md mt-2 hover:font-semibold",
              {
                "font-semibold": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-5 h-5" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
