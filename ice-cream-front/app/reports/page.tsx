'use server';

import { getSales } from "@/services/getSales";
import { isDarkMode } from "@/services/darkMode";
import { ReportsContent } from "@/components/ReportsContent";

export default async function Reports() {
    const data = await getSales();
    const dark = await isDarkMode();

    return (
        <div className={`px-3 py-8 mb-16 transition-all duration-500 ${dark ? 'bg-[#242424] text-white min-h-screen' : 'bg-[#fbfbfb] text-black'}`}>
            <ReportsContent data={data} dark={dark} />
        </div>
    );
}