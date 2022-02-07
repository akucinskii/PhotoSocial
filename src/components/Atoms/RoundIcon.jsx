import React from "react";

function RoundIcon(props) {
  return (
    <button onClick={props.click} className="flex flex-col items-center gap-2">
      <div className="w-fit rounded-full bg-gradient-to-tr p-[3px] from-[#dfab01]  via-[#ff0080] to-[#820086]">
        <div className="flex flex-col justify-between h-full bg-black rounded-full p-[3px]">
          <div
            className={`w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full `}
          >
            <img
              src={props.avatar_url}
              alt=""
              className="object-cover h-12 w-12 rounded-full"
            />
          </div>
        </div>
      </div>
      <h1 className="text-sm text-center w-fit max-w-[3rem] truncate">
        {props.value}
      </h1>
    </button>
  );
}

export default RoundIcon;
