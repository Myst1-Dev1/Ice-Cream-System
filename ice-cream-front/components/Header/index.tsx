'use client';

import { clearDarkMode, setDarkMode } from "@/services/darkMode";
import Image from "next/image";
import { FaSun } from "react-icons/fa";
import { PiMoonFill } from "react-icons/pi";

export function Header() {

    const isDark =
    typeof document !== "undefined" &&
    document.cookie.includes("dark=true");

    return (
        <>
            <header className={`${isDark ? 'bg-[#202020]' : 'bg-[#fbfbfb]'} border-b border-gray-300 px-3 pt-1 w-full flex justify-between items-center`}>
                <Image className="w-16 object-cover" src="/icon-192x192.png" width={50} height={50} alt="logo da sorveteria" />
                {
                    isDark ? <FaSun onClick={clearDarkMode} className="cursor-pointer text-xl text-white transition-all duration-500 hover:text-yellow-400" /> :
                    <PiMoonFill onClick={setDarkMode} className="cursor-pointer text-xl transition-all duration-500 hover:text-yellow-400" />
                }
            </header>
        </>
    )
}