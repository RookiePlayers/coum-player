import axios, { AxiosRequestConfig } from "axios";

export const  BASE_URL= process.env.REACT_APP_BASE_URL;

export const axiosGET = async (request: AxiosRequestConfig) => {
    try {
        const data = await axios(request);
        return {
            data: data.data,
            status: data.status
        }
    }catch (e) {
        console.log(e);
    }
}
export const RouteNames = {
    song: "song",
    songs: "song/list",
    user: "user",
    recentlyPlayed: "user/recentlyPlayed"
}
