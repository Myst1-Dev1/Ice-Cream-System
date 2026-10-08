'use client';

import React, { useActionState } from "react";
import { Modal } from "../Modal";
import { Loading } from "../loading";
import { addItemOnInventory, deleteItemOnInventory } from "@/actions/InventoryActions";
import { toast } from "react-toastify";
import { PiPencilSimpleLineBold, PiPlus, PiTrashSimpleBold } from "react-icons/pi";
import { UpdateItemOnInventoryModal } from "./UpdateItemOnInventoryModal";

interface InventoryContentProps {
    items: {
        id: number;
        flavor: string;
        category: string;
        amount: number;
    }[];
    theme: {
        bg: string;
        card: string;
        input: string;
    };
}

export function InventoryContent({ items, theme }: InventoryContentProps) {
    const [openModal, setOpenModal] = React.useState(false);
    const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
    const [category, setCategory] = React.useState("");
    const [getItemId, setGetItemId] = React.useState(0);

    const formRef = React.useRef<HTMLFormElement>(null);

    async function actionSale(prevState: { success: boolean; message?: string }, formData: FormData) {
        const result = await addItemOnInventory(prevState, formData);

        if (result.success) {
            setOpenModal(false);
            setCategory('');
            formRef.current?.reset();
            toast.success(result.message);
        }
        else {
            toast.error(result.message);
        }

        return result;
    }

    const [formState, formAction, pending] = useActionState(actionSale, { success: false });

    const alertItems = items.filter(item => item.amount <= 3).length;

    async function handleDelete(id: number) {
        if (!confirm("Deseja realmente excluir esta venda?")) return;
        const res = await deleteItemOnInventory(id);
        res.success ? toast.success(res.message) : toast.error(res.message);
    }

    console.log(getItemId)

    return (
        <>
            <div className={`px-4 py-6 mb-16 transition-all duration-500 min-h-screen ${theme.bg}`}>

                <button
                    onClick={() => setOpenModal(true)}
                    className="cursor-pointer fixed bottom-22 right-4 z-50 flex flex-col items-center gap-2 group"
                >
                    <div className="bg-yellow-400 text-black w-8 h-8 rounded-full grid place-items-center shadow-[0_4px_20px_rgba(250,204,21,0.4)] transition-all duration-300 group-hover:scale-110 group-active:scale-95 group-hover:bg-yellow-500">
                        <PiPlus />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-yellow-500 transition-colors">
                        Adicionar item
                    </span>
                </button>

                <div className="mt-6 flex flex-col gap-4">
                    {items.map((item) => (
                        <div key={item.id}>
                            {item.amount === 0 ? '' :
                            <div
                                className={`p-5 relative rounded-2xl border-l-4 transition-all ${theme.card}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`text-[10px] font-bold uppercase tracking-widest`}>
                                            {item.category}
                                        </p>
                                        <h2 className="text-xl font-bold mt-1">{item.flavor}</h2>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-between items-end">
                                    <p className="text-3xl font-bold">
                                        {item.amount} <span className="text-sm font-normal text-yellow-300">un.</span>
                                    </p>
                                </div>
                                <div className="absolute -top-2 right-2 flex flex-col md:flex-row gap-2">
                                    <button
                                        onClick={() => { setGetItemId(item.id); setOpenUpdateModal(true)}}
                                        className="cursor-pointer p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Editar"
                                    >
                                        <PiPencilSimpleLineBold size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="cursor-pointer p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                                        title="Excluir"
                                    >
                                        <PiTrashSimpleBold size={20} />
                                    </button>
                                </div>
                            </div>
                            }
                        </div>
                    ))}
                </div>

                {alertItems > 0 && (
                    <div className="mt-8 p-5 bg-yellow-400/10 border border-yellow-400/20 rounded-2xl flex gap-4 items-center">
                        <div className="bg-yellow-400 p-3 rounded-xl text-black">
                            📊
                        </div>
                        <div>
                            <h3 className="font-bold text-yellow-500">Visão Geral</h3>
                        <p className="text-xs opacity-80">Você possui {alertItems} itens abaixo do estoque mínimo recomendado.</p>
                    </div>
                </div>)}
            </div>

            <Modal isOpenModal={openModal} setIsOpenModal={setOpenModal}>
                <div>
                    <h3 className="text-xl font-bold text-center ">Adicione items ao seu estoque</h3>

                    <form ref={formRef} action={formAction} className="mt-6 flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="category" className="font-semibold">Categoria</label>

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                name="category"
                                className="w-full p-3 border border-gray-300 rounded-md outline-none"
                            >
                                <option className="text-gray-600" value="">Selecione a categoria</option>
                                <option className="text-gray-600" value="Picolé Eskimo">Picolé Eskimo</option>
                                <option className="text-gray-600" value="Picolé ao Leite">Picolé ao Leite</option>
                                <option className="text-gray-600" value="Copo">Copo</option>
                                <option className="text-gray-600" value="Pote">Pote</option>
                                <option className="text-gray-600" value="Geladinho">Geladinho</option>
                                <option className="text-gray-600" value="Casquinha">Casquinha</option>
                                <option className="text-gray-600" value="Cremosinho">Cremosinho</option>
                            </select>

                            {/* {category === "Pote" && (
                                <select
                                    name="typeOfPot"
                                    className="w-full mt-3 p-3 border border-gray-300 rounded-md outline-none"
                                >
                                    <option className="text-gray-600" value="">Selecione o tipo</option>
                                    <option className="text-gray-600" value="Açãi 500ml">Açãi 500ml</option>
                                    <option className="text-gray-600" value="Sorvete 500ml">Sorvete 500ml</option>
                                    <option className="text-gray-600" value="Sorvete 1,5l">Sorvete 1,5l</option>
                                    <option className="text-gray-600" value="Bombom">Bombom</option>
                                </select>
                            )}

                            {category === "Copo" && (
                                <select
                                    name="cupSize"
                                    className="w-full mt-3 p-3 border border-gray-300 rounded-md outline-none"
                                >
                                    <option className="text-gray-600" value="">Selecione o tamanho</option>
                                    <option className="text-gray-600" value="150ml">150ml</option>
                                    <option className="text-gray-600" value="200ml">200ml</option>
                                    <option className="text-gray-600" value="300ml">300ml</option>
                                    <option className="text-gray-600" value="400ml">400ml</option>
                                    <option className="text-gray-600" value="500ml">500ml</option>
                                    <option className="text-gray-600" value="700ml">700ml</option>
                                    <option className="text-gray-600" value="1l">1l</option>
                                </select>
                            )} */}
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="flavor" className="font-semibold">Variante</label>
                            <input type="text" name="flavor" placeholder="300ml, Uva" className="w-full p-3 border border-gray-300 rounded-md outline-none" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="amount" className="font-semibold">Quantidade</label>
                            <input type="number" name="amount" placeholder="5" className="w-full p-3 border border-gray-300 rounded-md outline-none" />
                        </div>
                        {formState.success === false ? <p className="text-center py-3 text-red-700 font-semibold">{formState.message}</p> : ''}
                        <button className="cursor-pointer bg-yellow-500 text-white w-full rounded-lg text-xl font-bold p-3 transition-all duration-500 hover:brightness-90">
                            {pending ? <Loading /> : "Enviar"}
                        </button>
                    </form>
                </div>
            </Modal>

            <UpdateItemOnInventoryModal items = {items} id = {getItemId} isOpen={openUpdateModal} setIsOpen={setOpenUpdateModal} />
        </>
    )
}