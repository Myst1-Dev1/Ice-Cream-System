'use server';

import { ReportsGraph } from "@/components/ReportsGraph";
import { WeekCalendar } from "@/components/WeekCalendar";
import { isDarkMode } from "@/services/darkMode";
import { PiPintGlass } from "react-icons/pi";

export default async function Reports() {
    const dark = await isDarkMode();
    
    return (
        <>
            <div className={`px-3 py-8 transition-all duration-500 ${dark ? 'bg-[#242424] text-white' : 'bg-[#fbfbfb]'}`}>
                <WeekCalendar />
                <div className="mb-20">
                    <h2 className="text-xl font-bold">Vendas e Lucros</h2>
                    <div className="flex gap-3 py-4">
                        <span className="w-12 grid place-items-center p-1 border border-gray-300 rounded-full text-sm">Ano</span>
                        <span className="w-12 grid place-items-center p-1 border border-gray-300 rounded-full text-sm">Mês</span>
                        <span className="w-12 grid place-items-center p-1 bg-yellow-500 text-white font-bold rounded-full text-sm">Dia</span>
                    </div>
                    <div className="flex gap-5">
                        <div>
                            <span className="font-light text-sm">Total do periodo</span>
                            <h3 className="text-xl font-bold">R$: 24,00</h3>
                        </div>
                        <div>
                            <span className="font-light text-sm">Quantidade vendida</span>
                            <h3 className="text-xl font-bold">2 Items</h3>
                        </div>
                    </div>

                    <div className="py-8">
                        <ReportsGraph />
                    </div>

                    <div className="rounded-lg border border-gray-300 mt-5 flex">
                        <div className="grid place-items-center text-xl w-16 border-r border-gray-300">
                            <PiPintGlass />
                        </div>
                        <table className="w-full table-fixed">
                            <thead>
                                <tr className="text-left border-b border-gray-300">
                                    <th className="py-2 pl-3 w-1/3 text-sm font-medium text-gray-500">Categoria</th>
                                    <th className="py-2 w-1/3 text-sm font-medium text-gray-500 pl-3">Sabor</th>
                                    <th className="py-2 pr-3 w-1/3 text-sm font-medium text-gray-500 text-right">Preço</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-left">
                                    <td className="py-2 pl-3 w-1/3 text-base font-light">Copo 400ml</td>
                                    <td className="py-2 w-1/3 text-base font-light pl-3">Passa ao rum e rafaelo</td>
                                    <td className="py-2 pr-3 w-1/3 text-base font-normal text-right">R$: 8,00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}