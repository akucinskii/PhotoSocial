import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";
import Layout from "./components/Layout/Layout";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="w-full min-h-screen h-full bg-black text-white justify-center">
      {!session ? <Auth /> : <Layout key={session.user.id} session={session} />}
    </div>
  );
}
