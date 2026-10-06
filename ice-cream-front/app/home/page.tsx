
'use server';

import { HomePageContent } from "@/components/HomePageContent";
import { isDarkMode } from "@/services/darkMode";
import { getItens } from "@/services/getItens";
import { getSales } from "@/services/getSales";

export default async function Home() {
  const data = await getSales();
  const dark = await isDarkMode();

  const inventory = await getItens();

  return (
    <>
      <HomePageContent dark={dark} data={data} inventory={inventory} />
    </>
  )
}