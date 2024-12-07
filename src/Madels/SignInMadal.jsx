import React, { useContext, useState } from "react";
import Btn from "../buttons/Btn";
import { UserContext } from "../context/OptionContext";
import { supabase } from "../supabase/Config";

const SignInMadal = () => {
  const {
    loading,
    setLoading,
    loginMadalOpen,
    setLoginMadalOpen,
    message,
    setMessage,
    setSignInMadalOpen,
  } = useContext(UserContext);

  // Sign out function
  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error during Google sign-in:", error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 rounded-lg bg-secondary space-y-8">
      <p className="text-textHead font-medium text-sm">
        To save to the cloud, please sign in first.
      </p>
      <div className="flex items-center gap-10">
        <Btn
          text="Sign in"
          loading={loading}
          className="bg-red-700"
          onClick={handleGoogleSignIn} // Corrected onClick
        />
        <Btn
          text="Cancel"
          loading={false}
          className="bg-zinc-600"
          onClick={() => setSignInMadalOpen(false)} // Corrected onClick
        />
      </div>
    </div>
  );
};

export default SignInMadal;
