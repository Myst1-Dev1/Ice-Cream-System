'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiFileText, PiHouse, PiPlus } from "react-icons/pi";
import { Modal } from "../Modal";
import { useActionState, useState } from "react";
import { createSale } from "@/actions/saleActions";
import { Loading } from "../loading";

export function NavBar() {
    const [isOpenModal, setIsOpenModal] = useState(false)

    async function actionSale(prevState: { success: boolean; message?: string }, formData: FormData) {
        const result = await createSale(prevState, formData);
        
        if (result.success) {
            setIsOpenModal(false);
        }

        return result;
    }

    const [ formState, formAction, pending ] = useActionState(actionSale, { success: false })

    const pathname = usePathname();

    const isDark =
    typeof document !== "undefined" &&
    document.cookie.includes("dark=true");
    
    return (
        <>
            <nav className={`${isDark ? 'bg-[#242424] text-white' : 'bg-white'} w-full h-16 fixed shadow-lg z-50 bottom-0 left-0 right-0 ${pathname === '/' ? 'hidden' : 'flex'} justify-between`}>
                <Link href="/home" className="font-bold flex justify-center items-center flex-col gap-3 px-4 transition-all duration-500 hover:bg-yellow-500 hover:text-white">
                    <PiHouse />
                    Home
                </Link>
                <div onClick={() => setIsOpenModal(true)} className={`w-10 h-10 -mt-6 shadow-lg rounded-full cursor-pointer ${isDark ? 'bg-[#252525]' : 'bg-white'} grid place-items-center transition-all duration-500 font-bold text-xl hover:bg-amber-500 hover:text-white`}>
                    <PiPlus />
                </div>
                <Link href="/reports" className="font-bold flex flex-col gap-3 px-4 justify-center items-center transition-all duration-500 hover:bg-yellow-500 hover:text-white">
                    <PiFileText />
                    Relatórios
                </Link>
            </nav>

            <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
                <div>
                    <h1 className="text-xl text-center font-bold">Cadastre uma nova venda</h1>
                    <form action={formAction} className="py-12 grid grid-cols-1 gap-4">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="category" className="font-semibold">Categoria</label>
                            <input type="text" name="category" placeholder="Copo, picole eskimo" className="w-full p-3 border border-gray-300 rounded-md outline-none" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="flavor" className="font-semibold">Sabor</label>
                            <input type="text" name="flavor" placeholder="Chocolate" className="w-full p-3 border border-gray-300 rounded-md outline-none" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="price" className="font-semibold">Preço</label>
                            <input type="text" name="price" placeholder="Copo, picole eskimo" className="w-full p-3 border border-gray-300 rounded-md outline-none" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="type" className="font-semibold">Especifique a operação</label>
                            <input type="text" name="type" placeholder="venda ou entrada" className="w-full p-3 border border-gray-300 rounded-md outline-none" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="amount" className="font-semibold">Quantidade</label>
                            <input type="number" name="amount" placeholder="Não especificar se for apenas 1" className="w-full p-3 border border-gray-300 rounded-md outline-none" />
                        </div>
                        {formState.success === false ? <p className="text-center py-3 text-red-700 font-semibold">{formState.message}</p> : ''}
                        <button className="cursor-pointer bg-yellow-500 text-white w-full rounded-lg text-xl font-bold p-3 transition-all duration-500 hover:brightness-90">
                            {pending ? <Loading /> : 'Enviar'}
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    )
}