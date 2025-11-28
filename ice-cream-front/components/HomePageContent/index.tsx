
'use client';

import { SalesType } from "@/@types/SalesType";
import { FlavorsGraphs } from "../FlavorsGraph";

import { MoneyAdminBoxes } from "./MoneyAdminBoxes";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SalesBox } from "../SalesBox";

interface HomePageContentProps {
    dark:boolean;
    data: SalesType[];
}

export function HomePageContent({ dark, data }:HomePageContentProps) {
   
    useGSAP(() => {
        gsap.fromTo('.graphFlavor-title', { opacity:0, y:-30 }, { opacity:1, y:0, duration:0.6, ease:'sine.inOut' });
    }, []);

    return (
        <>
            <div className={`px-3 py-8 transition-all duration-500 ${dark ? 'bg-[#202020] text-white' : 'bg-[#fbfbfb] text-black'}`}>
                <MoneyAdminBoxes data={data} dark={dark} />
                <div className="py-12">
                    <h2 className="text-xl font-bold graphFlavor-title">Gráfico dos 4 sabores mais vendidos</h2>
                    <FlavorsGraphs data = {data} dark = {dark} />
                </div>
                <div className="py-12 mb-8">
                    <h2 className="text-xl font-bold">Últimas Vendas</h2>
                    {data
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
                    ))}
                </div>
            </div>
        </>
    )
}