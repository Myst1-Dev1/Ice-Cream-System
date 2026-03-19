"use client";

import { memo, useState } from "react";

interface Props {
  onChange: (value: "day" | "month" | "year") => void;
}

export const PeriodFilter = memo(function PeriodFilter({ onChange }: Props) {
  const [selected, setSelected] = useState<"day" | "month" | "year">("day");

  const handleSelect = (value: "day" | "month" | "year") => {
    if (value === selected) return;
    setSelected(value);
    onChange(value);
  };

  const getBadgeClass = (item: "day" | "month" | "year") => {
    const isActive = selected === item;
    return `period w-12 grid place-items-center p-1 border rounded-full text-sm cursor-pointer transition-colors
      ${isActive ? "bg-yellow-500 text-white font-bold border-yellow-500" : "border-gray-300 text-gray-600"}`;
  };

  return (
    <div className="flex gap-3 py-4">
      <span onClick={() => handleSelect("year")} className={getBadgeClass("year")}>
        Ano
      </span>
      <span onClick={() => handleSelect("month")} className={getBadgeClass("month")}>
        Mês
      </span>
      <span onClick={() => handleSelect("day")} className={getBadgeClass("day")}>
        Dia
      </span>
    </div>
  );
});