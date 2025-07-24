import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../store/slices/userSlice'

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)


    const fetchProfile = async () => {
        if(user){
            return
        }
        try {
            const response = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
            dispatch(addUser(response.data))
        } catch (err) {
            if(err.status === 401)
            navigate("/login")
        }
    }
    useEffect(() => {
        fetchProfile()
    }, [])
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default Home