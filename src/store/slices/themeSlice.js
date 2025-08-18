import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: localStorage.getItem("theme"),
    reducers: {
        toggleTheme(state, action) {
            state = action.payload
            localStorage.setItem("theme", action.payload)
            return state
        }
    }
});

export default themeSlice.reducer;

export const { toggleTheme } = themeSlice.actions;