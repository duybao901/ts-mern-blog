import axios from "axios";

export const postAPI = async (url: string, data: object, token?: any) => {
    const res = await axios.post(`/api/${url}`, data, {
        headers: {
            Authorization: token
        }
    })
    return res;
}

export const getAPI = async (url: string, token?: any) => {
    const res = await axios.get(`/api/${url}`, {
        headers: {
            Authorization: token
        }
    })

    return res;
}