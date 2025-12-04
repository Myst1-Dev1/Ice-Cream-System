'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiFileText, PiHouse, PiPlus } from "react-icons/pi";
import { Modal } from "../../Modal";
import { useActionState, useRef, useState } from "react";
import { createSale } from "@/actions/saleActions";
import { Loading } from "../../loading";
import { handleMoneyChange } from "@/utils/moneyMask";
import { toast } from "react-toastify";

interface NavBarContentProps {
    dark: boolean;
}

export function NavBarContent({ dark }:NavBarContentProps) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [category, setCategory] = useState("");

    const formRef = useRef<HTMLFormElement>(null);

    async function actionSale(prevState: { success: boolean; message?: string }, formData: FormData) {
        const result = await createSale(prevState, formData);
        
        if (result.success) {
            setIsOpenModal(false);
            toast.success(result.message);
        }
        else {
            toast.success(result.message);
        }

        return result;
    }

    const [ formState, formAction, pending ] = useActionState(actionSale, { success: false })

    const pathname = usePathname();
    
    return (
        <>
            <nav className={`${dark ? 'bg-[#242424] text-white' : 'bg-white'} w-full h-16 fixed shadow-lg z-50 bottom-0 left-0 right-0 ${pathname === '/' ? 'hidden' : 'flex'} justify-between`}>
                <Link href="/home" className="flex-1 font-bold flex justify-center items-center flex-col gap-3 px-4 transition-all duration-500 hover:bg-yellow-500 hover:text-white">
                    <PiHouse />
                    Home
                </Link>
                <div onClick={() => setIsOpenModal(true)} className={`ml-auto w-10 h-10 -mt-6 shadow-lg rounded-full cursor-pointer ${dark ? 'bg-[#252525]' : 'bg-white'} grid place-items-center transition-all duration-500 font-bold text-xl hover:bg-amber-500 hover:text-white`}>
                    <PiPlus />
                </div>
                <Link href="/reports" className="flex-1 font-bold flex flex-col gap-3 px-4 justify-center items-center transition-all duration-500 hover:bg-yellow-500 hover:text-white">
                    <PiFileText />
                    Relatórios
                </Link>
            </nav>

            <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} formRef = {formRef} setCategory = {setCategory}>
                <div>
                    <h1 className="text-xl text-center font-bold">Cadastre uma nova venda</h1>
                    <form ref={formRef} action={formAction} className="py-12 grid grid-cols-1 gap-4">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="category" className="font-semibold">Categoria</label>
                            <select value={category}
                                    onChange={(e) => setCategory(e.target.value)} name="category" className="w-full p-3 border border-gray-300 rounded-md outline-none" >
                                <option value="" className="text-gray-600">Selecione a categoria</option>
                                <option className="text-gray-600" value="Picolé Eskimo">Picolé Eskimo</option>
                                <option className="text-gray-600" value="Picolé ao Leite">Picolé ao Leite</option>
                                <option className="text-gray-600" value="Copo">Copo</option>
                                <option className="text-gray-600" value="Pote">Pote</option>
                                <option className="text-gray-600" value="Geladinho">Geladinho</option>
                                <option className="text-gray-600" value="Casquinha">Casquinha</option>
                                <option className="text-gray-600" value="Cremosinho">Cremosinho</option>
                            </select>
                            {category === "Pote" && (
                                <select
                                    name="typeOfPot"
                                    className="w-full mt-3 p-3 border border-gray-300 rounded-md outline-none"
                                >
                                    <option value="" className="text-gray-600">Selecione o tipo</option>
                                    <option className="text-gray-600" value="Açãi">Açãi</option>
                                    <option className="text-gray-600" value="Sorvete">Sorvete</option>
                                </select>
                            )}
                            {category === "Copo" && (
                                <select
                                name="cupSize"
                                className="w-full mt-3 p-3 border border-gray-300 rounded-md outline-none"
                                >
                                    <option value="" className="text-gray-600">Selecione o tamanho</option>
                                    <option className="text-gray-600" value="150ml">150ml</option>
                                    <option className="text-gray-600" value="200ml">200ml</option>
                                    <option className="text-gray-600" value="300ml">300ml</option>
                                    <option className="text-gray-600" value="400ml">400ml</option>
                                    <option className="text-gray-600" value="500ml">500ml</option>
                                    <option className="text-gray-600" value="700ml">700ml</option>
                                    <option className="text-gray-600" value="1l">1l</option>
                                </select>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="flavor" className="font-semibold">Sabor</label>
                            <input type="text" name="flavor" placeholder="Chocolate" className="w-full p-3 border border-gray-300 rounded-md outline-none" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="price" className="font-semibold">Preço</label>
                            <input type="text" name="price" onInput={handleMoneyChange} placeholder="2,50" className="w-full p-3 border border-gray-300 rounded-md outline-none" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="type" className="font-semibold">Especifique a operação</label>
                            <select name="type" className="w-full p-3 border border-gray-300 rounded-md outline-none" >
                                <option className="text-gray-600" value="venda">Venda</option>
                                <option className="text-gray-600" value="entrada">Entrada</option>
                            </select>
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