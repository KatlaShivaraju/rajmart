import axios from "axios";

const API_URL =
`${import.meta.env.VITE_API_URL}/api/orders`;

export const placeOrder =
async (userId) => {

  return await axios.post(
    `${API_URL}/place/${userId}`
  );
};

export const getOrders =
async (userId) => {

  return await axios.get(
    `${API_URL}/${userId}`
  );
};