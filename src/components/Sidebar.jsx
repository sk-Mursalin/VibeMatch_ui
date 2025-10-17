
import { motion, AnimatePresence } from "framer-motion";
import {  Pencil, X, Edit, UserPlus, Users, UsersRound, Newspaper } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleBar } from "../store/slices/sidebarSlice";
import { Link } from "react-router-dom";
import { openModel } from "../store/slices/postModelSlice";


const Sidebar = () => {
    const dispatch = useDispatch()
    const isOpen = useSelector((state) => state.Sidebar)
    console.log(isOpen);

    const menuItems = [
        { icon: <Edit size={20} />, label: "Edit Profile", path: "/editProfile" },
        { icon: <UserPlus size={20} />, label: "Connection request", path: "/request" },
        { icon: <Users size={20} />, label: "Connections", path: "/connections" },
        { icon: <UsersRound size={20} />, label: "Your suggestion", path: "/suggestion" },
        // { icon: <Pencil size={20} onClick={() => { dispatch(openModel()) }}/>, label: "Create a post", },
        { icon: <Newspaper  size={20} />, label: "Your Feed", path: "/" },
    ];

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        initial={{ x: -250 }}
                        animate={{ x: 0 }}
                        exit={{ x: -250 }}
                        transition={{ type: "spring", stiffness: 30 }}
                        className="fixed top-0 left-0 h-full w-60 bg-gray-900 text-white shadow-lg z-40"
                    >

                        <div className="flex items-center justify-between gap-2 p-5 border-b border-gray-700 ">
                            <h1 className="text-lg font-semibold">VibeMatch</h1>
                            <X className="cursor-pointer" onClick={() => { dispatch(toggleBar()) }} />
                        </div>


                        <ul className="flex flex-col gap-4 p-5">
                            {menuItems.map((item) => (
                                <li
                                    key={item.label}
                                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-800 px-3 py-2 rounded-lg transition-all"
                                >
                                    {item.icon}
                                    <span><Link to={item.path}>{item.label}</Link></span>
                                </li>
                            ))}
                        </ul>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;
