'use server';

import { LoginForm } from "@/components/LoginForm";
import { isDarkMode } from "@/services/darkMode";
import Image from "next/image";

export default async function Home() {
  const dark = await isDarkMode();

  return (
    <>
      <div className={`px-4 w-full min-h-screen flex flex-col gap-3 justify-center items-center transition-all duration-500 ${dark ? 'bg-[#202020] text-white' : 'bg-[#fbfbfb] text-black'}`}>
        <Image src="/icon-192x192.png" width={192} height={192} alt="logo da sorveteria" />
        <div className="flex flex-col gap-3">
          <h1 className="text-xl text-center font-bold">Bem vindo</h1>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
