import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import InputBox from "../Atoms/InputBox";
import Logo from "../Atoms/Logo";
import ProfileIcon from "../Atoms/ProfileIcon";
import SmallButton from "../Atoms/SmallButton";
import Account from "./Account";
import NewImage from "./NewImage";
import NewStory from "./NewStory";

function Navbar({ url, session, addShowStory, setAddShowStory }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [SettingsShown, setSettingsShown] = useState(false);
  const [AddPhotoShown, setAddPhotoShown] = useState(false);
  const [AddStoryShown, setAddStoryShown] = useState(false);

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
  const showNothing = () => {
    setAddPhotoShown(false);
    setSettingsShown(false);
    setAddStoryShown(false);
  };

  const showProfileSettings = () => {
    showNothing();
    setSettingsShown(!SettingsShown);
  };

  const showAddPhoto = () => {
    showNothing();
    setAddPhotoShown(!AddPhotoShown);
  };
  const showAddStory = () => {
    showNothing();
    setAddStoryShown(!AddStoryShown);
  };
  return (
    <div>
      <div className="flex w-full h-fit max-h-12 p-2 fixed bg-black align-center justify-center">
        <div className="w-full max-w-screen-lg flex flex-row align-center justify-around md:justify-between relative">
          <Logo>PhotoSocial</Logo>
          <InputBox />
          <div id="icons" className="relative w-fit flex flex-row gap-3">
            <ProfileIcon url={avatarUrl} click={showProfileSettings} />
            <SmallButton click={showNothing}>
              <i className="bx bx-home"></i>
            </SmallButton>
            <SmallButton click={showAddPhoto}>
              <i className="bx bx-image-add"></i>
            </SmallButton>
            <SmallButton
              click={() => {
                showAddStory();
              }}
            >
              <i className="bx bx-add-to-queue"></i>
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
          AddStoryShown ? "" : "hidden"
        } transition-all`}
      >
        <NewStory key={session.user.id} session={session} />
      </div>
      <div
        className={`fixed flex justify-center w-full max-w-screen mt-12 overflow-hidden bg-black p-4 border-b-2 border-gray-800 ${
          SettingsShown ? "" : "hidden"
        } transition-all`}
      >
        <Account key={session.user.id} session={session} />
      </div>
      <div
        className={`fixed flex justify-center w-full max-w-screen mt-12 overflow-hidden bg-black p-4 border-b-2 border-gray-800 ${
          AddPhotoShown ? "" : "hidden"
        } transition-height duration-300`}
      >
        <NewImage
          key={session.user.id}
          session={session}
          click={showAddPhoto}
        />
      </div>
    </div>
  );
}

export default Navbar;
