import React, { createContext, useMemo } from "react";
import { Song } from "../types";
import ReactHowler from "react-howler";

type MusicPlayerContextType = {
    currentSong: Song | null;
    isPlaying: boolean;
    play: (song: Song) => void;
    togglePlay: (song: Song) => void;
    seek: (time: number) => void;
    setVolume: (volume: number) => void;
    setPlaybackRate: (rate: number) => void;
    playNext: () => void;
    playPrev: () => void;
    playAgain: () => void;
    playRandom: () => void;
    playRepeat: () => void;
    playRepeatOne: () => void;
    playShuffle: () => void;
    playLoop: () => void;
    playLoopOne: () => void;
    playerRef?: React.RefObject<ReactHowler>;
}

export const InitialMusicPlayerContextState: MusicPlayerContextType = {
    currentSong: null,
    isPlaying: false,
    play: () => {},
    togglePlay: () => {},
    seek: () => {},
    setVolume: () => {},
    setPlaybackRate: () => {},
    playNext: () => {},
    playPrev: () => {},
    playAgain: () => {},
    playRandom: () => {},
    playRepeat: () => {},
    playRepeatOne: () => {},
    playShuffle: () => {},
    playLoop: () => {},
    playLoopOne: () => {},

}

export const MusicPlayerContext = createContext<MusicPlayerContextType | null>(null);
export const useMusicPlayer = () => {
    const context = React.useContext(MusicPlayerContext);
    if (!context) {
        throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
    }
    return context;
}
export const MusicPlayerProvider = ({children, initialState}: {children: React.ReactNode, initialState: MusicPlayerContextType}) => {
    const [currentSong, setCurrentSong] = React.useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
    const playerRef = React.useRef<ReactHowler>(null);

    const play = (song: Song) => {
        setCurrentSong(song);
        setIsPlaying(true);
        console.log("Playing song:", playerRef);
        playerRef.current?.howler.play();
    }

    const togglePlay = (song: Song) => {
        if (currentSong && currentSong.songId === song.songId) {
            setIsPlaying(!isPlaying);
        } else {
            playerRef.current?.howler.load().play();
        }
    }

    const seek = (time: number) => {
        if (playerRef.current) {
            playerRef.current.seek(time);
        }
    }

    const setVolume = (volume: number) => {
        if (playerRef.current) {
            playerRef.current.howler.volume(volume);
        }
    }

    const setPlaybackRate = (rate: number) => {
        if (playerRef.current) {
            playerRef.current.howler.rate(rate);
        }
    }

    const playNext = () => {
        console.log("Playing next song");
    }

    const playPrev = () => {
        console.log("Playing previous song");
    }

    const playAgain = () => {
        console.log("Playing current song again");
    }

    const playRandom = () => {
        console.log("Playing random song");
    }

    const playRepeat = () => {
        console.log("Playing all songs in the queue");
    }

    const playRepeatOne = () => {
        console.log("Playing current song in the queue");
    }

    const playShuffle = () => {
        console.log("Shuffling songs in the queue");
    }

    const playLoop = () => {
        console.log("Looping all songs in the queue");
    }

    const playLoopOne = () => {
        console.log("Looping current song in the queue");
    }

    const howlerPlayer = useMemo(
        () => currentSong?.url  && <ReactHowler playing={isPlaying} ref={playerRef} src={currentSong?.url ?? ""} 
        />,
        [currentSong?.url] // Recreate only when song URL changes
      );

    return <MusicPlayerContext.Provider value={{
            currentSong,
            isPlaying,
            play,
            togglePlay,
            seek,
            setVolume,
            setPlaybackRate,
            playNext,
            playPrev,
            playAgain,
            playRandom,
            playRepeat,
            playRepeatOne,
            playShuffle,
            playLoop,
            playLoopOne,
            playerRef
    }}>
        <>
        {howlerPlayer}
            {children}
        </>
        </MusicPlayerContext.Provider>
    
}

