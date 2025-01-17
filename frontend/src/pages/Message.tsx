import TopNavbar from "@/components/TopNavbar";
import { useState, useEffect, useRef, useCallback } from "react";
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
  isGroup: boolean;
  members?: { id: number; name: string }[];
};

type Message = {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  type: "you" | "other";
};

type SocketMessage = {
  id?: number;
  conversationId: number;
  groupId?: number;
  content: string;
  senderId: number;
  createdAt: string;
  sender?: {
    id: number;
    name: string;
    email: string;
  };
};

type Conversation = {
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
  messages: Array<{
    content: string;
    createdAt: string;
  }>;
};

type MessageResponse = {
  id: number;
  content: string;
  senderId: number;
  Sender?: {
    id: number;
    name?: string;
    email?: string;
  };
  sender?: {
    id: number;
    name?: string;
    email?: string;
  };
  sentAt?: string;
  createdAt?: string;
};

type GroupResponse = {
  id: number;
  name: string;
  messages?: Array<{
    content: string;
    createdAt: string;
  }>;
  groupMemberships?: Array<{
    user: {
      id: number;
      name: string;
    };
  }>;
};

const SOCKET_URL = "http://localhost:3000"; // Socket server runs on port 3000

function ChatApp() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  const formatMessageDate = useCallback((date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    if (messageDate.getTime() === today.getTime()) {
      // If message is from today, show time
      return date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    } else {
      // For all other messages, show date
      return date.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric'
      });
    }
  }, []);

  const updateFriendWithNewMessage = useCallback((message: { content: string, conversationId: number, createdAt: string }) => {
    console.log("Updating friend with new message:", message);
    setFriends(prevFriends => {
      return prevFriends.map(friend => {
        if (friend.id === message.conversationId) {
          return {
            ...friend,
            lastMessage: message.content,
            lastActive: formatMessageDate(new Date(message.createdAt))
          };
        }
        
        return friend;
      });
    });
   
  }, [formatMessageDate]);

  useEffect(() => {
    // Initialize WebSocket connection with proper error handling
    try {
      const socket = io(SOCKET_URL, {
        transports: ["websocket", "polling"],
        upgrade: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        autoConnect: true
      });

      socket.on("connect", () => {
        console.log("Socket connected successfully");
        const userId = localStorage.getItem("Id");
        if (userId) {
          // Join all conversations on connect
          friends.forEach(friend => {
            socket.emit("join_conversation", {
              conversationId: friend.id,
              isGroup: friend.isGroup,
              userId: parseInt(userId)
            });
          });
        }
      });

      // Handle receiving a new message
      socket.on("new_message", (data: SocketMessage) => {
        console.log("Received new message:", data);
        const userId = parseInt(localStorage.getItem("Id") || "0");
        
        // Update messages if this conversation is selected
        if (selectedFriend && data.conversationId === selectedFriend.id) {
          const formattedMessage: Message = {
            id: data.id?.toString() || `temp-${Date.now()}`,
            content: data.content,
            sender: data.senderId === userId ? "You" : data.sender?.name || "Unknown",
            timestamp: new Date().toLocaleTimeString(),
            type: data.senderId === userId ? "you" : "other"
          };
          setMessages(prev => [...prev, formattedMessage]);

          // Scroll to bottom
          setTimeout(() => {
            if (chatContainerRef.current) {
              chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
          }, 100);
        }

        // Always update the friends list with new message
        updateFriendWithNewMessage({
          content: data.content,
          conversationId: data.conversationId,
          createdAt: new Date().toISOString()
        });
      });

      // Handle group messages similarly
      socket.on("new_group_message", (data: SocketMessage) => {
        console.log("Received new group message:", data);
        const userId = parseInt(localStorage.getItem("Id") || "0");
        
        // Update messages if this group is selected
        if (selectedFriend && (data.groupId === selectedFriend.id || data.conversationId === selectedFriend.id)) {
          const formattedMessage: Message = {
            id: data.id?.toString() || `temp-${Date.now()}`,
            content: data.content,
            sender: data.senderId === userId ? "You" : data.sender?.name || "Unknown",
            timestamp: new Date().toLocaleTimeString(),
            type: data.senderId === userId ? "you" : "other"
          };
          setMessages(prev => [...prev, formattedMessage]);

          // Scroll to bottom
          setTimeout(() => {
            if (chatContainerRef.current) {
              chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
          }, 100);
        }

        // Always update the friends list with new message
        updateFriendWithNewMessage({
          content: data.content,
          conversationId: data.groupId || data.conversationId,
          createdAt: new Date().toISOString()
        });
      });

      socketRef.current = socket;

      socket.onAny((eventName, ...args) => {
        console.log('🔥 Received event:', eventName, 'with data:', args);
      });

      return () => {
        socket.off("new_message");
        socket.off("new_group_message");
        socket.disconnect();
      };
    } catch (error) {
      console.error("Failed to initialize socket connection:", error);
    }
  }, [selectedFriend, friends, updateFriendWithNewMessage]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userId = localStorage.getItem("Id");
        if (!userId) {
          console.error("No user ID found");
          return;
        }

        // Fetch both conversations and groups
        const [conversationsResponse, groupsResponse] = await Promise.all([
          axios.get(`${BACKEND_URL}/conversations/${userId}`),
          axios.get(`${BACKEND_URL}/groups/${userId}`)
        ]);

        const conversations = conversationsResponse.data.map((conversation: Conversation) => {
          const otherUser = parseInt(userId) === conversation.User1.id ? conversation.User2 : conversation.User1;
          const lastMessage = conversation.messages && conversation.messages.length > 0 
            ? conversation.messages[conversation.messages.length - 1] 
            : null;

          return {
            id: conversation.id,
            name: otherUser.name || otherUser.email,
            imageUrl: "https://via.placeholder.com/48",
            lastMessage: lastMessage?.content || "Start a conversation",
            lastActive: lastMessage?.createdAt
              ? formatMessageDate(new Date(lastMessage.createdAt))
              : "Today",
            isGroup: false,
          };
        });

        const groups = groupsResponse.data.map((group: GroupResponse) => {
          const lastMessage = group.messages && group.messages.length > 0 
            ? group.messages[group.messages.length - 1] 
            : null;

          return {
            id: group.id,
            name: group.name,
            imageUrl: "https://via.placeholder.com/48",
            lastMessage: lastMessage?.content || "Start a conversation",
            lastActive: lastMessage?.createdAt
              ? formatMessageDate(new Date(lastMessage.createdAt))
              : "Today",
            isGroup: true,
            members: group.groupMemberships?.map(member => ({
              id: member.user.id,
              name: member.user.name
            }))
          };
        });

        setFriends([...conversations, ...groups]);
      } catch (error) {
        console.error("Failed to fetch friends and groups", error);
      }
    };

    fetchFriends();
  }, [formatMessageDate]); // Add formatMessageDate to dependency array

  // Add a new effect to handle friend list updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      const fetchLatestMessages = async () => {
        try {
          const userId = localStorage.getItem("Id");
          if (!userId) return;

          const [conversationsResponse, groupsResponse] = await Promise.all([
            axios.get(`${BACKEND_URL}/conversations/${userId}`),
            axios.get(`${BACKEND_URL}/groups/${userId}`)
          ]);

          setFriends(prevFriends => {
            const updatedFriends = [...prevFriends];
            
            // Update conversations
            conversationsResponse.data.forEach((conv: Conversation) => {
              const index = updatedFriends.findIndex(f => f.id === conv.id && !f.isGroup);
              if (index !== -1) {
                const lastMessage = conv.messages && conv.messages.length > 0 
                  ? conv.messages[conv.messages.length - 1] 
                  : null;

                updatedFriends[index] = {
                  ...updatedFriends[index],
                  lastMessage: lastMessage?.content || "Start a conversation",
                  lastActive: lastMessage?.createdAt
                    ? formatMessageDate(new Date(lastMessage.createdAt))
                    : "Today"
                };
              }
            });

            // Update groups
            groupsResponse.data.forEach((group: GroupResponse) => {
              const index = updatedFriends.findIndex(f => f.id === group.id && f.isGroup);
              if (index !== -1) {
                const lastMessage = group.messages && group.messages.length > 0 
                  ? group.messages[group.messages.length - 1] 
                  : null;

                updatedFriends[index] = {
                  ...updatedFriends[index],
                  lastMessage: lastMessage?.content || "Start a conversation",
                  lastActive: lastMessage?.createdAt
                    ? formatMessageDate(new Date(lastMessage.createdAt))
                    : "Today"
                };
              }
            });

            return updatedFriends;
          });
        } catch (error) {
          console.error("Failed to fetch latest messages:", error);
        }
      };

      fetchLatestMessages();
    }, 5000); // Update every 5 seconds

    return () => clearInterval(updateInterval);
  }, [formatMessageDate]); // Add formatMessageDate to dependencies

  const handleFriendClick = async (friend: Friend) => {
    setSelectedFriend(friend);
    console.log("Selected friend:", friend);
    
    try {
      const userId = localStorage.getItem("Id");
      const endpoint = friend.isGroup 
        ? `${BACKEND_URL}/groups/${friend.id}/messages`
        : `${BACKEND_URL}/messages/${friend.id}?userId=${userId}`;
      
      const response = await axios.get(endpoint);
      console.log("Fetched messages:", response.data);

      // Format existing messages
      const formattedMessages = response.data.map((msg: MessageResponse) => {
        const isCurrentUser = msg.senderId === parseInt(userId || "0");
        return {
          id: msg.id.toString(),  // Add ID to track messages
          content: msg.content,
          sender: isCurrentUser ? "You" : (msg.sender?.name || msg.Sender?.name || "Unknown"),
          timestamp: new Date(msg.createdAt || msg.sentAt || "").toLocaleTimeString(),
          type: isCurrentUser ? "you" : "other"
        };
      });

      setMessages(formattedMessages);

      // Join the conversation room
      if (socketRef.current) {
        console.log("Joining conversation:", friend.id);
        socketRef.current.emit("join_conversation", {
          conversationId: friend.id,
          isGroup: friend.isGroup,
          userId: parseInt(userId || "0")
        });
      }

      // Scroll to bottom
      setTimeout(() => {
    if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      setMessages([]);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedFriend) {
      const userId = parseInt(localStorage.getItem("Id") || "0");
      const messageToSend = selectedFriend.isGroup 
        ? {
            groupId: selectedFriend.id,
            senderId: userId,
            content: newMessage,
            sender: {
              id: userId,
              name: localStorage.getItem("name") || "Unknown"
            }
          }
        : {
            conversationId: selectedFriend.id,
            senderId: userId,
            content: newMessage,
            attachmentUrl: null
          };

      try {
        const endpoint = selectedFriend.isGroup 
          ? `${BACKEND_URL}/groups/${selectedFriend.id}/messages`
          : `${BACKEND_URL}/messages/send`;

        const response = await axios.post(endpoint, messageToSend);
        const sentMessage = response.data;

        // Add message to UI immediately
        const formattedMessage: Message = {
          id: `temp-${Date.now()}`,  // Just use a temporary ID when sending
          content: newMessage,
          sender: "You",
          timestamp: new Date().toLocaleTimeString(),
          type: "you"
        };
        setMessages(prev => [...prev, formattedMessage]);

        // Update the friends list with the new message
        updateFriendWithNewMessage({
          content: newMessage,
          conversationId: selectedFriend.id,
          createdAt: new Date().toISOString()
        });

        // Emit the socket event
        if (selectedFriend.isGroup) {
          socketRef.current?.emit("send_group_message", {
            ...sentMessage,
            groupId: selectedFriend.id,
            conversationId: selectedFriend.id,
            isGroup: true,
            sender: {
              id: userId,
              name: localStorage.getItem("name") || "Unknown"
            }
          });
        } else {
          socketRef.current?.emit("send_message", {
            ...sentMessage,
            conversationId: selectedFriend.id,
            isGroup: false,
            sender: {
              id: userId,
              name: localStorage.getItem("name") || "Unknown"
            }
          });
        }

        setNewMessage("");

        // Scroll to the bottom after sending a message
        setTimeout(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        }, 0);
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  // Update socket event handlers
  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;
    const userId = parseInt(localStorage.getItem("Id") || "0");

    socket.on("new_message", (data: SocketMessage) => {
      console.log("📨 Received new message:", data);
      
      // Add message to UI if it's for the current conversation
      if (selectedFriend && data.conversationId === selectedFriend.id) {
        const formattedMessage: Message = {
          id: data.id?.toString() || `temp-${Date.now()}`,
          content: data.content,
          sender: data.senderId === userId ? "You" : data.sender?.name || "Unknown",
          timestamp: new Date().toLocaleTimeString(),
          type: data.senderId === userId ? "you" : "other"
        };

        setMessages(prevMessages => {
          // Check if message already exists
          const messageExists = prevMessages.some(msg => msg.id === formattedMessage.id);
          if (messageExists) {
            return prevMessages;
          }
          return [...prevMessages, formattedMessage];
        });

        // Scroll to bottom
        setTimeout(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        }, 100);
      }

      // Update friends list
      updateFriendWithNewMessage({
        content: data.content,
        conversationId: data.conversationId,
        createdAt: new Date().toISOString()
      });
    });

    socket.on("new_group_message", (data: SocketMessage) => {
      console.log("📨 Received new group message:", data);
      
      // Add message to UI if it's for the current group
      if (selectedFriend && (data.groupId === selectedFriend.id || data.conversationId === selectedFriend.id)) {
        const formattedMessage: Message = {
          id: data.id?.toString() || `temp-${Date.now()}`,
          content: data.content,
          sender: data.senderId === userId ? "You" : data.sender?.name || "Unknown",
          timestamp: new Date().toLocaleTimeString(),
          type: data.senderId === userId ? "you" : "other"
        };

        setMessages(prevMessages => {
          // Check if message already exists
          const messageExists = prevMessages.some(msg => msg.id === formattedMessage.id);
          if (messageExists) {
            return prevMessages;
          }
          return [...prevMessages, formattedMessage];
        });

        // Scroll to bottom
        setTimeout(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        }, 100);
      }

      // Update friends list
      updateFriendWithNewMessage({
        content: data.content,
        conversationId: data.groupId || data.conversationId,
        createdAt: new Date().toISOString()
      });
    });

    return () => {
      socket.off("new_message");
      socket.off("new_group_message");
    };
  }, [selectedFriend, updateFriendWithNewMessage]);

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
                  <p className="font-semibold">
                    {friend.name} {friend.isGroup && <span>(Group)</span>}
                  </p>
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
                  <p className="font-semibold">
                    {selectedFriend.name} {selectedFriend.isGroup && <span>(Group)</span>}
                  </p>
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
                  placeholder="Type your message here..."
                  className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                  className="ml-2 p-2 bg-blue-500 text-white rounded-full"
              >
                  <FaPaperPlane />
              </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1">
              <p className="text-gray-500">Select a chat to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
