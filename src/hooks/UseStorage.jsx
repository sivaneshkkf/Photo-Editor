import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/Config";
import { UploadContext, UserContext } from "../context/OptionContext";

const useStorage = (optionValue) => {
  const { uploadMadal, setUploadMadal, loading, setLoading } =
    useContext(UploadContext);
  const [progress, setProgress] = useState(0); // Placeholder for progress tracking
  const [url, setUrl] = useState(null); // URL of the uploaded file
  const [error, setError] = useState(null); // Error handling
  const { userData } = useContext(UserContext); // User data from context
  const [imageUrl, setImageUrl] = useState(null); // URL of the image to be uploaded

  useEffect(() => {
    if (imageUrl) {
      //console.log("Image URL provided:", imageUrl);
      uploadImageFromUrl(imageUrl); // Trigger the upload process
    }
  }, [imageUrl]); // Reacts to changes in the `imageUrl`

  // Function to download the image from URL and upload it to Supabase Storage
  const uploadImageFromUrl = async (url) => {
    setLoading(true)
    try {
      // Fetch the image from the provided URL
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch image from URL.");
      }

      const blob = await response.blob(); // Convert image to Blob
      const file = new File([blob], "uploaded_image", { type: blob.type }); // Convert blob to File object

      // Upload file to Supabase Storage
      const fileName = `uploaded_image_${Date.now()}`; // or use UUID library for more uniqueness
      const { data, error: uploadError } = await supabase.storage
        .from("Images")
        .upload(fileName, file, {
          cacheControl: "3600", // Optional: Cache control
          upsert: false, // Prevent overwriting files
        });

      if (uploadError) {
        setError(uploadError.message);
        console.error("Upload error:", uploadError);
        return;
      }

      console.log("Upload success:", data);

      // Get the public URL of the uploaded file
      const { data: publicData, error: publicUrlError } = supabase.storage
        .from("Images")
        .getPublicUrl(data.path);

      if (publicUrlError) {
        setError(publicUrlError.message);
        console.error("Error fetching public URL:", publicUrlError);
        return;
      }

      const publicUrl = publicData.publicUrl;
      setUrl(publicUrl); // Set the URL of the uploaded file

      // Insert the URL into the database
      await insertData(publicUrl,data.id,data.path);
      setLoading(false)
      setUploadMadal(false)
    } catch (err) {
      setError(err.message);
      console.error("Unexpected error during upload:", err);
    }
  };

  // Function to insert the image URL into the database
  const insertData = async (url,id,path) => {
    try {
      const { error: insertError } = await supabase
        .from("Images") // Replace with your table name
        .insert({
          imageUrl: url,
          user_id: userData?.provider_id,
          privacy: optionValue,
          storage_id : id,
          file_path : path,
        });

      if (insertError) {
        setError(insertError.message);
        console.error("Insert failed:", insertError);
        return;
      }

      console.log("Data inserted successfully");
    } catch (err) {
      setError(err.message);
      console.error("Unexpected error during database insertion:", err);
    }
  };

  // Return relevant states for external use
  return { progress, url, error, setImageUrl };
};

export default useStorage;
