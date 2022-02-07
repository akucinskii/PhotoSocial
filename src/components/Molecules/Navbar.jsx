import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import InputBox from "../Atoms/InputBox";
import Logo from "../Atoms/Logo";
import ProfileIcon from "../Atoms/ProfileIcon";
import SmallButton from "../Atoms/SmallButton";
import Account from "./Account";
import NewImage from "./NewImage";

function Navbar({ url, session, showStory, setShowStory }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const [isAddShown, setIsAddShown] = useState(false);

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

  const showSettings = () => {
    if (isAddShown) setIsAddShown(false);
    setIsShown(!isShown);
  };

  const showAdd = () => {
    if (isShown) setIsShown(false);
    setIsAddShown(!isAddShown);
  };
  const showNothing = () => {
    setIsAddShown(false);
    setIsShown(false);
  };
  return (
    <div>
      <div className="flex w-full h-fit max-h-12 p-2 fixed bg-black align-center justify-center">
        <div className="w-full max-w-screen-lg flex flex-row align-center justify-around md:justify-between relative">
          <Logo>PhotoSocial</Logo>
          <InputBox />
          <div id="icons" className="relative w-fit flex flex-row gap-3">
            <ProfileIcon url={avatarUrl} click={showSettings} />
            <SmallButton click={showNothing}>
              <i className="bx bx-home"></i>
            </SmallButton>
            <SmallButton click={showAdd}>
              <i className="bx bx-image-add"></i>
            </SmallButton>
            <SmallButton
              click={() => {
                console.log("message");
              }}
            >
              <i className="bx bx-message-square-detail hidden"></i>
            </SmallButton>
            <SmallButton
              click={() => {
                console.log("compass");
              }}
            >
              <i className="bx bx-compass hidden"></i>
            </SmallButton>
            <SmallButton
              click={() => {
                console.log("heart");
              }}
            >
              <i className="bx bx-heart hidden"></i>
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
      <div
        className={`fixed flex justify-center w-full max-w-screen mt-12 overflow-hidden bg-black p-4 border-b-2 border-gray-800 ${
          isAddShown ? "" : "hidden"
        } transition-height duration-300`}
      >
        <NewImage key={session.user.id} session={session} click={showAdd} />
      </div>
    </div>
  );
}

export default Navbar;
