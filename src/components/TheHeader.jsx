import React from "react";
import logo from "../images/logo.png";
import Login from "./Login";

const TheHeader = () => {
  return (
    <div className="absolute top-0 left-0 p-2 flex items-center gap-2 z-[1000px] justify-between w-full bg-primary sm:bg-transparent">
      <div className="flex gap-2 items-center">
        <span>
          <img src={logo} alt="logo" className="w-6" />
        </span>
        <p className="text-textpara font-semibold tracking-widest">
          PHOTO<span className="text-accent1">PIX</span>
        </p>
      </div>

      <div className="absolute top-2 right-2 block sm:hidden">
        <Login />
      </div>
    </div>
  );
};

export default TheHeader;
