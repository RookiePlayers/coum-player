import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../types";

interface CurrentUserData {
    user?: User;
}
const initialState: CurrentUserData = {
    user: undefined
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        }
    }
});

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;

