'use client';

import { clearDarkMode, setDarkMode } from "@/services/darkMode";
import Image from "next/image";
import { FaSun } from "react-icons/fa";
import { PiMoonFill } from "react-icons/pi";

interface HeaderContentProps {
    dark: boolean;
}

export function HeaderContent({ dark }:HeaderContentProps) {

    return (
        <>
            <header className={`${dark ? 'bg-[#202020]' : 'bg-[#fbfbfb]'} border-b border-gray-300 px-3 pt-1 w-full flex justify-between items-center`}>
                <Image className="w-16 object-cover" src="/icon-192x192.png" width={50} height={50} alt="logo da sorveteria" />
                {
                    dark ? <FaSun onClick={clearDarkMode} className="cursor-pointer text-xl text-white transition-all duration-500 hover:text-yellow-400" /> :
                    <PiMoonFill onClick={setDarkMode} className="cursor-pointer text-xl transition-all duration-500 hover:text-yellow-400" />
                }
            </header>
        </>
    )
}