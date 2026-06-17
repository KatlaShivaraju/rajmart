import axios from "axios";



const API_URL =
`${import.meta.env.VITE_API_URL}/api/categories`;

export const getAllCategories =
async () => {

  return await axios.get(
    API_URL
  );
};