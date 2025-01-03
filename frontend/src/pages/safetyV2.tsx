// import TopNavbar from "@/components/TopNavbar";
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { FaEllipsisV, FaPaperPlane } from "react-icons/fa";
// import { BACKEND_URL } from "@/config";
// import { io, Socket } from "socket.io-client";

// type Friend = {
//   id: number;
//   name: string;
//   imageUrl: string;
//   lastMessage: string;
//   lastActive: string;
//   isGroup: boolean;
// };

// type Message = {
//   id: string;
//   content: string;
//   sender: string;
//   timestamp: string;
// };

// type SocketMessage = {
//   id: number;
//   conversationId: number;
//   content: string;
//   sentAt: string;
//   senderId: number;
//   Sender: {
//     id: number;
//     name: string;
//     email: string;
//   };
// };

// type MessageResponse = {
//   id?: number;
//   content: string;
//   sentAt?: string;
//   createdAt?: string;
//   senderId?: number;
//   Sender?: {
//     id: number;
//     name: string;
//     email?: string;
//   };
//   sender?: {
//     id: number;
//     name: string;
//     email?: string;
//   };
// };

// type ConversationResponse = {
//   id: number;
//   User1: {
//     id: number;
//     name: string;
//   };
//   User2: {
//     id: number;
//     name: string;
//   };
//   messages: {
//     content: string;
//     sentAt: string;
//   }[];
// };

// type GroupResponse = {
//   id: number;
//   name: string;
//   messages: {
//     content: string;
//     createdAt: string;
//   }[];
// };

// function ChatApp() {
//   const [friends, setFriends] = useState<Friend[]>([]);
//   const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState<string>("");
//   const chatContainerRef = useRef<HTMLDivElement>(null);
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     // Initialize WebSocket connection with debug logs
//     console.log("Initializing socket connection...");
//     const socket = io("http://localhost:3000", {
//       transports: ["websocket", "polling"],
//       withCredentials: false,
//       upgrade: true,
//       reconnection: true,
//        forceNew: true
//     });

//     socket.on("connect", () => {
//       console.log("Socket connected successfully with ID:", socket.id);
//     });

//     socket.on("connect_error", (error) => {
//       console.error("Socket connection error:", error.message);
//     });

//     socket.on("disconnect", (reason) => {
//       console.log("Socket disconnected:", reason);
//     });

//     socket.on("error", (error) => {
//       console.error("Socket error:", error);
//     });

//     socketRef.current = socket;

//     return () => {
//       if (socket.connected) {
//         console.log("Cleaning up socket connection");
//         socket.disconnect();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!socketRef.current || !selectedFriend) return;

//     const socket = socketRef.current;
//     console.log("Setting up socket events for friend:", selectedFriend.name);

//     // Join new conversation/room
//     const joinData = {
//       conversationId: selectedFriend.id,
//       isGroup: selectedFriend.isGroup,
//     };
//     console.log("Joining conversation:", joinData);
//     socket.emit("join_conversation", joinData);

//     // Handle direct messages
//     const handleDirectMessage = (data: SocketMessage) => {
//       console.log("Received direct message:", data);
//       const userId = parseInt(localStorage.getItem("Id") || "0");
      
//       // Only process messages for current conversation
//       if (!selectedFriend.isGroup && data.conversationId === selectedFriend.id) {
//         const newMessage: Message = {
//           id: data.id?.toString() || `temp-${Date.now()}-${Math.random()}`,
//           content: data.content,
//           sender: data.senderId === userId ? "me" : data.Sender?.name || "Unknown",
//           timestamp: new Date(data.sentAt).toLocaleTimeString(),
//         };
//         setMessages(prev => [...prev, newMessage]);
//         console.log("New message added to UI:", newMessage);
//         // Scroll to bottom
//         if (chatContainerRef.current) {
//           chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//         }
//       }
//     };

//     // Handle group messages
//     const handleGroupMessage = (data: SocketMessage) => {
//       console.log("Received group message:", data);
//       const userId = parseInt(localStorage.getItem("Id") || "0");
      
//       // Only process messages for current group
//       if (selectedFriend.isGroup && data.conversationId === selectedFriend.id) {
//         const newMessage: Message = {
//           id: data.id?.toString() || `temp-${Date.now()}-${Math.random()}`,
//           content: data.content,
//           sender: data.senderId === userId ? "me" : data.Sender?.name || "Unknown",
//           timestamp: new Date(data.sentAt).toLocaleTimeString(),
//         };
//         setMessages(prev => [...prev, newMessage]);

//         // Scroll to bottom
//         if (chatContainerRef.current) {
//           chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//         }
//       }
//     };
    
