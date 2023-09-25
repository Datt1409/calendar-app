import { useState } from "react";
import Calendar from "./components/Calendar";
import { AiOutlineCalendar } from "react-icons/ai";

export default function Home() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [fromDate, setFromDate] = useState(new Date().toLocaleDateString());

  // const formatDate = (selectedDate) => {
  //   if (!selectedDate) return "";

  //   const year = new Date().getFullYear().toString();
  //   const month = (new Date().getMonth() + 1).toString().padStart(2, 0);
  //   const date = new Date().getDate().toString().padStart(2, 0);

  //   return `${date} - ${month} - ${year}`;
  // };

  const handleSelectDate = (selectedDate) => {
    setFromDate(selectedDate.toLocaleDateString());
  };

  return (
    <main className="mt-20 flex flex-row">
      <Calendar isMultiple />
      <div className="flex flex-col ml-10">
        <div className="flex flex-row mb-3">
          <input
            className="ml-10 border-2 w-80 h-10 rounded-md p-4 placeholder:uppercase"
            type="text"
            // value={
            //   fromDate.getDate().toString().padStart(2, 0) +
            //   "-" +
            //   (fromDate.getMonth() + 1).toString().padStart(2, 0) +
            //   "-" +
            //   fromDate.getFullYear().toString()
            // }
            value={fromDate}
            readOnly
          />
          <button
            className="bg-black w-15 h-10 text-white border rounded-md p-2"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <AiOutlineCalendar size={20} />
          </button>
        </div>
        {showCalendar && (
          <Calendar isMultiple={false} onChooseDate={handleSelectDate} />
        )}
      </div>
    </main>
  );
}
