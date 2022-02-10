import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

function RoundIcon({ data, click }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  useEffect(() => {
    if (data.profiles.avatar_url) downloadIcon(data.profiles.avatar_url);
  }, [data.profiles.avatar_url]);
  async function downloadIcon(path) {
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
  return (
    <button
      onClick={() => {
        click(data);
      }}
      className="flex flex-col items-center gap-2"
    >
      <div className="w-fit rounded-full bg-gradient-to-tr p-[3px] from-[#dfab01]  via-[#ff0080] to-[#820086]">
        <div className="flex flex-col justify-between h-full bg-black rounded-full p-[3px]">
          <div
            className={`w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full `}
          >
            <img
              src={avatarUrl}
              alt=""
              className="object-cover h-12 w-12 rounded-full"
            />
          </div>
        </div>
      </div>
      <h1 className="text-sm text-center w-fit max-w-[3rem] truncate">
        {data.profiles.username}
      </h1>
    </button>
  );
}

export default RoundIcon;
