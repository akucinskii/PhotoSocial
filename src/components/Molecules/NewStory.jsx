import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import NewStoryForm from "./NewStoryForm";
import { v4 as uuidv4 } from "uuid";

function NewStory() {
  const [loading, setLoading] = useState(false);
  const [storyUrl, setStoryUrl] = useState(null);

  //create new story in database.
  async function createStory(imgUrl) {
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
  return (
    <div className="text-white flex flex-col items-center content-evenly md:content-none gap-1 md:gap-2 max-h-screen max-w-lg w-full">
      <NewStoryForm
        url={storyUrl}
        onUpload={(url) => {
          setStoryUrl(url);
        }}
      />
      <div>
        <button
          className="bg-black border-2 border-gray-800 focus:outline-none rounded-lg p-2 px-4 hover:bg-gray-900 active:bg-gray-800 focus:bg-gray-900 disabled:bg-gray-400"
          onClick={() => {
            createStory(storyUrl);
          }}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Upload your new story"}
        </button>
      </div>
      <div>
        <p className="bg-gray-600">
          Reload your page after a successful upload
        </p>
      </div>
    </div>
  );
}

export default NewStory;
