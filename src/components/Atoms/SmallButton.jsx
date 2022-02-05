import React from "react";

function SmallButton({ children }) {
  return (
    <div className="text-white text-xl">
      <button>{children}</button>
    </div>
  );
}

export default SmallButton;
