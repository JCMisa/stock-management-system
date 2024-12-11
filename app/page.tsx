import Link from "next/link";
import { getUser } from "./(auth)/GetUser";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  const user = await getUser();

  return (
    <div>
      {user === null ? <Link href={"/sign-in"}>Sign in</Link> : <UserButton />}
    </div>
  );
}
