import axios from 'axios'
import PostCard from './PostCard'
import { BASE_URL } from "../utils/constant"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPostFeed } from '../store/slices/postFeedSlice'

const  PostFeed = () => {
    const dispatch = useDispatch();
    const allPost = useSelector((state) => state.allPostFeed)
    const fetchPostFeed = async () => {
        const data = await axios.get(BASE_URL + "/post/get", { withCredentials: true });
        dispatch(addPostFeed(data.data));
    }
    useEffect(() => {
        fetchPostFeed()
    }, [])
    return !allPost ? <div className='flex justify-center mt-2'><span className="loading loading-spinner text-success"></span></div> : (
        <div>
            {allPost.data.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
    )
}

export default PostFeed