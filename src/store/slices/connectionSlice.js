import { createSlice } from "@reduxjs/toolkit";

const connectiontSlice = createSlice({
    name:"request",
    initialState:null,
    reducers:{
        addFriends(state,action){
            state = action.payload
            return state
        }
    }
});

export default connectiontSlice.reducer;

export const {addFriends} = connectiontSlice.actions