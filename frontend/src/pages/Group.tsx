import { Header } from "@/components/jobs/Header";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaEllipsisV, FaPaperPlane, FaSearch, FaPlus, FaMicrophone, FaSmile, FaPause, FaPlay, FaTimes, FaDownload, FaUsers, FaFile, FaImage } from "react-icons/fa";
import { BACKEND_URL } from "@/config";
import { io, Socket } from "socket.io-client";
import EmojiPicker from 'emoji-picker-react';

type MessageType = "text" | "image" | "video" | "document" | "voice";
type TabType = "all" | "unread" | "connections" | "community" | "drafts";
type MoreTabType = "overview" | "files" | "media" | "members";
type FileUploadType = "document" | "media" | null;

interface FilePreview {
  type: "image" | "video" | "document";
  url: string;
  name: string;
  size: number;
}

interface Conversation {
  id: number;
  name: string;
  imageUrl: string;
  lastMessage: string;
  lastActive: string;
  isGroup: boolean;
  unread?: boolean;
  lastSeen?: string;
  members?: { id: number; name: string; imageUrl?: string }[];
  otherUser?: {
    id: number;
    name: string;
    email: string;
    lastSeen?: string;
    isOnline?: boolean;
  };
}

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  type: MessageType;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  previewUrl?: string;
  duration?: number;
  isCurrentUser?: boolean;
}

interface SocketMessage {
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
}

interface DirectConversation {
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
}

interface GroupConversation {
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
}

interface MessageResponse {
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
}

