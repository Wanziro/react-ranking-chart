import { useState, useEffect } from "react";
import "./App.css";
import movieData from "./data/movies.json";

interface Idata {
  name: string;
  date: string;
  value: 1000;
}
function App() {
  //intervals
  //date counter
  let dateCounterInterval: any = null;

  const [data, setData] = useState<Idata[]>(movieData as any);
  const [sortedDates, setSortedDates] = useState<string[]>([]);
  const [dataVisualizer, setDataVisualizer] = useState([]);
  const [currentDateCounter, setCurrentDateCounter] = useState(0);

  useEffect(() => {
    const uniqueDates = Array.from(new Set(data.map((obj) => obj.date)));

    // Step 2: Sort the unique dates in ascending order
    const sortedDates = uniqueDates.sort((a, b) => {
      const [date1, month1] = a.split("/");
      const [date2, month2] = b.split("/");

      const dateObj1 = new Date(parseInt(month1) - 1, parseInt(date1));
      const dateObj2 = new Date(parseInt(month2) - 1, parseInt(date2));

      return dateObj1.getTime() - dateObj2.getTime();
    });
    setSortedDates(sortedDates);
  }, [data]);

  useEffect(() => {
    if (sortedDates.length > 0) {
      dateCounterInterval = setInterval(() => {
        const newIndex = currentDateCounter + 1;
        if (sortedDates[newIndex]) {
          setCurrentDateCounter(newIndex);
        } else {
          clearInterval(dateCounterInterval);
        }
      }, 1000);
    }
    return () => {
      clearInterval(dateCounterInterval);
    };
  }, [sortedDates, currentDateCounter]);
  return <div>{currentDateCounter}</div>;
}

export default App;
