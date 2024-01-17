import { signIn } from "@/auth";

export default function Page() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("spotify");
      }}
    >
      <button type="submit">Sign In with spotify</button>
    </form>
  );
}
