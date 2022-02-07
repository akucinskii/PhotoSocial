import React, { useEffect, useState } from "react";
import Navbar from "../Molecules/Navbar";
import StoryBar from "../Organisms/StoryBar";
import Cards from "../Organisms/Cards";
import { supabase } from "../../supabaseClient";
import Footer from "../Atoms/Footer";

const Layout = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [storyConfig, setStoryConfig] = useState(false);
  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function storyConfigEvent() {
    setStoryConfig(!storyConfig);
  }
  return (
    <div>
      <Navbar
        session={session}
        url={avatar_url}
        loading={loading}
        website={website}
        username={username}
        showStory={storyConfig}
        setShowStory={storyConfigEvent}
      />
      <div className="flex w-full max-w-screen justify-center">
        <div className="flex flex-col gap-4 pt-20 w-full max-w-lg justify-center">
          <StoryBar click={storyConfigEvent} />
          <Cards session={session} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
