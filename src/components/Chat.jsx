import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector((store) => store.user);
    const chatUser = useSelector((store) => store.chatUser);
    const userId = user?.user?._id;
    const scrollDiv = useRef(null);

    const fetchChatMessages = async () => {
        const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
            withCredentials: true,
        });


        const chatMessages = chat?.data?.messages.map((msg) => {
            const { senderId, text } = msg;
            return {
                firstName: senderId?.firstName,
                lastName: senderId?.lastName,
                text,
            };
        });
        setMessages(chatMessages);
    };
    useEffect(() => {
        fetchChatMessages();
    }, []);

    useEffect(() => {
        if (!userId) {
            return;
        }
        const socket = createSocketConnection();
        socket.emit("joinChat", {
            firstName: user?.user?.firstName,
            lastName: user?.user?.lastName,
            userId,
            targetUserId,
        });

        socket.on("messageReceived", ({ firstName, lastName, text }) => {
            setMessages((prevState) => [...prevState, { firstName, lastName, text }]);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId, targetUserId]);

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", {
            firstName: user?.user?.firstName,
            lastName: user?.user?.lastName,
            userId,
            targetUserId,
            text: newMessage,
        });
        setNewMessage("");
    };

    useEffect(() => {
        scrollDiv.current.scrollIntoView({ behavior: "smooth" })
    },[messages])
    return (
        <div className="w-full max-w-3xl mx-auto border border-gray-700 rounded-lg shadow-md mt-6 h-[70vh] flex flex-col bg-gray-900 text-white">
            {<div className="p-4 border-b border-gray-700  bg-gray-800 flex justify-start align-middle gap-3">
                <div className="w-10 h-10 rounded-full ">
                    <img className=" w-10 h-10 rounded-full" src={chatUser?.photoUrl} alt="" />
                </div>
                <p className="font-semibold mt-2">{`${chatUser.firstName} ${chatUser.lastName}`}</p>
            </div>}

            <div className="flex-1 overflow-y-auto p-4 space-y-4 ">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex flex-col screen350:max-w-[60%] screen400:max-w-[70%] ${user.user.firstName === msg.firstName ? "ml-auto items-end" : "mr-auto items-start"
                            }`}
                    >
                        <div className="text-xs text-gray-400 mb-1">
                            {`${msg.firstName} ${msg.lastName}`}
                        </div>
                        <div
                            className={`rounded-lg px-4 py-2 break-all  text-sm ${user.user.firstName === msg.firstName
                                ? "bg-blue-600 text-white"
                                : "bg-gray-700 text-white"
                                }`}
                        >
                            {msg.text}
                        </div>
                        {/* <div className="text-[10px] text-gray-500 mt-1">Seen</div> */}
                    </div>
                ))}
                <div ref={scrollDiv}></div>
            </div>

            <form className="p-4 border-t border-gray-700 bg-gray-800 flex items-center gap-3" onSubmit={(e) => {
                e.preventDefault();
            }}>
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 bg-gray-900 border border-gray-600 rounded-md px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message..."
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                    Send
                </button>
            </form>
        </div>

    );
};
export default Chat;