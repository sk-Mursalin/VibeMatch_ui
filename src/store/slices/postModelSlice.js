import { createSlice } from "@reduxjs/toolkit";

const modelSlice = createSlice({
    name: "postModel",
    initialState: false,
    reducers: {
        openModel(state, action) {
            state = true
            return state
        },
        closeModel(state, action) {
            state = false
            return state
        }
    }
})
export default modelSlice.reducer
export const { openModel, closeModel } = modelSlice.actions