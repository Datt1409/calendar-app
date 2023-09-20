import React, { useMemo, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const MONTHS = [
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

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const YEARS = Array.from({ length: 2060 - 1960 }, (_, i) => i + 1960 );

export default function Calendar() {
  const today = new Date();
  const [date, setDate] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDays, setSelectedDays] = useState([])

  const totalDaysOfPrevMonth = new Date(year, month - 1, 0).getDate();
  const totalDaysOfCurrMonth = new Date(year, month, 0).getDate();

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
          selected: selectedDays.includes(valueOfCurrentMonth),
        };
      }),
    [year, month]
  );

  const firstDay = useMemo(
    () => new Date(year, month - 1, 1).getDay(),
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
          selected: selectedDays.includes(valueOfPrevMonth),
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
            selected: selectedDays.includes(valueOfNextMonth),
          };
        }
      ),
    [year, month]
  );

  const calendarDays = useMemo(
    () => [...prevMonth, ...currentMonth, ...nextMonth],
    [year, month]
  );

  // const handleClick = (clickedDay) => {
  //   const isClicked = selectedDays.indexOf(clickedDay);
  //   if (isClicked) {
  //     const updatedSelectedDays = selectedDays.filter(
  //       (selectedDay) => selectedDay.getTime() !== clickedDay.getTime()
  //     );
  //     setSelectedDays(updatedSelectedDays);
  //   } else {
  //     setSelectedDays([...selectedDays, clickedDay]);
  //   }
  // };

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
    if (selectedMonthIndex !== -1) {
      setMonth(selectedMonthIndex + 1);
    }
  };

  const onChangeYear = (e) => {
    const selectedYear = parseInt(e.target.value, 10);
    setYear(selectedYear);
  };

  return (
    <div className="w-[700px] flex flex-col justify-center text-center align-center border rounded-lg">
      <div className="flex flex-row justify-center items-center p-5">
        <AiOutlineLeft size={18} className="" onClick={onPrevMonth} />
        <select
          name=""
          id=""
          className="rounded-md border  bg-slate-100 p-2 mr-2 ml-4"
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
          name=""
          id=""
          className="rounded-md border  bg-slate-100 p-2 mr-4 ml-2 "
          value={year}
          onChange={onChangeYear}
        >
          {YEARS.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
        <AiOutlineRight size={18} className="" onClick={onNextMonth} />
      </div>

      <div className="grid grid-cols-7 justify-evenly text-center items-center p-3 ">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="font-bold">
            {day}{" "}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center p-4 gap-[10px]">
        {calendarDays.map((calendarDay, index) => (
          <div
            key={index}
            className={`border rounded-lg ${
              calendarDay.disabled ? "text-neutral-400" : "text-neutral-600"
            } `}
            // onClick={handleClick(calendarDay.value)}
          >
            {calendarDay.label}
          </div>
        ))}
      </div>
    </div>
  );
}
