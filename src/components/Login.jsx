import React, { useContext, useEffect } from "react";
import { IoLogIn } from "react-icons/io5";
import { UserContext } from "../context/OptionContext";
import { supabase } from "../supabase/Config";

const Login = () => {
  const { userData, setUserData, loginMadalOpen, setLoginMadalOpen, setMessage } = useContext(UserContext);

//   signin
  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error during Google sign-in:", error.message);
    }
  };

  // useEffect(() => {
  //   if(userData){
  //     console.log(userData.avatar_url)
  //   }
  // },[userData])

  return (
    <>
      {userData ? (
        <div className="flex items-center text-textpara text-sm font-medium gap-2 cursor-pointer z-50"
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
