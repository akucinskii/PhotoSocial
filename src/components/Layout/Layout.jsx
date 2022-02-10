import React, { useEffect, useState } from "react";
import Navbar from "../Molecules/Navbar";
import StoryBar from "../Organisms/StoryBar";
import Cards from "../Organisms/Cards";
import { supabase } from "../../supabaseClient";
import Footer from "../Atoms/Footer";
import Stories from "../Organisms/Stories";

const Layout = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [showStories, setShowStories] = useState(false);
  const [storiesValues, setStoriesValues] = useState(null);
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
  function showStoriesEvent(value) {
    setShowStories(!showStories);
    if (value) {
      setStoriesValues(value);
    }
  }
  function setStoriesVisible(value) {
    setShowStories(value);
  }
  return (
    <div className="relative">
      <Stories
        show={showStories}
        setShow={showStoriesEvent}
        setVisible={setStoriesVisible}
        value={storiesValues}
        session={session}
      />
      <div>
        <Navbar
          showStories={showStories}
          session={session}
          url={avatar_url}
          loading={loading}
          website={website}
          username={username}
          setVisible={setStoriesVisible}
        />
        <div className="flex w-full max-w-screen justify-center">
          <div className="flex flex-col gap-4 pt-20 w-full max-w-lg justify-center">
            <StoryBar showStories={showStoriesEvent} />
            <Cards session={session} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
