import { useState } from 'react';
import { CgAddR } from "react-icons/cg";
import { FaMicrophone } from "react-icons/fa6";
import { AiOutlineFile, AiOutlineCamera, AiOutlinePicture, AiOutlineGif } from "react-icons/ai";
import { VscMention } from "react-icons/vsc";
import { sendMessage } from '@/utils/api';

interface ChatInputProps {
    onMessageSent: () => void; // Callback to refresh messages
}

const ChatInput = ({ onMessageSent }: ChatInputProps) => {
    const [message, setMessage] = useState('');
    const [showOptions, setShowOptions] = useState(false);

    const handleSend = async () => {
        if (message.trim()) {
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const newMessage = { text: message, isSent: true, time: currentTime };
            
            await sendMessage(newMessage); // Send to backend
            setMessage('');
            onMessageSent(); // Refresh messages in parent
        }
    };

    return (
        <div className="relative">
            <div className="flex items-center p-4 bg-gray-100 border-t border-gray-200">
                <button className="text-gray-600 mr-3" onClick={() => setShowOptions(!showOptions)}>
                    <CgAddR size={24} />
                </button>
                <input
                    type="text"
                    placeholder="Write a message..."
                    className="flex-1 p-2 rounded-3xl border border-gray-300 focus:outline-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button className="text-gray-600 ml-3" onClick={handleSend}>
                    <FaMicrophone size={19} />
                </button>
            </div>
            {showOptions && (
                <div className="absolute bottom-16 left-0 w-full bg-white shadow-lg rounded-xl p-4 flex justify-between">
                    <button className="flex flex-col items-center text-gray-600">
                        <AiOutlineFile size={24} />
                        <span className="text-xs mt-1">Document</span>
                    </button>
                    <button className="flex flex-col items-center text-gray-600">
                        <AiOutlineCamera size={24} />
                        <span className="text-xs mt-1">Camera</span>
                    </button>
                    <button className="flex flex-col items-center text-gray-600">
                        <AiOutlinePicture size={24} />
                        <span className="text-xs mt-1">Media</span>
                    </button>
                    <button className="flex flex-col items-center text-gray-600">
                        <AiOutlineGif size={24} />
                        <span className="text-xs mt-1">GIF</span>
                    </button>
                    <button className="flex flex-col items-center text-gray-600">
                        <VscMention size={24} />
                        <span className="text-xs mt-1">@Mention</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChatInput;
