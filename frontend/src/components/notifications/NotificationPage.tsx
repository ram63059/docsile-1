import React, { useState, useRef, useEffect ,ReactNode } from 'react';
import { MoreVertical, Search, X } from 'lucide-react';
import jobs from "../../assets/icon/jobs.svg"
import { Header } from './Header';
import backbutton from "../../assets/icon/backbutton.svg"
          
interface VideoCardProps {
  videoImage: string;
  avatarImage: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoImage, avatarImage }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-36 rounded-lg overflow-hidden">
        <img src={videoImage} alt="Video Thumbnail" className="w-full h-full object-cover" />
      </div>
      <img
        src={avatarImage}
        alt="Avatar"
        className="w-10 h-10 rounded-full border  z-10 border-white -mt-6"
      />
    </div>
  );
};



interface CustomDropdownMenuProps {
    children: ReactNode;
    align?: 'right' | 'left';
  }

const CustomDropdownMenu: React.FC<CustomDropdownMenuProps> = ({ children, align = 'right' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      const handleClickOutside = (event: { target: unknown; }) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    return (
      <div className="relative " ref={dropdownRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          <MoreVertical className="h-5 w-5" />
        </button>
        
        {isOpen && (
          <div 
            className={`absolute z-50 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 top-2 ring-black ring-opacity-5 ${
              align === 'right' ? 'right-2' : 'left-0'
            }`}
          >
            <div className="py-1" role="menu" aria-orientation="vertical">
            {React.Children.map(children, (child) =>
              React.isValidElement(child)
                ? React.cloneElement(child as React.ReactElement<DropdownMenuItemProps>, {
                    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      child.props.onClick?.(e);
                      setIsOpen(false);
                    },
                  })
                : child
            )}
            </div>
          </div>
        )}
      </div>
    );
  };
  interface DropdownMenuItemProps {
    children: ReactNode; // Specify that children is of type ReactNode
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // Specify that onClick is a function with no arguments and no return value
    className?: string; // Specify that className is an optional string
  }
  const DropdownMenuItem:React.FC<DropdownMenuItemProps> = ({ children, onClick, className = '' }) => (
    <button
      className={`block w-full text-left pl-4  py-2 text-sm hover:bg-gray-100 ${className}`}
      role="menuitem"
      onClick={onClick}
    >
      {children}
    </button>
  );



const NotificationsComponent = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'connection',
      user: {
        name: 'Dr. Sarah Chen',
        avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6",
        mutualFollowers: 44
      },
      content: 'You may know',
      timestamp: new Date('2024-02-10T09:30:00'),
      category: ['All', 'Connections'],
      isUnread: true
    },
    {
      id: 2,
      type: 'job',
      organization: 'AIIMS',
      content: 'is looking for an Ophthalmologist. You may be a good fit for the role.',
      timestamp: new Date('2024-02-10T09:25:00'),
      category: ['All', 'Jobs'],
      isUnread: true
    },
    {
      id: 3,
      type: 'comment',
      user: {
        name: 'Dr. Sarah Chen',
        avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6"
      },
      content: 'commented on post that you might be interested in: "It was a great experience..."',
      timestamp: new Date('2024-02-10T09:20:00'),
      category: ['All', 'My posts'],
      isUnread: false
    },
    {
      id: 4,
      type: 'birthday',
      user: {
        name: 'Dr. Sarah Chen',
        avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c'
      },
      content: 'birthday was on Jan 20.',
      timestamp: new Date('2024-02-10T09:15:00'),
      category: ['All'],
      isUnread: true
    },
    {
      id: 5,
      type: 'community',
      community: {
        name: 'Ophthalmology community',
        avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
      },
      content: 'posted: "New research findings on glaucoma treatment..."',
      timestamp: new Date('2024-02-10T09:10:00'),
      category: ['All'],
      isUnread: false
    },
    {
      id: 6,
      type: 'like',
      user: {
        name: 'Dr. Michael Wong',
        avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c'
      },
      content: 'liked your post about recent advances in cataract surgery',
      timestamp: new Date('2024-02-10T09:05:00'),
      category: ['All', 'My posts'],
      isUnread: true
    },
    {
      id: 7,
      type: 'share',
      user: {
        name: 'Dr. Emily Martinez',
        avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c'
      },
      content: 'shared your research paper on corneal transplantation',
      timestamp: new Date('2024-02-10T09:00:00'),
      category: ['All', 'My posts'],
      isUnread: false
    },
    {
      id: 8,
      type: 'mention',
      user: {
        name: 'Dr. John Smith',
        avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c'
      },
      content: 'mentioned you in a discussion about new optical coherence tomography techniques',
      timestamp: new Date('2024-02-09T23:55:00'),
      category: ['All'],
      isUnread: true
    },
    {
      id: 9,
      type: 'connection_accepted',
      user: {
        name: 'Dr. Lisa Johnson',
        avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6"
      },
      content: 'accepted your connection request',
      timestamp: new Date('2024-02-09T23:50:00'),
      category: ['All', 'Connections'],
      isUnread: false
    },
    {
      id: 10,
      type: 'job',
      organization: 'City Eye Hospital',
      content: 'has a new opening for Senior Ophthalmologist position',
      timestamp: new Date('2024-02-09T23:45:00'),
      category: ['All', 'Jobs'],
      isUnread: true
    }
  ]);

  const searchRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const tabs = ['All', 'Unread', 'Connections', 'Jobs', 'My posts'];

 

  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const handleSearchChange = (e: { target: { value: unknown[] | React.SetStateAction<string>; }; }) => {
    const value = e.target.value as string;
    setSearchQuery(value);
    setIsSearching(e.target.value.length > 0);
  };

  const filteredNotifications = notifications
    .filter(notification => {
      const matchesTab = activeTab === 'All' 
        ? true 
        : activeTab === 'Unread' 
          ? notification.isUnread 
          : notification.category.includes(activeTab);
      
      const matchesSearch = searchQuery.toLowerCase() === '' 
        ? true 
        : (notification.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           notification.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
           notification.organization?.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesTab && matchesSearch;
    })
    .sort((a, b) => b.timestamp.getTime()  - a.timestamp.getTime() );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node )) {
        setIsSearching(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleNotificationClick = (id: number) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id 
          ? { ...notification, isUnread: false }
          : notification
      )
    );
  };

  // Style for unread notifications
  const getNotificationStyle = (isUnread: boolean) => {
    return {
      backgroundColor: isUnread ? '#F0F4FA' : 'white', // Light blue for unread
      transition: 'all 0.2s ease-in-out'
    
    };
  };
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const videoData = [
    { videoImage:  "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08", avatarImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
    { videoImage:  "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08", avatarImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
    { videoImage:  "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08", avatarImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
    { videoImage:  "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08", avatarImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
    { videoImage:  "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08", avatarImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
      ];

      
  return (
      <div className="flex flex-col min-h-screen ">


          {/* Header */}
          <div className="bg-white border-b sticky top-0 z-50 hidden lg:block">
          <Header
            onNotification={() => console.log("Notification clicked")}
            onMessage={() => console.log("Message clicked")}
            onProfile={() => console.log("Profile clicked")}
              onSearch={() => console.log("Profile clicked")}
            />
    
            
          </div>


             {/* Main Content Area */}
      <div className="flex flex-1 overflow-x-hidden lg:px-16 max-w-7xl mx-auto w-full gap-4 pt-2">
        {/* Left Sidebar */}
        <div className="hidden lg:block w-[270px] flex-shrink-0 font-fontsm">
          <div className="top-[calc(theme(spacing.24)+1px)] space-y-6 ">
            {/* Filter  Card */}
            <div className="bg-fillc bg-opacity-10 rounded-2xl  shadow-sm p-4">
                <p className='text-maincl text-lg font-medium pb-3'>
                    Filter
                </p>

            <div className="flex flex-col px-2 space-y-2  ">
                        {tabs.map((tab) => (
                            <label key={tab} className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                name="notificationFilter"
                                value={tab}
                                checked={activeTab === tab}
                                onChange={() => setActiveTab(tab)}
                                className="hidden"
                            />
                            <div
                                className={`px-3 py-1 w-28 text-sm rounded-md border border-gray-200 ${
                                activeTab === tab
                                    ? "bg-fillc text-white font"
                                    : "bg-white/50 text-gray-600"
                                }`}
                            >
                                {tab}
                                {tab === "Unread" && (
                                <span className="ml-1 text-fontlit bg-blue-100 text-fillc px-1 py-0.5 rounded-full">
                                    {notifications.filter((n) => n.isUnread).length}
                                </span>
                                )}
                            </div>
                            </label>
                        ))}
                        </div>
            </div>
          </div>
        </div>


        <div className="flex-1 max-w-xl  mx-auto  w-full ">
                
    <div className=" mx-auto lg:p-2 p-1 relative font-fontsm lg:border lg:border-gray-200 rounded-xl">
      <div className="mb-4 space-y-4">
        <div className='border-b border-fillc px-2 py-4 lg:py-2 flex '>
            <img src={backbutton} alt="" className='lg:hidden w-4'/>
            <p className='text-maincl text-xl ml-1 font-medium'>Notifications</p>
        </div>
        {/* Search Bar */}
        <div className="relative px-2 " ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsSearching(true)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-3xl text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearching(false);
                }}
                className="absolute right-3 top-2.5"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Search Results Popup */}
          {isSearching && (
            <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map(notification => (
                  <div key={notification.id} className="p-3 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-2">
                      {notification.user?.avatar && (
                        <img src={notification.user.avatar} alt="" className="w-6 h-6 rounded-full" />
                      )}
                      <span className="text-sm text-gray-700">
                        {notification.user?.name || notification.organization}{' '}
                        {notification.content}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No notifications found
                </div>
              )}
            </div>
          )}
        </div>
        

        {/* Tabs */}
        <div className="flex px-2 space-x-2 border-b overflow-x-auto lg:hidden">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-1 text-sm whitespace-nowrap ${
                activeTab === tab
                  ? 'border-b-2 border-fillc text-fillc'
                  : 'text-gray-500'
              }`}
            >
              {tab}
              {tab === 'Unread' && (
                <span className="ml-1 text-xs bg-blue-100 text-fillc px-2 py-0.5 rounded-full">
                  {notifications.filter(n => n.isUnread).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-0">
        {filteredNotifications.map(notification => (
          <div 
          key={notification.id} 
          className="overflow hover:shadow-md transition-all duration-200 border-b border-gray-200" 
          style={getNotificationStyle(notification.isUnread)}
          onClick={() => handleNotificationClick(notification.id)}
        >   
            <div className="flex items-center p-4 gap-3">
              {/* Avatar/Icon Section */}
              {notification.user && (
                <img
                  src={notification.user.avatar}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
              )}
              {notification.type === 'job' && (
                <div className="w-12 h-12  flex items-center justify-center">
                  <img src={jobs} alt="" className='w-8' />
                </div>
              )}
              
              {notification.community && (
                <div className="w-12 h-12 rounded-full flex items-center  justify-center">
                 <img src={notification.community.avatar} alt="" />
                </div>
              )}
              
              <div className="flex-1 relative ">
                <div className="flex justify-between items-start">
                  <div className='pr-4 pl-1'>
                    {notification.user && (
                      <span className="font-medium text-sm">{notification.user.name} </span>
                    )}
                    {notification.organization && (
                      <span className="font-medium text-sm">{notification.organization} </span>
                    )}
                    <span className="text-gray-600 text-sm  ">{notification.content}</span>
                    {notification.user?.mutualFollowers && (
                      <div className="text-sm text-gray-500 mt-1">
                        {notification.user.mutualFollowers} mutual followers
                      </div>
                    )}
                  </div>
                  
                  <CustomDropdownMenu>
              <DropdownMenuItem 
                onClick={(e) => {
                  e.stopPropagation();
                  setNotifications(prevNotifications =>
                    prevNotifications.map(n =>
                      n.id === notification.id
                        ? { ...n, isUnread: !n.isUnread }
                        : n
                    )
                  );
                }}
              >
                Mark as {notification.isUnread ? 'read' : 'unread'}
              </DropdownMenuItem>
              {notification.type === 'connection' && (
                <DropdownMenuItem className="text-red-500" onClick={() => {
                    // Define what should happen when the item is clicked
                    console.log('Not interested clicked');
                  }}>
                  Not interested
                </DropdownMenuItem>
              )}
              <DropdownMenuItem 
                onClick={() => handleDeleteNotification(notification.id)}
                className="text-red-500"
              >
                Delete
              </DropdownMenuItem>
            </CustomDropdownMenu>
                </div>
                
                {/* Action Buttons */}
                {notification.type === 'job' && (
                  <button className="mt-2  text-blue-500 px-4 py-1 ml-1 rounded-full border border-blue-500 text-xs hover:bg-blue-100" >
                    Apply now
                  </button>
                )}
                {notification.type === 'birthday' && (
                  <button className="mt-2 text-blue-500 px-4 py-1 rounded-full border border-blue-500 text-xs hover:bg-blue-100">
                    Say happy belated birthday!
                  </button>
                )}
                
                {/* Timestamp */}
                <div className="text-xs flex justify-end absolute -bottom-2 right-4 text-gray-500 mt-1">
                  {new Date(notification.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>


        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-[300px] flex-shrink-0 font-fontsm">
          <div className="sticky top-[calc(theme(spacing)+1px)] space-y-4">
            {/* Explore Videos */}
            <div className="px-4 py-4 bg-fillc bg-opacity-10 rounded-xl">
      {/* Heading Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-base  text-maincl font-medium">Explore Videos</h2>
          <p className="text-gray-600 text-fontlit">Videos to learn, connect, and grow in the medical field!</p>
        </div>
        <button
          onClick={handleScrollRight}
          className="text-maincl hover:text-fillc focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Scrollable Video Cards */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide"
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}
      >
        {videoData.map((video, index) => (
          <VideoCard
            key={index}
            videoImage={video.videoImage}
            avatarImage={video.avatarImage}
          />
        ))}
      </div>
    </div>

          </div>
        </div>





        </div>












    </div>
  );
};

export default NotificationsComponent;