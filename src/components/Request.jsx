import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../store/slices/requestSlice'

const Request = () => {
    const connectionRequest = useSelector((state) => state.request)
    const dispatch = useDispatch()
    const fetchConnectionRequest = async () => {
        const res = await axios.get(BASE_URL + "/user/requests/recieved", { withCredentials: true });
        dispatch(addConnection(res.data))
    }

    useEffect(() => {
        fetchConnectionRequest()
    }, []);
    if (!connectionRequest) return
    if(connectionRequest.data.length === 0) {return <h1 className='text-center font-bold mt-3'> you don't have any request  </h1>}
    return (
        <div className='w-1/2  mx-auto'>
            {connectionRequest.data.map(({ fromUserId }) => {
                return <div className="card w-full bg-base-300 card-xs shadow-sm mt-4">
                    <div className=" flex justify-between align-middle py-4 px-3">
                        <div className='w-11'>
                            <img  className=" w-full h-11 rounded-full" src={fromUserId.photoUrl} alt="" />
                        </div>
                        <h2 className="card-title">{`${fromUserId.firstName} ${fromUserId.lastName}`}</h2>
                        <div className="justify-end card-actions">
                            <button className="btn btn-secondary">accept</button>
                            <button className="btn btn-accent">rereject</button>

                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}

export default Request