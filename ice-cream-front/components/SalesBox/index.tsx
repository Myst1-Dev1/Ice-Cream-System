'use client';

import { SalesType } from "@/@types/SalesType";
import { CategoryIcon } from "../CategoryIcon";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from "gsap";
import { PiPencilSimpleLineBold, PiTrashSimpleBold } from "react-icons/pi";
import { deleteSale } from "@/actions/saleActions";
import { toast } from "react-toastify";
import { UpdateSaleModal } from "../Modal/UpdateSaleModal";
import { useState } from "react";

interface SalesBoxProps {
    sales: SalesType;
}

export function SalesBox({ sales }: SalesBoxProps) {
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        gsap.fromTo(
            ".sales-box",
            { opacity: 0, y: 20, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: ".sales-box", // Idealmente um ID pai
                    start: "top 90%",
                }
            }
        );
    }, [sales]);

    async function handleDelete() {
        if (!confirm("Deseja realmente excluir esta venda?")) return;
        const res = await deleteSale(sales.id);
        res.success ? toast.success(res.message) : toast.error(res.message);
    }

    const formattedPrice = new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
    }).format(sales.price);

    return (
        <>
            <div className="sales-box mt-8 group relative border border-gray-200 p-4 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-4 mb-4">

                {/* Icone com Badge Estilizado */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl border border-gray-300">
                    <CategoryIcon category={sales.category} />
                </div>

                {/* Informações Principais */}
                <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Categoria</p>
                        <h4 className="text-gray-500 font-medium">{sales.category}</h4>
                    </div>

                    {sales.flavor && (
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Forma de pagamento</p>
                            <p>{sales.flavor}</p>
                        </div>
                    )}

                    <div className="md:text-right">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total</p>
                        <p className="text-lg font-bold text-green-600">
                            {sales.amount && <span className="text-sm text-gray-400 font-normal mr-2">{sales.amount}x</span>}
                            {formattedPrice}
                        </p>
                    </div>
                </div>

                {/* Ações (Aparecem no Hover ou fixas no Mobile) */}
                <div className="flex flex-col md:flex-row gap-2 ml-4 border-l pl-4 border-gray-100">
                    <button
                        onClick={() => setIsOpenUpdateModal(true)}
                        className="cursor-pointer p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                    >
                        <PiPencilSimpleLineBold size={20} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="cursor-pointer p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                        title="Excluir"
                    >
                        <PiTrashSimpleBold size={20} />
                    </button>
                </div>
            </div>

            <UpdateSaleModal
                sales={sales}
                isOpen={isOpenUpdateModal}
                setIsOpen={setIsOpenUpdateModal}
            />
        </>
    )
}