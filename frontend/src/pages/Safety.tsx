import TopNavbar from "@/components/TopNavbar";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaEllipsisV, FaPaperPlane } from "react-icons/fa";
import { BACKEND_URL } from "@/config";
import { io, Socket } from "socket.io-client";

type Friend = {
  id: number;
  name: string;
  imageUrl: string;
  lastMessage: string;
  lastActive: string;
};

type Message = {
  sender: string;
  content: string;
  timestamp: string;
  type: string;
};

type SocketMessage = {
  conversationId: number;
  content: string;
  sentAt: string;
  senderId?: number;
  Sender?: {
    id: number;
    name: string;
    email: string;
  };
};

type ConversationResponse = {
  id: number;
  User1: {
    id: number;
    name: string;
    email: string;
  };
  User2: {
    id: number;
    name: string;
    email: string;
  };
  messages: {
    content: string;
    sentAt: string;
  }[];
  updatedAt: string;
};

type MessageResponse = {
  id?: number;
  content: string;
  sentAt: string;
  sender?: {
    id?: number;
    name?: string;
  };
  Sender?: {
    id?: number;
    name?: string;
    email?: string;
  };
};

function ChatApp() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = io("http://localhost:3000", {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000
    });

    socket.on('connect', () => {
      console.log('Connected to socket server:', socket.id);
      
      if (selectedFriend) {
        const userId = localStorage.getItem('Id');
        // Join the conversation room
        socket.emit('join_conversation', {
          conversationId: selectedFriend.id,
          userId: userId ? parseInt(userId) : undefined
        });
      }
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    socket.on('disconnect', (reason) => {
      console.log('Disconnected from socket server:', reason);
    });

    socketRef.current = socket;

    // Handle receiving a new message
    socket.on("new_message", (data: SocketMessage) => {
      console.log('Received new message:', data);
      const userId = localStorage.getItem('Id');
      const currentUserId = userId ? parseInt(userId) : 0;
      const senderId = data.Sender?.id || data.senderId;

      // Update the friends list with the new message
      setFriends(prev => prev.map(friend => {
        if (friend.id === data.conversationId) {
          return {
            ...friend,
            lastMessage: data.content,
            lastActive: data.sentAt 
              ? new Date(data.sentAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
          };
        }
        return friend;
      }));

      // Only add the message if it's from the current conversation
      if (data.conversationId === selectedFriend?.id) {
        // Skip if this is our own message (we already added it when sending)
        if (senderId !== currentUserId) {
          const messageDate = data.sentAt ? new Date(data.sentAt) : new Date();
          const formattedMessage = {
            sender: data.Sender?.name || "Unknown User",
            content: data.content || "",
            timestamp: messageDate.toLocaleTimeString(),
            type: "other",
          };
          setMessages(prev => [...prev, formattedMessage]);

          // Scroll to the bottom on receiving a new message
          setTimeout(() => {
            if (chatContainerRef.current) {
              chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
          }, 0);
        }
      }
    });

    // Handle user joined/left events
    socket.on('user_joined', (data) => {
      console.log('User joined:', data);
    });

    socket.on('user_left', (data) => {
      console.log('User left:', data);
    });

    return () => {
      // Cleanup WebSocket connection
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.off('new_message');
      socket.off('user_joined');
      socket.off('user_left');
      socket.disconnect();
    };
  }, [selectedFriend]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userId = localStorage.getItem("Id");
        const response = await axios.get(`${BACKEND_URL}/conversations/${userId}`);
        const formattedFriends = response.data.map((conv: ConversationResponse) => ({
          id: conv.id,
          name: conv.User1.id === Number(userId) ? conv.User2.name : conv.User1.name,
          imageUrl: "https://via.placeholder.com/48",
          lastMessage: conv.messages[conv.messages.length - 1]?.content || "No messages yet",
          lastActive: conv.messages[conv.messages.length - 1]?.sentAt
            ? new Date(conv.messages[conv.messages.length - 1].sentAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "No date",
        }));
        setFriends(formattedFriends);
      } catch (error) {
        console.error("Failed to fetch friends", error);
      }
    };

    fetchFriends();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedFriend) {
        try {
          const response = await axios.get(`${BACKEND_URL}/messages/${selectedFriend.id}`);
          const userId = localStorage.getItem("Id");
          const formattedMessages = response.data.map((msg: MessageResponse) => {
            const senderName = msg.sender?.name || msg.Sender?.name || "Unknown";
            const senderId = msg.sender?.id || msg.Sender?.id;
            return {
              sender: senderName,
              content: msg.content,
              timestamp: new Date(msg.sentAt).toLocaleTimeString(),
              type: senderId === parseInt(userId || '0') ? "you" : "other",
            };
          });
          setMessages(formattedMessages);
          
          // Scroll to bottom after loading messages
          setTimeout(() => {
            if (chatContainerRef.current) {
              chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
          }, 0);
        } catch (error) {
          console.error("Failed to fetch messages", error);
          setMessages([]);
        }
      }
    };

    fetchMessages();
  }, [selectedFriend]);

  const handleFriendClick = async (friend: Friend) => {
    setSelectedFriend(friend);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedFriend) {
      const userId = localStorage.getItem('Id');
      const currentUserId = userId ? parseInt(userId) : 0;
      const messageToSend = {
        conversationId: selectedFriend.id,
        senderId: currentUserId,
        content: newMessage,
        sender: {
          id: currentUserId,
          name: localStorage.getItem('name') || 'Unknown'
        }
      };

      try {
        // Add message to UI immediately for better UX
        const formattedMessage: Message = {
          sender: "You",
          content: newMessage,
          timestamp: new Date().toLocaleTimeString(),
          type: "you",
        };
        setMessages(prev => [...prev, formattedMessage]);
        setNewMessage("");

        // Send message to server
        const response = await axios.post(`${BACKEND_URL}/messages/send`, messageToSend);
        const sentMessage = response.data;

        // Emit the socket event
        socketRef.current?.emit("send_message", {
          ...sentMessage,
          senderId: currentUserId,
          sender: messageToSend.sender
        });

        // Scroll to the bottom after sending a message
        setTimeout(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        }, 0);
      } catch (error) {
        console.error("Failed to send message", error);
        // Remove the optimistically added message on error
        setMessages(prev => prev.slice(0, -1));
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white min-h-screen">
      <TopNavbar />
      <div className="container max-w-7xl shadow-xl rounded-lg mt-12 overflow-hidden flex h-[87vh] bg-white">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b bg-gray-50">
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full p-2 border border-gray-300 rounded-full focus:outline-none"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className={`flex items-center p-4 cursor-pointer ${
                  selectedFriend?.id === friend.id
                    ? "bg-blue-100"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleFriendClick(friend)}
              >
                <img
                  src={friend.imageUrl}
                  alt={friend.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <p className="font-semibold">{friend.name}</p>
                  <p className="text-sm text-gray-500 truncate">
                    {friend.lastMessage}
                  </p>
                </div>
                <p className="text-sm text-gray-400 ml-auto">
                  {friend.lastActive}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Chat Area */}
        <div className="w-2/3 flex flex-col">
          {selectedFriend ? (
            <>
              <div className="flex items-center p-4 border-b bg-gray-50">
                <img
                  src={selectedFriend.imageUrl}
                  alt={selectedFriend.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-4">
                  <p className="font-semibold">{selectedFriend.name}</p>
                  <p className="text-sm text-gray-500">Online</p>
                </div>
                <button className="ml-auto">
                  <FaEllipsisV className="text-gray-500" />
                </button>
              </div>
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 bg-gray-100"
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.type === "you" ? "justify-end" : "justify-start"
                    } mb-4`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        msg.type === "you"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      <p>{msg.content}</p>
                      <p className="text-xs mt-1 text-gray-500">
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-gray-50 border-t flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-2 bg-blue-500 text-white p-2 rounded-full"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1">
              <p className="text-gray-500">Select a friend to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatApp; 




