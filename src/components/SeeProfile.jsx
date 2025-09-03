import axios from "axios"
import { useParams } from "react-router-dom"
import { BASE_URL } from "../utils/constant"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addAllProfilePost } from "../store/slices/profilePostSlice"
import { addAllProfileFriends } from "../store/slices/profileFriendsSlice"
import UserPosts from "./UserPosts"
import UserFriends from "./UserFriends"
import { addProfile } from "../store/slices/profileSlice"

const SeeProfile = () => {
    const { profileId } = useParams();
    const dispatch = useDispatch();
    const allPosts = useSelector((state) => state.profilePost);
    const allFriends = useSelector((state) => state.profileFriends);
    const UserProfile = useSelector((state) => state.profile);
    const [seepost, setSeePost] = useState(false);
    const [seeFriends, setSeeFriends] = useState(false);

    const fetchPost = async () => {
        const [posts, friends, profile] = await Promise.all(
            [axios.get(`${BASE_URL}/post/get/${profileId}`, { withCredentials: true }),
            axios.get(`${BASE_URL}/connections/${profileId}`, { withCredentials: true }),
            axios.get(`${BASE_URL}/profile/get/${profileId}`, { withCredentials: true })
            ]
        )
        dispatch(addProfile(profile?.data?.data));
        dispatch(addAllProfilePost(posts?.data?.data));
        dispatch(addAllProfileFriends(friends?.data?.data));
    }

    useEffect(() => {
        fetchPost();
    }, [])

    console.log(UserProfile);

    if (!UserProfile) return
    const { about, firstName, lastName, photoUrl } = UserProfile;

    return (
        <div className="max-w-3xl mx-auto mt-6 bg-transparent shadow-lg rounded-2xl overflow-hidden">
            <div className="relative">
                <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=300&fit=crop"
                    alt="cover"
                    className="w-full h-40 object-cover"
                />
                <div className="absolute -bottom-12 left-6">
                    <img
                        src={photoUrl}
                        alt="profile"
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                    />
                </div>
            </div>

            <div className="mt-16 px-6 pb-6">
                <h2 className="text-2xl font-bold">{`${firstName} ${lastName}`}</h2>
                <p className="mt-3">{about}</p>

                <div className="flex gap-8 mt-5 text-center">
                    <div>
                        <p className="font-bold">{allPosts.length}</p>
                        <span className="text-sm">Posts</span>
                    </div>
                    <div>
                        <p className="font-bold">{allFriends.length}</p>
                        <span className="text-sm">Friends</span>
                    </div>
                </div>

                <div className="mt-6 flex gap-4">
                    <button
                        className="flex-1 bg-blue-500 py-2 rounded-xl font-medium hover:bg-blue-600"
                        onClick={() => {
                            seeFriends ? setSeeFriends(false) : setSeeFriends(seeFriends);
                            setSeePost(!seepost)
                        }}
                    >
                        See All Posts
                    </button>
                    <button
                        className="flex-1 bg-primary py-2 rounded-xl font-medium hover:bg-success"
                        onClick={() => {
                            seepost ? setSeePost(false) : setSeePost(seepost);
                            setSeeFriends(!seeFriends);
                        }}
                    >
                        See Friends
                    </button>
                </div>
            </div>
            {seepost && <UserPosts allPosts={allPosts} />}
            {seeFriends && <UserFriends allFriends={allFriends} />}
        </div>
    );
}

export default SeeProfile
