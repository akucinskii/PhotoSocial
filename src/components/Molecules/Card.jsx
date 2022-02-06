import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import ProfileIcon from "../Atoms/ProfileIcon";

function Card({ url, value }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (value.profiles.avatar_url) downloadIcon(value.profiles.avatar_url);
  }, [value.profiles.avatar_url]);
  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

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

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setImageUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  }
  function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }
  let time = Date.now();
  let created_at = toTimestamp(value.created_at);
  let howLongAgo = new Date(Math.abs(created_at - time)).getHours();

  return (
    <div className="flex flex-col w-full h-fit p-2">
      <div className="p-4 text-lg flex flex-row gap-2">
        <ProfileIcon url={avatarUrl} />
        <h1>{value.profiles.username}</h1>
      </div>
      <div>
        <img
          src={imageUrl}
          alt=""
          className="object-cover object-center h-[32rem] w-full"
        />
        <div>
          <div className="flex flex-row text-3xl pt-3 w-full gap-3">
            <button>
              <i className="bx bx-heart"></i>
            </button>
            <button>
              <i className="bx bx-comment hidden"></i>
            </button>
            <button>
              <i className="bx bx-paper-plane "></i>
            </button>
            <button className="ml-auto">
              <i className="bx bx-bookmark"></i>
            </button>
          </div>
          <div className="p-2">
            <h1>{value.heart_count} users like it</h1>
            <p className="text-gray-200">{value.description}</p>
            <p className="text-xs text-gray-600">
              {howLongAgo > 24
                ? `${howLongAgo / 24} days ago`
                : `${howLongAgo} hours ago`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
