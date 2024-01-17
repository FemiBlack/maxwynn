import { auth, signOut } from "@/auth";
import Image from "next/image";
import {
  ArrowRightEndOnRectangleIcon,
  GiftIcon,
  SpeakerWaveIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { MusicalNoteIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="p-6 bg-zinc-100 rounded-lg flex flex-col items-center">
      <Image
        src="/amw-logo.png"
        alt="AMW Logo"
        width={100}
        height={24}
        priority
      />
      <div className="p-3 bg-zinc-300 rounded-md flex items-center gap-4 mt-3">
        <button className="rounded-full bg-zinc-900 h-8 w-8 flex justify-center items-center">
          <SpeakerWaveIcon className="h-5 w-5 text-gray-100" />
        </button>
        <p>
          Logged in as{" "}
          <span className="font-medium">{session?.user?.name} </span>
        </p>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            type="submit"
            className="flex items-center gap-2 bg-zinc-900 text-gray-100 p-2 rounded-md"
          >
            Logout
            <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
      <div className="flex justify-around w-full items-center">
        <Link
          href="/dashboard/tracks"
          className="flex items-center gap-2 p-2 rounded-md mt-2 hover:font-semibold"
        >
          <MusicalNoteIcon className="h-5 w-5" />
          Top Tracks
        </Link>
        <Link
          href="/dashboard/artists"
          className="flex items-center gap-2 p-2 rounded-md mt-2 hover:font-semibold"
        >
          <UsersIcon className="h-5 w-5" />
          Top Artists
        </Link>
        <p className="flex items-center gap-2 p-2 rounded-md mt-2">
          <GiftIcon className="h-5 w-5" />
          Recommendations
        </p>
      </div>
    </nav>
  );
}
