import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { PlayerQueue } from "../types";

interface PlayerQueueSliceData {
    queue?: PlayerQueue;
}

const initialState: PlayerQueueSliceData = {
    queue: undefined
}

const playerQueueSlice = createSlice(({
    name: "playerQueue",
    initialState,
    reducers: {
        addSongToQueue(state, action: PayloadAction<string>) {
            if (state.queue) {
                state.queue.nextSongs[action.payload] = action.payload
            }
        },
        removeSongFromQueue(state, action: PayloadAction<string>) {
            if (state.queue) {
                delete state.queue.nextSongs[action.payload]
            }
        },
        playNext(state, action: PayloadAction<string>) {
            if (state.queue) {
                const nextSong = state.queue.nextSongs[action.payload];
                if (nextSong) {
                    delete state.queue.nextSongs[action.payload];
                    const currentSong = state.queue.currentSong;
                    state.queue.playedSongs[currentSong] = currentSong;
                    state.queue.currentSong = nextSong;
                }
            }
        },
        playPrevious(state, action: PayloadAction<string>) {
            if (state.queue) {
                const previousSong = state.queue.playedSongs[action.payload];
                if (previousSong) {
                    delete state.queue.playedSongs[action.payload];
                    state.queue.nextSongs[state.queue.currentSong] = state.queue.currentSong;
                    state.queue.currentSong = previousSong;
                }
            }
        },
        playSong(state, action: PayloadAction<string>) {
            if (state.queue) {
                state.queue.currentSong = action.payload;
            }
        }
    }
}))

export const { addSongToQueue, removeSongFromQueue, playNext, playPrevious, playSong } = playerQueueSlice.actions;
export default playerQueueSlice.reducer;