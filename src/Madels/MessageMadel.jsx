import React, { useContext } from "react";
import Btn from "../buttons/Btn";
import { UserContext } from "../context/OptionContext";

const MessageMadel = ({ message }) => {
  return (
    <div className="max-w-lg mx-auto p-8 rounded-lg bg-secondary space-y-8 flex flex-col justify-center items-center">
      <p className="text-textHead font-medium text-xl">{message}</p>
      <div className="text-white flex items-center justify-center border-2 p-1 border-white rounded-full">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m2.75 8.75l3.5 3.5l7-7.5"
            ></path>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default MessageMadel;
