import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import { Provider } from "react-redux"
import appStore from "./store/appStore"
import Feed from "./components/Feed"
import Profile from "./components/Profile"
import Request from "./components/Request"
import AllConnection from "./components/AllConnection"
import ChatWindow from "./components/Chat"
import { PostFeed } from "./components/postFeed"

function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/request" element={<Request />} />
              <Route path="/connections" element={<AllConnection />} />
              <Route path="/chat/:targetUserId" element={<ChatWindow />} />
              <Route path="/postfeed" element={<PostFeed />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
