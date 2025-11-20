import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="px-4 w-full min-h-screen flex flex-col gap-3 justify-center items-center">
        <Image src="/icon-192x192.png" width={192} height={192} alt="logo da sorveteria" />
        <div className="flex flex-col gap-3">
          <h1 className="text-xl text-center font-bold">Bem vindo</h1>
          <form action="" className="max-w-80">
            <input type="email" placeholder="Email" className="mb-3 w-full p-3 outline-none border border-gray-300 rounded-md" />
            <input type="password" placeholder="Senha" className="w-full p-3 outline-none border border-gray-300 rounded-md" />
            <button type="submit" className="button mt-5">Entrar</button>
          </form>
        </div>
      </div>
    </>
  );
}
