import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import ProfileIcon from "../Atoms/ProfileIcon";

function Stories({ session, show, value, setVisible }) {
  const [storyUrl, setStoryUrl] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  useEffect(() => {
    if (value !== null && session) downloadStory(value.img_url);
  }, [value, session]);
  useEffect(() => {
    if (value !== null && session) downloadAvatar(value.profiles.avatar_url);
  }, [value, session]);

  //download avatar for story.
  async function downloadAvatar(path) {
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

  //download main story image
  async function downloadStory(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setStoryUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  }

  return (
    <div
      className={`fixed w-full min-h-screen flex flex-col align-center justify-center items-center bg-black bg-opacity-90 ${
        show ? "" : "hidden"
      }`}
    >
      <button
        onClick={() => {
          setVisible();
        }}
      >
        <i className="fixed right-4 top-12 text-4xl bx bx-x"></i>
      </button>

      <div className="flex flex-col w-[32rem] max-h-screen h-[43.75rem] max-w-screen bg-gray-700 relative">
        <div className=" absolute flex flex-row w-full gap-4 h-min align-center p-2 bg-gray-700/50">
          <ProfileIcon url={avatarUrl} />
          {value ? (
            <span className="text-2xl">{value.profiles.username}</span>
          ) : (
            ""
          )}
        </div>
        <div className="flex h-full justify-center">
          <img src={storyUrl} alt="ZDJECIE" className="object-cover" />
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Stories;
