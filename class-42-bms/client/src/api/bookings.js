import apiClient from "./index.js";

export const makePayment = async (payload) => {
  try {
    const response = await apiClient.get("/booking/make-payment", payload);
    return response.data;
  } catch (err) {
    return err.response?.data || { success: false, message: err.message };
  }
};

export const bookShow = async (payload) => {
  try {
    const response = await apiClient.post("/booking/book-show", payload);
    return response.data;
  } catch (err) {
    return err.response?.data || { success: false, message: err.message };
  }
};

export const getAllBookings = async (payload) => {
  try {
    const response = await apiClient.get("/booking/get-all-bookings", payload);
    return response.data;
  } catch (err) {
    return err.response?.data || { success: false, message: err.message };
  }
};