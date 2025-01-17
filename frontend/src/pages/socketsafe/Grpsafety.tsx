import TopNavbar from "@/components/TopNavbar";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaEllipsisV, FaPaperPlane } from "react-icons/fa";
import { BACKEND_URL } from "@/config";
import { io, Socket } from "socket.io-client";

type Group = {
  id: number;
  name: string;
  imageUrl: string;
  lastMessage: string;
  lastActive: string;
  members: { id: number; name: string }[];
};

type Message = {
  id?: string;
  sender: string;
  content: string;
  timestamp: string;
  type: string;
};

type SocketMessage = {
  messageId?: string;
  groupId: number;
  content: string;
  sentAt: string;
  senderId?: number;
  sender?: {
    id: number;
    name: string;
    email?: string;
  };
  Sender?: {
    id: number;
    name: string;
    email: string;
  };
};

type GroupResponse = {
  id: number;
  name: string;
  messages: {
    content: string;
    sentAt: string;
    sender: {
      id: number;
      name: string;
    };
  }[];
  groupMemberships: {
    user: {
      id: number;
      name: string;
    };
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
    email?: string;
  };
  Sender?: {
    id?: number;
    name?: string;
    email?: string;
  };
};

type User = {
  id: number;
  name: string;
  email: string;
};

function GroupChat() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userId = localStorage.getItem("Id");
        if (!userId) return;
        
        const response = await axios.get(`${BACKEND_URL}/users/${userId}`);
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchCurrentUser();
  }, []);

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
      
      if (selectedGroup) {
        const userId = localStorage.getItem('Id');
        // Join the group room
        socket.emit('join_conversation', {
          conversationId: selectedGroup.id,
          isGroup: true,
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

    // Handle receiving a new group message
    socket.on("new_group_message", (data: SocketMessage) => {
      const userId = localStorage.getItem('Id');
      const currentUserId = userId ? parseInt(userId) : 0;
      
      // Skip if this is our own message (we already added it when sending)
      if (data.senderId === currentUserId) {
        console.log('Skipping own message');
        return;
      }

      // Get sender name from the message data
      let senderName;
      if (data.sender?.name) {
        senderName = data.sender.name;
      } else if (data.Sender?.name) {
        senderName = data.Sender.name;
      } else if (selectedGroup?.members) {
        const member = selectedGroup.members.find(m => m.id === data.senderId);
        if (member) {
          senderName = member.name;
        }
      }

      if (!senderName) {
        console.error('Could not find sender name. Data:', {
          sender: data.sender,
          Sender: data.Sender,
          senderId: data.senderId,
          groupMembers: selectedGroup?.members
        });
        return; // Don't add the message if we can't determine the sender
      }

      // Format the dates
      const messageDate = data.sentAt ? new Date(data.sentAt) : new Date();
      const lastActiveDate = messageDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const messageTime = messageDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });

      // Update the groups list with the new message
      setGroups(prev => prev.map(group => {
        if (group.id === data.groupId) {
          return {
            ...group,
            lastMessage: `${senderName}: ${data.content}`,
            lastActive: lastActiveDate
          };
        }
        return group;
      }));

      // Only add the message if it's from the current group
      if (data.groupId === selectedGroup?.id) {
        const formattedMessage = {
          id: data.messageId || `${Date.now()}-${Math.random()}`,
          sender: senderName,
          content: data.content || "",
          timestamp: messageTime,
          type: "other",
        };

        // Check if message already exists to prevent duplicates
        setMessages(prev => {
          const messageExists = prev.some(msg => msg.id === formattedMessage.id);
          if (messageExists) {
            return prev;
          }
          return [...prev, formattedMessage];
        });

        // Scroll to the bottom on receiving a new message
        setTimeout(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        }, 0);
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
      socket.off('new_group_message');
      socket.off('user_joined');
      socket.off('user_left');
      socket.disconnect();
    };
  }, [selectedGroup]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const userId = localStorage.getItem("Id");
        const response = await axios.get(`${BACKEND_URL}/groups/${userId}`);
        console.log('Groups response:', response.data); // Debug log

        if (!response.data || !Array.isArray(response.data)) {
          console.error('Invalid groups data received:', response.data);
          setGroups([]);
          return;
        }

        const formattedGroups = response.data
          .filter((group: GroupResponse | null): group is GroupResponse => !!group)
          .map((group: GroupResponse) => ({
            id: group.id,
            name: group.name,
            imageUrl: "https://via.placeholder.com/48",
            lastMessage: group.messages?.[group.messages.length - 1]?.content || "No messages yet",
            lastActive: group.messages?.[group.messages.length - 1]?.sentAt
              ? new Date(group.messages[group.messages.length - 1].sentAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : "No date",
            members: group.groupMemberships?.map(membership => ({
              id: membership.user.id,
              name: membership.user.name
            })) || []
          }));

        setGroups(formattedGroups);
      } catch (error) {
        console.error("Failed to fetch groups", error);
        setGroups([]); // Set empty array on error
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedGroup) {
        try {
          const response = await axios.get(`${BACKEND_URL}/groups/${selectedGroup.id}/messages`);
          console.log('Fetched messages:', response.data);
          const userId = localStorage.getItem("Id");
          const formattedMessages = response.data.map((msg: MessageResponse) => {
            // Check if the message is from the current user
            const isCurrentUser = msg.sender?.id === parseInt(userId || '0') || 
                                msg.Sender?.id === parseInt(userId || '0');
            
            // Get sender name with proper fallback
            let senderName;
            if (isCurrentUser) {
              senderName = "You";
            } else {
              // First try to get name from the message sender
              senderName = msg.sender?.name || msg.Sender?.name;
              
              // If no name in message, try to find in group members
              if (!senderName) {
                const senderId = msg.sender?.id || msg.Sender?.id;
                const member = selectedGroup.members.find(m => m.id === senderId);
                if (member?.name) {
                  senderName = member.name;
                } else {
                  senderName = "Other User"; // Only use fallback if we couldn't find the name
                }
              }
            }

            // Format the timestamp
            const messageDate = msg.sentAt ? new Date(msg.sentAt) : new Date();
            const timestamp = messageDate.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            });

            return {
              sender: senderName,
              content: msg.content,
              timestamp: timestamp,
              type: isCurrentUser ? "you" : "other",
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
  }, [selectedGroup]);

  const handleGroupClick = async (group: Group) => {
    setSelectedGroup(group);
  };

  const handleSendMessage = async () => {
    if (!currentUser) {
      console.error('User information not available');
      return;
    }

    if (newMessage.trim() && selectedGroup) {
      const messageId = `temp-${Date.now()}`; // Generate a temporary ID for deduplication
      
      // Format the message payload according to server expectations
      const messageToSend = {
        content: newMessage.trim(),
        senderId: parseInt(localStorage.getItem("Id") || "0"),
        groupId: selectedGroup.id
      };

      try {
        // Send message to server first
        console.log('Sending message:', messageToSend);
        const response = await axios.post(`${BACKEND_URL}/groups/${selectedGroup.id}/messages`, messageToSend);
        const sentMessage = response.data;
        console.log('Server response:', sentMessage);

        // Add message to UI immediately for better UX
        const formattedMessage: Message = {
          id: sentMessage.id?.toString() || messageId,
          sender: "You",
          content: newMessage,
          timestamp: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          type: "you",
        };
        setMessages(prev => [...prev, formattedMessage]);
        setNewMessage("");

        // Update the groups list with the new message
        setGroups(prev => prev.map(group => {
          if (group.id === selectedGroup.id) {
            return {
              ...group,
              lastMessage: `You: ${newMessage}`,
              lastActive: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            };
          }
          return group;
        }));

        // Emit the socket event with the server response data
        socketRef.current?.emit("send_group_message", {
          messageId: sentMessage.id,
          groupId: selectedGroup.id,
          senderId: parseInt(localStorage.getItem("Id") || "0"),
          content: newMessage,
          sentAt: new Date().toISOString(),
          sender: sentMessage.sender
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
        setMessages(prev => prev.filter(msg => msg.id !== messageId));
        // Show the error message from the server if available
        if (axios.isAxiosError(error) && error.response) {
          console.error('Server error:', error.response.data);
        }
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
              placeholder="Search groups..."
              className="w-full p-2 border border-gray-300 rounded-full focus:outline-none"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {groups.map((group) => (
              <div
                key={group.id}
                className={`flex items-center p-4 cursor-pointer ${
                  selectedGroup?.id === group.id
                    ? "bg-blue-100"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleGroupClick(group)}
              >
                <img
                  src={group.imageUrl}
                  alt={group.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <p className="font-semibold">{group.name}</p>
                  <p className="text-sm text-gray-500 truncate">
                    {group.lastMessage}
                  </p>
                </div>
                <p className="text-sm text-gray-400 ml-auto">
                  {group.lastActive}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Chat Area */}
        <div className="w-2/3 flex flex-col">
          {selectedGroup ? (
            <>
              <div className="flex items-center p-4 border-b bg-gray-50">
                <img
                  src={selectedGroup.imageUrl}
                  alt={selectedGroup.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-4">
                  <p className="font-semibold">{selectedGroup.name}</p>
                  <p className="text-sm text-gray-500">
                    {selectedGroup.members.length} members
                  </p>
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
                      {msg.type !== "you" && (
                        <p className="text-xs font-semibold mb-1">{msg.sender}</p>
                      )}
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
              <p className="text-gray-500">Select a group to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GroupChat; 








// import TopNavbar from "@/components/TopNavbar";
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { FaEllipsisV, FaPaperPlane } from "react-icons/fa";
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

// type User = {
//   id: number;
//   name: string;
//   email: string;
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
//   }>;
// };

// type GroupConversation = {
//   id: number;
//   name: string;
//   messages?: Array<{
//     content: string;
//     sentAt: string;
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
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const chatContainerRef = useRef<HTMLDivElement>(null);
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const userId = localStorage.getItem("Id");
//         if (!userId) return;
        
//         const response = await axios.get(`${BACKEND_URL}/users/${userId}`);
//         setCurrentUser(response.data);
//       } catch (error) {
//         console.error("Failed to fetch user info:", error);
//       }
//     };

//     fetchCurrentUser();
//   }, []);

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
//           return {
//             id: conv.id,
//             name: otherUser.name || otherUser.email,
//             imageUrl: "https://via.placeholder.com/48",
//             lastMessage: conv.messages?.[0]?.content || "No messages yet",
//             lastActive: conv.messages?.[0]?.sentAt 
//               ? new Date(conv.messages[0].sentAt).toLocaleDateString("en-US", {
//                   month: "short",
//                   day: "numeric",
//                 })
//               : "No date",
//             isGroup: false,
//             otherUser: otherUser
//           };
//         });

//         // Format group conversations
//         const groupChats = groupResponse.data.map((group: GroupConversation) => ({
//           id: group.id,
//           name: group.name,
//           imageUrl: "https://via.placeholder.com/48",
//           lastMessage: group.messages?.[0]?.content || "No messages yet",
//           lastActive: group.messages?.[0]?.sentAt
//             ? new Date(group.messages[0].sentAt).toLocaleDateString("en-US", {
//                 month: "short",
//                 day: "numeric",
//               })
//             : "No date",
//           isGroup: true,
//           members: group.groupMemberships?.map(membership => ({
//             id: membership.user.id,
//             name: membership.user.name
//           }))
//         }));

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
//   }, []);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (selectedConversation) {
//         try {
//           const response = await axios.get(`${BACKEND_URL}/groups/${selectedConversation.id}/messages`);
//           console.log('Fetched messages:', response.data);
//           const userId = localStorage.getItem("Id");
//           const formattedMessages = response.data.map((msg: MessageResponse) => {
//             // Check if the message is from the current user
//             const isCurrentUser = msg.senderId === parseInt(userId || '0');
            
//             // Get sender name with proper fallback
//             let senderName;
//             if (isCurrentUser) {
//               senderName = "You";
//             } else {
//               // First try to get name from the message sender
//               senderName = msg.sender?.name || msg.Sender?.name;
              
//               // If no name in message, try to find in group members
//               if (!senderName) {
//                 const senderId = msg.sender?.id || msg.Sender?.id;
//                 const member = selectedConversation.members?.find(m => m.id === senderId);
//                 if (member?.name) {
//                   senderName = member.name;
//                 } else {
//                   senderName = "Other User"; // Only use fallback if we couldn't find the name
//                 }
//               }
//             }

//             // Format the timestamp
//             const messageDate = msg.sentAt ? new Date(msg.sentAt) : new Date();
//             const timestamp = messageDate.toLocaleTimeString('en-US', {
//               hour: '2-digit',
//               minute: '2-digit'
//             });

//             return {
//               sender: senderName,
//               content: msg.content,
//               timestamp: timestamp,
//               type: isCurrentUser ? "you" : "other",
//             };
//           });
//           setMessages(formattedMessages);
          
//           // Scroll to bottom after loading messages
//           setTimeout(() => {
//             if (chatContainerRef.current) {
//               chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//             }
//           }, 0);
//         } catch (error) {
//           console.error("Failed to fetch messages", error);
//           setMessages([]);
//         }
//       }
//     };

//     fetchMessages();
//   }, [selectedConversation]);

//   const handleConversationClick = async (conversation: Conversation) => {
//     setSelectedConversation(conversation);
    
//     try {
//       const userId = localStorage.getItem("Id");
//       const endpoint = conversation.isGroup
//         ? `${BACKEND_URL}/groups/${conversation.id}/messages`
//         : `${BACKEND_URL}/messages/${conversation.id}?userId=${userId}`;
      
//       console.log('Fetching messages from:', endpoint);
//       const response = await axios.get(endpoint);
//       console.log('Message response:', response.data);

//       const formattedMessages = response.data.map((msg: MessageResponse) => {
//         const isCurrentUser = msg.senderId === parseInt(userId || '0');
//         let senderName;

//         if (isCurrentUser) {
//           senderName = "You";
//         } else if (conversation.isGroup) {
//           senderName = msg.sender?.name || msg.Sender?.name || "Other User";
//         } else {
//           senderName = conversation.name;
//         }

//         const timestamp = new Date(msg.sentAt || msg.createdAt || Date.now()).toLocaleTimeString('en-US', {
//           hour: '2-digit',
//           minute: '2-digit'
//         });

//         return {
//           id: msg.id?.toString(),
//           sender: senderName,
//           content: msg.content,
//           timestamp: timestamp,
//           type: isCurrentUser ? "you" : "other"
//         };
//       });

//       setMessages(formattedMessages);

//       // Join the conversation room
//       if (socketRef.current) {
//         socketRef.current.emit('join_conversation', {
//           conversationId: conversation.id,
//           isGroup: conversation.isGroup,
//           userId: parseInt(userId || '0')
//         });
//       }

//       // Scroll to bottom
//       setTimeout(() => {
//         if (chatContainerRef.current) {
//           chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//         }
//       }, 100);
//     } catch (error) {
//       console.error("Failed to fetch messages:", error);
//       setMessages([]);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!currentUser) {
//       console.error('User information not available');
//       return;
//     }

//     if (newMessage.trim() && selectedConversation) {
//       const messageId = `temp-${Date.now()}`; // Generate a temporary ID for deduplication
      
//       // Format the message payload according to server expectations
//       const messageToSend = {
//         content: newMessage.trim(),
//         senderId: parseInt(localStorage.getItem("Id") || "0"),
//         ...(selectedConversation.isGroup 
//           ? { groupId: selectedConversation.id }
//           : { conversationId: selectedConversation.id }
//         )
//       };

//       try {
//         // Send message to server first
//         console.log('Sending message:', messageToSend);
//         const endpoint = selectedConversation.isGroup
//           ? `${BACKEND_URL}/groups/${selectedConversation.id}/messages`
//           : `${BACKEND_URL}/messages/send`;
        
//         const response = await axios.post(endpoint, messageToSend);
//         const sentMessage = response.data;
//         console.log('Server response:', sentMessage);

//         // Add message to UI immediately for better UX
//         const formattedMessage: Message = {
//           id: sentMessage.id?.toString() || messageId,
//           sender: "You",
//           content: newMessage,
//           timestamp: new Date().toLocaleTimeString('en-US', {
//             hour: '2-digit',
//             minute: '2-digit'
//           }),
//           type: "you",
//         };
//         setMessages(prev => [...prev, formattedMessage]);
//         setNewMessage("");

//         // Update the conversations list with the new message
//         setConversations(prev => prev.map(conv => {
//           if (conv.id === selectedConversation.id) {
//             return {
//               ...conv,
//               lastMessage: `You: ${newMessage}`,
//               lastActive: new Date().toLocaleDateString("en-US", {
//                 month: "short",
//                 day: "numeric",
//               })
//             };
//           }
//           return conv;
//         }));

//         // Emit the socket event with the server response data
//         const socketEvent = selectedConversation.isGroup ? "send_group_message" : "send_message";
//         socketRef.current?.emit(socketEvent, {
//           messageId: sentMessage.id,
//           groupId: selectedConversation.isGroup ? selectedConversation.id : undefined,
//           conversationId: !selectedConversation.isGroup ? selectedConversation.id : undefined,
//           senderId: parseInt(localStorage.getItem("Id") || "0"),
//           content: newMessage,
//           sentAt: new Date().toISOString(),
//           sender: sentMessage.sender
//         });

//         // Scroll to the bottom after sending a message
//         setTimeout(() => {
//           if (chatContainerRef.current) {
//             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//           }
//         }, 0);
//       } catch (error) {
//         console.error("Failed to send message", error);
//         // Remove the optimistically added message on error
//         setMessages(prev => prev.filter(msg => msg.id !== messageId));
//         // Show the error message from the server if available
//         if (axios.isAxiosError(error) && error.response) {
//           console.error('Server error:', error.response.data);
//         }
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
//               placeholder="Search groups..."
//               className="w-full p-2 border border-gray-300 rounded-full focus:outline-none"
//             />
//           </div>
//           <div className="flex-1 overflow-y-auto">
//             {conversations.map((conversation) => (
//               <div
//                 key={conversation.id}
//                 className={`flex items-center p-4 cursor-pointer ${
//                   selectedConversation?.id === conversation.id
//                     ? "bg-blue-100"
//                     : "hover:bg-gray-50"
//                 }`}
//                 onClick={() => handleConversationClick(conversation)}
//               >
//                 <img
//                   src={conversation.imageUrl}
//                   alt={conversation.name}
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div className="ml-4">
//                   <p className="font-semibold">{conversation.name}</p>
//                   <p className="text-sm text-gray-500 truncate">
//                     {conversation.lastMessage}
//                   </p>
//                 </div>
//                 <p className="text-sm text-gray-400 ml-auto">
//                   {conversation.lastActive}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* Chat Area */}
//         <div className="w-2/3 flex flex-col">
//           {selectedConversation ? (
//             <>
//               <div className="flex items-center p-4 border-b bg-gray-50">
//                 <img
//                   src={selectedConversation.imageUrl}
//                   alt={selectedConversation.name}
//                   className="w-10 h-10 rounded-full"
//                 />
//                 <div className="ml-4">
//                   <p className="font-semibold">{selectedConversation.name}</p>
//                   <p className="text-sm text-gray-500">
//                     {selectedConversation.isGroup 
//                       ? `${selectedConversation.members?.length || 0} members`
//                       : 'Direct Message'}
//                   </p>
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
//                       {msg.type !== "you" && (
//                         <p className="text-xs font-semibold mb-1">{msg.sender}</p>
//                       )}
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
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter' && !e.shiftKey) {
//                       e.preventDefault();
//                       handleSendMessage();
//                     }
//                   }}
//                   placeholder="Type a message..."
//                   className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   className="ml-2 bg-blue-500 text-white p-2 rounded-full"
//                 >
//                   <FaPaperPlane />
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="flex items-center justify-center flex-1">
//               <p className="text-gray-500">Select a group to start chatting</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UnifiedChat; 