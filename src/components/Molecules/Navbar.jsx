import React, { useEffect, useState } from "react";
import InputBox from "../Atoms/InputBox";
import Logo from "../Atoms/Logo";
import SmallButton from "../Atoms/SmallButton";
import { supabase } from "../../supabaseClient";
import ProfileIcon from "../Atoms/ProfileIcon";
import Account from "./Account";

function Navbar({ url, session }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  }

  const ShowSettings = () => {
    setIsShown(!isShown);
    console.log(isShown);
  };
  return (
    <div>
      <div className="flex w-full h-fit max-h-12 p-2 fixed bg-black align-center justify-center">
        <div className="w-full max-w-screen-lg flex flex-row align-center justify-around md:justify-between relative">
          <Logo>PhotoSocial</Logo>
          <InputBox />
          <div id="icons" className="relative w-fit flex flex-row gap-3">
            <ProfileIcon url={avatarUrl} click={ShowSettings} />
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
      <div
        className={`fixed flex justify-center w-full max-w-screen mt-12 overflow-hidden bg-black p-4 border-b-2 border-gray-800 ${
          isShown ? "" : "hidden"
        } transition-all`}
      >
        <Account key={session.user.id} session={session} />
      </div>
    </div>
  );
}

export default Navbar;
