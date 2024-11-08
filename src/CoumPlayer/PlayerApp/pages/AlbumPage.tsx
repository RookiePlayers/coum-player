import { Button, Card, CardContent, Chip, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { Album } from "../../../types";
import { Grid4x4Rounded, ListAltRounded, GridView, PlayArrowRounded, ShuffleOnRounded, ShuffleRounded } from "@mui/icons-material";
import { Column, Row, Alignment } from "ruki-react-layouts";
import { styles } from "../styles";
import { colors } from "../../../colors";
import { useState } from "react";
import {motion} from 'framer-motion';
import { getDuration, getDurationMinSec, pluralize } from "../../../utils";
import { HiQueueList } from "react-icons/hi2";
import { cp } from "fs";
import SongCard from "../Components/song-card/song-card";

type AlbumPageProps = {
    album?: Album;
    albumType?: 'single' | 'album' | 'ep';
}
const AlbumDisplay = ({album}: {album: Album}) => {
    return <Column alignment={Alignment.center} crossAlignment={Alignment.center} style={{width: "100%",position:"relative", height: "100%"}}>
           <motion.img src={album.albumArt} alt={album.albumName} 
            style={{
                width: "100%",
                height: "100%",
                zIndex: 0,
                position: "absolute",
                borderRadius: 6,
                filter: "blur(100px)",
                objectFit: "cover"
            }} initial={{opacity: 0}} animate={{opacity: 0.5}} transition={{duration: 0.5}}/>
            <Row style={{width:"100%"}} alignment={Alignment.center}>
            <Chip label={album.albumType} sx={{my: 2,
                zIndex: 1,}} variant="outlined"  style={{color: colors.textPrimary}}/>
            </Row>
            <motion.img src={album.albumArt} alt={album.albumName} 
            style={{
                width: "300px",
                height: "300px",
                borderRadius: 6,
                border: `1px solid ${colors.textPrimary}2f`,
                zIndex: 1,
                objectFit: "cover"
            }} initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5}}/>
            <Row crossAlignment={Alignment.center} style={{marginTop: 10,}}>
            <Typography variant="h5" style={{color: colors.textPrimary,fontWeight: 'bold',
                zIndex: 1,}}>{album.albumName}</Typography>
                {album.explicity && <Chip variant="outlined" size="small" sx={{ml: 1, borderColor: colors.textPrimary, color: colors.textPrimary}} label={"Explicit"}/>}
            </Row>
            <Typography variant="body2" style={{color: colors.textPrimary, opacity: 0.8, fontWeight: 500, marginTop: 4,}}>{album.artist}</Typography>
            <Typography variant="caption" style={{color: colors.textSecondary, marginTop: 10,}}>{new Date(album.year).getFullYear()} • {getDurationMinSec(album.duration)} • {`${pluralize(album.songs.length,"Song")}`}</Typography>
    </Column>
}
 
const AlbumTrackList = ({album}: {album: Album}) => {
    const [isShuffled, setIsShuffled] = useState(false);
    return <Column style={{width: "100%"}}>
        <Row alignment={Alignment.right} style={{width: "100%"}}>
            <Button startIcon={<HiQueueList/>} disableElevation size="small" style={{color: colors.textPrimary}}>Queue</Button>
            <Button startIcon={isShuffled ? <ShuffleOnRounded/> : <ShuffleRounded/>} disableElevation size="small" style={{color: colors.textPrimary, margin:"0 10px"}} onClick={() => setIsShuffled(!isShuffled)}>Shuffle</Button>
            <motion.div whileTap = {{
                scale: 0.9
            }}>
            <Button variant="contained" startIcon={<PlayArrowRounded/>} disableElevation size="small" style={{color: "black", background: colors.primary}}>Play All</Button>
            </motion.div>
        </Row>
        <Column style={{width: "100%",
            marginTop: 20,
            maxHeight: 600, 
            overflowY: 'auto',
            borderRadius: 6,
            padding: 10,
            minHeight: 200,
            background: `${colors.background}3a`}}>
            {
                album.songs.map((song, index) => {
                    return <SongCard.Tile disableMore noImage customLeftSection = {
                        <Column alignment={Alignment.top} style={{marginRight: 10}}>
                            <Typography variant="body1" style={{color: colors.textSecondary}}>{index + 1}.</Typography>
                        </Column>
                    } songId={song} onPlay={() => {}} key={index}/>
                })
            }
        </Column>
    </Column>
}

const AlbumPage = ({album}: AlbumPageProps) => {

    if(!album) {
        return <Typography variant="h6" style={{color: colors.textPrimary}}>No album found</Typography>
    }
    return <Card style={{...styles.card, width:"100%", minHeight: 200}} variant="outlined">
    <CardContent style={{width: "100%", height :"100%", paddingBottom: "20%"}}>
    <Column style={{width: "100%", height :"100%"}}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <AlbumDisplay album={album}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <AlbumTrackList album={album}/>
                </Grid>
        </Grid>

        
    </Column>
    </CardContent>
</Card>
}


export default AlbumPage