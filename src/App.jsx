import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Feed from "./components/Suggestion"
import Profile from "./components/Profile"
import Request from "./components/Request"
import AllConnection from "./components/AllConnection"
import ChatWindow from "./components/Chat"
import FeedPost from "./components/FeedPost"


function App() {

  return (
    <>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<FeedPost />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/request" element={<Request />} />
              <Route path="/connections" element={<AllConnection />} />
              <Route path="/chat/:targetUserId" element={<ChatWindow />} />
              <Route path="/suggestion" element={<Feed />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
