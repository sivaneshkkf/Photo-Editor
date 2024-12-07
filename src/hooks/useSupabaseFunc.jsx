import React from 'react'
import { supabase } from '../supabase/Config';

const useSupabaseFunc = () => {
    

  const deleteRow = async (tableName, columnName, value, path) => {
    try {
      console.log("Deleting from bucket with path:", path); // Debug log
  
      // Delete the file from storage
      const { data, error: storageError } = await supabase.storage
        .from("Images") // Replace with your actual bucket name
        .remove([path]);
  
      if (storageError) {
        console.error("Error deleting file from storage:", storageError);
        return; // Stop further execution if storage deletion fails
      }
  
      if (data) {
        console.log("Image deleted successfully from storage:", data);
      }
  
      // Delete the row from the table
      const { error } = await supabase
        .from(tableName) // Table name
        .delete() // Delete action
        .eq(columnName, value); // Match the specific row(s) to delete
  
      if (error) {
        console.error("Error deleting row:", error);
        return null;
      }
  
      console.log("Row deleted successfully:");
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };
  

  return {deleteRow}
}

export default useSupabaseFunc