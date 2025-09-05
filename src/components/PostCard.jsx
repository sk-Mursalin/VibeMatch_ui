import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant"
const PostCard = ({ post }) => {
    const navigate = useNavigate()
    const { content, postPhoto, postCreatedBy, createdAt, _id: postId, isLiked: like } = post
    const { firstName, lastName, photoUrl, _id } = postCreatedBy
    const [isLiked, setIsLiked] = useState(like);

    const relativeTime = formatDistanceToNow(new Date(createdAt), {
        addSuffix: true,
    });

    const likeHandler = async (postId) => {
        try {
            const res = await axios.patch(`${BASE_URL}/post/like/${postId}`, {}, { withCredentials: true });

            if (res?.data?.message == "like") {
                setIsLiked(true)
            } else if (res?.data?.message == "unlike") {
                setIsLiked(false)
            }

        } catch (err) {
            console.log(err.response);
        }
    }

    return (
        <div className="bg-transparent max-w-xl mx-auto my-4 p-4 rounded-lg shadow-md border border-gray-700">
            <div className="text-sm  mb-2 flex items-center gap-4">
                <div className='w-11 cursor-pointer' onClick={() => {
                    navigate("/seeProfile/" + _id)
                }}>
                    <img className=" w-full h-11 rounded-full" src={photoUrl} alt="" />
                </div>
                <span className="font-semibold">{`${firstName} ${lastName}`}</span> • <span>{relativeTime}</span>
            </div>

            {(
                <p className="text-md  mb-3">{content}</p>
            )}

            {postPhoto && (
                <img
                    src={postPhoto}
                    alt="Post"
                    className="rounded-md max-h-96 w-full object-cover mb-3"
                />
            )}

            <div className="flex gap-4   text-sm mt-2">
                <button onClick={() => {
                    likeHandler(postId)
                }}>
                    <p className="text-xl">{isLiked ? "❤" : "🤍"}</p></button>
                <button><FontAwesomeIcon icon={faComment} className="text-xl" /></button>
            </div>
        </div>
    );
};

export default PostCard;