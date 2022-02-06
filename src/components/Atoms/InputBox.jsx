import React from "react";

function InputBox() {
  const clear = () => {
    document.getElementById("search").value = "";
  };
  return (
    <div className="border border-solid h-fit hidden md:block rounded-lg px-1 border-white align-center relative">
      <form action="" className="flex">
        <input
          id="search"
          placeholder="Search..."
          name="search"
          type="text"
          className="order-2 bg-transparent  peer focus:outline-none placeholder:italic placeholder:text-white"
        ></input>
        <i className="text-lg bx bx-search peer-focus:hidden order-1"></i>
        <button
          onClick={clear}
          className="text-lg hidden peer-focus:block order-3"
        >
          <i className=" bx bxs-x-circle "></i>
        </button>
      </form>
    </div>
  );
}

export default InputBox;
