'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiFileText, PiHouse, PiPackage } from "react-icons/pi";

interface NavBarContentProps {
    dark: boolean;
}

export function NavBarContent({ dark }: NavBarContentProps) {
    const pathname = usePathname();

    return (
        <>
            <nav className={`${dark ? 'bg-[#242424] text-white' : 'bg-white'} w-full h-16 fixed shadow-lg z-50 bottom-0 left-0 right-0 ${pathname === '/' ? 'hidden' : 'flex'} justify-between`}>
                <Link href="/home" className="flex-1 font-bold flex justify-center items-center flex-col gap-3 px-4 transition-all duration-500 hover:bg-yellow-500 hover:text-white">
                    <PiHouse />
                    Home
                </Link>
                {/* <div onClick={() => setIsOpenModal(true)} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ml-auto w-10 h-10 -mt-6 shadow-lg rounded-full cursor-pointer ${dark ? 'bg-[#292929]' : 'bg-white'} grid place-items-center transition-all duration-500 font-bold text-xl hover:bg-amber-500 hover:text-white`}>
                    <PiPlus />
                </div> */}
                <Link href="/inventory" className="flex-1 font-bold flex flex-col gap-3 px-4 justify-center items-center transition-all duration-500 hover:bg-yellow-500 hover:text-white">
                    <PiPackage />
                    Estoque
                </Link>
                <Link href="/reports" className="flex-1 font-bold flex flex-col gap-3 px-4 justify-center items-center transition-all duration-500 hover:bg-yellow-500 hover:text-white">
                    <PiFileText />
                    Relatórios
                </Link>
            </nav>

        </>
    )
}