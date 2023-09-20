import React, { useMemo, useState } from "react";

export default function useCalendar() {
  const today = new Date();
  const [date, setDate] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());

  const totalDaysOfPrevMonth = new Date(year, month - 1, 0).getDate();
  const totalDaysOfCurrMonth = new Date(year, month, 0).getDate();

  const firstDay = useMemo(
    () => new Date(year, month - 1, 1).getDay(),
    [year, month]
  );
  const currentMonth = useMemo(
    () =>
      Array.from({ length: totalDaysOfCurrMonth }, (_, i) => {
        const daysOfCurrentMonth = i + 1;
        const valueOfCurrentMonth = new Date(
          year,
          month - 1,
          daysOfCurrentMonth
        );
        return {
          label: daysOfCurrentMonth,
          value: valueOfCurrentMonth,
          disabled: false,
        };
      }),
    [year, month]
  );

  const prevMonth = useMemo(
    () =>
      Array.from({ length: firstDay }, (_, i) => {
        const daysOfPrevMonth = totalDaysOfPrevMonth - firstDay + i + 1;
        const valueOfPrevMonth = new Date(year, month - 2, daysOfPrevMonth);
        return {
          label: daysOfPrevMonth,
          value: valueOfPrevMonth,
          disabled: true,
        };
      }),
    [year, month]
  );

  const nextMonth = useMemo(
    () =>
      Array.from(
        { length: 42 - currentMonth.length - prevMonth.length },
        (_, i) => {
          const daysOfNextMonth = i + 1;
          const valueOfNextMonth = new Date(year, month, daysOfNextMonth);
          return {
            label: daysOfNextMonth,
            value: valueOfNextMonth,
            disabled: true,
          };
        }
      ),
    [year, month]
  );

  const calendarDays = useMemo(
    () => [...prevMonth, ...currentMonth, ...nextMonth],
    [year, month]
  );

  return { nextMonth, prevMonth, currentMonth, calendarDays };
}
