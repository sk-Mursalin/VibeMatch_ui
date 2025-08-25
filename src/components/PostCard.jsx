import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
const PostCard = ({ post }) => {
    const navigate = useNavigate()
    const { content, postPhoto, postCreatedBy, createdAt } = post
    const { firstName, lastName, photoUrl, _id } = postCreatedBy

    const relativeTime = formatDistanceToNow(new Date(createdAt), {
        addSuffix: true,
    });
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

            <div className="flex gap-4  text-sm mt-2">
                <button><FontAwesomeIcon icon={faHeart} className="text-xl" /></button>
                <button><FontAwesomeIcon icon={faComment} className="text-xl" /></button>
            </div>
        </div>
    );
};

export default PostCard;