"use client";

import { Dispatch, SetStateAction } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ptBR } from "date-fns/locale";
import { SalesType } from "@/@types/SalesType";

interface WeekCalendarProps {
  selectedDay: Date | undefined;
  onSelectDay: Dispatch<SetStateAction<Date | undefined>>
  data: SalesType[];
}

export function WeekCalendar({ selectedDay, onSelectDay, data }: WeekCalendarProps) {

  function isSameDay(date1: Date, date2: Date) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  function hasSales(day: Date) {
    return data.some((sale) =>
      isSameDay(new Date(sale.createdAt), day)
    );
  }

  function hasNoSales(day: Date) {
    return !hasSales(day);
  }

  return (
    <div className="w-full px-2 pb-2 calendar">
      <div>
        <DayPicker
          mode="single"
          selected={selectedDay}
          onSelect={onSelectDay}
          locale={ptBR}
          weekStartsOn={6}
          showOutsideDays={false}
          numberOfMonths={1}
          modifiers={{
            hasSales: hasSales,
            noSales: hasNoSales,
          }}
          modifiersClassNames={{
            hasSales: "text-green-500",
            noSales: "text-red-500",
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
