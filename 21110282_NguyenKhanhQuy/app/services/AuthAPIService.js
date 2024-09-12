import AxiosClient from "../api/AxiosClient";

const postRequest = async (url, data, headers) => {
    try {
        const response = await AxiosClient.post(url, data, headers);
        return response.data;
    } catch (error) {
        // Xử lý lỗi và trả về dữ liệu lỗi nếu có
        if (error.response) {
            // Nếu có phản hồi lỗi từ server
            return error.response.data; // Trả về dữ liệu lỗi từ server
        } else {
            // Nếu không có phản hồi lỗi từ server (lỗi mạng, v.v.)
            throw error;
        }
    }
};

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

export const resetPassword = async (email, newPassword) => {
    const data = { email, newPassword };
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

export const introspect = async (token) => {
    const data = { token };
    return postRequest("auth/introspect", data);
};

export const logout = async (token) => {
    const data = { token };
    return postRequest("auth/logout", data);
};
