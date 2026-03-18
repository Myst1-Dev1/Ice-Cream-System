"use client";

import { SalesType } from "@/@types/SalesType";
import gsap from "gsap";
import { useMemo } from "react";
import { BiTrendingUp } from "react-icons/bi";
import { FaTrophy } from "react-icons/fa6";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface ProductsRankingProps {
    data: SalesType[];
    dark: boolean;
}

export function ProductsRanking({ data, dark }: ProductsRankingProps) {

    gsap.registerPlugin(ScrollTrigger);

    const ranking = useMemo(() => {
        const map = new Map<string, number>();

        const today = new Date();

        data.forEach((sale) => {
            if (sale.type !== "venda") return;

            const saleDate = new Date(sale.createdAt);

            const isSameDay =
                saleDate.getDate() === today.getDate() &&
                saleDate.getMonth() === today.getMonth() &&
                saleDate.getFullYear() === today.getFullYear();

            if (!isSameDay) return;

            const quantity = sale.amount ?? 1;

            map.set(
                sale.category,
                (map.get(sale.category) || 0) + quantity
            );
        });

        return Array.from(map.entries())
            .map(([category, total]) => ({ category, total }))
            .sort((a, b) => b.total - a.total)
            .slice(0, 5);;
    }, [data]);

    const getMedal = (index: number) => {
        if (index === 0) return "🥇";
        if (index === 1) return "🥈";
        if (index === 2) return "🥉";
        return `#${index + 1}`;
    };

    useGSAP(() => {
        gsap.fromTo(
            ".rank-box",
            { opacity: 0, y: 20, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: "#ranking",
                    start: "top 90%",
                }
            }
        );
    }, [data]);

    return (
        <div id="ranking" className={`w-full rounded-2xl p-5 shadow-md transition-all duration-300 
      ${dark ? "bg-[#202020] text-white" : "bg-white text-zinc-800"}`}>

            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-yellow-500 rounded-xl text-white">
                    <FaTrophy size={20} />
                </div>
                <h2 className="text-lg font-bold text-center mx-auto">Ranking dos 5 mais <br /> vendidos do Dia</h2>
            </div>

            <div className="flex flex-col gap-3">
                {ranking.map((item, index) => (
                    <div
                        key={item.category}
                        className={`rank-box flex items-center justify-between p-3 rounded-xl transition-all
            ${dark ? "bg-zinc-800 hover:bg-zinc-700" : "bg-gray-100 hover:bg-gray-200"}`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-lg font-bold w-8">
                                {getMedal(index)}
                            </span>

                            <div>
                                <p className="font-semibold">{item.category}</p>
                                <p className="text-sm opacity-70 flex items-center gap-1">
                                    <BiTrendingUp size={14} />
                                    {item.total} vendas
                                </p>
                            </div>
                        </div>

                        <div className="w-24 h-2 bg-gray-300 rounded-full overflow-hidden">
                            <div
                                className="rank-bar h-full bg-green-500"
                                style={{
                                    width: `${(item.total / (ranking[0]?.total || 1)) * 100
                                        }%`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}