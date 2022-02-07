import React from "react";

function AddStoryButton(props) {
  return (
    <button
      onClick={props.click}
      className="flex flex-col items-center gap-2 group text-gray-800 hover:text-gray-700"
    >
      <div className="w-fit rounded-full bg-gray-800 group-hover:bg-gray-700  p-[3px] ">
        <div className="flex flex-col justify-between h-full bg-black rounded-full p-[3px]">
          <div className="w-12 h-12 text-5xl relative">
            <i className="absolute top-0 left-0  bx bx-plus"></i>
          </div>
        </div>
      </div>
      <h1 className="text-sm text-gray-600 group-hover:text-gray-500 text-center w-fit max-w-[3rem] truncate ">
        Add
      </h1>
    </button>
  );
}

export default AddStoryButton;
