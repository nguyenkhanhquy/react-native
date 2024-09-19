import axios from "axios";

// Thiết lập base URL cho tất cả các yêu cầu API
const AxiosClient = axios.create({
    baseURL: "https://mobile.jacobin.live/api/v0/",
    // baseURL: "http://192.168.0.134:8080/api/v0/",
    headers: {
        "Content-Type": "application/json",
    },
});

export default AxiosClient;
