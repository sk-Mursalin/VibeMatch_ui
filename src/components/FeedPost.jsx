import axios from 'axios'
import PostCard from './PostCard'
import { BASE_URL } from "../utils/constant"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPostFeed } from '../store/slices/postFeedSlice'
import NoSuggestion from './NoSuggestion'
import image from "../assets/no-feed.png"

const FeedPost = () => {
    const dispatch = useDispatch();
    const allPost = useSelector((state) => state.allPostFeed)
    const fetchPostFeed = async () => {
        const data = await axios.get(BASE_URL + "/post/get", { withCredentials: true });
        dispatch(addPostFeed(data.data));
    }
    useEffect(() => {
        fetchPostFeed()
    }, [])
    if (!allPost) return
    if (allPost.data.length == 0) return <NoSuggestion heading={"No fedd Available for you"} message={"Looks like we have don't have  feed for you"} image={image} />
    return !allPost ? <div className='flex justify-center mt-2'><span className="loading loading-spinner text-success"></span></div> : (
        <div>
            {allPost.data.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
    )
}

export default FeedPost