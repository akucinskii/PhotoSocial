import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";
import Layout from "./components/Layout/Layout";
import Account from "./Account";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="w-full min-h-screen h-full bg-black text-white">
      {!session ? (
        <Auth />
      ) : (
        <div className="fixed flex justify-center w-full max-w-screen mt-12 transform overflow-hidden bg-black p-4 opacity-90 transition-all">
          <Account key={session.user.id} session={session} />
        </div>
      )}
      {session ? <Layout key={session.user.id} session={session} /> : ""}
    </div>
  );
}
