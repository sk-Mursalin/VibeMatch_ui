import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: null,
    reducers: {
        addProfile(state, action) {
            state = action.payload
            return state
        }
    }
});

export const { addProfile } = profileSlice.actions
export default profileSlice.reducer