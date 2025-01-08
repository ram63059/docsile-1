import { useState } from 'react';
import { Header } from './Header';
import { X } from 'lucide-react';
import { Navigation } from './Navigation';

interface Community {
  id: string;
  name: string;
  description: string;
  avatar:string;
  mutualConnection: string;
  mutualCount: number;
  image: string;
  region: string;
  speciality?: string;
}

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('Community');

  // Sample data for communities
  const communitiesData: Community[] = Array(6).fill(null).map((_, i) => ({
    id: `community-${i}`,
    name: 'Visionary Circle',
    avatar:"https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",

    description: 'Hub for eye care professionals to connect...',
    mutualConnection: 'Bruhath Nimmani ',
    mutualCount: 56,
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08", // Replace with actual image URL
    region: 'Mumbai Metropolitan Region',
    speciality: i > 2 ? 'Ophthalmology' : undefined
  }));

  const renderCommunitySection = (title: string, communities: Community[]) => (
    <div className="mt-6 font-fontsm">
      <div className="flex justify-between items-center px-4 mb-4">
        <div className="text-sm text-gray-600">{title}</div>
        <button className="text-sm text-maincl">See all</button>
      </div>
      
      <div className="flex overflow-x-auto scrollbar-hide px-4 space-x-4">
        {communities.map((community) => (
          <div 
            key={community.id} 
            className="min-w-[180px] bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <div className="relative ">
              <img 
                src={community.image} 
                alt={community.name}
                className="w-full h-16 object-cover rounded-t-xl"
              />
              <button
                className="absolute right-2 top-2 bg-white rounded-full p-1.5 hover:bg-gray-100"
                aria-label="Remove suggestion"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
              <img src={community.avatar} alt="" className='absolute right-14 top-8 w-16' />
            </div>

            <div className="p-3 text-center pt-10">
              <h3 className="font-medium text-sm">{community.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{community.description}</p>
              <div className="flex flex-row items-center  mb-2 pt-3">
                  <div className="w-7 h-7 rounded-full"><img src={community.avatar} alt="" /></div>
                  <div className="text-fontlit text-gray-400  ">
                    {community.mutualConnection} and {community.mutualCount} mutual connections
                  </div>
                </div>
              <button className=" mt-3 py-1 px-6 text-sm text-white bg-maincl rounded-xl font-light">
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen max-w-[480px] mx-auto font-fontsm">
      {/* Header */}
      <Header
        onNotification={() => console.log('Notification clicked')}
        onMessage={() => console.log('Message clicked')}
        onProfile={() => console.log('Profile clicked')}
      />

      {/* Search Bar */}
      <div className="px-4 py-2">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex px-4 space-x-4 mt-2">
        {['People', 'Community', 'Organization'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
              activeTab === tab
                ? 'text-white bg-maincl'
                : 'text-maincl bg-blue-50 hover:bg-blue-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Communities by Region */}
      {renderCommunitySection(
        'Communities you may know in Mumbai Metropolitan Region',
        communitiesData.slice(0, 3)
      )}

      {/* Communities by Speciality */}
      {renderCommunitySection(
        'Communities in the Ophthalmology Speciality',
        communitiesData.slice(3, 6)
      )}

      {/* More Suggestions */}
      <div className="px-4 mt-6">
        <h2 className="text-sm text-gray-700 mb-4">More Suggestions for you</h2>
        <div className="space-y-4 grid grid-cols-2">
          {communitiesData.slice(0, 4).map((community) => (
            <div 
              key={community.id}
              className="flex bg-white rounded-xl shadow-sm border border-gray-100 p-3"
            >
              <img 
                src={community.image}
                alt={community.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-sm">{community.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{community.description}</p>
                    <div className="flex items-center mt-2">
                      <div className="w-5 h-5 rounded-full bg-gray-200"></div>
                      <span className="text-xs text-gray-400 ml-2">{community.mutualCount}</span>
                    </div>
                  </div>
                  <button
                    className="p-1.5 hover:bg-gray-100 rounded-full"
                    aria-label="Remove suggestion"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <button className="mt-2 py-1.5 px-4 text-sm text-white bg-blue-600 rounded-full hover:bg-blue-700">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default CommunityPage; 