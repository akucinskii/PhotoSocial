import React from "react";

function BigLogo({ children }) {
  return (
    <div className="align-center justify-center">
      <a
        href="/"
        className="italic font-extralight font-Comforter text-4xl md:text-6xl"
      >
        {children}
      </a>
    </div>
  );
}

export default BigLogo;
