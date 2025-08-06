import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../store/slices/userSlice";
import { openModel } from "../store/slices/postModelSlice";
import CreatePostModel from "./CreatePostModel";



const NavBar = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const isModel = useSelector((state) => state.postModel)
    const handleLogout = async () => {
        await axios.post(BASE_URL + "/logout", {}, { withCredentials: true })
        dispatch(removeUser());
        navigate("/login")
    }

    return (
        <div className="bg-base-300 sticky top-0 z-10">
            <div className="navbar bg-base-300 shadow-sm px-10 max-w-[1100px] mx-auto">
                <div className="flex-1">
                    <Link to={"/"} className="btn btn-ghost text-xl">VibeMatch</Link>
                </div>
                {user && <div className="flex gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user?.user?.photoUrl} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to={"/Profile"} className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><Link to={"/request"}>connection request</Link></li>
                            <li><Link to={"/connections"}>connections</Link></li>
                            <li><Link to={"/"}>your suggestion</Link></li>
                            <li><a onClick={() => { dispatch(openModel()) }}>create a post</a></li>
                            <li><Link to={"/postfeed"}>your post Feed</Link></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                    {isModel && <CreatePostModel />}
                </div>}
            </div>
        </div>
    )
}

export default NavBar