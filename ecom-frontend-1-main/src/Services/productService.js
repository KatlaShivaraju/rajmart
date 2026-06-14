import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api`;

// ======================
// GET ALL PRODUCTS
// ======================

export const getAllProducts =
  async () => {

    return axios.get(
      `${API_URL}/products`
    );
  };

// ======================
// GET PRODUCT BY ID
// ======================

export const getProductById =
  async (id) => {

    return axios.get(
      `${API_URL}/products/${id}`
    );
  };

// ======================
// ADD PRODUCT
// ======================

export const addProduct =
  async (formData) => {

    return axios.post(
      `${API_URL}/products`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  };

// ======================
// UPDATE PRODUCT
// ======================

export const updateProduct =
  async (
    id,
    formData
  ) => {

    return axios.put(
      `${API_URL}/products/${id}`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  };

// ======================
// DELETE PRODUCT
// ======================

export const deleteProduct =
  async (id) => {

    return axios.delete(
      `${API_URL}/products/${id}`
    );
  };

// ======================
// SEARCH PRODUCT
// ======================

export const searchProducts =
  async (keyword) => {

    return axios.get(
      `${API_URL}/products/search`,
      {
        params: {
          keyword,
        },
      }
    );
  };

// ======================
// FILTER CATEGORY
// ======================

export const getProductsByCategory =
  async (
    category
  ) => {

    return axios.get(
      `${API_URL}/products/category`,
      {
        params: {
          category,
        },
      }
    );
  };