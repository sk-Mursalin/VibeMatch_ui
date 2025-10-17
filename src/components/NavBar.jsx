import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../store/slices/userSlice";
import { openModel } from "../store/slices/postModelSlice";
import CreatePostModel from "./CreatePostModel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { toggleTheme } from "../store/slices/themeSlice";
import { Menu } from "lucide-react";
import { toggleBar } from "../store/slices/sidebarSlice";



const NavBar = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const isModel = useSelector((state) => state.postModel)
    const theme = useSelector((state) => state.theme)

    const handleLogout = async () => {
        await axios.post(BASE_URL + "/logout", {}, { withCredentials: true })
        dispatch(removeUser());
        navigate("/login")
    }

    return (
        <div className="bg-base-300 sticky top-0 z-10">
            <div className="navbar bg-base-300 shadow-sm px-10 max-w-[1100px] mx-auto">
                <div className="flex-1">
                    <div className="flex gap-5 items-center">
                        {user && <Menu className="cursor-pointer" onClick={() => dispatch(toggleBar())} />}
                        <Link to={user && "/"} className=" btn btn-ghost text-xl">VibeMatch</Link>
                    </div>
                </div>
                <div className="mr-5 cursor-pointer" onClick={() => {
                    dispatch(toggleTheme(theme == "dark" ? "light" : "dark"))
                }}>
                    <FontAwesomeIcon icon={theme == "dark" ? faSun : faMoon} />
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
                            <li><a onClick={() => { dispatch(openModel()) }}>Create a post</a></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                    {isModel.postModel && <CreatePostModel />}
                </div>}
            </div>
        </div>
    )
}

export default NavBar