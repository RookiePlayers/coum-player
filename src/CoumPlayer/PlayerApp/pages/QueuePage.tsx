import { Card, CardContent, Typography } from "@mui/material"
import { Alignment, Column } from "ruki-react-layouts"
import { styles } from "../styles"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { useState } from "react"
import { Song } from "../../../types"
import { Reorder } from "framer-motion"

export const QueuePage = () => {
    const queue = useSelector((state: RootState) => state.playerQueue.queue);
    const [songs, setSongs] = useState<Song[]>([]);

    return <Card style={{...styles.card, width:"100%", minHeight: 200}} variant="outlined">
           <CardContent style={{width: "100%", height :"100%"}}>
            <Column style={{width: "100%", height :"100%"}}>
                <Typography variant="h6" style={styles.pageTitle}>Current Queue</Typography>
                {
                    songs.length > 0 ? <Reorder.Group axis="y" values={songs} onReorder={setSongs}>
                        {
                            songs.map((song, index) => {
                                return <Reorder.Item key={song.songId} value={song}>
                                    
                                </Reorder.Item>
                            })
                        }
                    </Reorder.Group> : <Column alignment={Alignment.center} style={{height: "100%", width: "100%"}}>
                        <Typography style={styles.pageSubtitle} variant="body1">No songs in queue</Typography>
                    </Column>
                }
                
            </Column>
           </CardContent>
    </Card>
}