import { Providers } from "../providers";
import AudioControl from "../ui/audio-control";
import Navbar from "../ui/dashboard/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <main className="p-6">
        <Navbar />
        {children}
        <AudioControl />
      </main>
    </Providers>
  );
}
