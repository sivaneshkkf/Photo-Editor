import React, { useContext, useState } from "react";
import { OptionContext, UploadContext } from "../context/OptionContext";
import Btn from "../buttons/Btn";
import { IoIosArrowDown } from "react-icons/io";
import useStorage from "../hooks/UseStorage";
import useGetImage from "../hooks/useGetImage";

const UploadMadal = () => {

    const {url} = useContext(OptionContext);

  const { uploadMadal, setUploadMadal, loading, setLoading,styledUrl,setStyledUrl } =
    useContext(UploadContext);

  const [optionOpen, setOptionOpen] = useState(false);
  const [optionValue, setOpeionValue] = useState("Private");

  const { progress, error, setImageUrl } = useStorage(optionValue)

  const {setFileForStyle, styledImage} = useGetImage(url)

  const handleUpload = () => {
    setImageUrl(styledImage)
  };
  return (
    <div className="max-w-lg mx-auto p-8 rounded-lg bg-secondary space-y-8">
      <p className="text-textHead font-medium text-lg text-center">
        Upload Image
      </p>
      <div className="space-y-14 relative">
        <div className="space-y-1 w-full">
          <label htmlFor="privacy" className="text-white">
            Select Mode
          </label>
          <div
            name="privacy"
            id="privacy"
            className="w-full py-2 px-2 rounded bg-zinc-700 outline-none text-white flex items-center justify-between text-xs"
            onClick={() => setOptionOpen(!optionOpen)}
          >
            <p>{optionValue}</p>
            <IoIosArrowDown />
          </div>
          {optionOpen && (
            <div className="bg-zinc-700 rounded text-textHead overflow-hidden absolute top-16 w-full text-xs">
              <p
                onClick={() => {
                    setOpeionValue("Private")
                    setOptionOpen(false)
                }}
                className="hover:bg-zinc-600 p-2"
              >
                Private
              </p>
              <p
                onClick={() => {
                    setOpeionValue("Public")
                    setOptionOpen(false)
                }}
                className="hover:bg-zinc-600 p-2"
              >
                Public
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-10">
          <Btn
            text="Upload"
            loading={loading}
            className="bg-accent2"
            onClick={handleUpload} // Corrected onClick
          />
          <Btn
            text="Cancel"
            loading={false}
            className="bg-zinc-600"
            onClick={() => setUploadMadal(false)} // Corrected onClick
          />
        </div>
      </div>
    </div>
  );
};

export default UploadMadal;
