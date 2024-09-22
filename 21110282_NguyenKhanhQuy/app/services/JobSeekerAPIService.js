import { postRequest } from "../api/Request";

export const updateAvatar = async (token, avatar) => {
    const formData = new FormData();
    formData.append("avatar", {
        uri: avatar.uri,
        type: avatar.type,
        name: avatar.name,
    });

    return postRequest("job-seeker/update-avatar", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateProfile = async (token, data) => {
    return postRequest("job-seeker/update-profile", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
