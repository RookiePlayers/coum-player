import axios from "axios";
import { BASE_URL, RouteNames } from "./misc";
import { PaginationData, Song } from "../types";

export const useSongService = () => {

    return { ...SongServiceApi() };

//   if (process.env.REACT_APP_ENV === "production" || process.env.REACT_APP_ENV === "development") {
//     console.log("Using SongServiceApi");
//     return { ...SongServiceApi() };
//   } else {
//     console.log("Using SongMockService");
//     return { ...SongMockService() };
//   }
};

export const SongServiceApi = () => {
  const getSong = async (songId: string): Promise<Song | null> => {
    const request = {
      url: `${BASE_URL}/${RouteNames.song}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        id: songId,
      },
    };

    console.log("Fetching song with URL:", request.url);

    try {
      const data = await axios(request);
      console.log("Data:", data);
      if (data?.status !== 200) {
        console.log("Failed to get song", data);
        return null;
      }
      if (!data?.data) {
        console.log("Song not found", data);
        return null;
      }
      return data?.data?.data as Song;
    } catch (e) {
      console.error("Error fetching song:", e);
      return null;
    }
  };

  const getSongs = async ({
    offset,
    limit,
    cursor,
  }: PaginationData): Promise<{ data: Song[]; cursor?: string }> => {
    const request = {
      method: "get",
      url: `${BASE_URL}/${RouteNames.songs}`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      params: { offset, limit, cursor },
    };

    console.log("Fetching songs with URL:", request.url);

    try {
      const data = await axios(request);
      console.log("Data:", data);
      if (data?.status !== 200) throw new Error("Failed to get songs");
      if (!data?.data) throw new Error("Songs not found");
      return {
        data: data?.data?.data as Song[],
        cursor: data?.data?.cursor,
      };
    } catch (e) {
      console.error("Error fetching songs:", e);
      throw e;
    }
  };

  return {
    getSong,
    getSongs,
  };
};

export const SongMockService = () => {
  
  const getSong = async (songId: string): Promise<Song | null> => {
    const song = {
      songName: "Wildflower",
      songDescription: "",
      songPerformer: "Billie Eilish",
      url: "",
    } as Song;

    console.log("Mocking song with ID:", songId);

    try {
      return song
    } catch (e) {
      console.error("Error in mock getSong:", e);
      return null;
    }
  };

  const getSongs = async ({
    offset,
    limit,
    cursor,
  }: PaginationData): Promise<{ data: Song[]; cursor?: string }> => {
    const songs = [
      {
        songName: "Wildflower",
        songDescription: "",
        songPerformer: "Billie Eilish",
        url: "",
      },
      // Add more mock songs here if needed
    ] as Song[];

    // Ensure the mock setup matches the request exactly

    try {
      const data = await axios.get(`${BASE_URL}/${RouteNames.songs}`, { params: { offset, limit, cursor } });
      return {
        data: songs,
        cursor: "", // Mock cursor or update as needed
      };
    } catch (e) {
      console.error("Error in mock getSongs:", e);
      return { data: songs, cursor: "" };
    }
  };

  return {
    getSong,
    getSongs,
  };
};
