import { Card, CardContent, Typography } from "@mui/material"
import { styles } from "./recently-played-card.styles"
import { Column } from "ruki-react-layouts"
import SongCard from "../song-card/song-card"
import { Song } from "../../../../types"
import { Carousel } from "primereact/carousel"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../../store/store"
import { useProfileService } from "../../../../services/useProfileService"

const RecentlyPlayedCard = () => {
    const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>([]);
    const profile = useSelector((state: RootState) => state.auth.user);
    const {getRecentlyPlayed} = useProfileService();
    useEffect(() => {
        if(profile?.uid) {
            getRecentlyPlayed(profile?.uid).then((songs) => {
                setRecentlyPlayed(songs);
            })
        }
    },[profile?.uid])
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 6,
            numScroll: 6
        },
        {
            breakpoint: '768px',
            numVisible: 4,
            numScroll: 4
        },
        {
            breakpoint: '560px',
            numVisible: 3,
            numScroll: 3
        }
    ]
    return <Card style={{...styles.card, width:"100%", minHeight: 200}} variant="outlined">
        <CardContent>
            <Column>
                <Typography variant="h6" style={styles.pageTitle}>Recently Played</Typography>
                <div style={{margin: "10px 0"}}>
                    <Carousel value={recentlyPlayed} itemTemplate={RecentlyPlayedCardTemplate} responsiveOptions={responsiveOptions}/>
                </div>
            </Column>
        </CardContent>
    </Card>
}

const RecentlyPlayedCardTemplate = (song:Song) => {
    return <SongCard song={song} onPlay={() => {}}/>
}

export default RecentlyPlayedCard