import { useState } from "react";
import BigLogo from "../Atoms/BigLogo";
import { supabase } from "../../supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row w-full h-screen justify-center items-center">
      <div className="flex flex-col items-center justify-items-center gap-4">
        <BigLogo>PhotoSocial</BigLogo>
        <p className="">Sign in via magic link with your email below</p>

        <div>
          <input
            className="bg-transparent border-gray-800 border-2 rounded-lg p-1 focus:outline-none placeholder:italic placeholder:text-white"
            type="email"
            placeholder="Your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email);
            }}
            className="border-2 border-gray-800 p-3 rounded-xl drop-shadow hover:border-gray-700 active:border-gray-600"
            disabled={loading}
          >
            {loading ? <span>Loading...</span> : <span>Send magic link</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
