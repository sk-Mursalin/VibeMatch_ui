import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import feedReducer from "./slices/feedSlice";
import connectionRequestReducer from "./slices/requestSlice"
import myConnectionReducer from "./slices/connectionSlice"
import createModelReducer from "./slices/postModelSlice"
import allPostFeedReducer from "./slices/postFeedSlice"
import chatUserReducer from "./slices/chatUserSlice"
import themeReducer from "./slices/themeSlice"
import profilePostReducer from "./slices/profilePostSlice"
import profileFriendsReducer from "./slices/profileFriendsSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        request: connectionRequestReducer,
        friend: myConnectionReducer,
        postModel: createModelReducer,
        allPostFeed: allPostFeedReducer,
        chatUser: chatUserReducer,
        theme: themeReducer,
        profilePost: profilePostReducer,
        profileFriends: profileFriendsReducer,
    }
});

export default appStore;