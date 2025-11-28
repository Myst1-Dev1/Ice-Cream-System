'use client';

import { clearDarkMode, setDarkMode } from "@/services/darkMode";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { FaSun } from "react-icons/fa";
import { PiMoonFill } from "react-icons/pi";

interface HeaderContentProps {
    dark: boolean;
}

export function HeaderContent({ dark }:HeaderContentProps) {

    useGSAP(() => {
        const tl = gsap.timeline({defaults: { duration:0.4, stagger:0.5, ease:'sine.inOut' }});

        tl.fromTo('.logo-header', { opacity:0, y:-20 }, { opacity:1, y:0 });
        tl.fromTo('.icon', { opacity:0, x:-20 }, { opacity:1, x:0 });
    }, []);

    return (
        <>
            <header className={`${dark ? 'bg-[#202020]' : 'bg-[#fbfbfb]'} border-b border-gray-300 px-3 pt-1 w-full flex justify-between items-center`}>
                <Image className="logo-header w-16 object-cover" src="/logo.png" width={50} height={50} alt="logo da sorveteria" />
                {
                    dark ? <FaSun onClick={clearDarkMode} className="icon cursor-pointer text-xl text-white transition-all duration-500 hover:text-yellow-400" /> :
                    <PiMoonFill onClick={setDarkMode} className="icon cursor-pointer text-xl transition-all duration-500 hover:text-yellow-400" />
                }
            </header>
        </>
    )
}