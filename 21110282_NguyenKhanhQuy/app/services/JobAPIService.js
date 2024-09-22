import { getRequest } from "../api/Request";

export const getListJobs = async () => {
    return getRequest("jobs");
};
