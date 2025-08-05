import { useDispatch, useSelector } from "react-redux";
import { addFriends } from "../store/slices/connectionSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import NoFeed from "./NoFeed";
import image from "../assets/no-connection.png"
import ProfilePopUp from "./profilePopUp";

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
    if (connections.data.length === 0) { return <NoFeed heading={" you have no connections right now"} message={"check later to see new firnds"} image={image} /> }
    return (
        <div>
            <div className='screen900:w-1/2  screen900:max-w-[700px] screen350:max-w-full screen900:mx-auto screen350:mx-6'>

                {connections.data.map((el) => {
                    return <div key={el._id} className="card w-full bg-base-300 card-xs shadow-sm mt-4">
                        <div className=" flex justify-between align-middle py-4 px-3">

                            <div className='w-11'>
                                <img className=" w-full h-11 rounded-full cursor-pointer" src={el.photoUrl} alt="" onClick={() => {
                                    setProfilePopUp(true);
                                    setProfileId(el._id);
                                }} />
                            </div>
                            <Link to={"/chat/" + el._id}><button className="btn btn-soft btn-error">chat</button></Link>
                            <h2 className="card-title">{`${el.firstName} ${el.lastName}`}</h2>
                        </div>
                    </div>
                })}
            </div>
            {profilePopUp && <ProfilePopUp setProfilePopUp={setProfilePopUp} profileId={profileId} />}
        </div>
    )
}
export default AllConnection