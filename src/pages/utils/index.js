export const YEARS = Array.from({ length: 2060 - 1960 }, (_, i) => i + 1960);

export const renderCalendar = (month, year) => {
  const totalDaysOfPrevMonth = new Date(year, month - 1, 0).getDate();
  const totalDaysOfCurrMonth = new Date(year, month, 0).getDate();
  const firstDayOfCurrMonth = new Date(year, month - 1, 1).getDay();

  const currentMonth = Array.from({ length: totalDaysOfCurrMonth }, (_, i) => {
    const daysOfCurrentMonth = i + 1;
    const valueOfCurrentMonth = new Date(year, month - 1, daysOfCurrentMonth);
    return {
      label: daysOfCurrentMonth,
      value: valueOfCurrentMonth,
    };
  });

  const prevMonth = Array.from({ length: firstDayOfCurrMonth }, (_, i) => {
    const daysOfPrevMonth = totalDaysOfPrevMonth - firstDayOfCurrMonth + i + 1;
    const valueOfPrevMonth = new Date(year, month - 2, daysOfPrevMonth);
    return {
      label: daysOfPrevMonth,
      value: valueOfPrevMonth,
    };
  });

  const nextMonth = Array.from(
    { length: 42 - currentMonth.length - prevMonth.length },
    (_, i) => {
      const daysOfNextMonth = i + 1;
      const valueOfNextMonth = new Date(year, month, daysOfNextMonth);
      return {
        label: daysOfNextMonth,
        value: valueOfNextMonth,
      };
    }
  );

  return [...prevMonth, ...currentMonth, ...nextMonth];
};

export const compareMonth = (value, month) => {
  return value.getMonth() + 1 === month;
};

export const getLocalizeMonth = (year, locale) => {
  try {
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date(year, i, 1);
      return date.toLocaleString(locale, {
        month: "long",
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const getLocalizedDay = (year, month, locale) => {
  try {
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(year, month, i + 1);

      return day.toLocaleDateString(locale, {
        weekday: "short",
      });
    });
  } catch (error) {
    console.log(error);
  }
};
