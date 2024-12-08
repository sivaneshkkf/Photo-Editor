import React, { useEffect, useState } from "react";
import TheHeader from "./components/TheHeader";
import SideBar from "./components/SideBar";
import {
  OptionContext,
  UploadContext,
  UserContext,
} from "./context/OptionContext";
import SelectFile from "./components/SelectFile";
import SliderComp from "./components/SliderComp";
import TopBar from "./components/TopBar";
import TheImage from "./components/TheImage";
import Login from "./components/Login";
import { supabase } from "./supabase/Config";
import LogoutMadel from "./Madels/LogoutMadel";
import { div } from "motion/react-client";
import MessageMadel from "./Madels/MessageMadel";
import UploadMadal from "./Madels/UploadMadal";
import UploadedImages from "./pages/UploadedImages";
import SignInMadal from "./Madels/SignInMadal";

const App = () => {
  const [CreateBtnShow, setCreateBtnShow] = useState(true);
  const [menuItemOptions, setMenuItemOptions] = useState(null);
  const [selectedMenuOption, setSelectedMenuOption] = useState(null);
  const [url, setUrl] = useState(null);
  const [topMenuItems, setTopMenuItems] = useState(null);
  const [resetOptions, setResetOptions] = useState(null);
  const [download, setDownload] = useState(false);
  const [currentPage, setCurrentPage] = useState("edit");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginMadalOpen, setLoginMadalOpen] = useState(false);
  const [uploadMadal, setUploadMadal] = useState(false);
  const [message, setMessage] = useState(null);
  const [styledUrl, setStyledUrl] = useState(null);
  const [signInMadalOpen, setSignInMadalOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(true);

  const [undoHistory, setUndoHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          console.log("User session:", session.user.user_metadata);
          setUserData(session.user.user_metadata);
          //setMessage("Sign in Successfully!");
        } else {
          setUserData(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!message) return;
    const timeout = setTimeout(() => {
      setMessage(null);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [message]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <UploadContext.Provider
      value={{
        uploadMadal,
        setUploadMadal,
        loading,
        setLoading,
        styledUrl,
        setStyledUrl,
      }}
    >
      <UserContext.Provider
        value={{
          userData,
          setUserData,
          loading,
          setLoading,
          loginMadalOpen,
          setLoginMadalOpen,
          message,
          setMessage,
          signInMadalOpen, setSignInMadalOpen
        }}
      >
        <OptionContext.Provider
          value={{
            CreateBtnShow,
            setCreateBtnShow,
            menuItemOptions,
            setMenuItemOptions,
            url,
            setUrl,
            selectedMenuOption,
            setSelectedMenuOption,
            topMenuItems,
            setTopMenuItems,
            resetOptions,
            setResetOptions,
            download,
            setDownload,
            undoHistory,
            setUndoHistory,
            redoHistory,
            setRedoHistory,
            currentPage,
            setCurrentPage,
            selectedIndex,
            setSelectedIndex,
            styledUrl,
            setStyledUrl,
            galleryOpen, setGalleryOpen
          }}
        >
          <div className="h-screen overflow-hidden bg-primary">
            <TheHeader />
            {CreateBtnShow && <SelectFile className="h-16 mt-28 sm:mt-20 mx-2 rounded-md" />}
            <TopBar />
            <SideBar />
            {url && <TheImage />}
            {galleryOpen &&  <UploadedImages />}

            <SliderComp />
            <div className="absolute top-2 right-2 hidden sm:block">
              <Login />
            </div>
            {(loginMadalOpen || message || uploadMadal || signInMadalOpen) && (
              <div className="absolute inset-0 bg-white h-screen overflow-hidden flex justify-center items-center z-50 bg-opacity-20">
                {loginMadalOpen ? (
                  <div className="w-full">
                    <LogoutMadel />
                  </div>
                ) : message ? (
                  <div className="w-full">
                    <MessageMadel message={message} />
                  </div>
                ) : uploadMadal ? (
                  <div className="w-full">
                    <UploadMadal />
                  </div>
                ) : signInMadalOpen?(
                  <div className="w-full">
                    <SignInMadal />
                  </div>
                ): null}
              </div>
            )}
          </div>
        </OptionContext.Provider>
      </UserContext.Provider>
    </UploadContext.Provider>
  );
};

export default App;
