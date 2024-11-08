import { Card, CardContent, Typography } from "@mui/material"
import { Alignment, Column } from "ruki-react-layouts"
import { styles } from "../styles"
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Song } from "../../../types";
import { useState } from "react";
import { Reorder } from "framer-motion";
import DiscoveryCard from "../Components/discovery-page-card/discovery-card";

export const DiscoveryPage = () => {
    const queue = useSelector((state: RootState) => state.playerQueue.queue);
    const [songs, setSongs] = useState<Song[]>([]);

    return <Column style={{padding: 20, width: '100%'}}>
        <DiscoveryCard/>
    </Column>
}