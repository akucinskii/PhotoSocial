//not used atm

import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import RoundIcon from "../Atoms/RoundIcon";

function StoryBar({ click, session }) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    getStories();
  }, [session]);

  //Get all stories from database
  async function getStories() {
    try {
      let { data, error, status } = await supabase
        .from("Stories")
        .select(
          `
      id,
      img_url,
      created_at,
      profiles:profile_id (id, username, avatar_url)
      `
        )
        .order("created_at", { ascending: true })
        .limit(10);

      if (error && status !== 406) {
        throw error;
      }
      //console.log("Story data after downloading: "data);

      if (data) {
        setStories(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    //Display component for each Story in list.
    <div className="flex flex-row w-full gap-4  h-[118px] border-y-2 border-gray-800 pt-[18px] overflow-hidden hover:overflow-x-auto scrollbar">
      {stories.map((value) => (
        <RoundIcon key={value.id} value={value} url={value.img_url} />
      ))}
    </div>
  );
}

export default StoryBar;
