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





//12-02-2025 version changes

// import { Header } from "@/components/jobs/Header";
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { FaEllipsisV, FaPaperPlane, FaSearch } from "react-icons/fa";
// import { BACKEND_URL } from "@/config";
// import { io, Socket } from "socket.io-client";

// type Conversation = {
//   id: number;
//   name: string;
//   imageUrl: string;
//   lastMessage: string;
//   lastActive: string;
//   isGroup: boolean;
//   members?: { id: number; name: string }[];
//   otherUser?: {
//     id: number;
//     name: string;
//     email: string;
//   };
// };

// type Message = {
//   id?: string;
//   sender: string;
//   content: string;
//   timestamp: string;
//   type: string;
// };

// type SocketMessage = {
//   messageId?: string;
//   groupId?: number;
//   conversationId?: number;
//   content: string;
//   sentAt: string;
//   senderId?: number;
//   sender?: {
//     id: number;
//     name: string;
//     email?: string;
//   };
//   Sender?: {
//     id: number;
//     name: string;
//     email: string;
//   };
// };

// type DirectConversation = {
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
//   messages?: Array<{
//     content: string;
//     sentAt: string;
//     createdAt: string;
//   }>;
// };

// type GroupConversation = {
//   id: number;
//   name: string;
//   messages?: Array<{
//     content: string;
//     sentAt: string;
//     createdAt: string;
//   }>;
//   groupMemberships?: Array<{
//     user: {
//       id: number;
//       name: string;
//     };
//   }>;
// };

// type MessageResponse = {
//   id?: number;
//   content: string;
//   sentAt?: string;
//   createdAt?: string;
//   senderId: number;
//   sender?: {
//     id?: number;
//     name?: string;
//     email?: string;
//   };
//   Sender?: {
//     id?: number;
//     name?: string;
//     email?: string;
//   };
// };

// function UnifiedChat() {
//   const [conversations, setConversations] = useState<Conversation[]>([]);
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState<string>("");
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const chatContainerRef = useRef<HTMLDivElement>(null);
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     // Initialize WebSocket connection
//     const socket = io("http://localhost:3000", {
//       transports: ['websocket', 'polling'],
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//       timeout: 10000
//     });

//     socket.on('connect', () => {
//       console.log('Connected to socket server:', socket.id);
      
//       if (selectedConversation) {
//         const userId = localStorage.getItem('Id');
//         // Join the group room
//         socket.emit('join_conversation', {
//           conversationId: selectedConversation.id,
//           isGroup: selectedConversation.isGroup,
//           userId: userId ? parseInt(userId) : undefined
//         });
//       }
//     });

//     socket.on('connect_error', (error) => {
//       console.error('Socket connection error:', error);
//     });

//     socket.on('disconnect', (reason) => {
//       console.log('Disconnected from socket server:', reason);
//     });

//     socketRef.current = socket;

//     // Handle receiving a new group message
//     socket.on("new_group_message", (data: SocketMessage) => {
//       const userId = localStorage.getItem('Id');
//       const currentUserId = userId ? parseInt(userId) : 0;
      
//       // Skip if this is our own message (we already added it when sending)
//       if (data.senderId === currentUserId) {
//         console.log('Skipping own message');
//         return;
//       }

//       // Get sender name from the message data
//       let senderName;
//       if (data.sender?.name) {
//         senderName = data.sender.name;
//       } else if (data.Sender?.name) {
//         senderName = data.Sender.name;
//       } else if (selectedConversation?.members) {
//         const member = selectedConversation.members.find(m => m.id === data.senderId);
//         if (member) {
//           senderName = member.name;
//         }
//       }

//       if (!senderName) {
//         console.error('Could not find sender name. Data:', {
//           sender: data.sender,
//           Sender: data.Sender,
//           senderId: data.senderId,
//           groupMembers: selectedConversation?.members
//         });
//         return; // Don't add the message if we can't determine the sender
//       }

//       // Format the dates
//       const messageDate = data.sentAt ? new Date(data.sentAt) : new Date();
//       const lastActiveDate = messageDate.toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//       });
//       const messageTime = messageDate.toLocaleTimeString('en-US', {
//         hour: '2-digit',
//         minute: '2-digit'
//       });

