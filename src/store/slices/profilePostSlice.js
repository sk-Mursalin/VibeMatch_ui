import { createSlice } from "@reduxjs/toolkit";


const profilePostSlice = createSlice({
    name: "profilePost",
    initialState: null,
    reducers: {
        addAllProfilePost(state, action) {
            state = action.payload
            return state
        }
    }
});

export default profilePostSlice.reducer;
export const { addAllProfilePost } = profilePostSlice.actions