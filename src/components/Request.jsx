import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection, removeConnection } from '../store/slices/requestSlice'

const Request = () => {
    const connectionRequest = useSelector((state) => state.request)
    const dispatch = useDispatch()
    const fetchConnectionRequest = async () => {
        const res = await axios.get(BASE_URL + "/user/requests/recieved", { withCredentials: true });
        const data = res.data
        dispatch(addConnection(data))
        console.log(res.data);
    }

    useEffect(() => {
        fetchConnectionRequest()
    }, []);

    const reviewRequestHandler = async (status, _id) => {
        await axios.post(`${BASE_URL}/connection/review/${status}/${_id}`, {}, { withCredentials: true });
        dispatch(removeConnection(_id));
    }


    if (!connectionRequest) return
    if (connectionRequest.data.length === 0) { return <h1 className='text-center font-bold mt-3'> you don't have any request  </h1> }
    return (
        <div>
            <div className='screen900:w-1/2  screen900:max-w-[700px] screen350:max-w-full screen900:mx-auto screen350:mx-6'>
                {connectionRequest.data.map((el) => {
                    return <div className="card w-full bg-base-300 card-xs shadow-sm mt-4">
                        <div className=" flex justify-between align-middle py-4 px-3">
                            <div className='w-11'>
                                <img className=" w-full h-11 rounded-full" src={el.fromUserId.photoUrl} alt="" />
                            </div>
                            <h2 className="card-title">{`${el.fromUserId.firstName} ${el.fromUserId.lastName}`}</h2>
                            <div className="justify-end card-actions">
                                <button className="btn btn-secondary" onClick={() => { reviewRequestHandler("accepted", el._id) }}>accept</button>
                                <button className="btn btn-accent" onClick={() => { reviewRequestHandler("rejected", el._id) }}>reject</button>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Request