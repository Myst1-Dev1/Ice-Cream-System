/* eslint-disable @typescript-eslint/no-explicit-any */

import { SalesType } from "@/@types/SalesType";
import { PiArrowDownRight, PiArrowUpRight, PiPiggyBank } from "react-icons/pi";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MoneyAdminBoxesProps {
  data: SalesType[];
  dark: boolean;
}

export function MoneyAdminBoxes({ data, dark }: MoneyAdminBoxesProps) {
  const vendasRef = useRef<HTMLHeadingElement>(null);
  const entradasRef = useRef<HTMLHeadingElement>(null);
  const totalRef = useRef<HTMLHeadingElement>(null);

  const totalVendas = data
    .filter((sale: SalesType) => sale.type === "venda")
    .reduce((sum: any, sale: any) => sum + sale.price, 0);

  const totalEntradas = data
    .filter((sale: SalesType) => sale.type === "entrada")
    .reduce((sum: any, sale: any) => sum + sale.price, 0);

  const receitaTotal = totalVendas - totalEntradas;

  const animateValue = (selector: string, endValue: number) => {
        const obj = { val: 0 };

        gsap.to(obj, {
            val: endValue,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
            const el = document.querySelector(selector);
            if (!el) return;

            el.innerHTML = Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(obj.val);
            }
        });
    };


    useGSAP(() => {
        animateValue(".num-vendas", totalVendas);
        animateValue(".num-entradas", totalEntradas);
        animateValue(".num-total", receitaTotal);
    }, [data]);

  return (
    <div className="grid grid-cols-3 gap-4 place-items-center">
      
      {/* Rendimento */}
      <div className={`${dark ? "bg-[#242424]" : "bg-white"} p-2.5 rounded-md max-w-36 w-full`}>
        <div className="w-6 h-6 bg-green-400 rounded-md grid place-items-center text-white">
          <PiArrowUpRight />
        </div>
        <div>
          <span className="text-xs font-medium text-gray-500">Rendimento</span>
          <h3 ref={vendasRef} className="font-bold text-[18px] num-vendas">0</h3>
        </div>
      </div>

      {/* Gastos */}
      <div className={`${dark ? "bg-[#242424]" : "bg-white"} p-2.5 rounded-md max-w-36 w-full`}>
        <div className="w-6 h-6 bg-red-400 rounded-md grid place-items-center text-white">
          <PiArrowDownRight />
        </div>
        <div>
          <span className="text-xs font-medium text-gray-500">Gastos</span>
          <h3 ref={entradasRef} className="font-bold text-[18px] num-entradas">0</h3>
        </div>
      </div>

      {/* Total */}
      <div className={`${dark ? "bg-[#242424]" : "bg-white"} p-2.5 rounded-md max-w-36 w-full`}>
        <div className="w-6 h-6 bg-blue-400 rounded-md grid place-items-center text-white">
          <PiPiggyBank />
        </div>
        <div>
          <span className="text-xs font-medium text-gray-500">Total</span>
          <h3 ref={totalRef} className="font-bold text-[18px] num-total">0</h3>
        </div>
      </div>

    </div>
  );
}
