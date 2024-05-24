import { Typography } from "@mui/material"
import { Column } from "ruki-react-layouts"
import { styles } from "../styles"

export const SettingsPage = () => {
    return <Column>
        <Typography variant="h6" style={styles.pageTitle}>My Account</Typography>
    </Column>
}