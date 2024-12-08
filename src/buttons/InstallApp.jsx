import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";

const InstallApp = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      console.log("beforeinstallprompt event fired");
      // Prevent the default browser prompt
      event.preventDefault();
      // Save the event for triggering later
      setDeferredPrompt(event);

      // Show the custom prompt after 5 seconds
      setTimeout(() => {
        setShowCustomPrompt(true);
      }, 5000);
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      console.log("Triggering install prompt...");
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        setDeferredPrompt(null); // Clear the saved event
        setShowCustomPrompt(false); // Hide the custom prompt
      });
    }
  };

  const handleDismiss = () => {
    console.log("User dismissed the custom install prompt");
    setShowCustomPrompt(false); // Hide the custom prompt
  };

  return (
    <>
      {showCustomPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-secondary p-6 rounded-lg shadow-lg text-center mx-5">
            <div className="flex justify-center">
              <img src={logo} alt="" className="w-14" />
            </div>
            <h2 className="text-2xl text-textHead font-semibold mb-4">Install PhotoPix</h2>
            <p className="text-textpara mb-6">
              Get a better experience by installing PhotoPix app on your device!
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleInstallClick}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200 text-sm"
              >
                Install
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 transition duration-200 text-sm"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallApp;