//       // Update the groups list with the new message
//       setConversations(prev => prev.map(group => {
//         if (group.id === data.groupId) {
//           return {
//             ...group,
//             lastMessage: `${senderName}: ${data.content}`,
//             lastActive: lastActiveDate
//           };
//         }
//         return group;
//       }));

//       // Only add the message if it's from the current group
//       if (data.groupId === selectedConversation?.id) {
//         const formattedMessage = {
//           id: data.messageId || `${Date.now()}-${Math.random()}`,
//           sender: senderName,
//           content: data.content || "",
//           timestamp: messageTime,
//           type: "other",
//         };

//         // Check if message already exists to prevent duplicates
//         setMessages(prev => {
//           const messageExists = prev.some(msg => msg.id === formattedMessage.id);
//           if (messageExists) {
//             return prev;
//           }
//           return [...prev, formattedMessage];
//         });

//         // Scroll to the bottom on receiving a new message
//         setTimeout(() => {
//           if (chatContainerRef.current) {
//             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//           }
//         }, 0);
//       }
//     });

//     // Handle user joined/left events
//     socket.on('user_joined', (data) => {
//       console.log('User joined:', data);
//     });

//     socket.on('user_left', (data) => {
//       console.log('User left:', data);
//     });

//     // Handle receiving a new message
//     socket.on("new_message", (data: SocketMessage) => {
//       console.log('📨 Received new message:', data);
//       const userId = parseInt(localStorage.getItem("Id") || "0");
      
//       // Skip if this is our own message (we already added it when sending)
//       if (data.senderId === userId) {
//         console.log('Skipping own message');
//         return;
//       }

//       // Add message to UI if it's for the current conversation
//       if (selectedConversation && data.conversationId === selectedConversation.id && !selectedConversation.isGroup) {
//         const formattedMessage: Message = {
//           id: data.messageId?.toString() || `temp-${Date.now()}`,
//           content: data.content,
//           sender: selectedConversation.name,
//           timestamp: new Date().toLocaleTimeString('en-US', {
//             hour: '2-digit',
//             minute: '2-digit'
//           }),
//           type: "other"
//         };

//         setMessages(prevMessages => {
//           // Check if message already exists
//           const messageExists = prevMessages.some(msg => msg.id === formattedMessage.id);
//           if (messageExists) {
//             return prevMessages;
//           }
//           return [...prevMessages, formattedMessage];
//         });

//         // Scroll to bottom
//         setTimeout(() => {
//           if (chatContainerRef.current) {
//             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//           }
//         }, 100);
//       }

//       // Update conversations list
//       setConversations(prev => prev.map(conv => {
//         if (conv.id === data.conversationId && !conv.isGroup) {
//           return {
//             ...conv,
//             lastMessage: data.content,
//             lastActive: new Date().toLocaleDateString("en-US", {
//               month: "short",
//               day: "numeric",
//             })
//           };
//         }
//         return conv;
//       }));
//     });

//     return () => {
//       // Cleanup WebSocket connection
//       socket.off('connect');
//       socket.off('disconnect');
//       socket.off('connect_error');
//       socket.off('new_group_message');
//       socket.off('user_joined');
//       socket.off('user_left');
//       socket.off('new_message');
//       socket.disconnect();
//     };
//   }, [selectedConversation]);

//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         const userId = localStorage.getItem("Id");
//         if (!userId) return;

//         // Fetch both direct conversations and groups in parallel
//         const [directResponse, groupResponse] = await Promise.all([
//           axios.get(`${BACKEND_URL}/conversations/${userId}`),
//           axios.get(`${BACKEND_URL}/groups/${userId}`)
//         ]);

//         // Format direct conversations
//         const directChats = directResponse.data.map((conv: DirectConversation) => {
//           const otherUser = conv.User1.id === parseInt(userId) ? conv.User2 : conv.User1;
//           const lastMessage = conv.messages?.[0];
//           const lastMessageDate = lastMessage?.sentAt || lastMessage?.createdAt;

