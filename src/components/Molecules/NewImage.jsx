import { useState } from "react";
import { supabase } from "../../supabaseClient";
import NewImageForm from "./NewImageForm";
import { v4 as uuidv4 } from "uuid";

export default function Account() {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(null);
  const [gps, setLocation] = useState(null);
  const [imgUrl, setImageUrl] = useState(null);

  //Create new post
  async function CreatePost({ description, gps, imgUrl }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: uuidv4(),
        description,
        heart_count: 0,
        profile_id: user.id,
        gps,
        img_url: imgUrl,
        created_at: new Date(),
      };

      let { error } = await supabase.from("Posts").insert(updates, {
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
      <NewImageForm
        url={imgUrl}
        onUpload={(url) => {
          setImageUrl(url);
        }}
      />
      <div>
        <p>Description:</p>
        <input
          id="description"
          type="text"
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-black border-2 border-gray-800 focus:outline-none rounded-lg p-1  w-fit overflow-auto"
        />
      </div>
      <div>
        <p>Location</p>
        <input
          id="gps"
          type="gps"
          value={gps || ""}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-black border-2 border-gray-800 focus:outline-none rounded-lg p-1"
        />
      </div>

      <div>
        <button
          className="bg-black border-2 border-gray-800 focus:outline-none rounded-lg p-2 px-4 hover:bg-gray-900 active:bg-gray-800 focus:bg-gray-900 disabled:bg-gray-400"
          onClick={() => {
            CreatePost({ description, gps, imgUrl });
          }}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Upload your image"}
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
