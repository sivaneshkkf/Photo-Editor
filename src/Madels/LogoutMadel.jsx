import React, { useContext, useState } from "react";
import Btn from "../buttons/Btn";
import { UserContext } from "../context/OptionContext";
import { supabase } from "../supabase/Config";


const LogoutMadel = () => {
  const {
    loading,
    setLoading,
    loginMadalOpen,
    setLoginMadalOpen,
    message,
    setMessage,
    setUserData,
  } = useContext(UserContext);

  // Sign out function
  const handleSignout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign Out error: ", error.message);
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Signed out successfully.");
    }

    setLoading(false);
    setLoginMadalOpen(false);
    setUserData(null)
  };

  return (
    <div className="max-w-lg mx-auto p-8 rounded-lg bg-secondary space-y-8">
      <p className="text-textHead font-medium text-sm">
        Are you sure you want to sign out?
      </p>
      <div className="flex items-center gap-10">
        <Btn
          text="Sign out"
          loading={loading}
          className="bg-red-700"
          onClick={handleSignout} // Corrected onClick
        />
        <Btn
          text="Cancel"
          loading={false}
          className="bg-zinc-600"
          onClick={() => setLoginMadalOpen(false)} // Corrected onClick
        />
      </div>
    </div>
  );
};

export default LogoutMadel;
