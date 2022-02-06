import React from "react";
import Navbar from "../Molecules/Navbar";
import StoryBar from "../Molecules/StoryBar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex w-full max-w-screen justify-center">
        <div className="flex flex-col gap-4 pt-20 w-full max-w-lg justify-center">
          <StoryBar />
          <main className="">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
