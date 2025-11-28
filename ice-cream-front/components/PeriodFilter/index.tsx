"use client";

import { useState } from "react";

interface Props {
  onChange: (value: "day" | "month" | "year") => void;
}

export function PeriodFilter({ onChange }: Props) {
  const [selected, setSelected] = useState<"day" | "month" | "year">("day");

  const handleSelect = (value: "day" | "month" | "year") => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className="flex gap-3 py-4">
      <span
        onClick={() => handleSelect("year")}
        className={`period w-12 grid place-items-center p-1 border rounded-full text-sm cursor-pointer 
          ${selected === "year" ? "bg-yellow-500 text-white font-bold" : "border-gray-300"}`}
      >
        Ano
      </span>

      <span
        onClick={() => handleSelect("month")}
        className={`period w-12 grid place-items-center p-1 border rounded-full text-sm cursor-pointer 
          ${selected === "month" ? "bg-yellow-500 text-white font-bold" : "border-gray-300"}`}
      >
        Mês
      </span>

      <span
        onClick={() => handleSelect("day")}
        className={`period w-12 grid place-items-center p-1 border rounded-full text-sm cursor-pointer 
          ${selected === "day" ? "bg-yellow-500 text-white font-bold" : "border-gray-300"}`}
      >
        Dia
      </span>
    </div>
  );
}