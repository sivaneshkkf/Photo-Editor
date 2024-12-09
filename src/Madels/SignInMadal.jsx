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
    const authURL = `${supabase.authUrl}/authorize?provider=google&redirect_to=${encodeURIComponent(window.location.origin)}`;
  
    // Open the OAuth flow in a new popup window
    const popup = window.open(authURL, "_blank", "width=500,height=600");
  
    if (!popup) {
      console.error("Failed to open popup window.");
      return;
    }
  
    // Check for authentication state periodically
    const interval = setInterval(async () => {
      try {
        // Check if the popup is closed manually
        if (popup.closed) {
          clearInterval(interval);
          console.log("Popup closed by user.");
          return;
        }
  
        // Fetch user session from Supabase
        const { data: session } = await supabase.auth.getSession();
        if (session?.session) {
          clearInterval(interval);
          popup.close(); // Close the popup after successful login
          console.log("User signed in successfully:", session.user);
          // Perform post-login actions, such as fetching user data
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    }, 500);
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