//           return {
//             id: conv.id,
//             name: otherUser.name || otherUser.email,
//             imageUrl: "https://via.placeholder.com/48",
//             lastMessage: lastMessage?.content || "No messages yet",
//             lastActive: lastMessageDate 
//               ? new Date(lastMessageDate).toLocaleDateString("en-US", {
//                   month: "short",
//                   day: "numeric",
//                 })
//               : new Date().toLocaleDateString("en-US", {
//                   month: "short",
//                   day: "numeric",
//                 }),
//             isGroup: false,
//             otherUser: otherUser
//           };
//         });

//         // Format group conversations
//         const groupChats = groupResponse.data.map((group: GroupConversation) => {
//           const lastMessage = group.messages?.[0];
//           const lastMessageDate = lastMessage?.sentAt || lastMessage?.createdAt;

//           return {
//             id: group.id,
//             name: group.name,
//             imageUrl: "https://via.placeholder.com/48",
//             lastMessage: lastMessage?.content || "No messages yet",
//             lastActive: lastMessageDate
//               ? new Date(lastMessageDate).toLocaleDateString("en-US", {
//                   month: "short",
//                   day: "numeric",
//                 })
//               : new Date().toLocaleDateString("en-US", {
//                   month: "short",
//                   day: "numeric",
//                 }),
//             isGroup: true,
//             members: group.groupMemberships?.map(membership => ({
//               id: membership.user.id,
//               name: membership.user.name
//             }))
//           };
//         });

//         // Combine and sort all conversations by last active date
//         const allConversations = [...directChats, ...groupChats].sort((a, b) => {
//           const dateA = new Date(a.lastActive).getTime();
//           const dateB = new Date(b.lastActive).getTime();
//           return dateB - dateA;
//         });

//         setConversations(allConversations);
//       } catch (error) {
//         console.error("Failed to fetch conversations", error);
//         setConversations([]);
//       }
//     };

//     fetchConversations();

//     // Set up periodic refresh every 3 seconds
//     const intervalId = setInterval(fetchConversations, 3000);

//     // Cleanup interval on unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   const handleConversationClick = async (conversation: Conversation) => {
//     setSelectedConversation(conversation);
//     setMessages([]); // Clear messages immediately when switching conversations
    
//     // Join the conversation room
//     if (socketRef.current) {
//       const userId = localStorage.getItem("Id");
//       socketRef.current.emit('join_conversation', {
//         conversationId: conversation.id,
//         isGroup: conversation.isGroup,
//         userId: parseInt(userId || '0')
//       });
//     }
//   };

//   // Fetch messages whenever selected conversation changes
//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (!selectedConversation) return;

//       try {
//         const userId = localStorage.getItem("Id");
//         const endpoint = selectedConversation.isGroup
//           ? `${BACKEND_URL}/groups/${selectedConversation.id}/messages`
//           : `${BACKEND_URL}/messages/${selectedConversation.id}?userId=${userId}`;
        
//         const response = await axios.get(endpoint);

//         // If no messages, retry after a short delay
//         if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
//           console.log('No messages found or invalid response, retrying in 1 second...');
//           setTimeout(fetchMessages, 1000);
//           return;
//         }

//         const formattedMessages = response.data.map((msg: MessageResponse) => {
//           const isCurrentUser = msg.senderId === parseInt(userId || '0');
//           let senderName;

//           if (isCurrentUser) {
//             senderName = "You";
//           } else if (selectedConversation.isGroup) {
//             senderName = msg.sender?.name || msg.Sender?.name || "Other User";
//           } else {
//             senderName = selectedConversation.name;
//           }

//           const timestamp = new Date(msg.sentAt || msg.createdAt || Date.now()).toLocaleTimeString('en-US', {
//             hour: '2-digit',
//             minute: '2-digit'
//           });

//           return {
//             id: msg.id?.toString() || `temp-${Date.now()}`,
//             sender: senderName,
//             content: msg.content,
//             timestamp: timestamp,
//             type: isCurrentUser ? "self" : "other"
//           };
//         });

//         // Only update messages if they're different from current messages
//         setMessages(prevMessages => {
//           const isDifferent = JSON.stringify(prevMessages) !== JSON.stringify(formattedMessages);
//           return isDifferent ? formattedMessages : prevMessages;
//         });

