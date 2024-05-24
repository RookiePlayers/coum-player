import axios from "axios";
import { BASE_URL, RouteNames, axiosGET } from "./misc";
import MockAdapter from "axios-mock-adapter";
import { Song } from "../types";
export const useSongService = () => {
    const getSong = async (songId: string):Promise<Song> => {
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
        const data =  await axiosGET(request);
        if(data?.status !== 200)
            throw new Error("Failed to get song");
        if(data?.data === null)
            throw new Error("Song not found");
        return data?.data as Song;
        
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