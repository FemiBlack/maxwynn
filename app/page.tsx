import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image
        src="/amw-logo.png"
        alt="AMW Logo"
        // className="dark:invert"
        width={100}
        height={24}
        priority
      />

      <p>I have no clue what i started off here, but please..</p>
      <Link href="/login" className="py-3 px-8 bg-green-400 rounded-full">
        Login
      </Link>
    </main>
  );
}
