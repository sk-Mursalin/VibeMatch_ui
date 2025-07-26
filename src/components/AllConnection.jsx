import { useDispatch, useSelector } from "react-redux";
import { addFriends } from "../store/slices/connectionSlice";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { Link } from "react-router-dom";

const AllConnection = () => {
    const connections = useSelector((state) => state.friend)
    const dispatch = useDispatch()
    const fetchConnectionRequest = async () => {
        const res = await axios.get(BASE_URL + "/user/allconnection", { withCredentials: true });
        dispatch(addFriends(res.data));
    }

    useEffect(() => {
        fetchConnectionRequest()
    }, []);
    if (!connections) return
    if (connections.length === 0) { return <h1 className='text-center font-bold mt-3'> you don't have any request  </h1> }
    return (
        <div className='w-1/2  mx-auto'>
            {connections.data.map((el) => {
                return <div key={el._id} className="card w-full bg-base-300 card-xs shadow-sm mt-4">
                    <div className=" flex justify-between align-middle py-4 px-3">
                        <div className='w-11 flex gap-7'>
                            <img className=" w-full h-11 rounded-full" src={el.photoUrl} alt="" />
                            <Link to={"/chat/" + el._id}><button className="btn btn-soft btn-error">chat</button></Link>
                        </div>
                        <h2 className="card-title">{`${el.firstName} ${el.lastName}`}</h2>
                    </div>
                </div>
            })}
        </div>
    )
}
export default AllConnection