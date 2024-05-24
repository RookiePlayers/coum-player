import { configureStore } from "@reduxjs/toolkit";
import playerQueueSlice from "../slices/playerQueueSlice";
import authSlice from "../slices/authSlice";
export const store = configureStore({
    reducer: {
        playerQueue: playerQueueSlice,
        auth: authSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;