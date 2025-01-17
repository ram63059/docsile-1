import { useState } from 'react';
import { Header } from './Header';
import { X } from 'lucide-react';
import { Navigation } from './Navigation';

interface Organization {
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

const OrganizationPage = () => {
  const [activeTab, setActiveTab] = useState('Organization');

  // Sample data for communities
  const OrganizationData: Organization[] = Array(6).fill(null).map((_, i) => ({
    id: `Organization-${i}`,
    name: 'Visionary Circle',
    avatar:"https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",

    description: 'Hub for eye care professionals to connect...',
    mutualConnection: 'Bruhath Nimmani ',
    mutualCount: 56,
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08", // Replace with actual image URL
    region: 'Mumbai Metropolitan Region',
    speciality: i > 2 ? 'Ophthalmology' : undefined
  }));

  const renderOrganizationSection = (title: string, organisations: Organization[]) => (
    <div className="mt-6 font-fontsm">
    <div className="flex justify-between items-center px-4 mb-4">
      <div className="text-sm text-gray-600">{title}</div>
      <button className="text-sm text-maincl">See all</button>
    </div>
    
    <div className="flex overflow-x-auto scrollbar-hide px-4 space-x-4">
      {organisations.map((Organization) => (
        <div 
          key={Organization.id} 
          className="min-w-[160px] bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="relative ">
            <img 
              src={Organization.image} 
              alt={Organization.name}
              className="w-full h-16 object-cover rounded-t-xl"
            />
            <button
              className="absolute right-2 top-2 bg-white rounded-full p-1.5 hover:bg-gray-100"
              aria-label="Remove suggestion"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
            <img src={Organization.avatar} alt="" className='absolute right-12 top-8 w-16' />
          </div>
  
          <div className="p-3 text-center pt-10">
            <h3 className="font-medium text-sm">{Organization.name}</h3>
            
            {/* Description with line clamp */}
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
              {Organization.description}
            </p>
            
            {/* Mutual info with line clamp */}
            <div className="flex flex-row items-center mb-2 pt-2 px-3">
              <div className="w-7 h-7 rounded-full">
                <img src={Organization.avatar} alt="" />
              </div>
              <div className="text-fontlit text-gray-400 ml-2 line-clamp-2">
                {Organization.mutualConnection} and {Organization.mutualCount} mutual connections
              </div>
            </div>
            
            <button className="mt-2 py-1 px-6 text-sm text-white bg-maincl rounded-xl font-light">
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

      {/* organizations by Region */}
      {renderOrganizationSection(
        'Communities you may know in Mumbai Metropolitan Region',
        OrganizationData.slice(0, 3)
      )}

      {/* organizations by Speciality */}
      {renderOrganizationSection(
        'Communities in the Ophthalmology Speciality',
        OrganizationData.slice(3, 6)
      )}

      {/* More Suggestions */}
      <div className="px-4 mt-8 ">
        <div className='mb-6'>
        <h2 className="text-sm text-gray-700 mb-4">More Suggestions for you</h2>
        </div>
        <div className="overflow-x-auto  grid grid-cols-2 gap-2 ">
          {OrganizationData.slice(0, 4).map((Organization) => (
            <div 
              key={Organization.id} 
              className="flex bg-white rounded-xl shadow-sm border border-gray-100  flex-col text-center"
            > <div className='relative'>

              
              <img 
                src={Organization.image}
                alt={Organization.name}
                className="w-full h-20 rounded-lg object-cover"
              />

               <button
                    className="absolute right-2 top-2 bg-white rounded-full p-1.5 hover:bg-gray-100"
                    aria-label="Remove suggestion"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>

                  <img src={Organization.avatar} alt="" className='absolute right-16 top-10 w-16' />
              </div>
              
              <div className="ml-3 flex-1 mt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-sm">{Organization.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 px-4 line-clamp-2">{Organization.description}</p>
                    <div className="flex flex-row items-center  mb-2 pt-2 px-5 ">
                  <div className="w-7 h-7 rounded-full"><img src={Organization.avatar} alt="" /></div>
                  <div className="text-fontlit text-gray-400 line-clamp-2  ">
                    {Organization.mutualConnection} and {Organization.mutualCount} mutual connections
                  </div>
                </div>
                  </div>
                 
                </div >
                <div className='mb-3'>
                <button className="mt-2 py-1 px-5 text-sm text-white bg-maincl   rounded-xl">
                  Join
                </button>
                </div>
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

export default OrganizationPage; 