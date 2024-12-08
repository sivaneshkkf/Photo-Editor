import React, { useContext, useEffect, useRef, useState } from "react";
import { OptionContext, UploadContext } from "../context/OptionContext";
import ReactCrop from "react-image-crop";
import ImageCrop from "./ImageCrop";
import { MapInteractionCSS } from "react-map-interaction";

const TheImage = () => {
  const {
    url,
    menuItemOptions,
    download,
    setDownload,
    currentPage,
    setCurrentPage,
  } = useContext(OptionContext);
  const { styledUrl, setStyledUrl } = useContext(UploadContext);

  const [crop, setCrop] = useState();

  const [zoom, setZoom] = useState(1);

  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  // Generate the filter string
  function getImageFilter() {
    return menuItemOptions
      .filter((item) => item.type === "filter") // Exclude items with 'crop' property
      .map((item) => `${item.property}(${item.value}${item.unit})`) // Format the filter string
      .join(" "); // Combine all filters into a single string
  }

  function getImageStyle() {
    return menuItemOptions
      .filter((item) => item.type === "style") // Include only items of type "style"
      .reduce((styles, item) => {
        styles[item.property] = `${item.value}${item.unit}`; // Add each style as a key-value pair
        return styles;
      }, {}); // Start with an empty object
  }

  //   useEffect(() => {
  //     console.log(getImageFilter())
  //   },menuItemOptions)

  // Handle download
  useEffect(() => {
    if (download || currentPage === "crop") {
      if (!url) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const image = new Image();
      image.crossOrigin = "anonymous"; // To handle cross-origin images
      image.src = url;

      image.onload = () => {
        // Set canvas size to match image dimensions
        canvas.width = image.width;
        canvas.height = image.height;

        // Get border radius and rotation
        const borderRadius =
          menuItemOptions.find((item) => item.property === "borderRadius")
            ?.value || 0;

        const rotate =
          menuItemOptions.find((item) => item.property === "rotate")?.value ||
          0;

        // Apply rotation
        const angleInRadians = (rotate * Math.PI) / 180;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2); // Move to canvas center
        ctx.rotate(angleInRadians); // Rotate
        ctx.translate(-canvas.width / 2, -canvas.height / 2); // Move back to top-left

        // Create rounded clipping path
        ctx.beginPath();
        const radius =
          Math.min(canvas.width, canvas.height) * (borderRadius / 100); // Border radius as percentage
        ctx.moveTo(radius, 0);
        ctx.arcTo(canvas.width, 0, canvas.width, canvas.height, radius);
        ctx.arcTo(canvas.width, canvas.height, 0, canvas.height, radius);
        ctx.arcTo(0, canvas.height, 0, 0, radius);
        ctx.arcTo(0, 0, canvas.width, 0, radius);
        ctx.closePath();
        ctx.clip();

        // Apply filters and draw the image onto the canvas
        ctx.filter = getImageFilter();
        ctx.drawImage(image, 0, 0);

        // Restore context to default
        ctx.restore();

        // Convert canvas to a downloadable file
        const styledURL = canvas.toDataURL("image/png");
        if (download) {
          const link = document.createElement("a");
          link.href = styledURL;
          link.download = "styled-image.png";
          link.click();
        } else {
          setStyledUrl(styledURL);
        }
      };

      setDownload(false);
    }
  }, [download, currentPage]);

  // useEffect(() => {
  //   let prevDist = null; // To store the previous distance between touches

  //   const handleZoom = (e) => {
  //     if (e.ctrlKey) {
  //       e.preventDefault(); // Prevent the browser's default zoom behavior
  //       if (imageRef.current) {
  //         setZoom((prevZoom) => {
  //           const delta = e.deltaY > 0 ? -0.2 : 0.2; // Zoom in (negative deltaY) or out (positive deltaY)
  //           return Math.max(0.1, prevZoom + delta); // Prevent zoom level from going below 0.1
  //         });
  //       }
  //     }
  //   };

  //   const handleTouchZoom = (e) => {
  //     if (e.touches.length === 2) {
  //       e.preventDefault(); // Prevent pinch-to-zoom behavior
  //       const touch1 = e.touches[0];
  //       const touch2 = e.touches[1];

  //       const dist = Math.sqrt(
  //         Math.pow(touch2.clientX - touch1.clientX, 2) +
  //         Math.pow(touch2.clientY - touch1.clientY, 2)
  //       );

  //       if (prevDist !== null) {
  //         setZoom((prevZoom) => {
  //           const delta = dist > prevDist ? 0.02 : -0.02; // Adjust zoom based on distance
  //           return Math.max(0.1, prevZoom + delta); // Prevent zoom level from going below 0.1
  //         });
  //       }

  //       prevDist = dist; // Update the previous distance
  //     }
  //   };

  //   const handleTouchEnd = () => {
  //     prevDist = null; // Reset the previous distance when touches end
  //   };

  //   // Attach event listeners for desktop and mobile
  //   document.addEventListener("wheel", handleZoom, { passive: false });
  //   document.addEventListener("touchmove", handleTouchZoom, { passive: false });
  //   document.addEventListener("touchend", handleTouchEnd);

  //   // Cleanup
  //   return () => {
  //     document.removeEventListener("wheel", handleZoom);
  //     document.removeEventListener("touchmove", handleTouchZoom);
  //     document.removeEventListener("touchend", handleTouchEnd);
  //   };
  // }, []);

  return (
    <>
      {url && currentPage === "edit" ? (
        <MapInteractionCSS>
          <div className="flex w-screen flex-col items-center justify-center min-h-screen box-border sm:h-screen overflow-hidden">
            {/* Display the image */}

            <img
              src={url}
              ref={imageRef}
              alt="Filtered"
              className="sm:max-w-sm max-w-xs select-none"
              style={{
                filter: getImageFilter(),
                ...getImageStyle(),
                // transform: `scale(${zoom})`,
              }}
            />

            {/* Hidden canvas for processing */}
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          </div>
        </MapInteractionCSS>
      ) : (
        currentPage === "crop" && (
          <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
            <ImageCrop url={styledUrl} />
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          </div>
        )
      )}
    </>
  );
};

export default TheImage;
