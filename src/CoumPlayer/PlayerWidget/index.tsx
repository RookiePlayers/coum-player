/* eslint-disable react-hooks/exhaustive-deps */
import { Alignment, Column, Row, Stack } from "ruki-react-layouts"
import { styles } from "../styles";
import { useEffect, useRef, useState } from "react";
import { Song } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useSongService } from "../../services/useSongService";
import { IconButton, Skeleton, Typography } from "@mui/material";
import { Slider } from "primereact/slider";
import ReactHowler from 'react-howler';
import { useMusicPlayer } from "../../provider/music_player_provider";
import { Pause, PlayArrow, PlayArrowRounded, QueueMusic, QueueMusicRounded, SkipNextRounded, SkipPreviousRounded } from "@mui/icons-material";
import {motion} from 'framer-motion';
import { colors } from "../../colors";
import { DEFAULT_ARTWORX } from "../../utils";

interface PlayerWidgetProp {
    height: number | string;
    width: number | string;
    albumSize?: number | string;
    onExpand?: () => void;
    expandable?: boolean;
    variant?: "large" | "default";
    backgroundColor?: string;
 }
export const PlayerWidget  = ({
    height,
    width,
    albumSize,
    onExpand,
    expandable,
    variant,
    backgroundColor
}: PlayerWidgetProp) => {
    const [currentSong, setCurrentSong] = useState<Song | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const songQueue = useSelector((state: RootState) => state.playerQueue.queue);
    const {isPlaying, playerRef, togglePlay} = useMusicPlayer()
    //const {getSong} = useSongService();
    const {getSong} = useSongService();
    
    const handleTogglePlay = ()=>{
        if(currentSong)
            togglePlay(currentSong);
    }
    const retrieveSong = async (songId: string) => {
        setLoading(true);
        const song = await getSong(songId);
        if (song) {
            setCurrentSong(song);
        }
        setLoading(false);
    }

    useEffect(() => {
        void retrieveSong(songQueue?.currentSong ?? "");
    },[songQueue?.currentSong])

    if(variant === "large")
        return <LargePlayer height={height} width={width} albumSize={albumSize} onExpand={onExpand} expandable={expandable} variant={variant}/>

    return <Row alignment={Alignment.spaceBetween} crossAlignment={Alignment.center} style={{...styles.card ,backgroundColor: backgroundColor ?? colors.background, width: width ?? "100%",padding: 10}}>
        <Row alignment={Alignment.left} crossAlignment={Alignment.center} >
            {
                loading ? <Skeleton variant="rectangular" sx={{ width: albumSize ?? 50, height: albumSize ?? 50, bgcolor: 'grey.500' }} /> :
                <img src={currentSong?.url} alt={currentSong?.url} style={{...styles.album, width: albumSize ?? 50, height: albumSize ?? 50}}/> 
            }
             <Column alignment={Alignment.center} style={{marginLeft:10}}>
                {loading ? <Skeleton variant="text" /> :<Typography style={{
                    fontSize: 15,
                    color: colors.textPrimary,
                    fontWeight: "bold"
                }}>{
                    currentSong?.songName ?? "--"
                }</Typography>}
                
               {loading ? <Skeleton variant="text" /> :<Typography style={{
                    fontSize: 12,
                    color: colors.textSecondary,
                }}>{
                    currentSong?.songPerformer ?? "--"
                }</Typography>}

                {/* <ReactHowler ref={playerRef} src={[currentSong?.url ?? '']} playing={isPlaying}/> */}
            </Column>
        </Row>
        <Row style={{position: "relative", width: "30%", height: "100%"}} alignment={Alignment.right} crossAlignment={Alignment.center}>
            <Stack>
                <Row alignment={Alignment.right} crossAlignment={Alignment.center} style={{height:"100%"}}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <IconButton onClick={handleTogglePlay}>
                        {isPlaying ? <Pause style={styles.icon} /> : <PlayArrowRounded style={styles.icon} />}
                    </IconButton>
                </motion.div>
                {expandable && <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <IconButton onClick={onExpand}>
                        <QueueMusicRounded style={styles.icon} />
                    </IconButton>
                </motion.div>}
                </Row>
            </Stack>
        </Row>
    </Row>
}

export const LargePlayer = ({
    height,
    width,
    albumSize,
    onExpand,
    expandable,
    variant,
    backgroundColor
}: PlayerWidgetProp) => {
    const [loading, setLoading] = useState<boolean>(false);
    const songQueue = useSelector((state: RootState) => state.playerQueue.queue);
    const {isPlaying, playerRef, togglePlay, currentSong} = useMusicPlayer()
    const {getSong} = useSongService();
    const [song, setSong] = useState<Song | null>(null);

        console.log('currentSong', currentSong);
    useEffect(() => {
        setSong(currentSong);
    },[currentSong?.songId])
    
    const handleTogglePlay = ()=>{
        if(currentSong)
            togglePlay(currentSong);
    }


    return <Row style={{width: "100%",padding: 10,}}>
        <Row style={{
            backgroundColor: colors.playerColor,
            borderRadius: 10,
            border: `1px solid ${colors.border}`,
            padding: "5px 10px",
            width: "100%",
        }} alignment={Alignment.spaceBetween} crossAlignment={Alignment.center}>
        <Row crossAlignment={Alignment.center} style={{width:"24%"}}>
            <img src={song?.artwork ?? DEFAULT_ARTWORX} alt="album" style={{
                ...styles.album,width: albumSize ?? 60, height: albumSize ?? 60
            }}/>
            <Column alignment={Alignment.center} style={{marginLeft:10}}>
                <Typography style={{
                    fontSize: 15,
                    color: colors.textPrimary,
                    fontWeight: "bold"
                }}>{
                    song?.songName ?? "--"
                }</Typography><Typography style={{
                    fontSize: 10,
                    color: colors.textSecondary,
                }}>{
                    song?.songPerformer ?? "--"
                }</Typography>
            </Column>
        </Row>
        <Column style={{width: "50%"}} alignment={Alignment.center} crossAlignment={Alignment.center}>
            <Row alignment={Alignment.center} crossAlignment={Alignment.center}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><IconButton>
                    <SkipPreviousRounded style={{...styles.icon, fontSize: 30}}/>
                </IconButton>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <IconButton onClick={handleTogglePlay}>
                        {isPlaying ? <Pause style={styles.icon} /> : <PlayArrowRounded style={styles.icon} />}
                    </IconButton>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton>
                    <SkipNextRounded style={{...styles.icon, fontSize: 30}}/>
                </IconButton></motion.div>
            </Row>
            <Slider value={50} onChange={()=>{}} style={{width: "80%"}}/>
        </Column>
        <Column style={{width: "24%"}} alignment={Alignment.center} crossAlignment={Alignment.center}>
        </Column>
        </Row>
    </Row>
}