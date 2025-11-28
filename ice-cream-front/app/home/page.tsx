
'use server';

import { HomePageContent } from "@/components/HomePageContent";
import { isDarkMode } from "@/services/darkMode";
import { getSales } from "@/services/getSales";

export default async function Home() {
    const data = await getSales();
    const dark = await isDarkMode();
    
    return (
        <>
          <HomePageContent dark={dark} data={data} />  
        </>
    )
}