import { postRequest } from "../api/Request";

export const login = async (email, password) => {
    const data = { email, password };
    return postRequest("auth/login", data);
};

export const register = async (email, fullName, password) => {
    const data = { email, fullName, password };
    return postRequest("auth/register", data);
};

export const sendOtp = async (email) => {
    const data = { email };
    return postRequest("auth/send-otp", data);
};

export const validateOtp = async (email, otp) => {
    const data = { email, otp };
    return postRequest("auth/validate-otp", data);
};

export const resetPassword = async (email, newPassword, otp) => {
    const data = { email, newPassword, otp };
    return postRequest("auth/reset-password", data);
};

export const activate = async (token, otp) => {
    const data = { otp };
    return postRequest("auth/activate", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updatePassword = async (token, password, newPassword) => {
    const data = { password, newPassword };
    return postRequest("auth/update-password", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const introspect = async (token) => {
    const data = { token };
    return postRequest("auth/introspect", data);
};

export const logout = async (token) => {
    const data = { token };
    return postRequest("auth/logout", data);
};
