"use client";

import { Dispatch, SetStateAction, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ptBR } from "date-fns/locale";
import { SalesType } from "@/@types/SalesType";

interface WeekCalendarProps {
  selectedDay: Date | undefined;
  onSelectDay: Dispatch<SetStateAction<Date | undefined>>;
  data: SalesType[];
}

export function WeekCalendar({ selectedDay, onSelectDay, data }: WeekCalendarProps) {

  const salesDaysSet = useMemo(() => {
    return new Set(
      data
        .filter((sale) => sale.createdAt)
        .map((sale) => new Date(sale.createdAt).toDateString())
    );
  }, [data]);
  const hasSales = (day: Date) => salesDaysSet.has(day.toDateString());
  const hasNoSales = (day: Date) => !hasSales(day);

  return (
    <div className="w-full px-2 pb-2 calendar">
      <div>
        <DayPicker
          mode="single"
          selected={selectedDay}
          onSelect={onSelectDay}
          locale={ptBR}
          weekStartsOn={0}
          showOutsideDays={false}
          numberOfMonths={1}
          modifiers={{
            hasSales: hasSales,
            noSales: hasNoSales,
          }}
          modifiersClassNames={{
            hasSales: "text-green-500 font-semibold",
            noSales: "text-red-600",
            selected: "bg-white !text-black shadow-md font-bold rounded-full",
          }}
          styles={{
            caption: { display: "none" },
            head: { display: "none" },
          }}
        />
      </div>
    </div>
  );
}