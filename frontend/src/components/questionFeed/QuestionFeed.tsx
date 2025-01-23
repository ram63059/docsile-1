import * as React from "react";
import { Header } from "./Header";
import { SearchBar } from "./SearchBar";


import { Navigation } from "./Navigation";
import { QuestionPost } from "./questionPost";
import FilterButtons from "./FilterButtons";

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

export const QuestionFeed: React.FC = () => {



  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);

  const [profileData] = React.useState<ProfileData>({
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

  const videoData = [
    { videoImage:  "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08", avatarImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
    { videoImage:  "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08", avatarImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
    { videoImage:  "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08", avatarImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
    { videoImage:  "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08", avatarImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
    { videoImage:  "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08", avatarImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
      ];
  
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const handleAskQuestion = () => {
    console.log("Asking new question");
  };

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

  const onAskQuestion= ()=>{
    console.log("asking a Question")
  }

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
 
  return (
    <div className="flex flex-col min-h-screen  mx-auto  ">

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
         <div className="hidden lg:block w-[300px] flex-shrink-0 font-fontsm">
          <div className="top-[calc(theme(spacing.24)+1px)] space-y-6">
            {/* Profile Card */}
            <div className="bg-fillc bg-opacity-10 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col items-center">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-20 h-20 rounded-full mb-3"
                />
                <h2 className="text-base font-semibold text-gray-900 mb-0.5"><span className="text-fillc font-semibold bg-fillc bg-opacity-30 px-2 mr-1 rounded-lg">Dr.</span>
                  {profileData.name}
                </h2>
                <p className="text-sm text-gray-600 mb-1">{profileData.title}</p>
                <p className="text-xs text-gray-500 text-center mb-5">
                  {profileData.bio}
                </p>

                <div className="grid grid-cols-3 w-full gap-4 text-center  border-t pt-4">
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



        <div className="flex-1 max-w-[480px] mx- w-full ">
           <div className=" bg-white font-fontsm flex justify-around  rounded-xl">
               <div className="lg:hidden w-full">
                  <SearchBar onSearch={handleSearch} onAddPost={handleAskQuestion} />

               </div>


               <div className="hidden lg:block w-full">
              <div className="border border-gray-100 flex  px-5 items-center py-5 rounded-xl shadow-sm gap-4  "  onClick={onAskQuestion}>
                  <img src={profileData.avatar} className="w-8" alt="" />
                  <p className="text-gray-400"> what would you like to ask?</p>
                  <button
                      
                       className="flex gap-2 justify-center items-center self-stretch py-1.5 pr-3 pl-1.5 my-auto text-xs text-white rounded-2xl bg-maincl min-h-[29px] hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
                        aria-label="Add post"
                    >
                   <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ee2fecfef7edf0f14d1ab33f1ada2f9d06a0c54e3ab3d353dc2c647c253134f?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
                    className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                    alt="Add post icon"
                        />
                  <span>Ask Question</span>
              </button>
              </div>
              </div>
              

           </div>
           <div className="w-full">
              <FilterButtons/>

           </div>

           <QuestionPost  
                  isUrgent={true} 
                  avatar="https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
                  name="Nampally Sriram"
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
                  agrees={120}
                  date={"22 dec 2024"}
                  comments={64}
                  shares={37}
                  reposts={51}
                  onAnswer={() => console.log("answer clicked")}
                  onComment={() => console.log("Comment clicked")}
                  onShare={() => console.log("Share clicked")}
                  onReply={() => console.log("Repost clicked")}
                  onMoreOptions={() => console.log("More options clicked")} 
                  answers={32} 
                  disagrees={54}    
            />


        </div>


                    {/* Right Sidebar */}
        <div className="hidden lg:block w-[340px] flex-shrink-0 font-fontsm">
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
      </div>


      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
        <Navigation />
      </div>
       
    
       
    </div>
  );
};
