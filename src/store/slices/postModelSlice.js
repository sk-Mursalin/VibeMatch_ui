import { createSlice } from "@reduxjs/toolkit";

const getDataFromStorage = localStorage.getItem("postModel")

const modelSlice = createSlice({
    name: "postModel",
    initialState: getDataFromStorage ? JSON.parse(getDataFromStorage) : {postModel:false},
    reducers: {
        openModel(state, action) {
            state.postModel = true
            localStorage.setItem("postModel",JSON.stringify({postModel:true}))
        },
        closeModel(state, action) {
            state.postModel = false
            localStorage.removeItem("postModel")
        }
    }
})
export default modelSlice.reducer
export const { openModel, closeModel } = modelSlice.actions