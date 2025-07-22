import { createSlice } from "@reduxjs/toolkit";

const store = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addUser(state, action) {
            state = action.payload
            return state
        },

        removeUser(state, action) {
            state = null
            return state
        }
    }
});

export default store.reducer;

export const {addUser,removeUser} = store.actions