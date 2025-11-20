'use client';

import Image from "next/image";
import { usePathname } from "next/navigation";
import { PiMoonFill } from "react-icons/pi";

export function Header() {
    const pathname = usePathname();
    
    return (
        <>
            <header className={`border-b border-gray-300 px-3 w-full ${pathname === '/' ? 'hidden' : 'flex'} justify-between items-center`}>
                <Image className="w-16 object-cover" src="/icon-192x192.png" width={50} height={50} alt="logo da sorveteria" />
                <PiMoonFill />
            </header>
        </>
    )
}