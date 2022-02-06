import React from "react";
import RoundIcon from "../Atoms/RoundIcon";

function StoryBar() {
  const numbers = [
    "Wojtyla",
    "Wojtek",
    "JD59124",
    "dasdasd",
    "testest",
    "sdaasd",
    "jd",
    "pogu",
    "testststst",
  ];
  return (
    <div className="flex flex-row w-full gap-8  h-[118px] border-y-2 border-gray-800 p-2 overflow-hidden hover:overflow-x-auto scrollbar">
      {numbers.map((value, index) => (
        <RoundIcon key={index} value={value} index={index} />
      ))}
    </div>
  );
}

export default StoryBar;
