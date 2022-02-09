import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import NewStoryForm from "./NewStoryForm";
import { v4 as uuidv4 } from "uuid";

function NewStory() {
  const [loading, setLoading] = useState(false);
  const [storyData, setStoryData] = useState([]);
  const [storyUrl, setStoryUrl] = useState(null);
  async function CreateStory(imgUrl) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: uuidv4(),
        profile_id: user.id,
        img_url: imgUrl,
        created_at: new Date(),
      };

      let { error } = await supabase.from("Stories").insert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  console.log(storyData);
  return (
    <div>
      <button
        onClick={() => {
          CreateStory(storyUrl);
        }}
      >
        OK
      </button>
      <NewStoryForm
        url={storyUrl}
        onUpload={(url) => {
          setStoryUrl(url);
        }}
      />
    </div>
  );
}

export default NewStory;
