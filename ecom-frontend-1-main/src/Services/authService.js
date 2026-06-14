import axios from "axios";

const API_URL =
`${import.meta.env.VITE_API_URL}/api/users`;

// SEND OTP

export const sendOtp =
async (email) => {

  return await axios.post(

    `${API_URL}/send-otp`,

    null,

    {
      params: {
        email
      }
    }
  );
};

// VERIFY OTP

export const verifyOtp =
async (
  email,
  otp
) => {

  return await axios.post(

    `${API_URL}/verify-otp`,

    null,

    {
      params: {
        email,
        otp
      }
    }
  );
};

// REGISTER

export const registerUser =
async (userData) => {

  return await axios.post(

    `${API_URL}/register`,

    userData
  );
};

// LOGIN

export const loginUser =
async (userData) => {

  return await axios.post(

    `${API_URL}/login`,

    userData
  );
};