import HomeHero from "@/components/custom/HomeHero";
import { getUser } from "./(auth)/GetUser";
import HomeHeader from "@/components/custom/HomeHeader";
import HomeStep from "@/components/custom/HomeStep";
import HomeData from "@/components/custom/HomeData";

export default async function Home() {
  const user = await getUser();

  return (
    <div>
      <HomeHeader user={user} />
      <HomeHero user={user} />
      <HomeStep />
      <HomeData />
    </div>
  );
}
