import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import ProfileIcon from "../Atoms/ProfileIcon";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";

function Card({ url, value }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [Liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(value.heart_count);
  const user = supabase.auth.user();
  //On load of each card start those:
  useEffect(() => {
    if (value.profiles.avatar_url) downloadIcon(value.profiles.avatar_url);
  }, [value.profiles.avatar_url]);
  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);
  useEffect(() => {
    if (user) downloadLikes();
    // Works (?).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  //Download small avatar on right left corner of cart
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
  //Download big image in Card
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

  //Set Timestamp value
  function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum;
  }
  let time = Date.now();
  let howLongAgo = toTimestamp(value.created_at);
  let diff = Math.floor((time - howLongAgo) / (1000 * 3600));

  //Check if user already liked that Card.
  async function downloadLikes() {
    const { data, error } = await supabase
      .from("likedPosts")
      .select("*")
      .eq("post_id", value.id)
      .eq("profile_id", user.id);
    if (error) {
      throw error;
    }
    //console.log(data, user.id, value.profiles.id);
    if (data.length > 0) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }

  //heart count += 1  if card was not liked
  //if card is already liked then heart count -= 1
  async function toggleLike() {
    setLiked(!Liked);
    //console.log("before check", Liked);

    // If post is not liked then heart count += 1
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
    }
    // If Post is already liked then heart count -=1
    // Database sets default value as 0 so it cant get to negative value
    else {
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
    //console.log("after check", Liked)
  }

  //On load set Card to liked or not, based on data in database
  async function toggleLiked(boolean) {
    //console.log("Before toggle: ", Liked);
    if (boolean) {
      //Insert like
      //console.log("LIKED");
      const { error } = await supabase
        .from("likedPosts")
        .insert([{ profile_id: user.id, post_id: value.id }]);
      if (error) {
        throw error;
      }
    } else {
      //delete like
      //console.log("DELETED");
      const { error } = await supabase
        .from("likedPosts")
        .delete()
        .eq("profile_id", user.id)
        .eq("post_id", value.id);
      if (error) {
        throw error;
      }
    }
  }

  return (
    <LazyLoadComponent>
      <div className="flex flex-col w-full h-fit p-2">
        <div className="py-2 text-lg flex flex-row gap-2">
          <ProfileIcon url={avatarUrl} />
          <h1>{value.profiles.username}</h1>
        </div>
        <div>
          <LazyLoadImage
            width="100%"
            height="fit-content"
            key={value.id}
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
                <span className="font-semibold">
                  {value.profiles.username}:{" "}
                </span>
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
    </LazyLoadComponent>
  );
}

export default Card;
