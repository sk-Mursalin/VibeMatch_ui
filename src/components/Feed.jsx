import axios from 'axios'
import FeedCard from './FeedCard'
import { BASE_URL } from '../utils/constant'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../store/slices/feedSlice'
import NoFeed from './NoFeed'

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

  if(!feed) return 
  if(feed.length<= 0) return <NoFeed/>

  return (
     <FeedCard feedData = {feed[0]}/>
  )
}

export default Feed