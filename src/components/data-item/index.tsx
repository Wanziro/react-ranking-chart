import { useEffect, useState } from "react";
import { IdataVisualizer } from "../../App";
import "./index.css";

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

  useEffect(() => {}, []);
  return (
    <div className="item-container" style={{ top: position * 35 }}>
      {item.name}{" "}
      <span>
        {item.value} (%{percentage})
      </span>
    </div>
  );
}

export default DataItem;
