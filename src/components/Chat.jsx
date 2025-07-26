import { useParams } from 'react-router-dom';

import { useEffect, useState } from "react";
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';

const ChatWindow = () => {
    const { targetUserId } = useParams();
    const user = useSelector((store) => store.user?.user);
    const userId = user?._id
    const [messages, setMessages] = useState([
        { sender: "them", text: "Hello! How can I help you?" },
        { sender: "you", text: "I have a question about my order." },
    ]);
    const [input, setInput] = useState("");

    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim() === "") return;

        setMessages([...messages, { sender: "you", text: input }]);
        setInput("");
    };

    useEffect(() => {
        if(!user){
            return 
        }
        const socket = createSocketConnection();
        socket.emit("joinChat", { userId, targetUserId });
        return () => {
            socket.disconnect();
        }
    }, [userId,targetUserId]);

    return (
        <div className=" max-w-2xl mx-auto flex flex-col h-full bg-[#0f1117] rounded-lg overflow-hidden border border-gray-800 mt-5">
            <div className="p-4 border-b border-gray-800 text-white font-semibold text-lg">
                {"sk Mursalin" || "Select a user"}
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto text-sm">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`max-w-[30%] px-4 py-2 rounded-lg ${msg.sender === "you"
                            ? "bg-blue-600 text-white self-end ml-auto"
                            : "bg-gray-800 text-white self-start mr-auto"
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            <form
                onSubmit={handleSend}
                className="flex items-center gap-2 p-4 border-t border-gray-800"
            >
                <input
                    type="text"
                    className="flex-1 px-4 py-2 rounded bg-gray-900 text-white focus:outline-none"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;
