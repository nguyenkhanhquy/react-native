import AxiosClient from "../api/AxiosClient";

const getRequest = async (url, headers) => {
    try {
        const response = await AxiosClient.get(url, headers);
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

export const getListJobs = async () => {
    return getRequest("jobs");
};