//     // Handle socket events
//     const response =socket.on("receive_messages", handleDirectMessage);
//     console.log("Response:", response);


//     socket.on("receive_group_message", handleGroupMessage);
//     socket.on("message_error", (error) => {
//       console.error("Socket message error:", error);
//     });

//     socket.on("joined_conversation", (response) => {
//       console.log("Join conversation response:", response);
//       if (!response.success) {
//         console.error("Failed to join conversation:", response.error);
//       }
//     });

//     return () => {
//       console.log("Cleaning up socket events for friend:", selectedFriend.name);
//       socket.off("receive_message", handleDirectMessage);
//       socket.off("receive_group_message", handleGroupMessage);
//       socket.off("message_error");
//       socket.off("joined_conversation");
//     };
//   }, [selectedFriend]);

//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         const userId = localStorage.getItem("Id");
//         const [conversationsResponse, groupsResponse] = await Promise.all([
//           axios.get(`${BACKEND_URL}/conversations/${userId}`),
//           axios.get(`${BACKEND_URL}/groups/${userId}`)
//         ]);

//         console.log("Conversations response:", conversationsResponse.data);
//         console.log("Groups response:", groupsResponse.data);

//         const directChats = conversationsResponse.data.map((conv: ConversationResponse) => ({
//           id: conv.id,
//           name: conv.User1.id === parseInt(userId || "0") ? conv.User2.name : conv.User1.name,
//           imageUrl: "https://via.placeholder.com/48",
//           lastMessage: conv.messages[0]?.content || "No messages yet",
//           lastActive: conv.messages[0]?.sentAt
//             ? new Date(conv.messages[0].sentAt).toLocaleDateString("en-US", {
//                 month: "short",
//                 day: "numeric",
//               })
//             : "No date",
//           isGroup: false,
//         }));

//         const groupChats = groupsResponse.data.map((group: GroupResponse) => ({
//           id: group.id,
//           name: group.name,
//           imageUrl: "https://via.placeholder.com/48",
//           lastMessage: group.messages[0]?.content || "No messages yet",
//           lastActive: group.messages[0]?.createdAt
//             ? new Date(group.messages[0].createdAt).toLocaleDateString("en-US", {
//                 month: "short",
//                 day: "numeric",
//               })
//             : "No date",
//           isGroup: true,
//         }));

//         setFriends([...directChats, ...groupChats]);
//       } catch (error) {
//         console.error("Failed to fetch conversations", error);
//       }
//     };

//     fetchConversations();
//   }, []);

//   const handleFriendClick = async (friend: Friend) => {
//     setSelectedFriend(friend);
//     setMessages([]); // Clear messages when switching chats

//     try {
//       const userId = localStorage.getItem("Id");
//       const endpoint = friend.isGroup
//         ? `${BACKEND_URL}/groups/${friend.id}/messages`
//         : `${BACKEND_URL}/messages/${friend.id}?userId=${userId}`;

//       const response = await axios.get(endpoint);
//       console.log("Message response:", response.data); // Debug log

//       const currentUserId = parseInt(userId || "0");
//       const formattedMessages = response.data.map((msg: MessageResponse) => {
//         const sender = (msg.Sender || msg.sender || { id: 0, name: "Unknown" });
//         return {
//           id: msg.id?.toString() || `temp-${Date.now()}-${Math.random()}`,
//           content: msg.content || "",
//           sender: sender.id === currentUserId ? "me" : (sender.name || "Unknown"),
//           timestamp: (msg.sentAt || msg.createdAt) 
//             ? new Date(msg.sentAt || msg.createdAt || "").toLocaleTimeString() 
//             : new Date().toLocaleTimeString(),
//         };
//       });

//       console.log("Formatted messages:", formattedMessages); // Debug log
//       setMessages(formattedMessages);

//       // Scroll to bottom
//       if (chatContainerRef.current) {
//         chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//       }
//     } catch (error) {
//       console.error("Failed to fetch messages", error);
//       // Add error state handling if needed
//       setMessages([]); // Clear messages on error
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedFriend || !socketRef.current) return;

//     const userId = parseInt(localStorage.getItem("Id") || "0");
//     const messageId = `temp-${Date.now()}-${Math.random()}`;

    

//     try {
//       console.log("Sending message with userId:", userId);
//       // Create message data
//       const messageData = {
//         id: messageId, // Add message ID to track the message
//         content: newMessage,
//         senderId: userId,
//         ...(selectedFriend.isGroup 
//           ? { groupId: selectedFriend.id }
//           : { conversationId: selectedFriend.id }),
//         Sender: {
//           id: userId,
//           name: localStorage.getItem("name") || "me",
//           email: localStorage.getItem("email") || ""
//         }
//       };
//       console.log("Message data:", messageData);
//       // Add message to UI immediately with pending status
//       const newMsg: Message = {
//         id: messageId,
//         content: newMessage,
//         sender: "me",
//         timestamp: new Date().toLocaleTimeString(),
//       };
//       setMessages(prev => [...prev, newMsg]);
//       setNewMessage(""); // Clear input

