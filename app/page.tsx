import HomeHero from "@/components/custom/HomeHero";
import HomeHeader from "@/components/custom/HomeHeader";
import HomeStep from "@/components/custom/HomeStep";
import HomeData from "@/components/custom/HomeData";
import HomeContact from "@/components/custom/HomeContact";
import HomeFooter from "@/components/custom/HomeFooter";
import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();
  if (user?.data === null) return redirect("/sign-in");
  const currentUser = user?.data;

  return (
    <div>
      <HomeHeader user={currentUser} />
      <HomeHero user={currentUser} />
      <HomeStep />
      <HomeData />
      <HomeContact />
      <HomeFooter />
    </div>
  );
}
