import { useMemo, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {
  daysOfWeek,
  YEARS,
  renderCalendar,
  compareMonth,
  getLocalizeMonth,
  getLocalizedDay,
} from "../utils";

export default function Calendar({
  isMultiple = true,
  locale = "en-US",
  onChooseDate,
}) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDays, setSelectedDays] = useState([]);

  const calendarDays = useMemo(
    () => renderCalendar(month, year),
    [year, month]
  );

  const localizedMonths = useMemo(
    () => getLocalizeMonth(year, locale),
    [year, locale]
  );

  const localizedDays = useMemo(
    () => getLocalizedDay(year, month, locale),
    [locale]
  );

  const handleClick = (clickedDay) => {
    if (isMultiple) {
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
    } else {
      const isSelected = selectedDays.includes(clickedDay);
      if (isSelected) {
        const updatedSelectedDays = selectedDays.filter(
          (day) => day !== clickedDay
        );
        setSelectedDays(updatedSelectedDays);
      } else {
        setSelectedDays([clickedDay]);
        onChooseDate(clickedDay);
      }
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
    const selectedMonthIndex = localizedMonths.indexOf(e.target.value);
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
    <div className="w-[384px] h-[400px] p-2 flex flex-col justify-center text-center align-center border rounded-lg ml-10">
      {/* <div className="flex flex-row justify-center text-center items-center p-5 text-3xl font-bold"></div> */}

      <div className="flex flex-row justify-center items-center p-5">
        <AiOutlineLeft
          size={18}
          className="cursor-pointer"
          onClick={onPrevMonth}
        />
        <select
          className="rounded-md border bg-slate-100 p-2 mr-2 ml-4 cursor-pointer"
          value={localizedMonths[month - 1]}
          onChange={onChangeMonth}
        >
          {localizedMonths.map((localizedMonth, index) => (
            <option key={index} value={localizedMonth}>
              {localizedMonth}
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

      <div className="grid grid-cols-7 text-center items-center mb-2">
        {localizedDays.map((localizedDay, index) => (
          <div key={index} className="font-bold">
            {localizedDay}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center">
        {calendarDays.map((calendarDay, index) => (
          <div
            key={index}
            className={`flex justify-center items-center h-10 w-10 text-center ml-2 mb-2 rounded-full cursor-pointer
            ${
              isMultiple &&
              selectedDays.some((day) => day === calendarDay.value) &&
              compareMonth(calendarDay.value, month)
                ? "bg-blue-500 text-white"
                : ""
            } 
            ${
              !isMultiple &&
              selectedDays.some((day) => day === calendarDay.value) &&
              compareMonth(calendarDay.value, month)
                ? "bg-blue-500 text-white"
                : ""
            }
            ${
              compareMonth(calendarDay.value, month)
                ? "text-neutral-600 hover:bg-gray-300 hover:text-white"
                : "text-neutral-400"
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
