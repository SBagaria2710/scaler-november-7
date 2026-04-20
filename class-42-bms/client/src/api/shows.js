import apiClient from "./index.js";

export const addShow = async (payload) => {
  try {
    const response = await apiClient.post("/show/add", payload);
    return response.data;
  } catch (err) {
    return err.response?.data || { success: false, message: err.message };
  }
};

export const getShowsByMovie = async (movieId, date) => {
  try {
    const response = await apiClient.get("/show/get-by-movie", {
      params: { movieId, date },
    });
    return response.data;
  } catch (err) {
    return err.response?.data || { success: false, message: err.message };
  }
};

export const getShowsByTheatre = async (theatreId) => {
  try {
    const response = await apiClient.get("/show/get-by-theatre", {
      params: { theatreId },
    });
    return response.data;
  } catch (err) {
    return err.response?.data || { success: false, message: err.message };
  }
};

export const getShowsById = async (showId) => {
  try {
    const response = await apiClient.get(`/show/${showId}`);
    return response.data;
  } catch (err) {
    return err.response?.data || { success: false, message: err.message };
  }
};
