import { Song, User } from "../types";
import { BASE_URL, RouteNames, axiosGET } from "./misc"
import axios from "axios";

export const useProfileService = () => {
   if(process.env.REACT_APP_ENV === "production" || process.env.REACT_APP_ENV === "development") {
       return {...ProfileService()};
   }else{
         return {...ProfileMockService()};
   }
}
const ProfileService = () => {
    const getProfile = async (uid: string): Promise<User> => {
        const request = {
            url: `${BASE_URL}/${RouteNames.user}`,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            params:{
                id: uid
            }

        }
        const data = await axiosGET(request);
        if(data?.status !== 200)
            throw new Error("Failed to get profile");
        if(data?.data === null)
            throw new Error("Profile not found");
        return data?.data as User;
    }
    const getRecentlyPlayed = async (uid: string) => {
        const request = {
            url: `${BASE_URL}/${RouteNames.recentlyPlayed}`,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            params:{
                id: uid
            }
        }
        const data = await axiosGET(request);
        if(data?.status !== 200)
            throw new Error("Failed to get recently played");
        if(data?.data === null)
            throw new Error("Recently played not found");
        return data?.data as Song[];

    }
    return {
        getProfile,
        getRecentlyPlayed
    }
}
const ProfileMockService = () => {
    const getProfile = async (uid: string) => {
        const profile = {
            uid: "tkyLig3wePahVjUAULKyNy5w16k1",
            customerId: "cus_Q4wMZyxm1eLO2H",
            email: "",

        } as User;
        return profile;
    }

    const getRecentlyPlayed = async (uid: string) => {
        const song = {
            id: "song_1",
            title: "Song 1",
            artist: "Artist 1",
            album: "Album 1",
            duration: 100,
            genre: "Pop",
            imageUrl: "https://source.unsplash.com/random",
            url: "https://source.unsplash.com/random"
        } as unknown as Song;
        return [song];
    }

    return {
        getProfile,
        getRecentlyPlayed
    }
}