import React from "react";
import Navbar from "../Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="pt-16">{children}</main>
    </div>
  );
};

export default Layout;
