import { createSlice } from "@reduxjs/toolkit";

const postFeedSlice = createSlice({
    name: "allPostFeed",
    initialState: null,
    reducers: {
        addPostFeed(state, action) {
            return action.payload
        }
    }
});

export default postFeedSlice.reducer;

export const { addPostFeed } = postFeedSlice.actions;