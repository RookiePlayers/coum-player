/* eslint-disable react-hooks/exhaustive-deps */
import { Alignment, Column, Row } from "ruki-react-layouts"
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { Song } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useSongMockService, useSongService } from "../services/useSongService";
import { Skeleton, Typography } from "@mui/material";
interface CoumPlayerProp {
    height: number | string;
    width: number | string;
    albumSize?: number | string;
 }
export const CoumPlayer  = ({
    height,
    width,
    albumSize
}: CoumPlayerProp) => {
    const [currentSong, setCurrentSong] = useState<Song | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const songQueue = useSelector((state: RootState) => state.playerQueue.queue);
    //const {getSong} = useSongService();
    const {getMockSong} = useSongMockService();
    
    const retrieveSong = async (songId: string) => {
        setLoading(true);
        const song = await getMockSong(songId);
        if (song?.data) {
            setCurrentSong(song.data);
        }
        setLoading(false);
    }
    useEffect(() => {
        void retrieveSong(songQueue?.currentSong ?? "");
    },[songQueue?.currentSong])

    return <Row alignment={Alignment.spaceBetween} crossAlignment={Alignment.center} style={{...styles.card ,width: width ?? "100%", height: height ?? "100%",padding: 5}}>
        <Row alignment={Alignment.left} crossAlignment={Alignment.center} >
            {
                loading ? <Skeleton variant="rectangular" sx={{ width: albumSize ?? 80, height: albumSize ?? 80, bgcolor: 'grey.500' }} /> :
                <img src={currentSong?.url} alt={currentSong?.url} style={{...styles.album, width: albumSize ?? 80, height: albumSize ?? 80}}/> 
            }
            <Column style={{margin: "0 10px"}}>
                {
                    loading ? <Skeleton variant="text" /> :
                    <Typography variant="h6" style={{color: "white"}}>{currentSong?.songName}</Typography>
                }
                {
                    loading ? <Skeleton variant="text" /> :
                    <Typography variant="body2" style={{color: "white"}}>{currentSong?.songPerformer}</Typography>
                }
            </Column>
        </Row>
    </Row>
}