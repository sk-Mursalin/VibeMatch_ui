import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { removeFromFeed } from '../store/slices/feedSlice'

const FeedCard = ({ feedData }) => {
    const { firstName, lastName, photoUrl, _id } = feedData
    const dispatch = useDispatch()
    const feedHandler = async (status, _id) => {
        await axios.post(`${BASE_URL}/connection/${status}/${_id}`, {}, { withCredentials: true })
        dispatch(removeFromFeed(_id));
    }
    return (
        <div className="card bg-base-300 w-96 shadow-sm mx-auto mt-8">
            <figure>
                <img className=' rounded-md w-full max-h-72'
                    src={photoUrl ? photoUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISuukVSb_iHDfPAaDKboFWXZVloJW9XXiwGYFab-QwlAYQ3zFsx4fToY9ijcVNU5ieKk&usqp=CAU"}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-accent" onClick={() => { feedHandler("ignored", _id) }}>ignore</button>
                    <button className="btn btn-secondary" onClick={() => { feedHandler("interested", _id) }}>interested</button>
                </div>
            </div>
        </div>
    )
}

export default FeedCard