import { useState, useEffect } from "react";
import "./App.css";
import movieData from "./data/movies.json";

interface Idata {
  name: string;
  date: string;
  value: number;
}

interface IdataVisualizer {
  name: string;
  date: string;
  value: number;
  updatedValue: number;
}

function App() {
  //intervals
  //date counter
  let dateCounterInterval: any = null;

  const [data, setData] = useState<Idata[]>(movieData as any);
  const [sortedDates, setSortedDates] = useState<string[]>([]);
  const [dataVisualizer, setDataVisualizer] = useState<IdataVisualizer[]>([]);
  const [currentDateCounter, setCurrentDateCounter] = useState(0);

  useEffect(() => {
    const uniqueDates = Array.from(new Set(data.map((obj) => obj.date)));
    const sortedDates = uniqueDates.sort((a, b) => {
      const [date1, month1] = a.split("/");
      const [date2, month2] = b.split("/");

      const dateObj1 = new Date(parseInt(month1) - 1, parseInt(date1));
      const dateObj2 = new Date(parseInt(month2) - 1, parseInt(date2));

      return dateObj1.getTime() - dateObj2.getTime();
    });
    setSortedDates(sortedDates);

    //initialize data visualizier
    const uniqueNames = Array.from(
      new Set(
        data
          .filter(
            (item) =>
              // item.date.toLocaleLowerCase().includes(sortedDates[0])
              item.date.toLocaleLowerCase() ===
              sortedDates[0].toLocaleLowerCase()
          )
          .map((item) => {
            return { ...item, updatedValue: item.value, value: 0 };
          })
      )
    );
    const sortedUniqueNamesBasedOnHighestValue = uniqueNames.sort((a, b) => {
      return b.updatedValue - a.updatedValue;
    });
    setDataVisualizer(sortedUniqueNamesBasedOnHighestValue);
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

  useEffect(() => {
    const newState = dataVisualizer;
    const dataToUse = data.filter(
      (item) =>
        item.date.toLocaleLowerCase() ===
        sortedDates[currentDateCounter]?.toLocaleLowerCase()
    );
    for (let i = 0; i < dataToUse.length; i++) {
      const index = newState.findIndex(
        (item) => item.name === dataToUse[i].name
      );
      if (index > -1) {
        newState[index].value += Number(dataToUse[i].value);
        newState[index].updatedValue = Number(dataToUse[i].value);
      } else {
        newState.push({
          ...dataToUse[i],
          updatedValue: dataToUse[i].value,
          value: 0,
        });
      }
    }
    setDataVisualizer(newState);
  }, [currentDateCounter]);
  console.log({ dataVisualizer });
  return <div>{currentDateCounter}</div>;
}

export default App;
