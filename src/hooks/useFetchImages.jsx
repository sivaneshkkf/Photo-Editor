import React, { useContext, useEffect, useState } from 'react'
import { supabase } from '../supabase/Config'
import { UserContext } from '../context/OptionContext'

const useFetchImages = (refreshKey) => {
  const [userImages, setUserImages] = useState([])
  const [publicImages, setPublicImages] = useState([])
  const {userData ,setUserData} = useContext(UserContext);

  useEffect(() => {

    //console.log(userData?.provider_id)
    fetchTableData("Images")
    fetchPublicData("Images")

  },[userData,refreshKey,setUserData])

  const fetchTableData = async (tableName) => {
    try {
        const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .eq("user_id", userData?.provider_id);
  
      if (error) {
        console.error("Error fetching data:", error);
        return null; // Handle the error case
      }
  
      //console.log("User data:", data);
      setUserImages(data)
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const fetchPublicData = async (tableName) => {
    try {
        const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .eq("privacy", "Public");
  
      if (error) {
        console.error("Error fetching data:", error);
        return null; // Handle the error case
      }
  
      //console.log("Public data:", data);
      setPublicImages(data)
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };
  


  return {userImages,publicImages}
}

export default useFetchImages