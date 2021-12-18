import axios from "axios";

export const postAPI = async (url: string, data: object, token?: any) => {
    const res = await axios.post(`api/${url}`, data, {
        headers: {
            Authorization: token
        }
    })
    return res;
}