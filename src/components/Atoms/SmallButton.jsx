import React from "react";

function SmallButton({ children, click }) {
  return (
    <div className="text-white text-xl">
      <button onClick={click}>{children}</button>
    </div>
  );
}

export default SmallButton;
