/* eslint-disable react-hooks/exhaustive-deps */
import { Alignment, Column, Row, Stack } from "ruki-react-layouts"
import { styles } from "./styles";
import { useEffect, useRef, useState } from "react";
import { Song } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useSongMockService, useSongService } from "../services/useSongService";
import { IconButton, Skeleton, Typography } from "@mui/material";
import { Slider } from "primereact/slider";
import ReactHowler from 'react-howler';
import { useMusicPlayer } from "../provider/music_player_provider";
import { Pause, PlayArrow, PlayArrowRounded } from "@mui/icons-material";
import {motion} from 'framer-motion';
import { PlayerApp } from "./PlayerApp";
import { PlayerWidget } from "./PlayerWidget";

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
    const [isExpanded, setIsExpanded] = useState(false);
    const expand = () => setIsExpanded(!isExpanded);
    useEffect(() => {
        const handleParentMessage = (event: any) => {
          if (event.source !== window.parent) return; // Security check
    
          const { data } = event;
          if (data === 'expand' || data === 'collapse') {
            setIsExpanded(data === 'expand');
          }
        };
    
        window.addEventListener('message', handleParentMessage);
    
        return () => window.removeEventListener('message', handleParentMessage);
      }, []);
    return <Row alignment={Alignment.spaceBetween} crossAlignment={Alignment.center} style={{...styles.card ,width: width ?? "100%", height: height ?? "100%",padding: 5}}>
        {
            isExpanded ? <PlayerApp onExit={
              expand
            } /> : <PlayerWidget onExpand = {expand} height={height} width={width} albumSize={albumSize} />
        }
    </Row>
}