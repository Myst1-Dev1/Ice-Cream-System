"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ptBR } from "date-fns/locale";

export function WeekCalendar() {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());

  return (
    <div className="w-full px-2 pb-2">
      <div>
        <DayPicker
          mode="single"
          selected={selectedDay}
          onSelect={setSelectedDay}
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
