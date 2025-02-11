import * as React from "react";
import { StoriesPopup } from "./StoriesPopup";

type MediaType = "image" | "video";

interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  media: {
    id: string;
    type: MediaType;
    url: string;
    duration: number;
  }[];
  uploadTime: string;
  isViewed: boolean;
  isLiked?: boolean;
}

interface StoriesProps {
  stories: Story[];
}
interface ProfileData {
  userId:string;
  name: string;
  avatar: string;
 
}

export const Stories: React.FC<StoriesProps> = ({ stories }) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = React.useState<number | null>(null);
  const [localStories, setLocalStories] = React.useState<Story[]>(stories);



const [hasMyStory, setHasMyStory] = React.useState(false); // Track if the user has a story


const [profileData] = React.useState<ProfileData>({
  userId:"123",
  name: "Noah Anderson",
  avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
 
});

const myStoryIndex = stories.findIndex(story => story.userId === profileData.userId); // Find user story index
  

    const handleMyStoryClick = () => {
      const myStoryIndex = stories.findIndex(story => story.userId === profileData.userId); // Find user story index
      
      if (myStoryIndex !== -1) {
        // If I have a story, play it
        setSelectedStoryIndex(myStoryIndex);
      } else {
        // If I don't have a story, open modal or trigger new story addition
        console.log("Open story creation modal");
        // Example: openStoryCreationModal();
      }
    };


  React.useEffect(() => {
    setLocalStories(stories);
  }, [stories]);

  const handleStoryClick = (index: number) => {
    setSelectedStoryIndex(index);
  };

  const handleCloseStories = () => {
    setSelectedStoryIndex(null);
  };

  const handleStoryView = (storyId: string) => {
    setLocalStories(prev => 
      prev.map(story => 
        story.id === storyId 
          ? { ...story, isViewed: true }
          : story 
      )
    );
  };

  const handleLikeStory = (storyId: string) => {
    setLocalStories(prev => 
      prev.map(story => 
        story.id === storyId 
          ? { ...story, isLiked: !story.isLiked }
          : story
      )
    );
  };
  
  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-4">
       
        <div className="flex gap-2 overflow-x-auto  scrollbar-hide">
        <div
              className="flex-shrink-0 cursor-pointer transition-transform duration-200 hover:scale-105 relative"
              onClick={() => hasMyStory ? handleStoryClick(myStoryIndex) : handleMyStoryClick()} 
            >
              <div 
                className={`w-16 h-16 rounded-full border-2 border-white relative ${
                  hasMyStory ? 'p-[2px] bg-gradient-to-r from-yellow-600 via-yellow-600 to-yellow-600' : ''
                }`}
              >
                <img
                  src={profileData.avatar} // Replace with user's profile image
                  alt="My Story"
                  className="w-full h-full rounded-full object-cover"
                />
                {!hasMyStory && (
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full flex items-center pb-1 justify-center border-2 border-white">
                    <span className="text-white text-xl leading-none">+</span>
                  </div>
                )}
              </div>
              <p className="mt-1 text-[13px] text-gray-900 text-center truncate w-14">You</p>
            </div>
          
          {localStories.map((story, index) => (
            <div 
              key={story.id}
              className="flex-shrink-0 cursor-pointer transition-transform duration-200 hover:scale-105 relative" 
              onClick={() => handleStoryClick(index)}
            >
              <div 
                className={`w-16 h-16 rounded-full p-[2px] ${
                  story.isViewed 
                    ? 'bg-gray-200' 
                    : 'bg-gradient-to-r from-yellow-600 via-yellow-600 to-yellow-600'
                }`}
              >
                <img
                  src={story.userAvatar}
                  alt={story.userName}
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
              </div>
              <p className="mt-1 text-[13px] text-gray-900 text-center truncate w-14">
                {story.userName}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedStoryIndex !== null && (
        <StoriesPopup
          stories={localStories}
          initialStoryIndex={selectedStoryIndex}
          onClose={handleCloseStories}
          onStoryView={handleStoryView}
          onLikeStory={handleLikeStory}
        />
      )}
    </>
  );
};
