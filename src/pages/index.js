import { useState } from "react";
import Calendar from "./components/Calendar";

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedDay, setSelectedDay] = useState([]);

  
  return (
    <main className="mt-20 flex flex-col items-center ">
      <Calendar isClicked={isClicked} />
    </main>
  );
}
