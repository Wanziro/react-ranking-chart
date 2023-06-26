import { useEffect, useState } from "react";
import { IdataVisualizer } from "../../App";
import { numberFormatter } from "../../helpers";

interface IDataItemProps {
  item: IdataVisualizer;
  highestValue: undefined | IdataVisualizer;
  allItems: IdataVisualizer[];
  currentDateCounter: number;
  sortedDates: string[];
}
function DataItem({
  item,
  highestValue,
  allItems,
  currentDateCounter,
  sortedDates,
}: IDataItemProps) {
  //interval
  let counterInterval: any = null;
  const [percentage, setPercentage] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const index = allItems
      .sort((a, b) => b.value - a.value)
      .findIndex((obj) => obj.name === item.name);
    if (index !== -1) {
      setPosition(index);
    }
  }, [item, allItems]);

  useEffect(() => {
    if (!highestValue) return;
    const per = (item.value / highestValue.value) * 100;
    setPercentage(Number(per.toFixed(2)));
  }, [highestValue]);

  useEffect(() => {
    if (currentDateCounter === sortedDates.length - 1) {
      clearInterval(counterInterval);
      setCounter(item.value);
      return;
    }
    counterInterval = setInterval(() => {
      let initial = item.value > 0 ? item.value - item.updatedValue : 0;

      const update = counter + 1;
      if (item.value !== 0 && item.updatedValue > 0 && update > item.value) {
        clearInterval(counterInterval);
        setCounter(item.value);
      } else {
        if (update < initial) {
          setCounter(initial);
        } else {
          setCounter(update);
        }
      }
    }, 1);

    return () => clearInterval(counterInterval);
  }, [currentDateCounter, counter]);
  return (
    <div
      className="item-container"
      style={{ top: position * 40, width: percentage + "%" }}
    >
      <div className="item-contents-wrapper">
        <p>{item.name}</p>
        <div className="bar" style={{ backgroundColor: item.color }}></div>
        <p>{numberFormatter(counter)}</p>
      </div>
    </div>
  );
}

export default DataItem;
