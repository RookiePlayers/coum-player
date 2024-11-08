import { Card, CardContent, Typography, Skeleton, ListItemButton, Chip, IconButton, ButtonGroup, Button, Menu, ListItem, MenuItem } from "@mui/material";
import { Album, Song } from "../../../../types";
import { Alignment, Column, Row } from "ruki-react-layouts";
import { styles } from "./song-card.styles";
import { colors } from "../../../../colors";
import ReactHowler from "react-howler";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getDuration } from "../../../../utils";
import { motion } from "framer-motion";
import { AddToQueueRounded, MoreVertRounded, PlayArrowRounded, QueueMusicRounded } from "@mui/icons-material";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
import { useSongService } from "../../../../services/useSongService";
import { useRouting } from "../../../../provider/routing";
import AlbumPage from "../../pages/AlbumPage";
import { useMusicPlayer } from "../../../../provider/music_player_provider";
type SongCardProps = {
  song?: Song;
  songId?: string;
  albumSize?: number | string;
  coverOnly?: boolean;
  customLeftSection?: React.ReactNode;
  noImage?: boolean;
  disableMore?: boolean;
  onPlay: (song: Song) => void;
};

const SongCard = ({ song:Song, songId, albumSize, coverOnly, onPlay }: SongCardProps) => {

    const {getSong} = useSongService();
    const {setRoute} = useRouting();
    const [song, setSong] = useState<Song>(Song ?? {} as Song);
    useEffect(() => {
        if(songId) {
            getSong(songId).then((retrievedSong) => {
                if(retrievedSong)
                    setSong(retrievedSong);
            })
        }
    }, [Song, songId]);
  return (
    <Card style={{ backgroundColor: "transparent" }} elevation={0}>
      <CardContent style={{ padding: 0, }}>
       
        <Column>
          <div style={{
                ...styles.album,
                border: "none",
                minWidth: albumSize ?? 135,
                minHeight: albumSize ?? 130,
                
                height: "100%",
                width: "100%",
                position: 'relative',
          }}>
            <motion.div
                    onClick={()=>{
                      console.log("Album clicked");
                        setRoute("album", <AlbumPage album={{
                            albumName: song.songName,
                            albumType: 'single',
                            albumId: song.songId,
                            artist: song.songPerformer,
                            year: song.createdOn,
                            genre: song.songGenre,
                            duration: song.audioDuration,
                            albumArt: song.artwork,
                            songs: [song.songId],
                            explicity: song.explicity,

                        } as unknown as Album}/>)
                    }}
                style={{
                    ...styles.album,
                    height: "100%",
                    width: "100%",
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    opacity: 0,
                }}
                whileHover={{
                    transition: { duration: 0.2 },
                    cursor: "pointer",
                    opacity: 1,
                }}>
                    <div 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: colors.background,
                        opacity: 0.7,
                        zIndex: -1,
                        borderRadius: 4,
                        border: `1px solid ${colors.textPrimary}2f`,
                    }}/>
                    <Column crossAlignment={Alignment.center} alignment={Alignment.center} style={{ height: "100%" }}>
                       
                    <motion.div whileInView={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, 0],
                        transition:{
                            repeatType: "mirror",
                            repeat: Infinity,
                            repeatDelay: 5, 
                        }
                    }} animate={{
                        scale: [1, 1.1, 1],
                    }}> <IconButton style={{ color: colors.textPrimary }} size="small" onClick={() => onPlay(song)}>
                            <PlayArrowRounded fontSize="large" />
                        </IconButton>
                    </motion.div>
                    </Column>
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: "100%",
                        padding: 10,
                        zIndex: 1,
                    }}>
                        
                    <Button disableElevation size="small" style={{
                        backgroundColor: colors.secondary,
                        color: 'black',
                        fontWeight: 600,
                        width: "100%",
                        textTransform: "none",
                        padding:"5px 15px"
                    }} startIcon={<QueueMusicRounded/>}>
                        Add to Queue
                    </Button>
                    </div>
                </motion.div>
            <img
                src={song.artwork ?? "https://streamdata.radiohitwave.com/api/placeholder-cover.jpg"}
                alt="album"
                style={{
                    ...styles.album,
                    height: "100%",
                    width: "100%",
                }}
            />

          </div>
          {!coverOnly && (
            <Column>
              <Row crossAlignment={Alignment.center} style={{ margin: "10px 0px 2px 0px" }}>
                <motion.a 
                  style={{
                    fontSize: 15,
                    color: colors.textPrimary,
                    fontWeight: "bold",
                  }} whileHover={{
                    cursor: "pointer",
                    textDecoration: "underline",
                }}>
                  {song.songName}
                </motion.a>
                {song.explicity && (
                  <Chip
                    label="explicit"
                    variant="outlined"
                    size="small"
                    style={{
                      marginLeft: 5,
                      opacity: 0.5,
                      padding: 0,
                      fontSize: 11,
                      letterSpacing: 0.5,
                      fontWeight: 300,
                      transform: "scale(0.85)",
                      color: colors.textPrimary,
                    }}
                  />
                )}
              </Row>

              <Typography
                style={{
                  fontSize: 12,
                  color: colors.textSecondary,
                }}
              >
                {song.songPerformer}
              </Typography>
            </Column>
          )}
        </Column>
      </CardContent>
    </Card>
  );
};

