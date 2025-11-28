'use client';

import Image from "next/image";
import { LoginForm } from "../LoginForm";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface LoginPageContentProps {
    dark:boolean;
}

export function LoginPageContent({ dark }:LoginPageContentProps) {
    
    useGSAP(() => {
        const tl = gsap.timeline({defaults: { duration:0.4, stagger:0.3, ease:'sine.inOut' }});

        tl.fromTo('.logo', { opacity:0, y:-20 }, { opacity:1, y:0 });
        tl.fromTo('.welcome', { opacity:0, x:-20 }, { opacity:1, x:0 });
    }, []);
    
    return (
        <>
            <div className={`px-4 w-full min-h-screen flex flex-col gap-3 justify-center items-center transition-all duration-500 ${dark ? 'bg-[#202020] text-white' : 'bg-[#fbfbfb] text-black'}`}>
                <Image className="logo" src="/icon-192x192.png" width={192} height={192} alt="logo da sorveteria" />
                <div className="flex flex-col gap-3">
                    <h1 className="welcome text-xl text-center font-bold">Bem vindo</h1>
                    <LoginForm />
                </div>
            </div>
        </>
    )
}