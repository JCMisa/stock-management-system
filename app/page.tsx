import HomeHero from "@/components/custom/HomeHero";
import { getUser } from "./(auth)/GetUser";
import HomeHeader from "@/components/custom/HomeHeader";
import HomeStep from "@/components/custom/HomeStep";
import HomeData from "@/components/custom/HomeData";
import HomeContact from "@/components/custom/HomeContact";
import HomeFooter from "@/components/custom/HomeFooter";

export default async function Home() {
  const user = await getUser();

  return (
    <div>
      <HomeHeader user={user} />
      <HomeHero user={user} />
      <HomeStep />
      <HomeData />
      <HomeContact />
      <HomeFooter />
    </div>
  );
}
