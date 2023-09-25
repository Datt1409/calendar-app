import { useState } from "react";
import Calendar from "./components/Calendar";
import { AiOutlineCalendar } from "react-icons/ai";

export default function Home() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());

  const handleSetShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  const handleSelectDate = (selectedDate) => {
    setFromDate(selectedDate);
  };

  return (
    <main className="mt-20 flex flex-row h-screen">
      <div className="flex flex-col ml-10 w-full">
        <div className="flex flex-row mb-3">
          <input
            className="ml-10 border-2 w-80 h-10 rounded-md p-4"
            type="text"
            value={fromDate.toLocaleDateString()}
            readOnly
          />
          <button
            className="bg-black w-15 h-10 text-white border rounded-md p-2"
            onClick={() => handleSetShowCalendar()}
          >
            <AiOutlineCalendar size={20} />
          </button>
        </div>

        {showCalendar && (
          <Calendar
            multiple={false}
            activeDate={fromDate}
            onChooseDate={handleSelectDate}
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
          />
        )}
      </div>
    </main>
  );
}