function UnifiedChat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadType, setUploadType] = useState<FileUploadType>(null);
  const [filePreview, setFilePreview] = useState<FilePreview | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [moreTabOpen, setMoreTabOpen] = useState(false);
  const [activeMoreTab, setActiveMoreTab] = useState<MoreTabType>("overview");
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordingPaused, setRecordingPaused] = useState(false);
  const [showFullScreenImage, setShowFullScreenImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter conversations based on active tab and search query
  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (activeTab) {
      case "unread":
        return conv.unread && matchesSearch;
      case "connections":
        return !conv.isGroup && matchesSearch;
      case "community":
        return conv.isGroup && matchesSearch;
      case "drafts":
        // Implement draft logic here
        return false;
      default:
        return matchesSearch;
    }
  });

  // Format last seen time
  const formatLastSeen = (lastSeen: string | undefined, isOnline?: boolean): string => {
    if (isOnline) return "Active Now";
    if (!lastSeen) return "";

    const lastSeenDate = new Date(lastSeen);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - lastSeenDate.getTime()) / (1000 * 60));

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `Last active ${diffMinutes} minutes ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `Last active ${diffHours} hours ago`;

    return `Last active on ${lastSeenDate.toLocaleDateString()}`;
  };

  // Handle recording timer
  useEffect(() => {
    if (isRecording && !recordingPaused) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }

    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isRecording, recordingPaused]);

  // Format recording duration
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
            lastActive: lastActiveDate,
            unread: true
          };
        }
        return group;
      }));

      // Only add the message if it's from the current group
      if (data.groupId === selectedConversation?.id) {
        const formattedMessage: Message = {
          id: data.messageId || `${Date.now()}-${Math.random()}`,
          sender: senderName,
          content: data.content || "",
          timestamp: messageTime,
          type: (data as any).type || "text",
          fileUrl: (data as any).fileUrl,
          fileName: (data as any).fileName,
          fileSize: (data as any).fileSize,
          previewUrl: (data as any).type === "video" ? (data as any).fileUrl : undefined,
          duration: (data as any).duration
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

      // Update conversations list with unread state
      setConversations(prev => prev.map(conv => {
        if (conv.id === data.conversationId && !conv.isGroup) {
          return {
            ...conv,
            lastMessage: data.content,
            lastActive: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            unread: selectedConversation?.id !== conv.id // Only mark as unread if not currently selected
          };
        }
        return conv;
      }));

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
          type: (data as any).type || "text",
          fileUrl: (data as any).fileUrl,
          fileName: (data as any).fileName,
          fileSize: (data as any).fileSize,
          previewUrl: (data as any).type === "video" ? (data as any).fileUrl : undefined,
          duration: (data as any).duration,
          isCurrentUser: false
        };

        setMessages(prevMessages => {
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

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation) return;

      setLoading(true);
      try {
        const userId = localStorage.getItem('Id');
        const endpoint = selectedConversation.isGroup
          ? `${BACKEND_URL}/groups/${selectedConversation.id}/messages`
          : `${BACKEND_URL}/messages/${selectedConversation.id}`;

        const response = await axios.get(endpoint);
        const fetchedMessages = response.data.map((msg: any) => ({
          id: msg.id.toString(),
          content: msg.content || "",
          sender: msg.sender?.name || msg.Sender?.name || "Unknown",
          timestamp: new Date(msg.sentAt || msg.created_at).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          type: msg.type || "text",
          fileUrl: msg.fileUrl,
          fileName: msg.fileName,
          fileSize: msg.fileSize,
          previewUrl: msg.type === "video" ? msg.fileUrl : undefined,
          duration: msg.duration,
          isCurrentUser: msg.senderId === parseInt(userId || "0")
        }));

        setMessages(fetchedMessages);
        
        // Mark conversation as read
        if (selectedConversation) {
          setConversations(prev => prev.map(conv => {
            if (conv.id === selectedConversation.id) {
              return { ...conv, unread: false };
            }
            return conv;
          }));
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedConversation?.id]);

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

  // Handle sending different types of messages
  const handleSendMessage = async () => {
    if ((!newMessage.trim() && !filePreview) || !selectedConversation) return;

    const currentUserId = localStorage.getItem("Id");
    if (!currentUserId) return;

    try {
      let messageContent = newMessage.trim();
      let messageType: MessageType = "text";
      let fileData = null;

      // Handle file uploads
      if (filePreview) {
        // Here you would typically upload the file to your server
        // and get back a URL. For now, we'll use the local preview URL
        fileData = {
          url: filePreview.url,
          name: filePreview.name,
          size: filePreview.size,
          type: filePreview.type
        };
        messageType = filePreview.type;
        messageContent = `Sent ${filePreview.type}: ${filePreview.name}`;
      }

      // Add message to UI immediately
      const formattedMessage: Message = {
        id: `temp-${Date.now()}`,
        sender: "You",
        content: messageContent,
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        type: messageType,
        ...(fileData && {
          fileUrl: fileData.url,
          fileName: fileData.name,
          fileSize: fileData.size,
          previewUrl: fileData.type === 'video' ? fileData.url : undefined
        }),
        isCurrentUser: true
      };

      setMessages(prev => [...prev, formattedMessage]);
      setNewMessage("");
      setFilePreview(null);

      // Send message through appropriate endpoint
      const messageData = {
        content: messageContent,
        senderId: parseInt(currentUserId),
        type: messageType,
        ...(fileData && {
          fileUrl: fileData.url,
          fileName: fileData.name,
          fileSize: fileData.size
        }),
        ...(selectedConversation.isGroup 
          ? { groupId: selectedConversation.id }
          : { conversationId: selectedConversation.id }
        )
      };

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
            lastMessage: `You: ${messageContent}`,
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
        content: messageContent,
        type: messageType,
        ...(fileData && {
          fileUrl: fileData.url,
          fileName: fileData.name,
          fileSize: fileData.size
        }),
        sentAt: new Date().toISOString(),
        sender: { name: "You" }
      });

    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => prev.filter(msg => msg.id !== `temp-${Date.now()}`));
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search functionality here
  };

  const handleNotification = () => {
    // Handle notification click
  };

  const handleMessage = () => {
    // Handle message click
  };

  const handleProfile = () => {
    // Handle profile click
  };

  // Handle emoji selection
  const onEmojiClick = (emojiObject: any) => {
    setNewMessage(prev => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  // Handle file upload
  const handleFileUpload = (type: FileUploadType) => {
    setUploadType(type);
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'document' ? '.pdf,.doc,.docx' : 'image/*,video/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Here you would typically upload the file to your server
        // and get back a URL or ID to send in the message
        console.log('File selected:', file);
        // For now, we'll just send the file name as a message
        setNewMessage(`Sent ${file.name}`);
        setFilePreview({
          type: type === 'document' ? 'document' : file.type.split('/')[0],
          url: URL.createObjectURL(file),
          name: file.name,
          size: file.size
        });
      }
    };
    input.click();
  };

  // Handle voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        // Here you would typically upload the audio blob to your server
        // and get back a URL or ID to send in the message
        console.log('Audio recording finished:', audioBlob);
        // For now, we'll just send a placeholder message
        setNewMessage('Voice message');
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Add click outside handler for More popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const morePopup = document.getElementById('more-popup');
      const moreButton = document.getElementById('more-button');
      
      if (morePopup && moreButton && moreTabOpen) {
        if (!morePopup.contains(event.target as Node) && !moreButton.contains(event.target as Node)) {
          setMoreTabOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [moreTabOpen]);

  // Render More Tab Content
  const renderMoreTabContent = () => {
    if (!selectedConversation) return null;

    switch (activeMoreTab) {
      case "overview":
        return (
          <div className="p-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={selectedConversation.imageUrl || "/default-avatar.png"}
                  alt={selectedConversation.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full">
                  <FaImage className="w-4 h-4" />
                </button>
              </div>
              <h2 className="mt-4 text-lg font-semibold">{selectedConversation.name}</h2>
              {selectedConversation.isGroup && (
                <p className="text-sm text-gray-500">{selectedConversation.members?.length || 0} members</p>
              )}
            </div>
          </div>
        );

      case "files":
        const documentMessages = messages.filter(m => m.type === "document");
        return (
          <div className="p-6">
            <div className="space-y-4">
              {documentMessages.length === 0 ? (
                <p className="text-center text-gray-500">No files shared yet</p>
              ) : (
                documentMessages.map((message, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                    <FaFile className="w-5 h-5 text-gray-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{message.fileName}</p>
                      <p className="text-xs text-gray-500">
                        {message.sender} • {message.timestamp}
                      </p>
                    </div>
                    <button
                      onClick={() => window.open(message.fileUrl, '_blank')}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <FaDownload className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case "media":
        const mediaMessages = messages.filter(m => m.type === "image" || m.type === "video");
        return (
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4">
              {mediaMessages.length === 0 ? (
                <p className="col-span-3 text-center text-gray-500">No media shared yet</p>
              ) : (
                mediaMessages.map((message, index) => (
                  <div
                    key={index}
                    className="relative cursor-pointer"
                    onClick={() => message.type === "image" && setShowFullScreenImage(message.fileUrl)}
                  >
                    {message.type === "image" ? (
                      <img
                        src={message.fileUrl}
                        alt={message.fileName}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="relative">
                        <video
                          src={message.fileUrl}
                          poster={message.previewUrl}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                          <FaPlay className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case "members":
        if (!selectedConversation.isGroup) return null;
        return (
          <div className="p-6">
            <div className="space-y-4">
              {selectedConversation.members?.map((member, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">{index + 1}.</span>
                  <img
                    src={member.imageUrl || "/default-avatar.png"}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p className="text-sm font-medium">{member.name}</p>
                </div>
              ))}
              <button className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Add Member
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        onNotification={handleNotification}
        onMessage={handleMessage}
        onProfile={handleProfile}
        onSearch={handleSearch}
      />
      
      <div className="max-w-[1200px] mx-auto px-8 py-2 font-fontsm">
        <div className="bg-white rounded-xl shadow-sm flex h-[calc(100vh-120px)]">
          {/* Left Sidebar */}
          <div className="w-[320px] border-r border-gray-200 flex flex-col rounded-l-xl">
            <div className="px-6 pt-6 pb-4 bg-white rounded-tl-xl border-b border-gray-200">
              <h1 className="text-xl font-semibold mb-4">Messages</h1>
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Tabs */}
            <div className="px-6 py-3 border-b border-gray-200">
              <div className="flex space-x-6">
                <button onClick={() => setActiveTab("all")} className={`text-sm font-medium ${activeTab === "all" ? "text-blue-600" : "text-gray-500 hover:text-gray-900"}`}>
                  All
                </button>
                <button onClick={() => setActiveTab("unread")} className={`text-sm font-medium ${activeTab === "unread" ? "text-blue-600" : "text-gray-500 hover:text-gray-900"}`}>
                  Unread
                </button>
                <button onClick={() => setActiveTab("connections")} className={`text-sm font-medium ${activeTab === "connections" ? "text-blue-600" : "text-gray-500 hover:text-gray-900"}`}>
                  Connections
                </button>
                <button onClick={() => setActiveTab("community")} className={`text-sm font-medium ${activeTab === "community" ? "text-blue-600" : "text-gray-500 hover:text-gray-900"}`}>
                  Community
                </button>
                <button onClick={() => setActiveTab("drafts")} className={`text-sm font-medium ${activeTab === "drafts" ? "text-blue-600" : "text-gray-500 hover:text-gray-900"}`}>
                  Drafts
                </button>
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No Messages
                </div>
              ) : (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => handleConversationClick(conversation)}
                    className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${
                      selectedConversation?.id === conversation.id
                        ? 'bg-gray-100'
                        : conversation.unread
                        ? 'bg-blue-50'
                        : ''
                    }`}
                  >
                    <img
                      src={conversation.imageUrl || "/default-avatar.png"}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className={`font-medium ${conversation.unread ? 'text-blue-600' : 'text-gray-900'} truncate`}>
                          {conversation.name}
                        </p>
                        <div className="flex items-center space-x-2">
                          {conversation.unread && (
                            <span className="px-2 py-0.5 text-xs bg-blue-500 text-white rounded-full">
                              New
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            {conversation.lastActive}
                          </span>
                        </div>
                      </div>
                      <p className={`text-sm ${conversation.unread ? 'text-gray-900 font-medium' : 'text-gray-500'} truncate`}>
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col bg-gray-50 rounded-r-xl">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="bg-white border-b p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <img
                        src={selectedConversation.imageUrl || "/default-avatar.png"}
                        alt={selectedConversation.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h2 className="font-semibold text-gray-900">
                          {selectedConversation.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {selectedConversation.isGroup
                            ? `${selectedConversation.members?.length || 0} members`
                            : "Online"}
                        </p>
                      </div>
                    </div>
                    <button
                      id="more-button"
                      onClick={() => setMoreTabOpen(!moreTabOpen)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <FaEllipsisV className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* More Button Pop-up */}
                {moreTabOpen && (
                  <div
                    id="more-popup"
                    className="absolute right-4 top-16 w-1/2 bg-white shadow-lg rounded-lg overflow-hidden z-50"
                    style={{ maxHeight: 'calc(100vh - 4rem)' }}
                  >
                    <div className="border-b">
                      <div className="flex p-4">
                        {['Overview', 'Files', 'Media', 'Members'].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveMoreTab(tab.toLowerCase() as MoreTabType)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg mr-2 ${
                              activeMoreTab === tab.toLowerCase()
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 8rem)' }}>
                      {renderMoreTabContent()}
                    </div>
                  </div>
                )}

                {/* Messages Container */}
                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4"
                  style={{ height: 'calc(100vh - 200px)' }}
                >
                  {loading ? (
                    <div className="flex justify-center items-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full text-gray-500">
                      No messages yet
                    </div>
                  ) : (
                    messages.map((message, index) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] ${
                            message.isCurrentUser
                              ? 'bg-blue-500 text-white rounded-l-lg rounded-tr-lg'
                              : 'bg-white text-gray-800 rounded-r-lg rounded-tl-lg'
                          } p-3 shadow-sm`}
                        >
                          {!message.isCurrentUser && (
                            <p className="text-xs text-gray-500 mb-1">{message.sender}</p>
                          )}
                          {message.type === "text" && (
                            <p className="whitespace-pre-wrap break-words">{message.content}</p>
                          )}
                          {message.type === "image" && (
                            <div className="space-y-2">
                              <img
                                src={message.fileUrl}
                                alt={message.fileName}
                                className="max-w-full rounded-lg cursor-pointer"
                                onClick={() => setShowFullScreenImage(message.fileUrl)}
                              />
                              <p className="text-xs opacity-75">{message.fileName}</p>
                            </div>
                          )}
                          {message.type === "video" && (
                            <div className="space-y-2">
                              <video
                                src={message.fileUrl}
                                controls
                                className="max-w-full rounded-lg"
                              />
                              <p className="text-xs opacity-75">{message.fileName}</p>
                            </div>
                          )}
                          {message.type === "document" && (
                            <div className="flex items-center space-x-2">
                              <FaFile className="w-4 h-4" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm truncate">{message.fileName}</p>
                                <p className="text-xs text-gray-500">{(message.fileSize / 1024).toFixed(1)} KB</p>
                              </div>
                              <button
                                onClick={() => window.open(message.fileUrl, '_blank')}
                                className="p-1 hover:bg-gray-200 rounded-full"
                              >
                                <FaDownload className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                          {message.type === "voice" && (
                            <div className="flex items-center space-x-2">
                              <audio src={message.fileUrl} controls className="max-w-[200px]" />
                              {message.duration && (
                                <span className="text-xs opacity-75">
                                  {Math.floor(message.duration / 60)}:
                                  {(message.duration % 60).toString().padStart(2, '0')}
                                </span>
                              )}
                            </div>
                          )}
                          <p className={`text-xs ${message.isCurrentUser ? 'text-white' : 'text-gray-500'} mt-1`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Full Screen Image Viewer */}
                {showFullScreenImage && (
                  <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
                    <button
                      onClick={() => setShowFullScreenImage(null)}
                      className="absolute top-4 right-4 text-white"
                    >
                      <FaTimes className="w-6 h-6" />
                    </button>
                    <img
                      src={showFullScreenImage}
                      alt="Full screen"
                      className="max-w-[90%] max-h-[90vh] object-contain"
                    />
                  </div>
                )}

                {/* Message Input */}
                <div className="px-6 py-4 bg-white border-t rounded-br-xl">
                  <div className="flex items-center space-x-2">
                    {/* File Upload Buttons */}
                    <button onClick={() => handleFileUpload("document")} className="p-2.5 hover:bg-gray-100 rounded-full">
                      <FaFile className="w-5 h-5 text-gray-600" />
                    </button>
                    <button onClick={() => handleFileUpload("media")} className="p-2.5 hover:bg-gray-100 rounded-full">
                      <FaImage className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Message Input with File Preview */}
                    <div className="flex-1 relative">
                      {filePreview && (
                        <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-lg shadow-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {filePreview.type === "image" && (
                                <img src={filePreview.url} alt={filePreview.name} className="w-12 h-12 object-cover rounded" />
                              )}
                              {filePreview.type === "video" && (
                                <video src={filePreview.url} className="w-12 h-12 object-cover rounded" />
                              )}
                              {filePreview.type === "document" && (
                                <FaFile className="w-8 h-8 text-gray-600" />
                              )}
                              <div>
                                <p className="text-sm font-medium truncate">{filePreview.name}</p>
                                <p className="text-xs text-gray-500">{(filePreview.size / 1024).toFixed(1)} KB</p>
                              </div>
                            </div>
                            <button
                              onClick={() => setFilePreview(null)}
                              className="p-1 hover:bg-gray-100 rounded-full"
                            >
                              <FaTimes className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      )}

                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Type your message here..."
                        className="w-full py-2.5 px-4 pr-20 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                      />

                      {/* Input Actions */}
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                        <button
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className="p-2 hover:bg-gray-100 rounded-full"
                        >
                          <FaSmile className="w-5 h-5 text-gray-600" />
                        </button>

                        {showEmojiPicker && (
                          <div className="absolute bottom-full right-0 mb-2">
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                          </div>
                        )}

                        {isRecording ? (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-red-600">{formatDuration(recordingDuration)}</span>
                            {recordingPaused ? (
                              <button
                                onClick={() => setRecordingPaused(false)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                              >
                                <FaPlay className="w-5 h-5" />
                              </button>
                            ) : (
                              <button
                                onClick={() => setRecordingPaused(true)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                              >
                                <FaPause className="w-5 h-5" />
                              </button>
                            )}
                            <button
                              onClick={stopRecording}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                            >
                              <FaPaperPlane className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={newMessage.trim() || filePreview ? handleSendMessage : handleMicClick}
                            className="p-2 hover:bg-gray-100 rounded-full"
                          >
                            {newMessage.trim() || filePreview ? (
                              <FaPaperPlane className="w-5 h-5 text-blue-600" />
                            ) : (
                              <FaMicrophone className="w-5 h-5 text-gray-600" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnifiedChat;