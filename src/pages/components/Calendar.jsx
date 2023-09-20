import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {
  MONTHS,
  daysOfWeek,
  YEARS,
  renderCalendar,
  checkDisabled,
} from "../utils/utils";

export default function Calendar() {
  const today = new Date();
  const [date, setDate] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDays, setSelectedDays] = useState([]);

  const calendarDays = useMemo(
    () => renderCalendar(month, year),
    [year, month]
  );

  const currentMonthString = new Date(year, month - 1).toLocaleString(
    "default",
    {
      month: "short",
    }
  );

  console.log(currentMonthString);

  const handleClick = (clickedDay) => {
    const isSelected = selectedDays.some(
      (selectedDay) => selectedDay === clickedDay
    );

    if (isSelected) {
      const updatedSelectedDays = selectedDays.filter(
        (day) => day !== clickedDay
      );
      setSelectedDays(updatedSelectedDays);
    } else {
      setSelectedDays([...selectedDays, clickedDay]);
    }
  };

  const onPrevMonth = () => {
    let newMonth = month - 1;
    let newYear = year;

    if (newMonth === 0) {
      newMonth = 12;
      newYear -= 1;
    }

    setMonth(newMonth);
    setYear(newYear);
  };

  const onNextMonth = () => {
    let newMonth = month + 1;
    let newYear = year;

    if (newMonth === 13) {
      newMonth = 1;
      newYear += 1;
    }

    setMonth(newMonth);
    setYear(newYear);
  };

  const onChangeMonth = (e) => {
    const selectedMonthIndex = MONTHS.indexOf(e.target.value);
    // console.log(e.target.value);
    if (selectedMonthIndex !== -1) {
      setMonth(selectedMonthIndex + 1);
    }
  };

  const onChangeYear = (e) => {
    const selectedYear = parseInt(e.target.value, 10);
    console.log(selectedYear);
    setYear(selectedYear);
  };

  return (
    <div className="w-[700px] flex flex-col justify-center text-center align-center border rounded-lg">
      <div className="flex flex-row justify-center items-center p-5">
        <AiOutlineLeft
          size={18}
          className="cursor-pointer"
          onClick={onPrevMonth}
        />
        <select
          className="rounded-md border bg-slate-100 p-2 mr-2 ml-4 cursor-pointer"
          value={MONTHS[month - 1]}
          onChange={onChangeMonth}
        >
          {MONTHS.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          className="rounded-md border bg-slate-100 p-2 mr-4 ml-2 cursor-pointer"
          value={year}
          onChange={onChangeYear}
        >
          {YEARS.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
        <AiOutlineRight
          size={18}
          className="cursor-pointer"
          onClick={onNextMonth}
        />
      </div>

      <div className="grid grid-cols-7 justify-evenly text-center items-center p-3 ">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="font-bold">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center p-4 gap-[10px]">
        {calendarDays.map((calendarDay, index) => (
          <div
            key={index}
            className={`border rounded-lg cursor-pointer ${
              calendarDay.month === currentMonthString
                ? "text-neutral-600"
                : "text-neutral-400 cursor-not-allowed"
            }
            ${
              selectedDays.some((day) => day === calendarDay.value) &&
              !calendarDay.disabled
                ? "bg-red-300 text-neutral-600"
                : ""
            }
            `}
            onClick={() => handleClick(calendarDay.value)}
          >
            {calendarDay.label}
          </div>
        ))}
      </div>
    </div>
  );
}
