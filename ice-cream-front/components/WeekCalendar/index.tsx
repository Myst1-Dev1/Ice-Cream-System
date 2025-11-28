"use client";

import { Dispatch, SetStateAction } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ptBR } from "date-fns/locale";

interface WeekCalendarProps {
  selectedDay: Date | undefined;
  onSelectDay:Dispatch<SetStateAction<Date | undefined>>
}

export function WeekCalendar({ selectedDay, onSelectDay }:WeekCalendarProps) {

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
          modifiersClassNames={{
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
