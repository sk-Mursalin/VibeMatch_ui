import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:"request",
    initialState:null,
    reducers:{
        addConnection(state,action){
            state = action.payload
            return state
        }
    }
});

export default requestSlice.reducer;

export const {addConnection} = requestSlice.actions