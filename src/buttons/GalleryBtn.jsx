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
      className={`flex flex-col gap-1 px-2 pb-2 ml-2 sm:ml-0 justify-center cursor-pointer items-center bg-secondary sm:h-8 rounded roun`}
      onClick={handleClick}
    >
      <span className="text-2xl text-white font-semibold select-none">
        <FcGallery />
      </span>
      <p className="sm:hidden text-[10px] select-none text-icon whitespace-nowrap">
          Gallery
        </p>
    </div>
  );
};

export default GalleryBtn;
