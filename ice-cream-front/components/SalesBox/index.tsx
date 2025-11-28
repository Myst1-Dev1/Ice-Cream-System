'use client';

import { SalesType } from "@/@types/SalesType";
import { CategoryIcon } from "../CategoryIcon";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from "gsap";

interface SalesBoxProps {
    sales: SalesType;
}

export function SalesBox({ sales }:SalesBoxProps) {
    gsap.registerPlugin(ScrollTrigger);
    
    useGSAP(() => {
        ScrollTrigger.create({
            trigger: '#about',
            start: 'top 90%',
            once: true,
            onEnter: () => {
                gsap.fromTo(
                    ".sales-box",
                    {
                        opacity: 0,
                        y: 30,
                        scale: 0.95,
                        filter: "blur(6px)",
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                        duration: 0.9,
                        ease: "back.out(1.8)",
                        stagger: {
                        each: 0.15,
                        from: "start",
                        }
                    }
                );
            }
        });
    }, [sales]);
    
    return (
        <>
            <div id="sales-box" className="sales-box rounded-lg border border-gray-300 mt-5 flex">
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
        </>
    )
}