//         // Scroll to bottom after loading messages
//         setTimeout(() => {
//           if (chatContainerRef.current) {
//             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//           }
//         }, 100);
//       } catch (error) {
//         console.error("Failed to fetch messages:", error);
//         setTimeout(fetchMessages, 2000);
//       }
//     };

//     fetchMessages();
//     const refreshInterval = setInterval(fetchMessages, 10000);

//     return () => {
//       clearInterval(refreshInterval);
//     };
//   }, [selectedConversation]);

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation) return;

//     const currentUserId = localStorage.getItem("Id");
//     if (!currentUserId) return;

//     try {
//       const messageData = {
//         content: newMessage.trim(),
//         senderId: parseInt(currentUserId),
//         ...(selectedConversation.isGroup 
//           ? { groupId: selectedConversation.id }
//           : { conversationId: selectedConversation.id }
//         )
//       };

//       // Add message to UI immediately
//       const formattedMessage: Message = {
//         id: `temp-${Date.now()}`,
//         sender: "You",
//         content: newMessage,
//         timestamp: new Date().toLocaleTimeString('en-US', {
//           hour: '2-digit',
//           minute: '2-digit'
//         }),
//         type: "self"
//       };

//       setMessages(prev => [...prev, formattedMessage]);
//       setNewMessage("");

//       // Send message through appropriate endpoint
//       const endpoint = selectedConversation.isGroup
//         ? `${BACKEND_URL}/groups/${selectedConversation.id}/messages`
//         : `${BACKEND_URL}/messages/send`;
      
//       const response = await axios.post(endpoint, messageData);
//       console.log('Server response:', response.data);

//       // Update conversations list with new message
//       setConversations(prev => prev.map(conv => {
//         if (conv.id === selectedConversation.id) {
//           return {
//             ...conv,
//             lastMessage: `You: ${newMessage}`,
//             lastActive: new Date().toLocaleDateString("en-US", {
//               month: "short",
//               day: "numeric",
//             })
//           };
//         }
//         return conv;
//       }));

//       // Emit socket event
//       const socketEvent = selectedConversation.isGroup ? "send_group_message" : "send_message";
//       socketRef.current?.emit(socketEvent, {
//         messageId: `temp-${Date.now()}`,
//         groupId: selectedConversation.isGroup ? selectedConversation.id : undefined,
//         conversationId: !selectedConversation.isGroup ? selectedConversation.id : undefined,
//         senderId: parseInt(currentUserId),
//         content: newMessage,
//         sentAt: new Date().toISOString(),
//         sender: { name: "You" }
//       });

//     } catch (error) {
//       console.error('Failed to send message:', error);
//       setMessages(prev => prev.filter(msg => msg.id !== `temp-${Date.now()}`));
//     }
//   };

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     // Implement search functionality here
//   };

//   const handleNotification = () => {
//     // Handle notification click
//   };

//   const handleMessage = () => {
//     // Handle message click
//   };

//   const handleProfile = () => {
//     // Handle profile click
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Header
//         onNotification={handleNotification}
//         onMessage={handleMessage}
//         onProfile={handleProfile}
//         onSearch={handleSearch}
//       />
      
//       <div className="max-w-[1200px] mx-auto px-8 py-2  font-fontsm">
//       <div className="px-6 pt-6 pb-2 bg-white rounded-t-xl border border-x-gray-150  border-t-gray-150  ">
//               <h1 className="text-xl font-semibold border-b pb-2 border-fillc text-maincl ">Messages</h1>
//             </div>
//         <div className="bg-white rounded-b-xl shadow-sm flex h-[calc(100vh-180px)]">
//           {/* Left Sidebar */}
//           <div className="w-[320px] border-r border-gray-200 flex flex-col rounded-l-xl">
//             {/* Messages Header */}
           
              
//             {/* Search Bar */}
//             <div className="px-6 pb-4 ">
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search..."
//                   className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
//                 />
//                 <FaSearch className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
//               </div>
//             </div>

