import { useEffect, useState } from "react";
import { User } from "../../../types";
import { Avatar } from "@mui/material";
import { useProfileMockService } from "../../../services/useProfileService";

export const ProfileAvatar = ({uid, profile: Profile, radius}: {uid?: string; profile?: User; radius?: number}) => {
    const [profile, setProfile] = useState<User | undefined | null>(null);
    const {getMockProfile} = useProfileMockService();
    const retrieveProfile = async (uid: string) => {
        const profile = await getMockProfile(uid);
        if (profile) {
            setProfile(profile);
        }
    }
    useEffect(() => {
        if(uid){
            void retrieveProfile(uid);
            return;
        }
        setProfile(Profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Profile, uid]);
    if (!profile) {
        return <Avatar sx={{width: radius ?? 24, height: radius ?? 24}}/>;
    }
    return <Avatar sx={{width: radius ?? 24, height: radius ?? 24}} src={profile?.imageUrl} alt={profile?.username} />
}