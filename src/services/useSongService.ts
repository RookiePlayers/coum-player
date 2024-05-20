import axios from "axios";
import { BASE_URL, RouteNames, axiosGET } from "./misc";
import MockAdapter from "axios-mock-adapter";
import { Song } from "../types";
export const useSongService = () => {
    const getSong = async (songId: string) => {
        const request = {
            url: `${BASE_URL}/${RouteNames.song}`,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            params:{
                id: songId
            }
        }
        return await axiosGET(request);
        
    }

    return {
        getSong
    }
}

export const useSongMockService = () => {
    const {getSong} = useSongService();
    const mock = new MockAdapter(axios);
    const getMockSong = async (songId: string) => {
        const  song = {
        songName: "Wildflower",
        songDescription: "",
        songPerformer: "Billie Eilish",
        url: ""
        } as Song;
        mock.onGet(`${BASE_URL}/${RouteNames.song}`).reply(200, song);
        return await getSong(songId)
     }
    

    return {
        getMockSong
    }
}