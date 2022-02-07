import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import ProfileIcon from "../Atoms/ProfileIcon";

function Card({ url, value }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [Liked, setLiked] = useState(null);
  const [likes, setLikes] = useState(value.heart_count);

  useEffect(() => {
    if (value.profiles.avatar_url) downloadIcon(value.profiles.avatar_url);
  }, [value.profiles.avatar_url]);
  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);
  useEffect(() => {
    if (value) downloadLikes(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

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
    return datum;
  }
  let time = Date.now();
  let howLongAgo = toTimestamp(value.created_at);
  let diff = Math.floor((time - howLongAgo) / (1000 * 3600));

  async function downloadLikes() {
    const { data, error } = await supabase
      .from("likedPosts")
      .select("*")
      .eq("profile_id", value.profiles.id)
      .eq("post_id", value.id);
    if (error) {
      throw error;
    }
    if (data.length > 0) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }
  async function toggleLike() {
    setLiked(!Liked);
    if (Liked) {
      let newValue = likes - 1;
      setLikes(newValue);
      const { error } = await supabase
        .from("Posts")
        .update({ heart_count: newValue })
        .eq("id", value.id);
      if (error) {
        throw error;
      }
      toggleLiked(false);
    } else {
      let newValue = likes + 1;
      setLikes(newValue);
      const { error } = await supabase
        .from("Posts")
        .update({ heart_count: newValue })
        .eq("id", value.id);
      if (error) {
        throw error;
      }
      toggleLiked(true);
    }
  }
  async function toggleLiked(boolean) {
    if (boolean) {
      const { error } = await supabase
        .from("likedPosts")
        .insert([{ profile_id: value.profiles.id, post_id: value.id }]);
      if (error) {
        throw error;
      }
    } else {
      const { error } = await supabase
        .from("likedPosts")
        .delete()
        .eq("profile_id", value.profiles.id)
        .eq("post_id", value.id);
      if (error) {
        throw error;
      }
    }
  }

  return (
    <div className="flex flex-col w-full h-fit p-2">
      <div className="py-2 text-lg flex flex-row gap-2">
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
          <div className="flex flex-row text-3xl pt-3 w-full ">
            <button onClick={toggleLike}>
              <i
                className={`bx ${
                  Liked ? "text-red-900 bxs-heart " : "bx-heart"
                }`}
              ></i>
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
            <h1>{likes} users like it</h1>
            <p className="text-gray-200">
              <span className="font-semibold">{value.profiles.username}: </span>
              {value.description}
            </p>
            <p className="text-xs text-gray-600">
              {diff > 24
                ? `${Math.floor(diff / 24)} days ago`
                : `${diff} hours ago`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
