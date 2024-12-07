import React, { useContext, useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { OptionContext } from "../context/OptionContext";
import { Box, Slider } from "@mui/material";

const ImageCrop = ({ url }) => {
  const {
    menuItemOptions,
    setMenuItemOptions,
    selectedMenuOption,
    setSelectedMenuOption,
    setUrl,
    setCurrentPage,
    selectedIndex,
    setSelectedIndex,
    setUndoHistory,
  } = useContext(OptionContext);

  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  const onImageLoad = (e) => {
    setCompletedCrop({
      x: 0,
      y: 0,
      height: e?.currentTarget?.height,
      width: e?.currentTarget?.width,
      unit: "px",
    });
  };

  const onZoom = (val) => setScale(parseFloat(val));

  const onSave = () => {
    if (!completedCrop || !imageRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = imageRef.current;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    // Apply transformations and crop
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );
    ctx.restore();

    // Convert canvas to image URL
    const croppedImageUrl = canvas.toDataURL("image/png");
    // const link = document.createElement("a");
    // link.href = croppedImageUrl;
    // link.download = "cropped-image.png";
    // link.click();
    setUrl(croppedImageUrl);
    setCurrentPage("edit");
    setSelectedMenuOption(menuItemOptions[0]);
    setSelectedIndex(0)
    setMenuItemOptions((pre) => {
      return pre.map((option, index) => {
        if (option.property !== "crop") return option;
        return { ...option, url: croppedImageUrl };
      });
    });
    setUndoHistory((pre) => [...pre, menuItemOptions]);
  };

  const onCancel = () => {
    setCrop(null);
    setRotation(0);
    setScale(1);
  };

  // const onRotate = () => {
  //   setRotation((prevRotation) => (prevRotation + 90) % 360);
  // };

  //const handleSliderChange = (e, newValue) => onZoom(newValue);

  return (
    <div className="">
      <ReactCrop
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(e) => setCompletedCrop(e)}
      >
        <img
          src={url}
          alt="cropImg"
          ref={imageRef}
          className="w-96"
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg)`,
          }}
          onLoad={onImageLoad}
        />
      </ReactCrop>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <div className="absolute w-96 bottom-2 left-1/2 transform -translate-x-1/2 bg-secondary px-5 py-2 rounded-lg flex flex-col justify-center items-center gap-2">
        <div>
          <p className="text-textpara text-xs font-semibold">
            {selectedMenuOption.name.toUpperCase()}
          </p>
        </div>
        {/* <div className="flex items-center gap-4">
          <Box sx={{ width: 300 }}>
            <Slider
              min={0.1}
              max={3}
              step={0.05}
              value={scale} // Controlled value
              onChange={handleSliderChange} // Update value when changed
              sx={{
                color: "#FF6500", // Default thumb and track color
                "& .MuiSlider-thumb": {
                  "&:hover": {
                    boxShadow: "0 0 0 12px rgba(255, 101, 0, 0.3)", // Ripple effect on hover/active
                  },
                },
              }}
            />
          </Box>
          <div className="text-textpara flex text-sm font-medium">
            <p>{Math.floor((scale / 3) * 100)}</p>
            <span>%</span>
          </div>
        </div> */}
        <div className="flex gap-4 justify-between w-full">
          <button
            onClick={onSave}
            className="bg-primary text-textpara hover:text-white px-4 py-1 rounded hover:bg-green-600 text-xs w-full font-medium"
          >
            Save
          </button>
          {/* <button
            onClick={onRotate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Rotate
          </button> */}
          <button
            onClick={onCancel}
            className="bg-primary text-textpara hover:text-white px-4 py-1 rounded hover:bg-red-600 text-xs w-full font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCrop;
