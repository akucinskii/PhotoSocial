import React from "react";
import RoundIcon from "../Atoms/RoundIcon";

function StoryBar() {
  const numbers = [
    "red",
    "blue",
    "greengreengreen",
    "yellow",
    "purple",
    "dymd",
  ];
  return (
    <div className="flex flex-row w-full gap-8  h-fit border-y-2 border-gray-800 p-2 overflow-hidden">
      {numbers.map((value, index) => (
        <RoundIcon key={index} value={value} />
      ))}
    </div>
  );
}

export default StoryBar;
