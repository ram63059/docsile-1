import * as React from "react";
import { Header } from "./Header";
import { Story } from "./Story";
import { Post } from "./Post";
import { Navigation } from "./Navigation";
import question from "../../assets/icon/question.svg"
import  { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PostPopup from "./PostPopup";

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

interface ProfileData {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  stats: {
    followers: number;
    posts: number;
    questions: number;
  };
}

export const SocialFeed: React.FC = () => {
  const [stories] = React.useState([
    {
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/6093fa78a5975dce5cacdd69f3dc074d8a56ed1eef07c3b930dd6fa85cb956fe?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      name: "Your Story",
    },
    {
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/ab6937e93ef1ee7bddbbbf77a39d383095f69738f6470ae4ea7d346c46d2b699?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      name: "Dr. Mahesh",
    },
    {
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/b527f110a2eb672ae9e0b0bead1abbd22bc9bc28130e5503cc3abf13d16bee60?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      name: "Dr. Swathi",
    },
    {
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/ab6937e93ef1ee7bddbbbf77a39d383095f69738f6470ae4ea7d346c46d2b699?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      name: "Dr. Mahesh",
    },
    {
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/e11116406a9a6bca6e5c1de6ab87ff490cd336445d55d98097f72dbe60e3241d?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      name: "Dr. Swathi",
    },
    {
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/b527f110a2eb672ae9e0b0bead1abbd22bc9bc28130e5503cc3abf13d16bee60?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      name: "Dr. Swathi",
    },
    {
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/ab6937e93ef1ee7bddbbbf77a39d383095f69738f6470ae4ea7d346c46d2b699?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      name: "Dr. Mahesh",
    },
    {
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/e11116406a9a6bca6e5c1de6ab87ff490cd336445d55d98097f72dbe60e3241d?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      name: "Dr. Swathi",
    },
  ]);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const storiesContainerRef = useRef<HTMLDivElement>(null);
  // const [isPostPopupOpen, setIsPostPopupOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [postType1, setPostType1] = useState("Post");


  const popupOpen = (type: string) => {
    setPostType1(type);
    setIsOpen(true);
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleStoriesScroll = () => {
    if (storiesContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = storiesContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollStories = (direction: 'left' | 'right') => {
    if (storiesContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      storiesContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Navigation items for desktop header
     const videoData = [
    { videoImage:  "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08", avatarImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
    { videoImage:  "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08", avatarImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
    { videoImage:  "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08", avatarImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
    { videoImage:  "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08", avatarImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
    { videoImage:  "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08", avatarImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
      ];

  const [profileData] = useState<ProfileData>({
    name: "Seelam Yamshidhar Goud",
    title: "Ophthalmologist",
    bio: "AIIMS Delhi'25 | Aspiring Medical Professional",
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
    stats: {
      followers: 546,
      posts: 90,
      questions: 5
    }
  });

  const StatItem: React.FC<{
    value: number;
    label: string;
    className?: string;
  }> = ({ value, label, className = "" }) => (
    <div className={className}>
      <div className="font-semibold text-fillc">
        {value.toLocaleString()}
      </div>
      <div className="text-xs text-gray-800">{label}</div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50">
      <Header
        onNotification={() => console.log("Notification clicked")}
        onMessage={() => console.log("Message clicked")}
        onProfile={() => console.log("Profile clicked")}
          onSearch={() => console.log("Profile clicked")}
        />

        
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 px-4 lg:px-16 max-w-7xl mx-auto w-full gap-8 pt-2">
        {/* Left Sidebar */}
        <div className="hidden lg:block w-[270px] flex-shrink-0 font-fontsm">
          <div className="top-[calc(theme(spacing.24)+1px)] space-y-6">
            {/* Profile Card */}
            <div className="bg-fillc bg-opacity-10 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col items-center">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-18 h-18 rounded-full mb-3"
                />
                <h2 className="text-sm font-semibold text-gray-900 mb-0.5"><span className="text-fillc font-semibold bg-fillc bg-opacity-30 px-2 mr-1 rounded-lg">Dr.</span>
                  {profileData.name}
                </h2>
                <p className="text-xs text-gray-600 mb-1">{profileData.title}</p>
                <p className="text-xs text-gray-500 text-center mb-5">
                  {profileData.bio}
                </p>

                <div className="grid grid-cols-3 w-full gap-4 text-center text-sm  border-t pt-4">
                  <StatItem 
                    value={profileData.stats.followers} 
                    label="Followers" 
                  />
                  <StatItem 
                    value={profileData.stats.posts} 
                    label="Posts" 
                    className="border-x px-4" 
                  />
                  <StatItem 
                    value={profileData.stats.questions} 
                    label="Questions" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Feed */}
        <div className="flex-1 max-w-[560px] mx-auto  w-full ">
          {/* Stories Section */}
          <div className="bg-white rounded-2xl  mb-2  relative">
            {/* Left Arrow */}
            {canScrollLeft && (
              <button 
                onClick={() => scrollStories('left')}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white opacity-70 rounded-full p-1 shadow-md hover:bg-gray-50"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            
            {/* Stories Container */}
            <div 
              ref={storiesContainerRef}
              className="flex gap-4 p-2 overflow-x-auto scrollbar-hide relative"
              style={{
                msOverflowStyle: 'none',
                scrollbarWidth: 'none'
              }}
              onScroll={handleStoriesScroll}
            >
        {stories.map((story, index) => (
          <Story
            key={index}
            {...story}
            onClick={() => console.log(`Story ${index} clicked`)}
          />
        ))}
      </div>

            {/* Right Arrow */}
            {canScrollRight && (
              <button 
                onClick={() => scrollStories('right')}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white opacity-70 rounded-full p-1 shadow-md hover:bg-gray-50"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>

            {/*Posting Section */}

              <div className=" bg-white font-fontsm flex justify-around  rounded-xl">
                <button className="flex items-center px-2 py-3"  onClick={() => popupOpen("Post")}>
                <img src={question} alt="" />
                <p className="text-xs pl-1 text-gray-600">Add Post</p>
                </button>
                <button 
                  className="flex items-center px-2 py-3"
                  onClick={() => popupOpen("Question")}
                >
                  <img src={question} alt="" />
                  <p className="text-xs pl-1 text-gray-600">Ask Question </p>
                </button>
                <button className="flex items-center px-2 py-3"  onClick={() => popupOpen("Resource")}>
                <img src={question} alt="" />
                <p className="text-xs text-gray-600 pl-1">Add Resources</p>
                </button>

                <PostPopup
              isOpen={isOpen}
              onTypeChange={setPostType1}
              onClose={() => setIsOpen(false)}
              userAvatar={profileData.avatar}  postType1={postType1}                />
              </div>
          {/* Posts */}
          <div className="space-y-4 mb-16 lg:mb-1">
        <Post
          avatar="https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
              name="Seelam Yamshidharm"
              bio="Ophthalmologist | AIIMS Delhi'25 | Asp"
          timeAgo="3 days ago"
          title="Ophthalmology: The Future of Eye Care"
          content="Ophthalmology has seen incredible advancements in recent years, particularly in surgical techniques and diagnostic tools. The field continues to evolve with new technologies and treatment methods, promising better outcomes for patients."
          images={[
            "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
            "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
            "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
            "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
          ]}
          likes={120}
          comments={64}
          shares={37}
          reposts={51}
          onLike={() => console.log("Like clicked")}
          onComment={() => console.log("Comment clicked")}
          onShare={() => console.log("Share clicked")}
          onRepost={() => console.log("Repost clicked")}
          onMoreOptions={() => console.log("More options clicked")}
        />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-[300px] flex-shrink-0 font-fontsm">
          <div className="sticky top-[calc(theme(spacing.24)+1px)] space-y-4">
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
        
        {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0  bg-white border-t  w-full">
        <Navigation />
      </div>
      </div>

      
    </div>
  );
};