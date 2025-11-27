"use client";

import { useState, useMemo } from "react";
import { SalesType } from "@/@types/SalesType";
import { PeriodFilter } from "../PeriodFilter";
import { filterSales } from "@/services/useFilteredSales";
import { ReportsGraph } from "../ReportsGraph";
import { CategoryIcon } from "../CategoryIcon";
import { WeekCalendar } from "../WeekCalendar";

interface Props {
  data: SalesType[];
  dark:boolean;
}

export function ReportsContent({ data, dark }: Props) {
  const [period, setPeriod] = useState<"day" | "month" | "year">("day");
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [selectedType, setSelectedType] = useState<"venda" | "entrada">("venda");

  const filtered = useMemo(
  () => filterSales(data, period, selectedDay, selectedType),
  [data, period, selectedDay, selectedType]
);

  const total = filtered.reduce(
    (sum, sale) => sum + sale.price * (sale.amount ?? 1),
    0
  );

  const quantity = filtered.reduce(
    (sum, sale) => sum + (sale.amount ?? 1),
    0
  );

  return (
    <>
      <WeekCalendar selectedDay={selectedDay} onSelectDay={setSelectedDay} />

      <PeriodFilter onChange={setPeriod} />

      <div className="flex gap-5">
        <div>
          <span className="font-light text-sm">Total do período</span>
          <h3 className="text-xl font-bold">
            {Intl.NumberFormat("pt-br", {
              style: "currency",
              currency: "brl",
            }).format(total)}
          </h3>
        </div>
        <div>
          <span className="font-light text-sm">Quantidade {selectedType === 'venda' ? 'vendida' : 'comprada' }</span>
          <h3 className="text-xl font-bold">{quantity} Itens</h3>
        </div>
      </div>

      <div className="py-8">
        <ReportsGraph data={filtered} dark={dark} />
      </div>

      <div className="flex gap-4">
        <button onClick={() => setSelectedType('venda')} className={`p-2 ${selectedType === 'venda' ? 'border-transparent bg-yellow-500 font-semibold' : 'border border-gray-300'} rounded-full cursor-pointer transition-all duration-500 hover:border-transparent hover:bg-yellow-600`}>Venda</button>
        <button onClick={() => setSelectedType('entrada')} className={`p-2 ${selectedType === 'entrada' ? 'border-transparent bg-yellow-500 font-semibold' : 'border border-gray-300'} rounded-full cursor-pointer transition-all duration-500 hover:border-transparent hover:bg-yellow-600`}>Entrada</button>
      </div>

      {filtered.map((sales: SalesType) => (
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
    </>
  );
}
