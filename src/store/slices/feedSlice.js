import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed(state, action) {
            return action.payload
        },
        removeFromFeed(state, action) {
            const index = state.findIndex((el) => el._id === action.payload);
            state.splice(index, 1)
        }
    }
});

export default feedSlice.reducer;

export const { addFeed, removeFromFeed } = feedSlice.actions;