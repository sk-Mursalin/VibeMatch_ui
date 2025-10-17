import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: false,
    reducers: {
        toggleBar(state) {
            state = !state
            return state
        }
    }
})

export default sidebarSlice.reducer

export const { toggleBar } = sidebarSlice.actions