'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiArrowDownRightFill, PiFileText, PiHouse, PiPlus, PiShoppingCartFill, PiStorefrontFill } from "react-icons/pi";
import { Modal } from "../Modal";
import { useState } from "react";

export function NavBar() {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [formType, setFormType] = useState('btns');

    const pathname = usePathname();
    
    return (
        <>
            <nav className={`bg-white w-full h-16 fixed shadow-lg z-50 bottom-0 left-0 right-0 ${pathname === '/' ? 'hidden' : 'flex'} justify-between`}>
                <Link href="/home" className="font-bold flex justify-center items-center flex-col gap-3 px-4 transition-all duration-500 hover:bg-yellow-500 hover:text-white">
                    <PiHouse />
                    Home
                </Link>
                <div onClick={() => setIsOpenModal(true)} className="w-10 h-10 -mt-6 shadow-lg rounded-full cursor-pointer bg-white grid place-items-center transition-all duration-500 font-bold text-xl hover:bg-amber-500 hover:text-white">
                    <PiPlus />
                </div>
                <Link href="/reports" className="font-bold flex flex-col gap-3 px-4 justify-center items-center transition-all duration-500 hover:bg-yellow-500 hover:text-white">
                    <PiFileText />
                    Relatórios
                </Link>
            </nav>

            <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} type = {setFormType}>
                {formType === 'btns' &&
                <div className="flex gap-5 min-h-screen justify-center items-center">
                    <button onClick={() => setFormType('venda')} className="px-2 py-3 w-fit text-sm rounded-full font-bold flex items-center gap-4 bg-green-500 text-white cursor-pointer transition-all duration-500 hover:brightness-90">Nova Venda <PiShoppingCartFill size={18} /></button>
                    <button onClick={() => setFormType('saida')} className="px-2 py-3 w-fit text-sm rounded-full font-bold flex items-center gap-4 bg-blue-500 text-white cursor-pointer transition-all duration-500 hover:brightness-90">Nova Compra <PiStorefrontFill size={18} /></button>
                </div>
                }
                {formType === 'venda' &&
                <div>
                    <h1 className="text-xl text-center font-bold">Cadastre uma nova venda</h1>
                    <form action="" className="py-12 grid grid-cols-1 gap-4">
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
                            <label htmlFor="amount" className="font-semibold">Quantidade</label>
                            <input type="number" name="amount" placeholder="Copo, picole eskimo" className="w-full p-3 border border-gray-300 rounded-md outline-none" />
                        </div>
                        <button className="cursor-pointer bg-yellow-500 text-white w-full rounded-lg text-xl font-bold p-3 transition-all duration-500 hover:brightness-90">Enviar</button>
                    </form>
                </div>
                }

                {formType === 'saida' &&
                <div>
                    <h1 className="text-xl text-center font-bold">Cadastre uma nova compra</h1>
                    <form action="" className="py-12 grid grid-cols-1 gap-4">
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
                            <label htmlFor="amount" className="font-semibold">Quantidade</label>
                            <input type="number" name="amount" placeholder="Copo, picole eskimo" className="w-full p-3 border border-gray-300 rounded-md outline-none" />
                        </div>
                        <button className="cursor-pointer bg-yellow-500 text-white w-full rounded-lg text-xl font-bold p-3 transition-all duration-500 hover:brightness-90">Enviar</button>
                    </form>
                </div>
                }
            </Modal>
        </>
    )
}