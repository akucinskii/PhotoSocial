import React from "react";
import Navbar from "../Molecules/Navbar";
import StoryBar from "../Molecules/StoryBar";
import Cards from "../Organisms/Cards";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex w-full max-w-screen justify-center">
        <div className="flex flex-col gap-4 pt-20 w-full max-w-lg justify-center">
          <StoryBar />
          <Cards />
        </div>
      </div>
    </div>
  );
};

export default Layout;
