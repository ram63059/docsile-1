import { useState, useRef } from 'react';
import { Header } from './Header';
import { X } from 'lucide-react';
import seemore from "../../assets/icon/seemore.svg";
import { Navigation } from './Navigation';
import cancel from "../../assets/icon/cancel.svg"

interface Person {
  id: string;
  name: string;
  title: string;
  avatar: string;
  mutualConnection: string;
  mutualCount: number;
  timeAgo?: string;
  region: string;
  institute: string;
  organization: string;
  speciality:string;
}

const Networkpage = () => {
  const [activeTab, setActiveTab] = useState('People');
  const [showAllRegions, setShowAllRegions] = useState(false);
  const [showAllInstitutes, setShowAllInstitutes] = useState(false);
  const [showAllOrganizations, setShowAllOrganizations] = useState(false);
  const [showAllSpeciality, setShowAllSpeciality] = useState(false);

  const scrollContainerRefs = useRef<{
    [key: string]: HTMLDivElement | null;
  }>({});

  // Sample data
  const peopleData: Person[] = Array(10).fill(null).map((_, i) => ({
    id: `person-${i}`,
    avatar:"https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    name: 'Nampally Sriram',
    title: 'Ophthalmologist | AIIMS Delhi`25 |Aspiring Medical',
    mutualConnection: 'Bruhath Nimmani ',
    mutualCount: 56,
    timeAgo: '3 days ago',
    region: 'Mumbai Metropolitan Region',
    institute: 'AIIMS Delhi',
    organization:'telangana organization',
    speciality:'Ophthalmology Speciality'
  }));

  const handleTouchScroll = (container: HTMLDivElement | null) => {
    let startX: number;
    let scrollLeft: number;

    if (!container) return;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!startX) return;
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener('touchstart', onTouchStart);
    container.addEventListener('touchmove', onTouchMove);

    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
    };
  };

  const toggleShowAll = (type: 'region' | 'organization'|'institute' |'speciality'  ) => {
    if (type === 'region') {
      setShowAllRegions((prev) => !prev);
    } else if(type==='institute') {
      setShowAllInstitutes((prev) => !prev);
    }else if(type==='organization') {
      setShowAllOrganizations((prev)=>!prev)
    }else{
      setShowAllSpeciality((prev)=>!prev)
    }
  };

  const renderPeopleSection = (
    title: string,
    filterKey: keyof Person,
    filterValue: string,
    showAll: boolean,
    toggleShowAllCallback: () => void
  ) => {
    return (
      <div className="px-4 py-3">
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm text-gray-600">People you may know from {title}</div>
          <button
            onClick={toggleShowAllCallback}
            className="text-xs text-maincl hover:text-fillc"
          >
            {showAll ? 'Show less' : 'See all'}
          </button>
        </div>

        <div
          ref={(el) => {
            scrollContainerRefs.current[title] = el;
            if (el) handleTouchScroll(el);
          }}
          className="flex space-x-3 overflow-x-auto scrollbar-hide relative scroll-smooth"
        >
          {peopleData
            .filter((person) => person[filterKey] === filterValue)
            .slice(0, showAll ? undefined : 3 )
            .map((person) => (
              <div key={person.id} className="min-w-[150px] relative flex-shrink-0 shadow-lg border border-gray-100 rounded-2xl">
                <button
                  className="absolute right-1 top-1 bg-white rounded-full p-1 hover:bg-gray-100 transition-colors"
                  aria-label="Remove suggestion"
                >
                  <X className="w-3 h-3 text-gray-400" />
                </button>


                <div className="w-44  text-center   rounded-2xl flex flex-col justify-center items-center mb-2 px-2 py-3">
                  <div>
                  <img src={person.avatar} alt="" className='w-16 h-16' />
                  </div>
                <div className="text-xs font-medium pt-4">{person.name}</div>
                <div className="text-fontlit text-gray-500 mb-1">{person.title}</div>
                <div className="flex flex-row items-center  mb-2 pt-3">
                  <div className="w-7 h-7 rounded-full"><img src={person.avatar} alt="" /></div>
                  <div className="text-fontlit text-gray-400  ">
                    {person.mutualConnection} and {person.mutualCount} mutual connections
                  </div>
                </div>
                <button className=" py-1.5 px-3 text-xs text-white  bg-maincl rounded-3xl transition-colors">
                  Follow
                </button>
                  </div>
               
               
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen max-w-[480px] mx-auto font-fontsm p-4">
      {/* Header */}
      <Header
        onNotification={() => console.log('Notification clicked')}
        onMessage={() => console.log('Message clicked')}
        onProfile={() => console.log('Profile clicked')}
      />

      {/* Search Bar */}
      <div className="px-4 py-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-3xl text-sm"
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex px-4 space-x-4 mt-2 bg-white z-10">
        {['People', 'Community', 'Organization'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 text-sm rounded-full transition-colors  ${
              activeTab === tab
                ? 'text-white bg-fillc'
                : 'text-fillc bg-buttonclr hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Invitations Section */}
      <div className="m-4 mt-6 container mx-auto">
  <div className="flex justify-between bg-buttonclr items-center px-3 rounded-t-2xl py-2">
    <div className="text-sm text-fillc">Invitations (37)</div>
    <div className="text-xs text-gray-400 cursor-pointer">
      <img src={seemore} alt="See More" />
    </div>
  </div>
  <div className="border border-gray-100 rounded-b-2xl shadow-lg px-4 py-4">
    {peopleData.slice(0, 2).map((person) => (
      <div key={person.id} className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full"> <img src={person.avatar} alt="" /></div>
          <div className="ml-3">
            <div className="text-xs font-medium">{person.name}</div>
            <div
              className="text-xs text-gray-500 truncate"
              style={{ maxWidth: '100px' }} 
            >
              {person.title}
            </div>
            <div className="text-xs text-gray-400">{person.timeAgo}</div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-1 text-xs text-white bg-maincl rounded-xl  transition-colors">
            Confirm
          </button>
          <button className="px-4 py-1 text-xs text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
            Deny
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* People Sections */}
      {renderPeopleSection(
        'Mumbai Metropolitan Region',
        'region',
        'Mumbai Metropolitan Region',
        showAllRegions,
        () => toggleShowAll('region')
      )}
      {renderPeopleSection(
        'Institute Name',
        'institute',
        'AIIMS Delhi',
        showAllInstitutes,
        () => toggleShowAll('institute')
      )}
      {renderPeopleSection(
        'Organization Name',
        'organization',
        'telangana organization',
        showAllOrganizations,
        () => toggleShowAll('organization')
      )}
      {renderPeopleSection(
        'speciality Name',
        'speciality',
        'Ophthalmology Speciality',
        showAllSpeciality,
        () => toggleShowAll('speciality')
      )}

        
        <div className="m-4 mt-6 container  mx-auto">
        <div className="text-sm text-gray-700 pl-4 pb-2">more suggestions for you</div>
          {peopleData.map((person) => (
            <div key={person.id} className=' rounded-2xl border border-gray-150  shadow-md my-5 m-3'>
              <div className='min-w-[150px] relative flex-shrink-0 shadow-lg  rounded-2xl'>
              <button
                  className="absolute right-1 top-1 bg-white rounded-full p-1 hover:bg-gray-100 transition-colors"
                  aria-label="Remove suggestion"
                >
                  <img src={cancel} alt="" className='w-5' />
                 
                </button>
              </div>
              <div className='flex flex-row justify-evenly'>
                <div className='flex items-center justify-start'>
                    <img src={person.avatar} alt="" className='w-12' />
                </div>
                <div className='flex flex-col'>
                  <div className="text-xs font-medium pt-4">{person.name}</div>
                  <div className="text-fontlit font-light text-gray-500 mb-1">{person.title}</div>
                  <div className="flex flex-row items-start mb-2 pt-3 ">
                    <div className="w-7 h-7 rounded-full">
                      <img src={person.avatar} alt="" className='w-5' />
                    </div>
                    <div className="text-fontlit text-gray-400 items-center flex">
                      {person.mutualConnection} and {person.mutualCount} mutual connections
                    </div>
                  </div>
                </div>
                <div className='flex flex-col justify-end pb-3'>
                  <div>
                  <button className="py-1.5 px-3 text-xs text-white bg-maincl rounded-3xl transition-colors">
                    Follow
                  </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      



      {/* Bottom Navigation */}
     <Navigation/>
    </div>
  );
};

export default Networkpage;
