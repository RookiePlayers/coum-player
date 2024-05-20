import { configureStore } from "@reduxjs/toolkit";
import playerQueueSlice from "../slices/playerQueueSlice";

export const store = configureStore({
    reducer: {
        playerQueue: playerQueueSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;