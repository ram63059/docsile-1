import { useEffect, useState } from 'react';
import { fetchMessages } from '@/utils/api';

const ChatMessages = () => {
    const [messages, setMessages] = useState<{ text: string; isSent: boolean; time: string }[]>([]);

    const loadMessages = async () => {
        try {
            const data = await fetchMessages();
            setMessages(data);
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    useEffect(() => {
        loadMessages();
    }, []);

    return (
        <div className="flex-1 flex flex-col overflow-y-auto p-4 bg-gray-50">
            {messages.length > 0 ? (
                messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-2 px-4 my-1 rounded-lg ${
                            msg.isSent ? 'bg-blue-100 self-end text-right' : 'bg-gray-200 self-start text-left'
                        }`}
                    >
                        <span>{msg.text}</span>
                        <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No messages yet. Start the conversation!</p>
            )}
        </div>
    );
};

export default ChatMessages;