//             {/* Tabs */}
//             <div className="px-6 pb-4">
//               <div className="flex space-x-4">
//                 <button className="text-sm font-medium text-gray-500 hover:text-gray-900">
//                   All
//                 </button>
//                 <button className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
//                   Unread
//                 </button>
//                 <button className="text-sm font-medium text-gray-500 hover:text-gray-900">
//                   Communities
//                 </button>
//                 <button className="text-sm font-medium text-gray-500 hover:text-gray-900">
//                   Drafts
//                 </button>
//               </div>
//             </div>

//             {/* Conversations List */}
//             <div className="flex-1 overflow-y-auto">
//               {conversations.map((conversation) => (
//                 <div
//                   key={conversation.id}
//                   onClick={() => handleConversationClick(conversation)}
//                   className={`flex items-center px-6 py-3 cursor-pointer ${
//                     selectedConversation?.id === conversation.id
//                       ? "bg-blue-50"
//                       : "hover:bg-gray-50"
//                   }`}
//                 >
//                   <img
//                     src={conversation.imageUrl || "/default-avatar.png"}
//                     alt={conversation.name}
//                     className="w-12 h-12 rounded-full object-cover flex-shrink-0"
//                   />
//                   <div className="ml-3 flex-1 min-w-0">
//                     <div className="flex justify-between items-center">
//                       <h3 className="font-medium text-gray-900 truncate">
//                         {conversation.name}
//                         {conversation.isGroup && <span className="text-sm text-gray-500 ml-1">(Group)</span>}
//                       </h3>
//                       <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{conversation.lastActive}</span>
//                     </div>
//                     <p className="text-sm text-gray-500 truncate mt-0.5">{conversation.lastMessage}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Main Chat Area */}
//           <div className="flex-1 flex flex-col bg-gray-50 rounded-r-xl">
//             {selectedConversation ? (
//               <>
//                 {/* Chat Header */}
//                 <div className="h-[72px] px-6 border-b bg-white flex items-center justify-between rounded-tr-xl">
//                   <div className="flex items-center">
//                     <img
//                       src={selectedConversation.imageUrl || "/default-avatar.png"}
//                       alt={selectedConversation.name}
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                     <div className="ml-3">
//                       <h2 className="font-medium text-gray-900">
//                         {selectedConversation.name}
//                         {selectedConversation.isGroup && <span className="text-sm text-gray-500 ml-1">(Group)</span>}
//                       </h2>
//                       <p className="text-sm text-gray-500">
//                         {selectedConversation.isGroup 
//                           ? `${selectedConversation.members?.length || 0} members`
//                           : "Active now"
//                         }
//                       </p>
//                     </div>
//                   </div>
//                   <button className="p-2 hover:bg-gray-100 rounded-full">
//                     <FaEllipsisV className="text-gray-600 w-4 h-4" />
//                   </button>
//                 </div>

//                 {/* Messages Container */}
//                 <div
//                   ref={chatContainerRef}
//                   className="flex-1 overflow-y-auto p-6 space-y-4"
//                 >
//                   {messages.map((message, index) => (
//                     <div
//                       key={message.id || index}
//                       className={`flex ${
//                         message.type === "self" ? "justify-end" : "justify-start"
//                       }`}
//                     >
//                       <div
//                         className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
//                           message.type === "self"
//                             ? "bg-blue-600 text-white"
//                             : "bg-white text-gray-900 shadow-sm"
//                         }`}
//                       >
//                         {message.type !== "self" && (
//                           <p className="text-sm font-medium text-gray-900 mb-1">
//                             {message.sender}
//                           </p>
//                         )}
//                         <p className="text-sm">{message.content}</p>
//                         <p className="text-[11px] mt-1 opacity-70">
//                           {message.timestamp}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Message Input */}
//                 <div className="px-6 py-4 bg-white border-t rounded-br-xl">
//                   <div className="flex items-center">
//                     <input
//                       type="text"
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                       placeholder="Type your message here..."
//                       className="flex-1 py-2.5 px-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
//                     />
//                     <button
//                       onClick={handleSendMessage}
//                       disabled={!newMessage.trim()}
//                       className="ml-2 p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
//                     >
//                       <FaPaperPlane className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <div className="flex-1 flex items-center justify-center">
//                 <p className="text-gray-500">Select a conversation to start messaging</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UnifiedChat;