//       // Save to backend first
//       const endpoint = selectedFriend.isGroup
//         ? `${BACKEND_URL}/groups/${selectedFriend.id}/messages`
//         : `${BACKEND_URL}/messages/send`;

//       const response = await axios.post(endpoint, messageData);
//       console.log("Message saved to backend:", response.data);

//       // Update message with server response data if needed
//       setMessages(prev => prev.map(msg => 
//         msg.id === messageId 
//           ? { ...msg, id: response.data.id?.toString() || msg.id }
//           : msg
//       ));
//       console.log("Updated messages:", messages);
//       // Emit socket event with server-generated ID
//       if (socketRef.current.connected) {
//         const eventName = selectedFriend.isGroup ? "send_group_message" : "send_message";
//         console.log("Emitting socket event:", eventName);
//         socketRef.current.emit(eventName, {
//           ...messageData,
//           id: response.data.id // Use server-generated ID
//         });
//       }
//       console.log("Socket connected:", socketRef.current.connected);
//       // Scroll to bottom
//       if (chatContainerRef.current) {
//         setTimeout(() => {
//           chatContainerRef.current?.scrollTo({
//             top: chatContainerRef.current.scrollHeight,
//             behavior: 'smooth'
//           });
//         }, 100);
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       // Remove failed message from UI
//       setMessages(prev => prev.filter(msg => msg.id !== messageId));
//       // Optionally show error to user
//       alert("Failed to send message. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center bg-white min-h-screen">
//       <TopNavbar />
//       <div className="container max-w-7xl shadow-xl rounded-lg mt-12 overflow-hidden flex h-[87vh] bg-white">
//         {/* Sidebar */}
//         <div className="w-1/3 border-r border-gray-200 flex flex-col">
//           <div className="p-4 border-b bg-gray-50">
//             <input
//               type="text"
//               placeholder="Search chats..."
//               className="w-full p-2 border border-gray-300 rounded-full focus:outline-none"
//             />
//           </div>
//           <div className="flex-1 overflow-y-auto">
//             {friends.map((friend, index) => (
//               <div
//                 key={index}
//                 className={`flex items-center p-4 cursor-pointer ${
//                   selectedFriend?.id === friend.id
//                     ? "bg-blue-100"
//                     : "hover:bg-gray-50"
//                 }`}
//                 onClick={() => handleFriendClick(friend)}
//               >
//                 <img
//                   src={friend.imageUrl}
//                   alt={friend.name}
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div className="ml-4">
//                   <p className="font-semibold">
//                     {friend.name} {friend.isGroup && <span>(Group)</span>}
//                   </p>
//                   <p className="text-sm text-gray-500 truncate">
//                     {friend.lastMessage}
//                   </p>
//                 </div>
//                 <p className="text-sm text-gray-400 ml-auto">
//                   {friend.lastActive}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* Chat Area */}
//         <div className="w-2/3 flex flex-col">
//           {selectedFriend ? (
//             <>
//               <div className="flex items-center p-4 border-b bg-gray-50">
//                 <img
//                   src={selectedFriend.imageUrl}
//                   alt={selectedFriend.name}
//                   className="w-10 h-10 rounded-full"
//                 />
//                 <div className="ml-4">
//                   <p className="font-semibold">
//                     {selectedFriend.name} {selectedFriend.isGroup && <span>(Group)</span>}
//                   </p>
//                   <p className="text-sm text-gray-500">Online</p>
//                 </div>
//                 <button className="ml-auto">
//                   <FaEllipsisV className="text-gray-500" />
//                 </button>
//               </div>
//               <div
//                 ref={chatContainerRef}
//                 className="flex-1 overflow-y-auto p-4 bg-gray-100"
//               >
//                 {messages.map((msg) => (
//                   <div
//                     key={msg.id}
//                     className={`flex ${
//                       msg.sender === "me" ? "justify-end" : "justify-start"
//                     } mb-4`}
//                   >
//                     {msg.sender !== "me" && (
//                       <div className="flex-shrink-0 mr-2">
//                         <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
//                           <span className="text-sm text-gray-600">
//                             {msg.sender.charAt(0).toUpperCase()}
//                           </span>
//                         </div>
//                       </div>
//                     )}
//                     <div
//                       className={`rounded-lg px-4 py-2 max-w-[70%] ${
//                         msg.sender === "me"
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-200 text-gray-800"
//                       }`}
//                     >
//                       {msg.sender !== "me" && (
//                         <p className="text-xs text-gray-600 mb-1">{msg.sender}</p>
//                       )}
//                       <p className="text-sm">{msg.content}</p>
//                       <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="p-4 bg-gray-50 border-t flex items-center">
//                 <input
//                   type="text"
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   placeholder="Type your message here..."
//                   className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   className="ml-2 p-2 bg-blue-500 text-white rounded-full"
//                 >
//                   <FaPaperPlane />
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="flex flex-col items-center justify-center flex-1">
//               <p className="text-gray-500">Select a chat to start messaging</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatApp;






