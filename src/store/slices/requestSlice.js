import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addConnection(state, action) {
            return action.payload

        },
        removeConnection(state, action) {
            // const index = state.data.findIndex((el) => el._id === action.payload);
            // state.data.splice(index, 1)

            const newarray = state.data.filter((el)=> el._id !== action.payload)
            state.data =  newarray
        }
    }
});

export default requestSlice.reducer;

export const { addConnection, removeConnection } = requestSlice.actions