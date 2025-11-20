import { FlavorsGraphs } from "@/components/FlavorsGraph";
import { PiArrowDownRight, PiArrowUpRight, PiPiggyBank, PiPintGlass, PiPopsicle } from "react-icons/pi";

export default function Home() {
    return (
        <>
            <div className="px-3 py-8">
                <div className="grid grid-cols-2 gap-4 place-items-center">
                    <div className="bg-white p-2.5 rounded-md max-w-36 w-full">
                        <div className="w-6 h-6 bg-green-400 rounded-md grid place-items-center text-white">
                            <PiArrowUpRight />
                        </div>
                        <div>
                            <span className="text-xs font-medium text-gray-500">Rendimento</span>
                            <h3 className="font-bold text-xl">+R$: 90,00</h3>
                        </div>
                    </div>
                    <div className="bg-white p-2.5 rounded-md max-w-36 w-full">
                        <div className="w-6 h-6 bg-red-400 rounded-md grid place-items-center text-white">
                            <PiArrowDownRight />
                        </div>
                        <div>
                            <span className="text-xs font-medium text-gray-500">Gastos</span>
                            <h3 className="font-bold text-xl">+R$: 30,00</h3>
                        </div>
                    </div>
                    <div className="bg-white p-2.5 rounded-md max-w-36 w-full">
                        <div className="w-6 h-6 bg-blue-400 rounded-md grid place-items-center text-white">
                            <PiPiggyBank />
                        </div>
                        <div>
                            <span className="text-xs font-medium text-gray-500">Total</span>
                            <h3 className="font-bold text-xl">+R$: 60,00</h3>
                        </div>
                    </div>
                </div>
                <div className="py-12">
                    <h2 className="text-xl font-bold">Gráfico dos 4 sabores mais vendidos</h2>
                    <FlavorsGraphs />
                </div>
                <div className="py-12 mb-8">
                    <h2 className="text-xl font-bold">Últimas Vendas</h2>
                    <div className="rounded-lg border border-gray-300 mt-5 flex">
                        <div className="grid place-items-center text-xl w-16 border-r border-gray-300">
                            <PiPopsicle />
                        </div>
                        <table className="w-full table-fixed">
                            <thead>
                                <tr className="text-left border-b border-gray-300">
                                    <th className="py-2 pl-3 w-1/3 text-sm font-medium text-gray-700">Categoria</th>
                                    <th className="py-2 w-1/3 text-sm font-medium text-gray-700 pl-3">Sabor</th>
                                    <th className="py-2 pr-3 w-1/3 text-sm font-medium text-gray-700 text-right">Preço</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-left">
                                    <td className="py-2 pl-3 w-1/3 text-base font-light">Picole eskimo</td>
                                    <td className="py-2 w-1/3 text-base font-light pl-3">Chocolate</td>
                                    <td className="py-2 pr-3 w-1/3 text-base font-normal text-right">R$: 4,00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="rounded-lg border border-gray-300 mt-5 flex">
                        <div className="grid place-items-center text-xl w-16 border-r border-gray-300">
                            <PiPintGlass />
                        </div>
                        <table className="w-full table-fixed">
                            <thead>
                                <tr className="text-left border-b border-gray-300">
                                    <th className="py-2 pl-3 w-1/3 text-sm font-medium text-gray-700">Categoria</th>
                                    <th className="py-2 w-1/3 text-sm font-medium text-gray-700 pl-3">Sabor</th>
                                    <th className="py-2 pr-3 w-1/3 text-sm font-medium text-gray-700 text-right">Preço</th>
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