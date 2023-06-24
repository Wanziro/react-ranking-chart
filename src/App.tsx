import { useState, useEffect } from "react";
import "./App.css";
import movieData from "./data/movies.json";
import DataItem from "./components/data-item";

interface Idata {
  name: string;
  date: string;
  value: number;
  color: string;
}

export interface IdataVisualizer {
  name: string;
  date: string;
  value: number;
  color: string;
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
  const [highestValue, setHighestValue] = useState<undefined | IdataVisualizer>(
    undefined
  );

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
              item.date.toLowerCase() === sortedDates[0].toLowerCase()
          )
          .map((item) => {
            return { ...item, updatedValue: item.value, value: 0 };
          })
      )
    );
    const sortedUniqueNamesBasedOnHighestValue = uniqueNames.sort((a, b) => {
      return b.updatedValue - a.updatedValue;
    });
    setHighestValue(sortedUniqueNamesBasedOnHighestValue[0]);
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
    if (sortedDates.length === 0) return;
    const newState = dataVisualizer;
    const dataToUse = data.filter(
      (item) => item.date === sortedDates[currentDateCounter]
    );
    for (let i = 0; i < dataToUse.length; i++) {
      const index = newState.findIndex(
        (item) => item.name.toLowerCase() === dataToUse[i].name.toLowerCase()
      );
      if (index > -1) {
        newState[index] = {
          ...dataToUse[i],
          value:
            newState[index].value === 0 && newState[index].updatedValue === 0
              ? newState[index].value +
                newState[index].updatedValue +
                Number(dataToUse[i].value)
              : newState[index].value + Number(dataToUse[i].value),
          updatedValue: Number(dataToUse[i].value),
        };
      } else {
        newState.push({
          ...dataToUse[i],
          updatedValue: dataToUse[i].value,
          value: 0,
        });
      }
    }
    setDataVisualizer(newState);
    const highestVal = [...newState];
    setHighestValue(
      highestVal.sort((a, b) => {
        return b.value - a.value;
      })[0]
    );
  }, [currentDateCounter]);
  return (
    <div style={{ position: "relative", width: "100%" }}>
      {dataVisualizer.map((item, index) => (
        <DataItem
          key={index}
          item={item}
          allItems={dataVisualizer}
          highestValue={highestValue}
        />
      ))}
    </div>
  );
}

export default App;
