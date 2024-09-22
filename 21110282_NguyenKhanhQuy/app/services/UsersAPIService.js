import { getRequest } from "../api/Request";

export const myInfo = async (token) => {
    return getRequest("users/my-info", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
