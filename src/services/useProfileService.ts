import MockAdapter from "axios-mock-adapter";
import { User } from "../types";
import { BASE_URL, RouteNames, axiosGET } from "./misc"
import axios from "axios";

export const useProfileService = () => {
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
    return {
        getProfile
    }
}

export const useProfileMockService = () => {
    const {getProfile} = useProfileService();
    const mock = new MockAdapter(axios);
    const getMockProfile = async (uid: string) => {
        const profile = {
            uid: "tkyLig3wePahVjUAULKyNy5w16k1",
            customerId: "cus_Q4wMZyxm1eLO2H",
            email: "",

        } as User;
        mock.onGet(`${BASE_URL}/${RouteNames.user}`).reply(200, profile);
        return await getProfile(uid);
    }
    return {
        getMockProfile
    }
}