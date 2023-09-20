import { useMemo } from "react";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const YEARS = Array.from({ length: 2060 - 1960 }, (_, i) => i + 1960);

export const renderCalendar = (month, year) => {
  const totalDaysOfPrevMonth = new Date(year, month - 1, 0).getDate();
  const totalDaysOfCurrMonth = new Date(year, month, 0).getDate();
  const firstDayOfCurrMonth = new Date(year, month - 1, 1).getDay();

  const currentMonth = Array.from({ length: totalDaysOfCurrMonth }, (_, i) => {
    const daysOfCurrentMonth = i + 1;
    const valueOfCurrentMonth = new Date(year, month - 1, daysOfCurrentMonth);
    const monthString = valueOfCurrentMonth.toLocaleString("default", {
      month: "short",
    });
    return {
      label: daysOfCurrentMonth,
      value: valueOfCurrentMonth,
      month: monthString,
    };
  });

  const prevMonth = Array.from({ length: firstDayOfCurrMonth }, (_, i) => {
    const daysOfPrevMonth = totalDaysOfPrevMonth - firstDayOfCurrMonth + i + 1;
    const valueOfPrevMonth = new Date(year, month - 2, daysOfPrevMonth);
    const monthString = valueOfPrevMonth.toLocaleString("default", {
      month: "short",
    });
    return {
      label: daysOfPrevMonth,
      value: valueOfPrevMonth,
      month: monthString,
    };
  });

  const nextMonth = Array.from(
    { length: 42 - currentMonth.length - prevMonth.length },
    (_, i) => {
      const daysOfNextMonth = i + 1;
      const valueOfNextMonth = new Date(year, month, daysOfNextMonth);
      const monthString = valueOfNextMonth.toLocaleString("default", {
        month: "short",
      });
      return {
        label: daysOfNextMonth,
        value: valueOfNextMonth,
        month: monthString,
      };
    }
  );

  const calendars = [...prevMonth, ...currentMonth, ...nextMonth];

  return calendars;
};
