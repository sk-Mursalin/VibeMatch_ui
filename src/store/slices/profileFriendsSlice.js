import { createSlice } from "@reduxjs/toolkit";


const profileFriendsSlice = createSlice({
    name: "profileFriends",
    initialState: null,
    reducers: {
        addAllProfileFriends(state, action) {
            state = action.payload
            return state
        }
    }
});

export default profileFriendsSlice.reducer;
export const { addAllProfileFriends } = profileFriendsSlice.actions