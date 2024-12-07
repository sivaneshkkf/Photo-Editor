import React, { useContext, useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import useStorage from "../hooks/UseStorage";
import { OptionContext } from "../context/OptionContext";

const SelectFile = ({ className }) => {
  const [file, setFile] = useState(null);

  const {
    CreateBtnShow,
    setCreateBtnShow,
    setResetOptions,
    url,
    setUrl,
    menuItemOptions,
    setMenuItemOptions,
    setGalleryOpen
  } = useContext(OptionContext);
  //const { progress, url, error } = useStorage(file);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setUrl(imageUrl);
      setCreateBtnShow(false);
      setGalleryOpen(false)
      setResetOptions((pre) => {
        return pre.map((option) => {
          if (option.property !== "crop") return option;
          return { ...option, url: imageUrl };
        });
      });
    } else {
      console.log("File selected failed");
    }
  };

  return (
    <div className="">
      <div className={`max-w-xl mx-auto`}>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="fileInput"
          className={`flex justify-center cursor-pointer items-center bg-gradient-to-br from-accent1 to-accent2 ${className}`}
        >
          <p className="text-2xl text-white font-semibold select-none">+</p>
        </label>
      </div>

      {/* {error && <p>Error: {error}</p>} */}
    </div>
  );
};

export default SelectFile;
