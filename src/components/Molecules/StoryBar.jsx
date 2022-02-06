import React from "react";
import RoundIcon from "../Atoms/RoundIcon";

function StoryBar() {
  const numbers = [];
  return (
    <div className="flex flex-row w-full gap-4  h-[118px] border-y-2 border-gray-800 pt-[18px] overflow-hidden hover:overflow-x-auto scrollbar">
      {numbers.map((value, index) => (
        <RoundIcon key={index} value={value} index={index} />
      ))}
    </div>
  );
}

export default StoryBar;
