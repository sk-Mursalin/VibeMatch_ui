import axios from 'axios'
import FeedCard from './FeedCard'
import { BASE_URL } from '../utils/constant'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../store/slices/feedSlice'

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch()
  const fetchUserFeed = async () => {
    if (feed) {
      return
    }
    const res = await axios.get(BASE_URL + "/user/feed",{withCredentials:true});
    const feedData = res.data;
    dispatch(addFeed(feedData))
  }
  useEffect(() => {
    fetchUserFeed()
  }, []);

  // if(feed.length=== 0) return <h2>no new user found</h2>

  return (
    feed && <FeedCard feedData = {feed[0]}/>
  )
}

export default Feed