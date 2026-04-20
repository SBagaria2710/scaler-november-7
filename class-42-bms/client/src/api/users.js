import apiClient from "./index.js";

export const registerUser = async (payload) => {
    const response = await apiClient.post("/user/register", payload);
    return response.data;
};

export const loginUser = async (payload) => {
    const response = await apiClient.post("/user/login", payload);
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await apiClient.get("/user/me");
    return response.data;
};

export const forgetPassword = async (payload) => {
    const response = await apiClient.patch("/user/forgetpassword", payload);
    return response.data;
};

export const resetPassword = async (payload) => {
    const response = await apiClient.patch("/user/resetpassword", payload);
    return response.data;
};