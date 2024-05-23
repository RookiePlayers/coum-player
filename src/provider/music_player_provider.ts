import React, { createContext } from "react";
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
    const [musicPlayerState, setMusicPlayerState] = React.useState<MusicPlayerContextType>(InitialMusicPlayerContextState);
    if (!context) {
        throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
    }
    context.playerRef = React.useRef<ReactHowler>(null);
    context.togglePlay = (song: Song) => {
        console.log('togglePlay', song, context.isPlaying);
        if(!context.currentSong){
            context.currentSong = song;
        }
        context.isPlaying = !context.isPlaying;
        setMusicPlayerState({
            ...context
        });
    }
    return {
        ...musicPlayerState
    };
}