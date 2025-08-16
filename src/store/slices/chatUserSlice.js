import { createSlice } from "@reduxjs/toolkit";

const chatUserSlice = createSlice({
    name:"chatUser",
    initialState:JSON.parse(localStorage.getItem("chatUser")),
    reducers:{
        addChatUser(state,action){
            state = action.payload
            localStorage.setItem("chatUser", JSON.stringify(action.payload))
            return state
        }
    }
});

export default chatUserSlice.reducer;

export const {addChatUser} = chatUserSlice.actions