import { useEffect, useState } from "react";
import { IdataVisualizer } from "../../App";

interface IDataItemProps {
  item: IdataVisualizer;
  highestValue: undefined | IdataVisualizer;
  allItems: IdataVisualizer[];
  currentDateCounter: number;
}
function DataItem({
  item,
  highestValue,
  allItems,
  currentDateCounter,
}: IDataItemProps) {
  const [percentage, setPercentage] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
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

  useEffect(() => {}, [currentDateCounter]);
  return (
    <div
      className="item-container"
      style={{ top: position * 40, width: percentage + "%" }}
    >
      <div className="item-contents-wrapper">
        <p>{item.name}</p>
        <div className="bar" style={{ backgroundColor: item.color }}></div>
        <p>{item.value === 0 ? item.updatedValue : item.value}</p>
      </div>
    </div>
  );
}

export default DataItem;
