import Navbar from "../ui/dashboard/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="px-6">
      <Navbar />
      {children}
    </main>
  );
}
