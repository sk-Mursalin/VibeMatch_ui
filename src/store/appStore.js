import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import feedReducer from "./slices/feedSlice";
import connectionRequestReducer from "./slices/requestSlice"
const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        request: connectionRequestReducer
    }
});

export default appStore;