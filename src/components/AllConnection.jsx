import { useDispatch, useSelector } from "react-redux";
import { addFriends } from "../store/slices/connectionSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import image from "../assets/no-connection.png"
import ProfilePopUp from "./ProfilePopUp";
import NoSuggestion from "./NoSuggestion";


const AllConnection = () => {
    const [profilePopUp, setProfilePopUp] = useState(false);
    const [profileId, setProfileId] = useState(null);
    const connections = useSelector((state) => state.friend);
    const dispatch = useDispatch();
    const fetchConnectionRequest = async () => {
        const res = await axios.get(BASE_URL + "/user/allconnection", { withCredentials: true });
        dispatch(addFriends(res.data));
    }

    useEffect(() => {
        fetchConnectionRequest()
    }, []);

    if (!connections) return
    if (connections.data.length === 0) { return <NoSuggestion heading={" you have no connections right now"} message={"check later to see new firnds"} image={image} /> }
    return (
        <div>
            <div className='screen900:w-1/2  screen900:max-w-[700px] screen350:max-w-full screen900:mx-auto screen350:mx-6'>

                {connections.data.map((el) => {
                    return <div key={el._id} className="card w-full bg-base-300 shadow-md rounded-xl mt-4 px-5 py-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <img
                                    src={el.photoUrl}
                                    alt=""
                                    className="w-12 h-12 rounded-full cursor-pointer object-cover"
                                    onClick={() => {
                                        setProfilePopUp(true);
                                        setProfileId(el._id);
                                    }}
                                />
                                <h2 className="text-lg font-medium text-white">
                                    {`${el.firstName} ${el.lastName}`}
                                </h2>
                            </div>
                            <Link to={"/chat/" + el._id}>
                                <button className="btn btn-error btn-sm px-5 py-2 font-semibold rounded-md shadow-md hover:brightness-110 transition">
                                    Chat
                                </button>
                            </Link>

                        </div>
                    </div>

                })}
            </div>
            {profilePopUp && <ProfilePopUp setProfilePopUp={setProfilePopUp} profileId={profileId} />}
        </div>
    )
}
export default AllConnection