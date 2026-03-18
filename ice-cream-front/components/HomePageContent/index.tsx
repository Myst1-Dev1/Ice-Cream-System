
'use client';

import { SalesType } from "@/@types/SalesType";
import { FlavorsGraphs } from "../FlavorsGraph";

import { MoneyAdminBoxes } from "./MoneyAdminBoxes";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SalesBox } from "../SalesBox";
import { ProductsRanking } from "../ProductsRanking";

interface HomePageContentProps {
    dark: boolean;
    data: SalesType[];
}

export function HomePageContent({ dark, data }: HomePageContentProps) {

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

    return (
        <>
            <div className={`px-3 py-8 transition-all duration-500 ${dark ? 'bg-[#202020] text-white' : 'bg-[#fbfbfb] text-black'}`}>
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
            </div>
        </>
    )
}