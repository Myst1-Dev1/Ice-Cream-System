
'use client';

import { SalesType } from "@/@types/SalesType";
import { FlavorsGraphs } from "../FlavorsGraph";

import { MoneyAdminBoxes } from "./MoneyAdminBoxes";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SalesBox } from "../SalesBox";
import { ProductsRanking } from "../ProductsRanking";
import { useActionState, useMemo, useRef, useState } from "react";
import { Modal } from "../Modal";
import { toast } from "react-toastify";
import { createSale } from "@/actions/saleActions";
import { Loading } from "../loading";
import { handleMoneyChange } from "@/utils/moneyMask";
import { PiShoppingCartFill } from "react-icons/pi";

type Inventory = {
    id: string;
    category: string;
    flavor: string;
    amount: number;
}

interface HomePageContentProps {
    dark: boolean;
    data: SalesType[];
    inventory: Inventory[];
}

export function HomePageContent({ dark, data, inventory }: HomePageContentProps) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const [category, setCategory] = useState("");
    const [subType, setSubType] = useState("");

    const computedCategory = useMemo(() => {
        if (category === "Copo" && subType) return `Copo de ${subType}`;
        if (category === "Pote" && subType) return `Pote de ${subType}`;
        return category;
    }, [category, subType]);

    const availableItems = useMemo(() => {
        if (!category) return [];
        return inventory.filter(
            (item) => item.category === category && item.amount > 0
        );
    }, [inventory, category]);

    const formRef = useRef<HTMLFormElement>(null);

    async function actionSale(prevState: { success: boolean; message?: string }, formData: FormData) {
        const result = await createSale(prevState, formData);

        if (result.success) {
            setIsOpenModal(false);
            setCategory('');
            formRef.current?.reset();
            toast.success(result.message);
        }
        else {
            toast.error(result.message);
        }

        return result;
    }

    const [formState, formAction, pending] = useActionState(actionSale, { success: false })

    useGSAP(() => {
        gsap.fromTo('.graphFlavor-title', { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'sine.inOut' });
    }, []);

    const hasSalesToday = data.some((sale) => {
        if (sale.type !== "venda") return false;

        const today = new Date();
        const saleDate = new Date(sale.createdAt);

        return (
            saleDate.getDate() === today.getDate() &&
            saleDate.getMonth() === today.getMonth() &&
            saleDate.getFullYear() === today.getFullYear()
        );
    });

    function getLocalDateTime() {
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000;

        return new Date(now.getTime() - offset)
            .toISOString()
            .slice(0, 16);
    }

    return (
        <>
            <div className={`px-3 py-8 transition-all duration-500 ${dark ? 'bg-[#202020] text-white min-h-screen' : 'bg-[#fbfbfb] text-black'}`}>
                <MoneyAdminBoxes data={data} dark={dark} />
                <div className="py-12">
                    <h2 className="text-xl font-bold graphFlavor-title">Gráfico de vendas</h2>
                    <FlavorsGraphs data={data} dark={dark} />
                </div>
                {hasSalesToday && <ProductsRanking data={data} dark={dark} />}
                <div className="py-12 mb-8">
                    <h2 className="text-xl font-bold">Últimas Vendas</h2>
                    {data.length > 0 ? data
                        ?.filter((sales: SalesType) => {
                            if (sales.type !== "venda") return false;

                            const created = new Date(sales.createdAt);
                            const today = new Date();

                            return (
                                created.getDate() === today.getDate() &&
                                created.getMonth() === today.getMonth() &&
                                created.getFullYear() === today.getFullYear()
                            );
                        })
                        .map((sales: SalesType) => (
                            <SalesBox sales={sales} key={sales.id} />
                        )) : <p className="text-center text-gray-500 py-4">Nenhuma venda hoje... 😢</p>}
                </div>
                <button
                    onClick={() => setIsOpenModal(true)}
                    className="cursor-pointer fixed bottom-17 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 group"
                >
                    <div className="bg-yellow-400 text-black w-8 h-8 rounded-full grid place-items-center shadow-[0_4px_20px_rgba(250,204,21,0.4)] transition-all duration-300 group-hover:scale-110 group-active:scale-95 group-hover:bg-yellow-500">
                        <PiShoppingCartFill />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-yellow-500 transition-colors">
                        Vender
                    </span>
                </button>
            </div>
            <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} formRef={formRef} setCategory={setCategory}>
                <div className="overflow-y-auto h-[650px] scrollbar">
                    <h1 className="text-xl text-center font-bold">Cadastre uma nova venda</h1>
                    <form ref={formRef} action={formAction} className="py-12 pr-2 grid grid-cols-1 gap-4">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="category" className="font-semibold">Categoria</label>
                            <select 
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setSubType("");
                            }} 
                            name="category" 
                            className="w-full p-3 border border-gray-300 rounded-md outline-none" 
                            >
                            <option value="">Selecione a categoria</option>
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
                                value={subType}
                                onChange={(e) => setSubType(e.target.value)}
                                className="w-full mt-3 p-3 placeholder-gray-200 border border-gray-300 rounded-md outline-none"
                            >
                                <option value="">Selecione o tipo</option>
                                <option className="text-gray-600" value="Açãi 500ml">Açãi 500ml</option>
                                <option className="text-gray-600" value="Sorvete 500ml">Sorvete 500ml</option>
                                <option className="text-gray-600" value="Sorvete 1,5l">Sorvete 1,5l</option>
                                <option className="text-gray-600" value="Bombom">Bombom</option>
                            </select>
                            )}

                            {category === "Copo" && (
                            <select
                                name="cupSize"
                                value={subType}
                                onChange={(e) => setSubType(e.target.value)}
                                className="w-full mt-3 p-3 border border-gray-300 rounded-md outline-none"
                            >
                                <option value="">Selecione o tamanho</option>
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
                            <label htmlFor="productFlavor" className="font-semibold">Sabor / Item disponível</label>
                            <select 
                            name="productFlavor" 
                            disabled={!computedCategory || availableItems.length === 0}
                            className="w-full p-3 border border-gray-300 rounded-md outline-none"
                            >
                            <option value="" className="text-gray-600">
                                {!computedCategory 
                                ? "Selecione uma categoria primeiro" 
                                : availableItems.length === 0 
                                    ? "Sem estoque disponível para esta categoria" 
                                    : "Selecione o sabor"}
                            </option>
                            {availableItems.map((item) => (
                                <option className="text-gray-600" key={item.id} value={item.flavor}>
                                {item.flavor} ({item.amount} un. em estoque)
                                </option>
                            ))}
                            </select>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            <label htmlFor="paymentMethod" className="font-semibold">Forma de pagamento</label>
                            <select name="paymentMethod" className="w-full p-3 border border-gray-300 rounded-md outline-none">
                                <option value="" className="text-gray-600">Selecione a forma de pagamento</option>
                                <option className="text-gray-600" value="Dinheiro">Dinheiro</option>
                                <option className="text-gray-600" value="Debito">Debito</option>
                                <option className="text-gray-600" value="Credito">Credito</option>
                                <option className="text-gray-600" value="Pix">Pix</option>
                            </select>
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
                            <input type="number" name="amount" defaultValue={1} placeholder="Não especificar se for apenas 1" className="w-full p-3 border border-gray-300 rounded-md outline-none" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="createdAt" className="font-semibold">Data da venda</label>
                            <input type="datetime-local" name="createdAt" defaultValue={getLocalDateTime()} className="w-full p-3 border border-gray-300 rounded-md outline-none" />
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