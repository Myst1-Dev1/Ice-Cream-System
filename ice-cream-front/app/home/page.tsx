/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { SalesType } from "@/@types/SalesType";
import { CategoryIcon } from "@/components/CategoryIcon";
import { FlavorsGraphs } from "@/components/FlavorsGraph";
import { isDarkMode } from "@/services/darkMode";
import { getSales } from "@/services/getSales";
import { PiArrowDownRight, PiArrowUpRight, PiPiggyBank } from "react-icons/pi";

export default async function Home() {
    const data = await getSales();

    const dark = await isDarkMode();

    const totalVendas = data
        .filter((sale:SalesType) => sale.type === "venda")
        .reduce((sum:any, sale:any) => sum + sale.price, 0);

    const totalEntradas = data
        .filter((sale:SalesType) => sale.type === "entrada")
        .reduce((sum:any, sale:any) => sum + sale.price, 0);

    const receitaTotal = totalVendas - totalEntradas;
    
    return (
        <>
            <div className={`px-3 py-8 transition-all duration-500 ${dark ? 'bg-[#202020] text-white' : 'bg-[#fbfbfb] text-black'}`}>
                <div className="grid grid-cols-2 gap-4 place-items-center">
                    <div className={`${dark ? 'bg-[#242424]' : 'bg-white'} p-2.5 rounded-md max-w-36 w-full`}>
                        <div className="w-6 h-6 bg-green-400 rounded-md grid place-items-center text-white">
                            <PiArrowUpRight />
                        </div>
                        <div>
                            <span className="text-xs font-medium text-gray-500">Rendimento</span>
                            <h3 className="font-bold text-xl">
                                {Intl.NumberFormat('pt-br', {
                                    style:'currency', currency:'BRL'
                                }).format(totalVendas)}
                            </h3>
                        </div>
                    </div>
                    <div className={`${dark ? 'bg-[#242424]' : 'bg-white'} p-2.5 rounded-md max-w-36 w-full`}>
                        <div className="w-6 h-6 bg-red-400 rounded-md grid place-items-center text-white">
                            <PiArrowDownRight />
                        </div>
                        <div>
                            <span className="text-xs font-medium text-gray-500">Gastos</span>
                            <h3 className="font-bold text-xl">
                                 {Intl.NumberFormat('pt-br', {
                                    style:'currency', currency:'BRL'
                                }).format(totalEntradas)}
                            </h3>
                        </div>
                    </div>
                    <div className={`${dark ? 'bg-[#242424]' : 'bg-white'} p-2.5 rounded-md max-w-36 w-full`}>
                        <div className="w-6 h-6 bg-blue-400 rounded-md grid place-items-center text-white">
                            <PiPiggyBank />
                        </div>
                        <div>
                            <span className="text-xs font-medium text-gray-500">Total</span>
                            <h3 className="font-bold text-xl">
                                {Intl.NumberFormat('pt-br', {
                                    style:'currency', currency:'BRL'
                                }).format(receitaTotal)}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="py-12">
                    <h2 className="text-xl font-bold">Gráfico dos 4 sabores mais vendidos</h2>
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
                        <div key={sales.id} className="rounded-lg border border-gray-300 mt-5 flex">
                            <div className="grid place-items-center text-xl w-16 border-r border-gray-300">
                                <CategoryIcon category={sales.category} />
                            </div>
                            <table className="w-full table-fixed">
                                <thead>
                                <tr className="text-left border-b border-gray-300">
                                    <th className="py-2 pl-3 w-1/3 text-sm font-medium text-gray-500">Categoria</th>
                                    <th className="py-2 w-1/3 text-sm font-medium text-gray-500 pl-3">Sabor</th>
                                    <th className="py-2 pr-3 w-1/3 text-sm font-medium text-gray-500 text-right">Preço</th>
                                    {sales.amount && (
                                    <th className="py-2 pr-3 w-1/3 text-sm font-medium text-gray-500 text-right">
                                        Quantidade
                                    </th>
                                    )}
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="text-left">
                                    <td className="py-2 pl-3 w-1/3 text-base font-light">{sales.category}</td>
                                    <td className="py-2 w-1/3 text-base font-light pl-3">{sales.flavor}</td>
                                    <td className="py-2 pr-3 w-1/3 text-base font-normal text-right">
                                    {Intl.NumberFormat("pt-br", {
                                        style: "currency",
                                        currency: "brl",
                                    }).format(sales.price)}
                                    </td>
                                    {sales.amount && (
                                    <td className="py-2 pr-3 w-1/3 text-base font-normal text-right">
                                        {sales.amount}
                                    </td>
                                    )}
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}