'use server';

import { isDarkMode } from "@/services/darkMode";
import { NavBarContent } from "./NavBarContent";

export async function NavBar() {
    const dark = await isDarkMode();
    
    return (
        <>
            <NavBarContent dark={dark} />
        </>
    )
}