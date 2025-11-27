'use server';

import { isDarkMode } from "@/services/darkMode";
import { HeaderContent } from "./HeaderContent";

export async function Header() {
    const dark = await isDarkMode();

    return (
        <>
            <HeaderContent dark={dark} />
        </>
    )
}