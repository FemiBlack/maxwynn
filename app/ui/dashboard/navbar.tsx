import { auth, signOut } from "@/auth";
import Image from "next/image";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import NavLinks from "./nav-links";
import MaxWynnPlayButton from "./max-wynn-button";

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
        <MaxWynnPlayButton />
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
        <NavLinks />
      </div>
    </nav>
  );
}
