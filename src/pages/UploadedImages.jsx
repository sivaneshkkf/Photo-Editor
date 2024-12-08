import React, { useContext, useState } from "react";
import useFetchImages from "../hooks/useFetchImages";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { OptionContext, UserContext } from "../context/OptionContext";
import useSupabaseFunc from "../hooks/useSupabaseFunc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const UploadedImages = () => {
  const { CreateBtnShow, setGalleryOpen, setUrl, setCreateBtnShow, setResetOptions } =
    useContext(OptionContext);
  const { userData } = useContext(UserContext);

  const [refreshKey, setRefreshKey] = useState(0); // State to trigger re-fetch
  const { userImages, publicImages } = useFetchImages(refreshKey);
  const { deleteRow } = useSupabaseFunc();
  const [loading, setLoading] = useState(false);

  const handleImageClick = (imageUrl) => {
    setUrl(imageUrl);
    setGalleryOpen(false);
    setCreateBtnShow(false);
    setResetOptions((pre) => {
      return pre.map((option) => {
        if (option.property !== "crop") return option;
        return { ...option, url: imageUrl };
      });
    });
  };

  const handleDelete = async (id,path) => {
    try {
      setLoading(true)
      await deleteRow("Images", "id", id,path); // Perform delete operation
      setRefreshKey((prev) => prev + 1); // Trigger re-fetch by updating the key
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error deleting image:", error);
    }
  };

  const renderImages = (images, label) =>
    images.length > 0 && (
      <>
        <p className="text-textpara text-sm font-medium mb-1">{label}</p>
        <div className="flex flex-wrap gap-4 items-center mb-10">
          {images.map((img) => (
            <Image
              key={img.id}
              img={img}
              onClick={() => handleImageClick(img.imageUrl)}
              canDelete={userData?.provider_id === img?.user_id}
              onDelete={() => handleDelete(img.id,img.file_path)}
              loading={loading}
            />
          ))}
        </div>
      </>
    );

  return (
    <div
      className={`inset-x-2 sm:inset-x-16 lg:inset-x-40 bg-secondary p-5 rounded-lg mx-auto mt-16 sm:mt-5 overflow-y-scroll absolute bottom-16 sm:bottom-5 ${
        CreateBtnShow ? "top-40 sm:top-36" : "top-10"
      }`}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {renderImages(userImages, "My Edits")}
      {renderImages(publicImages, "Public")}
    </div>
  );
};

const Image = ({ img, onClick, canDelete, onDelete, loading }) => (
  <motion.div
    className="relative select-none"
    initial="initial"
    whileHover="hover"
  >
    <img
      src={img.imageUrl}
      alt="img"
      className="sm:w-40 sm:h-52 w-28 h-32 rounded-lg object-cover object-center"
      onClick={onClick}
    />
    {canDelete && (
      <motion.div
        className="w-7 h-7 rounded-full bg-secondary flex justify-center items-center bg-opacity-50 absolute bottom-1 ring-2 right-1 cursor-pointer"
        variants={{
          initial: { scale: 0, opacity: 0 },
          hover: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
        }}
        onClick={onDelete}
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin text-white"/>
        ) : (
          <MdDelete className="w-5 h-5 text-white" />
        )}
      </motion.div>
    )}
  </motion.div>
);

export default UploadedImages;
