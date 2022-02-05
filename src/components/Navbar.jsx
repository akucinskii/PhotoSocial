import React from "react";
import InputBox from "./Atoms/InputBox";
import Logo from "./Atoms/Logo";
import SmallButton from "./Atoms/SmallButton";

function Navbar() {
  return (
    <div className="flex w-full h-fit max-h-12 p-2 fixed bg-black align-center justify-center">
      <div className="w-full max-w-screen-lg flex flex-row align-center justify-around md:justify-between relative">
        <Logo>PhotoSocial</Logo>
        <InputBox />
        <div id="icons" className="relative w-fit flex flex-row gap-3">
          <SmallButton>
            <i className="bx bx-home"></i>
          </SmallButton>
          <SmallButton>
            <i className="bx bx-image-add"></i>
          </SmallButton>
          <SmallButton>
            <i className="bx bx-message-square-detail"></i>
          </SmallButton>
          <SmallButton>
            <i className="bx bx-compass"></i>
          </SmallButton>
          <SmallButton>
            <i className="bx bx-heart"></i>
          </SmallButton>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