//V2////

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
  isGroup: boolean;
  members?: { id: number; name: string }[];
};

type Message = {
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

  // Add a function to update the friends list with new message
  const updateFriendWithNewMessage = (message: { content: string, conversationId: number, createdAt: string }) => {
    setFriends(prevFriends => {
      return prevFriends.map(friend => {
        if (friend.id === message.conversationId) {
          return {
            ...friend,
            lastMessage: message.content,
            lastActive: new Date(message.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          };
        }
        return friend;
      });
    });
  };

  useEffect(() => {
    // Initialize WebSocket connection with proper error handling
    try {
      const socket = io(SOCKET_URL, {
        transports: ["websocket", "polling"],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        autoConnect: true
      });

      socket.on("connect", () => {
        console.log("Socket connected successfully");
      });

      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      socketRef.current = socket;

      // Join the current conversation if selected
      if (selectedFriend) {
        socket.emit("join_conversation", {
          conversationId: selectedFriend.id,
          isGroup: selectedFriend.isGroup
        });
      }

      // Handle receiving a new message
      socket.on("new_message", (data: SocketMessage) => {
        console.log("Received new message:", data);
        const userId = parseInt(localStorage.getItem("Id") || "0");
        
        // Update messages if in the current conversation
        if (data.conversationId === selectedFriend?.id) {
          const formattedMessage: Message = {
            content: data.content,
            sender: data.senderId === userId ? "You" : selectedFriend?.name || "Unknown",
            timestamp: new Date().toLocaleTimeString(),
            type: data.senderId === userId ? "you" : "other"
          };
          setMessages(prev => [...prev, formattedMessage]);

          // Scroll to bottom on new message
          setTimeout(() => {
            if (chatContainerRef.current) {
              chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
          }, 100);
        }

        // Update friends list with new message
        updateFriendWithNewMessage({
          content: data.content,
          conversationId: data.conversationId,
          createdAt: new Date().toISOString()
        });
      });

      // Handle group messages
      socket.on("new_group_message", (data: SocketMessage) => {
        console.log("Received new group message:", data);
        const userId = parseInt(localStorage.getItem("Id") || "0");
        
        // Update messages if in the current group
        if (data.groupId === selectedFriend?.id || data.conversationId === selectedFriend?.id) {
          const formattedMessage: Message = {
            content: data.content,
            sender: data.senderId === userId 
              ? "You" 
              : (data.sender?.name || data.sender?.email || "Unknown"),
            timestamp: new Date().toLocaleTimeString(),
            type: data.senderId === userId ? "you" : "other"
          };
          setMessages(prev => [...prev, formattedMessage]);

          // Scroll to bottom on new message
          setTimeout(() => {
            if (chatContainerRef.current) {
              chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
          }, 100);
        }

        // Update friends list with new message
        updateFriendWithNewMessage({
          content: data.content,
          conversationId: data.groupId || data.conversationId,
          createdAt: new Date().toISOString()
        });
      });

      return () => {
        socket.off("new_message");
        socket.off("new_group_message");
        socket.disconnect();
      };
    } catch (error) {
      console.error("Failed to initialize socket connection:", error);
    }
  }, [selectedFriend]); // Only depend on selectedFriend

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
          return {
            id: conversation.id,
            name: otherUser.name || otherUser.email,
            imageUrl: "https://via.placeholder.com/48",
            lastMessage: conversation.messages[0]?.content || "No messages yet",
            lastActive: conversation.messages[0]?.createdAt
              ? new Date(conversation.messages[0].createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : "No date",
            isGroup: false,
          };
        });

        const groups = groupsResponse.data.map((group: GroupResponse) => ({
          id: group.id,
          name: group.name,
          imageUrl: "https://via.placeholder.com/48",
          lastMessage: group.messages?.[0]?.content || "No messages yet",
          lastActive: group.messages?.[0]?.createdAt
            ? new Date(group.messages[0].createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "No date",
          isGroup: true,
          members: group.groupMemberships?.map(member => ({
            id: member.user.id,
            name: member.user.name
          }))
        }));

        setFriends([...conversations, ...groups]);
      } catch (error) {
        console.error("Failed to fetch friends and groups", error);
      }
    };

    fetchFriends();
  }, []); // This effect runs only once when component mounts

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
                updatedFriends[index] = {
                  ...updatedFriends[index],
                  lastMessage: conv.messages[0]?.content || "No messages yet",
                  lastActive: conv.messages[0]?.createdAt
                    ? new Date(conv.messages[0].createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "No date"
                };
              }
            });

            // Update groups
            groupsResponse.data.forEach((group: GroupResponse) => {
              const index = updatedFriends.findIndex(f => f.id === group.id && f.isGroup);
              if (index !== -1) {
                updatedFriends[index] = {
                  ...updatedFriends[index],
                  lastMessage: group.messages?.[0]?.content || "No messages yet",
                  lastActive: group.messages?.[0]?.createdAt
                    ? new Date(group.messages[0].createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "No date"
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
  }, []);

  const handleFriendClick = async (friend: Friend) => {
    setSelectedFriend(friend);
    try {
      const userId = localStorage.getItem("Id");
      const endpoint = friend.isGroup 
        ? `${BACKEND_URL}/groups/${friend.id}/messages`
        : `${BACKEND_URL}/messages/${friend.id}?userId=${userId}`;
      
      const response = await axios.get(endpoint);
      console.log("Message response:", response.data);

      const formattedMessages = response.data.map((msg: MessageResponse) => {
        if (!msg) return null;

        const isCurrentUser = msg.senderId === parseInt(userId || "0");
        const senderName = friend.isGroup
          ? (msg.Sender?.name || msg.sender?.name || msg.Sender?.email || msg.sender?.email || "Unknown")
          : (isCurrentUser ? "You" : friend.name);

        return {
          content: msg.content || "",
          sender: senderName,
          timestamp: (msg.createdAt || msg.sentAt) 
            ? new Date(msg.createdAt || msg.sentAt || "").toLocaleTimeString() 
            : "",
          type: isCurrentUser ? "you" : "other"
        };
      }).filter(Boolean);

      setMessages(formattedMessages);

      // Join the conversation room
      socketRef.current?.emit("join_conversation", {
        conversationId: friend.id,
        isGroup: friend.isGroup
      });
    } catch (error) {
      console.error("Failed to fetch messages", error);
      setMessages([]);
    }

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
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







// //v3


// import TopNavbar from "@/components/TopNavbar";
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { FaEllipsisV, FaPaperPlane } from "react-icons/fa";
// import { BACKEND_URL } from "@/config";
// import { io, Socket } from "socket.io-client";

// type Friend = {
//   id: number;
//   name: string;
//   imageUrl: string;
//   lastMessage: string;
//   lastActive: string;
//   isGroup: boolean;
//   members?: { id: number; name: string }[];
// };

// type Message = {
//   content: string;
//   sender: string;
//   timestamp: string;
//   type: "you" | "other";
// };

// type SocketMessage = {
//   id?: number;
//   conversationId: number;
//   groupId?: number;
//   content: string;
//   senderId: number;
//   createdAt: string;
//   sender?: {
//     id: number;
//     name: string;
//     email: string;
//   };
// };

// type Conversation = {
//   id: number;
//   User1: {
//     id: number;
//     name: string;
//     email: string;
//   };
//   User2: {
//     id: number;
//     name: string;
//     email: string;
//   };
//   messages: Array<{
//     content: string;
//     createdAt: string;
//   }>;
// };

// type MessageResponse = {
//   id: number;
//   content: string;
//   senderId: number;
//   Sender?: {
//     id: number;
//     name?: string;
//     email?: string;
//   };
//   sender?: {
//     id: number;
//     name?: string;
//     email?: string;
//   };
//   sentAt?: string;
//   createdAt?: string;
// };

// type GroupResponse = {
//   id: number;
//   name: string;
//   messages?: Array<{
//     content: string;
//     createdAt: string;
//   }>;
//   groupMemberships?: Array<{
//     user: {
//       id: number;
//       name: string;
//     };
//   }>;
// };

// const SOCKET_URL = "http://localhost:3000"; // Socket server runs on port 3000

// function ChatApp() {
//   const [friends, setFriends] = useState<Friend[]>([]);
//   const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState<string>("");
//   const chatContainerRef = useRef<HTMLDivElement>(null);
//   const socketRef = useRef<Socket | null>(null);

//   // Add a function to update the friends list with new message
//   const updateFriendWithNewMessage = (message: { content: string, conversationId: number, createdAt: string }) => {
//     setFriends(prevFriends => {
//       return prevFriends.map(friend => {
//         if (friend.id === message.conversationId) {
//           return {
//             ...friend,
//             lastMessage: message.content,
//             lastActive: new Date(message.createdAt).toLocaleDateString("en-US", {
//               month: "short",
//               day: "numeric",
//             })
//           };
//         }
//         return friend;
//       });
//     });
//   };

//   useEffect(() => {
//     // Initialize WebSocket connection with proper error handling
//     try {
//       const socket = io(SOCKET_URL, {
//         transports: ["websocket", "polling"],
//         reconnectionAttempts: 5,
//         reconnectionDelay: 1000,
//         autoConnect: true
//       });

//       socket.on("connect", () => {
//         console.log("Socket connected successfully");
//         const userId = localStorage.getItem("Id");
//         if (userId) {
//           friends.forEach(friend => {
//             socket.emit("join_conversation", {
//               conversationId: friend.id,
//               isGroup: friend.isGroup,
//               userId: parseInt(userId)
//             });
//           });
//         }
//       });

//       socket.on("connect_error", (error) => {
//         console.error("Socket connection error:", error);
//       });

//       socketRef.current = socket;

//       // Join the current conversation if selected
//       if (selectedFriend) {
//         socket.emit("join_conversation", {
//           conversationId: selectedFriend.id,
//           isGroup: selectedFriend.isGroup
//         });
//       }

//       // Handle receiving a new message
//       socket.on("new_message", (data: SocketMessage) => {
//         const userId = parseInt(localStorage.getItem("Id") || "0");
//         if (selectedFriend && !selectedFriend.isGroup && data.conversationId === selectedFriend.id) {
//           const formattedMessage: Message = {
//             content: data.content,
//             sender: data.senderId === userId ? "You" : selectedFriend.name,
//             timestamp: new Date().toLocaleTimeString(),
//             type: data.senderId === userId ? "you" : "other"
//           };
//           setMessages(prev => [...prev, formattedMessage]);
//         }
//       });

//       // Handle group messages
//       socket.on("new_group_message", (data: SocketMessage) => {
//         console.log("Received new group message:", data);
//         const userId = parseInt(localStorage.getItem("Id") || "0");
        
//         // Update messages if in the current group
//         if (data.groupId === selectedFriend?.id || data.conversationId === selectedFriend?.id) {
//           const formattedMessage: Message = {
//             content: data.content,
//             sender: data.senderId === userId ? "You" : data.sender?.name || "Unknown",
//             timestamp: new Date().toLocaleTimeString(),
//             type: data.senderId === userId ? "you" : "other"
//           };
//           setMessages(prev => [...prev, formattedMessage]);

//           // Scroll to bottom on new message
//           setTimeout(() => {
//             if (chatContainerRef.current) {
//               chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//             }
//           }, 100);
//         }

//         // Update friends list with new message
//         updateFriendWithNewMessage({
//           content: data.content,
//           conversationId: data.groupId || data.conversationId,
//           createdAt: new Date().toISOString()
//         });
//       });

//       return () => {
//         socket.off("new_message");
//         socket.off("new_group_message");
//         socket.disconnect();
//       };
//     } catch (error) {
//       console.error("Failed to initialize socket connection:", error);
//     }
//   }, [selectedFriend, friends]); // Add friends to dependency array

//   useEffect(() => {
//     const fetchFriends = async () => {
//       try {
//         const userId = localStorage.getItem("Id");
//         if (!userId) {
//           console.error("No user ID found");
//           return;
//         }

//         // Fetch both conversations and groups
//         const [conversationsResponse, groupsResponse] = await Promise.all([
//           axios.get(`${BACKEND_URL}/conversations/${userId}`),
//           axios.get(`${BACKEND_URL}/groups/${userId}`)
//         ]);

//         const conversations = conversationsResponse.data.map((conversation: Conversation) => {
//           const otherUser = parseInt(userId) === conversation.User1.id ? conversation.User2 : conversation.User1;
//           return {
//             id: conversation.id,
//             name: otherUser.name || otherUser.email,
//             imageUrl: "https://via.placeholder.com/48",
//             lastMessage: conversation.messages[0]?.content || "No messages yet",
//             lastActive: conversation.messages[0]?.createdAt
//               ? new Date(conversation.messages[0].createdAt).toLocaleDateString("en-US", {
//                   month: "short",
//                   day: "numeric",
//                 })
//               : "No date",
//             isGroup: false,
//           };
//         });

//         const groups = groupsResponse.data.map((group: GroupResponse) => ({
//           id: group.id,
//           name: group.name,
//           imageUrl: "https://via.placeholder.com/48",
//           lastMessage: group.messages?.[0]?.content || "No messages yet",
//           lastActive: group.messages?.[0]?.createdAt
//             ? new Date(group.messages[0].createdAt).toLocaleDateString("en-US", {
//                 month: "short",
//                 day: "numeric",
//               })
//             : "No date",
//           isGroup: true,
//           members: group.groupMemberships?.map(member => ({
//             id: member.user.id,
//             name: member.user.name
//           }))
//         }));

//         setFriends([...conversations, ...groups]);
//       } catch (error) {
//         console.error("Failed to fetch friends and groups", error);
//       }
//     };

//     fetchFriends();
//   }, []); // This effect runs only once when component mounts

//   // Add a new effect to handle friend list updates
//   useEffect(() => {
//     const updateInterval = setInterval(() => {
//       const fetchLatestMessages = async () => {
//         try {
//           const userId = localStorage.getItem("Id");
//           if (!userId) return;

//           const [conversationsResponse, groupsResponse] = await Promise.all([
//             axios.get(`${BACKEND_URL}/conversations/${userId}`),
//             axios.get(`${BACKEND_URL}/groups/${userId}`)
//           ]);

//           setFriends(prevFriends => {
//             const updatedFriends = [...prevFriends];
            
//             // Update conversations
//             conversationsResponse.data.forEach((conv: Conversation) => {
//               const index = updatedFriends.findIndex(f => f.id === conv.id && !f.isGroup);
//               if (index !== -1) {
//                 updatedFriends[index] = {
//                   ...updatedFriends[index],
//                   lastMessage: conv.messages[0]?.content || "No messages yet",
//                   lastActive: conv.messages[0]?.createdAt
//                     ? new Date(conv.messages[0].createdAt).toLocaleDateString("en-US", {
//                         month: "short",
//                         day: "numeric",
//                       })
//                     : "No date"
//                 };
//               }
//             });

//             // Update groups
//             groupsResponse.data.forEach((group: GroupResponse) => {
//               const index = updatedFriends.findIndex(f => f.id === group.id && f.isGroup);
//               if (index !== -1) {
//                 updatedFriends[index] = {
//                   ...updatedFriends[index],
//                   lastMessage: group.messages?.[0]?.content || "No messages yet",
//                   lastActive: group.messages?.[0]?.createdAt
//                     ? new Date(group.messages[0].createdAt).toLocaleDateString("en-US", {
//                         month: "short",
//                         day: "numeric",
//                       })
//                     : "No date"
//                 };
//               }
//             });

//             return updatedFriends;
//           });
//         } catch (error) {
//           console.error("Failed to fetch latest messages:", error);
//         }
//       };

//       fetchLatestMessages();
//     }, 5000); // Update every 5 seconds

//     return () => clearInterval(updateInterval);
//   }, []);

//   const handleFriendClick = async (friend: Friend) => {
//     setSelectedFriend(friend);
//     try {
//       const userId = localStorage.getItem("Id");
//       const endpoint = friend.isGroup 
//         ? `${BACKEND_URL}/groups/${friend.id}/messages`
//         : `${BACKEND_URL}/messages/${friend.id}?userId=${userId}`;
      
//       const response = await axios.get(endpoint);
//       console.log("Message response:", response.data);

//       const formattedMessages = response.data.map((msg: MessageResponse) => {
//         if (!msg) return null;

//         const isCurrentUser = msg.senderId === parseInt(userId || "0");
//         const senderName = friend.isGroup
//           ? (msg.sender?.name || msg.sender?.email || "Unknown")
//           : (isCurrentUser ? "You" : friend.name);

//         return {
//           content: msg.content || "",
//           sender: senderName,
//           timestamp: (msg.createdAt || msg.sentAt) 
//             ? new Date(msg.createdAt || msg.sentAt || "").toLocaleTimeString() 
//             : "",
//           type: isCurrentUser ? "you" : "other"
//         };
//       }).filter(Boolean);

//       setMessages(formattedMessages);

//       // Join the conversation room
//       socketRef.current?.emit("join_conversation", {
//         conversationId: friend.id,
//         isGroup: friend.isGroup
//       });
//     } catch (error) {
//       console.error("Failed to fetch messages", error);
//       setMessages([]);
//     }

//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   };

//   const handleSendMessage = async () => {
//     if (newMessage.trim() && selectedFriend) {
//       const userId = parseInt(localStorage.getItem("Id") || "0");
//       const messageToSend = selectedFriend.isGroup 
//         ? {
//             groupId: selectedFriend.id,
//             senderId: userId,
//             content: newMessage,
//             sender: {
//               id: userId,
//               name: localStorage.getItem("name") || "Unknown"
//             }
//           }
//         : {
//             conversationId: selectedFriend.id,
//             senderId: userId,
//             content: newMessage,
//             attachmentUrl: null
//           };

//       try {
//         const endpoint = selectedFriend.isGroup 
//           ? `${BACKEND_URL}/groups/${selectedFriend.id}/messages`
//           : `${BACKEND_URL}/messages/send`;

//         const response = await axios.post(endpoint, messageToSend);
//         const sentMessage = response.data;

//         // Add message to UI immediately
//         const formattedMessage: Message = {
//           content: newMessage,
//           sender: "You",
//           timestamp: new Date().toLocaleTimeString(),
//           type: "you"
//         };
//         setMessages(prev => [...prev, formattedMessage]);

//         // Update the friends list with the new message
//         updateFriendWithNewMessage({
//           content: newMessage,
//           conversationId: selectedFriend.id,
//           createdAt: new Date().toISOString()
//         });

//         // Emit the socket event
//         if (selectedFriend.isGroup) {
//           socketRef.current?.emit("send_group_message", {
//             ...sentMessage,
//             groupId: selectedFriend.id,
//             conversationId: selectedFriend.id,
//             isGroup: true,
//             sender: {
//               id: userId,
//               name: localStorage.getItem("name") || "Unknown"
//             }
//           });
//         } else {
//           socketRef.current?.emit("send_message", {
//             ...sentMessage,
//             conversationId: selectedFriend.id,
//             isGroup: false,
//             sender: {
//               id: userId,
//               name: localStorage.getItem("name") || "Unknown"
//             }
//           });
//         }

//         setNewMessage("");

//         // Scroll to the bottom after sending a message
//         setTimeout(() => {
//           if (chatContainerRef.current) {
//             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//           }
//         }, 0);
//       } catch (error) {
//         console.error("Failed to send message:", error);
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center bg-white min-h-screen">
//       <TopNavbar />
//       <div className="container max-w-7xl shadow-xl rounded-lg mt-12 overflow-hidden flex h-[87vh] bg-white">
//         {/* Sidebar */}
//         <div className="w-1/3 border-r border-gray-200 flex flex-col">
//           <div className="p-4 border-b bg-gray-50">
//             <input
//               type="text"
//               placeholder="Search chats..."
//               className="w-full p-2 border border-gray-300 rounded-full focus:outline-none"
//             />
//           </div>
//           <div className="flex-1 overflow-y-auto">
//             {friends.map((friend) => (
//               <div
//                 key={friend.id}
//                 className={`flex items-center p-4 cursor-pointer ${
//                   selectedFriend?.id === friend.id
//                     ? "bg-blue-100"
//                     : "hover:bg-gray-50"
//                 }`}
//                 onClick={() => handleFriendClick(friend)}
//               >
//                 <img
//                   src={friend.imageUrl}
//                   alt={friend.name}
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div className="ml-4">
//                   <p className="font-semibold">
//                     {friend.name} {friend.isGroup && <span>(Group)</span>}
//                   </p>
//                   <p className="text-sm text-gray-500 truncate">
//                     {friend.lastMessage}
//                   </p>
//                 </div>
//                 <p className="text-sm text-gray-400 ml-auto">
//                   {friend.lastActive}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* Chat Area */}
//         <div className="w-2/3 flex flex-col">
//           {selectedFriend ? (
//             <>
//               <div className="flex items-center p-4 border-b bg-gray-50">
//                 <img
//                   src={selectedFriend.imageUrl}
//                   alt={selectedFriend.name}
//                   className="w-10 h-10 rounded-full"
//                 />
//                 <div className="ml-4">
//                   <p className="font-semibold">
//                     {selectedFriend.name} {selectedFriend.isGroup && <span>(Group)</span>}
//                   </p>
//                   <p className="text-sm text-gray-500">Online</p>
//                 </div>
//                 <button className="ml-auto">
//                   <FaEllipsisV className="text-gray-500" />
//                 </button>
//               </div>
//               <div
//                 ref={chatContainerRef}
//                 className="flex-1 overflow-y-auto p-4 bg-gray-100"
//               >
//                 {messages.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`flex ${
//                       msg.type === "you" ? "justify-end" : "justify-start"
//                     } mb-4`}
//                   >
//                     <div
//                       className={`px-4 py-2 rounded-lg ${
//                         msg.type === "you"
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-200 text-gray-700"
//                       }`}
//                     >
//                       <p>{msg.content}</p>
//                       <p className="text-xs mt-1 text-gray-500">
//                         {msg.timestamp}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="p-4 bg-gray-50 border-t flex items-center">
//                 <input
//                   type="text"
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   placeholder="Type your message here..."
//                   className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   className="ml-2 p-2 bg-blue-500 text-white rounded-full"
//                 >
//                   <FaPaperPlane />
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="flex flex-col items-center justify-center flex-1">
//               <p className="text-gray-500">Select a chat to start messaging</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatApp;
