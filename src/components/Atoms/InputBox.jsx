import React, { useState } from "react";

function InputBox() {
  const [searchQuery, setSearchQuery] = useState(null);
  return (
    <div className=" h-fit text-gray-600 hidden md:block rounded-lg px-1 bg-gray-800 align-center relative">
      <form action="" className="flex">
        <input
          id="search"
          placeholder="Search..."
          name="search"
          type="text"
          value={searchQuery || ""}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="order-2 bg-transparent placeholder:text-gray-600 peer focus:outline-none placeholder:italic"
        ></input>
        <i className="text-lg bx bx-search order-1"></i>
        <button
          type="button"
          onClick={() => setSearchQuery(null)}
          className="text-lg text-gray-800 peer-focus:text-gray-600 order-3"
        >
          <i className=" bx bxs-x-circle "></i>
        </button>
      </form>
    </div>
  );
}

export default InputBox;
