import axios from "axios";

const API_URL =
  "http://localhost:8080/api/cart";

export const addToCart =
  async (
    userId,
    productId,
    quantity
  ) => {

    return await axios.post(
      `${API_URL}/add?userId=${userId}&productId=${productId}&quantity=${quantity}`
    );
  };

export const getCart =
  async (userId) => {

    return await axios.get(
      `${API_URL}/${userId}`
    );
  };

export const removeCartItem =
  async (id) => {

    return await axios.delete(
      `${API_URL}/remove/${id}`
    );
  };