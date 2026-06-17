import axios from "axios";

const API_URL =
`${import.meta.env.VITE_API_URL}/api/cart`;

export const addToCart =
async (
  userId,
  productId,
  quantity
) => {

  return await axios.post(

    `${API_URL}/add`,

    null,

    {
      params: {
        userId,
        productId,
        quantity
      }
    }
  );
};

export const getCart =
async (userId) => {

  return await axios.get(
    `${API_URL}/${userId}`
  );
};

export const removeCartItem =
async (cartId) => {

  return await axios.delete(
    `${API_URL}/${cartId}`
  );
};

export const updateCartQuantity =
async (
  cartId,
  quantity
) => {

  return await axios.put(

    `${API_URL}/${cartId}`,

    null,

    {
      params: {
        quantity
      }
    }
  );
};