import React, { useContext, useEffect } from "react";
import { IoLogIn } from "react-icons/io5";
import { UserContext } from "../context/OptionContext";
import { supabase } from "../supabase/Config";

const Login = () => {
  const {
    userData,
    setUserData,
    loginMadalOpen,
    setLoginMadalOpen,
    setMessage,
  } = useContext(UserContext);

  //   signin
  const handleGoogleSignIn = async () => {
    const authURL = `${
      supabase.authUrl
    }/authorize?provider=google&redirect_to=${encodeURIComponent(
      window.location.origin
    )}`;

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

  // useEffect(() => {
  //   if(userData){
  //     console.log(userData.avatar_url)
  //   }
  // },[userData])

  return (
    <>
      {userData ? (
        <div
          className="flex items-center text-textpara text-sm font-medium gap-2 cursor-pointer z-50"
          onClick={() => setLoginMadalOpen(true)}
        >
          <p>{userData?.full_name}</p>
          <img
            src={userData?.avatar_url}
            alt="profile"
            className="sm:w-10 sm:h-10 w-8 h-8 rounded-full border-2 border-textpara"
          />
        </div>
      ) : (
        <div
          className="flex gap-1 justify-center items-center text-textpara text-sm font-semibold cursor-pointer"
          onClick={handleGoogleSignIn}
        >
          <p>Sing in</p>
          <IoLogIn className="w-7 h-7" />
        </div>
      )}
    </>
  );
};

export default Login;
