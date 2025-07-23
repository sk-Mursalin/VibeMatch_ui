import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import feedReducer from "./slices/feedSlice";
import connectionRequestReducer from "./slices/requestSlice"
import myConnectionReducer from "./slices/connectionSlice"
const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        request: connectionRequestReducer,
        friend: myConnectionReducer
    }
});

export default appStore;