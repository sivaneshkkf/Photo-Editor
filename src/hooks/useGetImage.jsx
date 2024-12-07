import { useEffect, useState, useContext } from "react";
import { OptionContext, UploadContext } from "../context/OptionContext";

const useGetImage = (url) => {
  const [styledImage, setStyledImage] = useState(null);
  const { menuItemOptions } = useContext(OptionContext);
  const { setStyledUrl } = useContext(UploadContext);

  // Generate the filter string
  const getImageFilter = () => {
    return menuItemOptions
      .filter((item) => item.type === "filter")
      .map((item) => `${item.property}(${item.value}${item.unit})`)
      .join(" ");
  };

  // Resize image proportionally (no cropping)
  const resizeImage = (image, maxWidth, maxHeight) => {
    let width = image.width;
    let height = image.height;

    // Calculate the aspect ratio
    const aspectRatio = width / height;

    // Resize image proportionally to fit within maxWidth and maxHeight
    if (width > maxWidth) {
      width = maxWidth;
      height = Math.round(width / aspectRatio);
    }

    if (height > maxHeight) {
      height = maxHeight;
      width = Math.round(height * aspectRatio);
    }

    return { width, height };
  };

  // Handle image processing and download
  useEffect(() => {
    if (!url) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.crossOrigin = "anonymous"; // To handle cross-origin images
    image.src = url;

    image.onload = () => {
      // Set max image size (you can adjust this as needed)
      const maxWidth = 800; // Set the maximum width (adjust as needed)
      const maxHeight = 800; // Set the maximum height (adjust as needed)

      // Resize image to fit within maxWidth and maxHeight
      const { width, height } = resizeImage(image, maxWidth, maxHeight);
      
      // Set canvas size based on resized image dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw the resized image on canvas
      ctx.drawImage(image, 0, 0, width, height);

      // Apply filters (if any)
      ctx.filter = getImageFilter();
      ctx.drawImage(image, 0, 0, width, height);

      // Convert canvas to a compressed JPEG image (quality parameter controls compression)
      const styledURL = canvas.toDataURL("image/jpeg", 0.7); // Adjust quality as needed (0.7 means 70% quality)

      // Check if the image size is still too large (greater than 500KB)
      if (styledURL.length > 500000) {
        // Compress further by reducing quality (0.6 means 60% quality)
        const compressedURL = canvas.toDataURL("image/jpeg", 0.6);
        setStyledUrl(compressedURL);
        setStyledImage(compressedURL);
      } else {
        setStyledUrl(styledURL);
        setStyledImage(styledURL);
      }

      console.log(styledURL);
    };
  }, [url, menuItemOptions]);

  return { styledImage, getImageFilter };
};

export default useGetImage;
