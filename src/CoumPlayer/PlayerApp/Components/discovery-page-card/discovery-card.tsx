import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material"
import { Alignment, Column, Row } from "ruki-react-layouts"
import SongCard from "../song-card/song-card"
import { PaginationData, Song } from "../../../../types"
import { Carousel } from "primereact/carousel"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../../store/store"
import { useProfileService } from "../../../../services/useProfileService"
import { styles } from "./discovery-card.styles"
import { useSongService } from "../../../../services/useSongService"
import { Grid3x3, Grid4x4Rounded, ListAltRounded } from "@mui/icons-material"
import { colors } from "../../../../colors"

const DiscoveryCard = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const profile = useSelector((state: RootState) => state.auth.user);
    const {getRecentlyPlayed} = useProfileService();
    const [loading, setLoading] = useState(false);
    const [cursor, setCursor] = useState<String | undefined>(undefined);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const {getSongs} = useSongService()

const retrieveSongs = async ({pagination={limit: 10}}: {pagination?: PaginationData})  => {
    setLoading(true);
    const {data, cursor } = await getSongs(pagination);
    setCursor(cursor);
    setLoading(false);
    return data;

}
    useEffect(() => {
        console.log("Retrieving songs");
         retrieveSongs({}).then((songs) => {
            setSongs(songs);
        }).catch((error) => {
            console.log(error);
        })
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
    const GridView = () => {
        if (loading) {
            return <Grid container spacing={2}>
                {
                    Array.from({length: 10}).map((_, index) => {
                        return <Grid item xs={12} sm={6} md={4} lg={3}>
                            <SongCard.Skeleton/>
                        </Grid>
                    })
                }
                </Grid>
        }
        return <Grid container spacing={2}>
            {
                songs.map((song) => {
                    return <Grid item xs={12} sm={6} md={4} lg={3}>
                        <SongCard song={song} onPlay={() => {}}/>
                    </Grid>
                })
            }
        </Grid>
    }
    const ListView = () => {
        if(loading) {
            return <Column style={{width: "100%"}}>
                {
                    Array.from({length: 10}).map((_, index) => {
                        return <div style={{marginBottom: 10, width: "100%"}}>
                            <SongCard.TileSkeleton/>
                        </div>
                    })
                }
            </Column>
        }
        return <Column style={{width: "100%"}}>
        {
            songs.map((song) => {
                return <div style={{marginBottom: 5, width: "100%"}}><SongCard.Tile song={song} onPlay={() => {}}/> </div>
            })
        }
        </Column>
    }
    return <Card style={{...styles.card, width:"100%", minHeight: 200}} variant="outlined">
        <CardContent style={{width: "100%", height :"100%", paddingBottom: "20%"}}>
        <Column style={{width: "100%", height :"100%"}}>
            <Row alignment={Alignment.spaceBetween} style={{width: "100%"}}>
                <Typography variant="h6" style={{...styles.pageTitle, marginBottom: 10}}>New Discovery</Typography>
                <IconButton style={{color: colors.textPrimary}} onClick={() => {
                    setViewMode(viewMode === "grid" ? "list" : "grid");
                }}> {viewMode === "grid" ? <Grid4x4Rounded/> : <ListAltRounded/>}</IconButton>
            </Row>
            {
                viewMode === "grid" ? <GridView/> : <ListView/>
            }
            
        </Column>
        </CardContent>
</Card>
}


export default DiscoveryCard