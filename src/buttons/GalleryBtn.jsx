import React, { useContext, useEffect } from "react";
import { FcGallery } from "react-icons/fc";
import { OptionContext } from "../context/OptionContext";

const GalleryBtn = () => {

  const {
    galleryOpen,setGalleryOpen,setSelectedIndex
  } = useContext(OptionContext);

  const handleClick = () => {
    setGalleryOpen(!galleryOpen)
    setSelectedIndex(-1)
  }

  useEffect(() => {
    const handleEsc = (e) => {
      const key = e.key
      if(key === "Escape"){
        setGalleryOpen(false)
      }
    }

    document.addEventListener("keydown" , handleEsc)

    return () => document.removeEventListener("keydown",handleEsc)
  },[])

  return (
    <div
      className={`flex px-2 pb-2 pt-3 justify-center cursor-pointer items-center bg-secondary sm:h-8 rounded roun`}
      onClick={handleClick}
    >
      <span className="text-2xl text-white font-semibold select-none">
        <FcGallery />
      </span>
    </div>
  );
};

export default GalleryBtn;
