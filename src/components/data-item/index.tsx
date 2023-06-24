import { useEffect, useState } from "react";
import { IdataVisualizer } from "../../App";

interface IDataItemProps {
  item: IdataVisualizer;
  highestValue: undefined | IdataVisualizer;
  allItems: IdataVisualizer[];
}
function DataItem({ item, highestValue, allItems }: IDataItemProps) {
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
  return (
    <div
      className="item-container"
      style={{ top: position * 45, width: percentage + "%" }}
    >
      <div className="item-contents-wrapper">
        <p>{item.name}</p>
        <div className="bar"></div>
        <p>{item.value}</p>
      </div>
    </div>
  );
}

export default DataItem;