const SkeletonCard = ({ albumSize }: { albumSize?: number }) => {
  return (
    <Card style={{ backgroundColor: "transparent" }} elevation={0}>
      <CardContent style={{ padding: 0 }}>
        <Column crossAlignment={Alignment.left} alignment={Alignment.center}>
          <Skeleton
            sx={{
              width: albumSize ?? "100%",
              height: albumSize ?? "100%",
              minHeight: 200,
            }}
          />
          <Column alignment={Alignment.center}>
            <Skeleton sx={{ width: 100, height: 20, borderRadius: 4 }} />
            <Skeleton sx={{ width: 80, height: 15, borderRadius: 4 }} />
          </Column>
        </Column>
      </CardContent>
    </Card>
  );
};

const TileSkeleton = () => {
  return (
    <Row style={{ height: "100%", width: "100%" }} crossAlignment={Alignment.center} alignment={Alignment.left}>
      <Skeleton variant="rectangular" width={80} height={"100%"} sx={{ borderRadius: 1, marginRight: 1 }} />
      <Column style={{ height: "100%", width: "100%" }} alignment={Alignment.top}>
        <Skeleton width="100%" sx={{ borderRadius: 1, marginBottom: 0.5 }} />
        <Skeleton width="100%" sx={{ borderRadius: 1 }} />
      </Column>
    </Row>
  );
};

const Tile = ({ song:Song,songId, albumSize, onPlay, customLeftSection, noImage, disableMore }: SongCardProps) => {
  const playerRef = useRef<ReactHowler>(null);
  const [duration, setDuration] = useState<string>("--");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {getSong} = useSongService();
  const [song, setSong] = useState<Song>(Song ?? {} as Song);
  const {togglePlay} = useMusicPlayer() 
  useEffect(() => {
    
    console.log("Song card songId: ", songId);
      if(songId) {
          getSong(songId).then((retrievedSong) => {
              if(retrievedSong)
                  setSong(retrievedSong);
          })
      }
  }, [Song, songId]);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDefaultPlay = () => {
    togglePlay(song);
  }

  const howlerPlayer = useMemo(
    () => song?.url  && <ReactHowler playing={false} ref={playerRef} src={song?.url ?? ""} 
    onLoad={() => {
      if (playerRef.current) {
        const audioDuration = playerRef.current.duration() || song.audioDuration;
        setDuration(getDuration(audioDuration));
      }
    }} />,
    [song?.url] // Recreate only when song URL changes
  );
  return (
    <ListItem style={{padding: 0}} secondaryAction={
        
        <Row alignment={Alignment.right} crossAlignment={Alignment.center}>
          <Typography
            style={{
              fontSize: 12,
              color: colors.textSecondary,
            }}
          >
            {duration}
          </Typography>
          {!disableMore && <div>
            
          <IconButton id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick} size="small" style={{ color: colors.textPrimary }}>
            <MoreVertRounded fontSize="small" />
            </IconButton>
            
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
            '& .MuiPaper-root': {
                backgroundColor: colors.background,
                color: colors.textPrimary,
            },
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><Row><QueueMusicRounded style={{marginRight: 10}}/>Add To Queue</Row></MenuItem>
        <MenuItem onClick={handleClose}>Save to Playlist</MenuItem>
        <MenuItem onClick={handleClose}>See Details</MenuItem>
      </Menu>
          </div>}
        </Row>
    }>
        <ListItemButton style={{ width: "100%" }} onClick={() => handleDefaultPlay()}>
      <Row alignment={Alignment.spaceBetween} style={{ width: "100%" }}>
        <Row crossAlignment={Alignment.center} alignment={Alignment.left}>
          {customLeftSection}
          {!noImage && <img
            src={song.artwork ?? "https://streamdata.radiohitwave.com/api/placeholder-cover.jpg"}
            alt="album"
            style={{
              ...styles.album,
              width: albumSize ?? 40,
              height: albumSize ?? 40,
              borderRadius: 4,
              marginRight: 10,
            }}
          />}
          <Column alignment={Alignment.center}>
            <Row crossAlignment={Alignment.center}>
              <Typography
                style={{
                  fontSize: 15,
                  color: colors.textPrimary,
                  fontWeight: "bold",
                }}
              >
                {song.songName}
              </Typography>
              {song.explicity && (
                <Chip
                  label="explicit"
                  variant="outlined"
                  size="small"
                  style={{
                    marginLeft: 5,
                    opacity: 0.5,
                    padding: 0,
                    fontSize: 11,
                    letterSpacing: 0.5,
                    fontWeight: 300,
                    transform: "scale(0.85)",
                    color: colors.textPrimary,
                  }}
                />
              )}
            </Row>
            <Typography
              style={{
                fontSize: 12,
                color: colors.textSecondary,
              }}
            >
              {song.songPerformer}
            </Typography>
          </Column>
           {/* Render ReactHowler memoized instance */}
      {howlerPlayer}
        </Row>
      </Row>
    </ListItemButton>
    </ListItem>
  );
};

SongCard.Tile = Tile;
SongCard.Skeleton = SkeletonCard;
SongCard.TileSkeleton = TileSkeleton;

export default SongCard;


const Listbox = styled('ul')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0;
    background: ${colors.background};
    border: 1px solid ${grey[700]};
    color: ${grey[300]};
    box-shadow: 0px 4px 6px ${'rgba(0,0,0, 0.50)'
    };
    z-index: 1;
    `,
  );
  