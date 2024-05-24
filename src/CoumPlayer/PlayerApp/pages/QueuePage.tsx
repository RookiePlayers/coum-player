import { Card, CardContent, Typography } from "@mui/material"
import { Column } from "ruki-react-layouts"
import { styles } from "../styles"

export const QueuePage = () => {
    return <Card style={{...styles.card, width:"100%", minHeight: 200}} variant="outlined">
           <CardContent>
            <Column>
                <Typography variant="h6" style={styles.pageTitle}>Current Queue</Typography>
            </Column>
           </CardContent>
    </Card>
}