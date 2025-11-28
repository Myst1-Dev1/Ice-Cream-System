"use client";

import { useState, useMemo } from "react";
import { SalesType } from "@/@types/SalesType";
import { PeriodFilter } from "../PeriodFilter";
import { filterSales } from "@/services/useFilteredSales";
import { ReportsGraph } from "../ReportsGraph";
import { WeekCalendar } from "../WeekCalendar";
import { SalesBox } from "../SalesBox";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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

  useGSAP(() => {
        const tl = gsap.timeline({defaults: { duration:0.4, stagger:0.5, ease:'sine.inOut' }});

        tl.fromTo('.calendar', { opacity:0, y:-20 }, { opacity:1, y:0 });
        tl.fromTo('.period', { opacity:0, x:-20 }, { opacity:1, x:0 });
        tl.fromTo('.rp-txt', { opacity:0, x:-20 }, { opacity:1, x:0 });
    }, []);

  return (
    <>
      <WeekCalendar selectedDay={selectedDay} onSelectDay={setSelectedDay} />

      <PeriodFilter onChange={setPeriod} />

      <div className="flex gap-5">
        <div>
          <span className="font-light text-sm rp-txt">Total do período</span>
          <h3 className="text-xl font-bold rp-txt">
            {Intl.NumberFormat("pt-br", {
              style: "currency",
              currency: "brl",
            }).format(total)}
          </h3>
        </div>
        <div>
          <span className="font-light text-sm rp-txt">Quantidade {selectedType === 'venda' ? 'vendida' : 'comprada' }</span>
          <h3 className="text-xl font-bold rp-txt">{quantity} Itens</h3>
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
        <SalesBox sales={sales} key={sales.id} />
      ))}
    </>
  );
}
