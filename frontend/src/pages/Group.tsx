import TopNavbar from "@/components/TopNavbar";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaEllipsisV, FaPaperPlane } from "react-icons/fa";
import { BACKEND_URL } from "@/config";
import { io, Socket } from "socket.io-client";

type Conversation = {
  id: number;
  name: string;
  imageUrl: string;
  lastMessage: string;
  lastActive: string;
  isGroup: boolean;
  members?: { id: number; name: string }[];
  otherUser?: {
    id: number;
    name: string;
    email: string;
  };
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
  groupId?: number;
  conversationId?: number;
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

type DirectConversation = {
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
  messages?: Array<{
    content: string;
    sentAt: string;
    createdAt: string;
  }>;
};

type GroupConversation = {
  id: number;
  name: string;
  messages?: Array<{
    content: string;
    sentAt: string;
    createdAt: string;
  }>;
  groupMemberships?: Array<{
    user: {
      id: number;
      name: string;
    };
  }>;
};

type MessageResponse = {
  id?: number;
  content: string;
  sentAt?: string;
  createdAt?: string;
  senderId: number;
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

function UnifiedChat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
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
      
      if (selectedConversation) {
        const userId = localStorage.getItem('Id');
        // Join the group room
        socket.emit('join_conversation', {
          conversationId: selectedConversation.id,
          isGroup: selectedConversation.isGroup,
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
      } else if (selectedConversation?.members) {
        const member = selectedConversation.members.find(m => m.id === data.senderId);
        if (member) {
          senderName = member.name;
        }
      }

      if (!senderName) {
        console.error('Could not find sender name. Data:', {
          sender: data.sender,
          Sender: data.Sender,
          senderId: data.senderId,
          groupMembers: selectedConversation?.members
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
      setConversations(prev => prev.map(group => {
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
      if (data.groupId === selectedConversation?.id) {
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

    // Handle receiving a new message
    socket.on("new_message", (data: SocketMessage) => {
      console.log('📨 Received new message:', data);
      const userId = parseInt(localStorage.getItem("Id") || "0");
      
      // Skip if this is our own message (we already added it when sending)
      if (data.senderId === userId) {
        console.log('Skipping own message');
        return;
      }

      // Add message to UI if it's for the current conversation
      if (selectedConversation && data.conversationId === selectedConversation.id && !selectedConversation.isGroup) {
        const formattedMessage: Message = {
          id: data.messageId?.toString() || `temp-${Date.now()}`,
          content: data.content,
          sender: selectedConversation.name,
          timestamp: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          type: "other"
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

      // Update conversations list
      setConversations(prev => prev.map(conv => {
        if (conv.id === data.conversationId && !conv.isGroup) {
          return {
            ...conv,
            lastMessage: data.content,
            lastActive: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          };
        }
        return conv;
      }));
    });

    return () => {
      // Cleanup WebSocket connection
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.off('new_group_message');
      socket.off('user_joined');
      socket.off('user_left');
      socket.off('new_message');
      socket.disconnect();
    };
  }, [selectedConversation]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const userId = localStorage.getItem("Id");
        if (!userId) return;

        // Fetch both direct conversations and groups in parallel
        const [directResponse, groupResponse] = await Promise.all([
          axios.get(`${BACKEND_URL}/conversations/${userId}`),
          axios.get(`${BACKEND_URL}/groups/${userId}`)
        ]);

        // Format direct conversations
        const directChats = directResponse.data.map((conv: DirectConversation) => {
          const otherUser = conv.User1.id === parseInt(userId) ? conv.User2 : conv.User1;
          const lastMessage = conv.messages?.[0];
          const lastMessageDate = lastMessage?.sentAt || lastMessage?.createdAt;

          return {
            id: conv.id,
            name: otherUser.name || otherUser.email,
            imageUrl: "https://via.placeholder.com/48",
            lastMessage: lastMessage?.content || "No messages yet",
            lastActive: lastMessageDate 
              ? new Date(lastMessageDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                }),
            isGroup: false,
            otherUser: otherUser
          };
        });

        // Format group conversations
        const groupChats = groupResponse.data.map((group: GroupConversation) => {
          const lastMessage = group.messages?.[0];
          const lastMessageDate = lastMessage?.sentAt || lastMessage?.createdAt;

          return {
            id: group.id,
            name: group.name,
            imageUrl: "https://via.placeholder.com/48",
            lastMessage: lastMessage?.content || "No messages yet",
            lastActive: lastMessageDate
              ? new Date(lastMessageDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                }),
            isGroup: true,
            members: group.groupMemberships?.map(membership => ({
              id: membership.user.id,
              name: membership.user.name
            }))
          };
        });

        // Combine and sort all conversations by last active date
        const allConversations = [...directChats, ...groupChats].sort((a, b) => {
          const dateA = new Date(a.lastActive).getTime();
          const dateB = new Date(b.lastActive).getTime();
          return dateB - dateA;
        });

        setConversations(allConversations);
      } catch (error) {
        console.error("Failed to fetch conversations", error);
        setConversations([]);
      }
    };

    fetchConversations();

    // Set up periodic refresh every 3 seconds
    const intervalId = setInterval(fetchConversations, 3000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleConversationClick = async (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setMessages([]); // Clear messages immediately when switching conversations
    
    // Join the conversation room
    if (socketRef.current) {
      const userId = localStorage.getItem("Id");
      socketRef.current.emit('join_conversation', {
        conversationId: conversation.id,
        isGroup: conversation.isGroup,
        userId: parseInt(userId || '0')
      });
    }
  };

  // Fetch messages whenever selected conversation changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation) return;

      try {
        const userId = localStorage.getItem("Id");
        const endpoint = selectedConversation.isGroup
          ? `${BACKEND_URL}/groups/${selectedConversation.id}/messages`
          : `${BACKEND_URL}/messages/${selectedConversation.id}?userId=${userId}`;
        
        const response = await axios.get(endpoint);

        // If no messages, retry after a short delay
        if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
          console.log('No messages found or invalid response, retrying in 1 second...');
          setTimeout(fetchMessages, 1000);
          return;
        }

        const formattedMessages = response.data.map((msg: MessageResponse) => {
          const isCurrentUser = msg.senderId === parseInt(userId || '0');
          let senderName;

          if (isCurrentUser) {
            senderName = "You";
          } else if (selectedConversation.isGroup) {
            senderName = msg.sender?.name || msg.Sender?.name || "Other User";
          } else {
            senderName = selectedConversation.name;
          }

          const timestamp = new Date(msg.sentAt || msg.createdAt || Date.now()).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          });

          return {
            id: msg.id?.toString() || `temp-${Date.now()}`,
            sender: senderName,
            content: msg.content,
            timestamp: timestamp,
            type: isCurrentUser ? "self" : "other"
          };
        });

        // Only update messages if they're different from current messages
        setMessages(prevMessages => {
          const isDifferent = JSON.stringify(prevMessages) !== JSON.stringify(formattedMessages);
          return isDifferent ? formattedMessages : prevMessages;
        });

        // Scroll to bottom after loading messages
        setTimeout(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        }, 100);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        setTimeout(fetchMessages, 2000);
      }
    };

    fetchMessages();
    const refreshInterval = setInterval(fetchMessages, 10000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [selectedConversation]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const currentUserId = localStorage.getItem("Id");
    if (!currentUserId) return;

    try {
      const messageData = {
        content: newMessage.trim(),
        senderId: parseInt(currentUserId),
        ...(selectedConversation.isGroup 
          ? { groupId: selectedConversation.id }
          : { conversationId: selectedConversation.id }
        )
      };

      // Add message to UI immediately
      const formattedMessage: Message = {
        id: `temp-${Date.now()}`,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        type: "self"
      };

      setMessages(prev => [...prev, formattedMessage]);
      setNewMessage("");

      // Send message through appropriate endpoint
      const endpoint = selectedConversation.isGroup
        ? `${BACKEND_URL}/groups/${selectedConversation.id}/messages`
        : `${BACKEND_URL}/messages/send`;
      
      const response = await axios.post(endpoint, messageData);
      console.log('Server response:', response.data);

      // Update conversations list with new message
      setConversations(prev => prev.map(conv => {
        if (conv.id === selectedConversation.id) {
          return {
            ...conv,
            lastMessage: `You: ${newMessage}`,
            lastActive: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          };
        }
        return conv;
      }));

      // Emit socket event
      const socketEvent = selectedConversation.isGroup ? "send_group_message" : "send_message";
      socketRef.current?.emit(socketEvent, {
        messageId: `temp-${Date.now()}`,
        groupId: selectedConversation.isGroup ? selectedConversation.id : undefined,
        conversationId: !selectedConversation.isGroup ? selectedConversation.id : undefined,
        senderId: parseInt(currentUserId),
        content: newMessage,
        sentAt: new Date().toISOString(),
        sender: { name: "You" }
      });

    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => prev.filter(msg => msg.id !== `temp-${Date.now()}`));
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
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`flex items-center p-4 cursor-pointer ${
                  selectedConversation?.id === conversation.id
                    ? "bg-blue-100"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleConversationClick(conversation)}
              >
                <img
                  src={conversation.imageUrl}
                  alt={conversation.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <p className="font-semibold">{conversation.name}</p>
                  <p className="text-sm text-gray-500 truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
                <p className="text-sm text-gray-400 ml-auto">
                  {conversation.lastActive}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Chat Area */}
        <div className="w-2/3 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="flex items-center p-4 border-b bg-gray-50">
                <img
                  src={selectedConversation.imageUrl}
                  alt={selectedConversation.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-4">
                  <p className="font-semibold">{selectedConversation.name}</p>
                  <p className="text-sm text-gray-500">
                    {selectedConversation.isGroup 
                      ? `${selectedConversation.members?.length || 0} members`
                      : 'Direct Message'}
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
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No messages yet. Start a conversation!
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.type === "self" ? "justify-end" : "justify-start"
                      } mb-4`}
                    >
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          msg.type === "self"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {msg.type !== "self" && (
                          <p className="text-xs font-semibold mb-1">{msg.sender}</p>
                        )}
                        <p>{msg.content}</p>
                        <p className="text-xs mt-1 text-gray-500">
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="p-4 bg-gray-50 border-t flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
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
              <p className="text-gray-500">Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UnifiedChat; 