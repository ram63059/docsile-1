import { useState, useRef } from 'react';
import { Header } from './Header';
import { X } from 'lucide-react';
import { SearchBar } from './SearchBar';
import rating from "../../assets/icon/rating.svg"

interface Mentor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  mutualConnection: string;
  mutualCount: number;
  timeAgo?: string;
  region: string;
  institute: string;
  organization: string;
  speciality:string;
}

const MentorshipPage = () => {
  const [showAllRegions, setShowAllRegions] = useState(false);
  const [showAllInstitutes, setShowAllInstitutes] = useState(false);
  const [showAllOrganizations, setShowAllOrganizations] = useState(false);
  const [showAllSpeciality, setShowAllSpeciality] = useState(false);

  const scrollContainerRefs = useRef<{
    [key: string]: HTMLDivElement | null;
  }>({});

  // Sample data
  const MentorData: Mentor[] = Array(10).fill(null).map((_, i) => ({
    id: `mentor-${i}`,
    avatar:"https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    name: 'Nampally Sriram',
    title: 'Ophthalmologist | AIIMS Delhi`25 |Aspiring Medical',
    mutualConnection: 'Bruhath Nimmani ',
    rating:4.9,
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
    filterKey: keyof Mentor,
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
          {MentorData
            .filter((mentor) => mentor[filterKey] === filterValue)
            .slice(0, showAll ? undefined : 3 )
            .map((mentor) => (
              <div key={mentor.id} className="min-w-[150px] relative flex-shrink-0 shadow-lg border border-gray-100 rounded-2xl">
                <button
                  className="absolute right-1 top-1 bg-white rounded-full p-1 hover:bg-gray-100 transition-colors"
                  aria-label="Remove suggestion"
                >
                  <X className="w-3 h-3 text-gray-400" />
                </button>


                <div className="w-36  text-center   rounded-2xl flex flex-col justify-center items-center mb-2 px-2 py-3">
                  <div>
                  <img src={mentor.avatar} alt="" className='w-12 h-12' />
                  </div>
                <div className="text-xs font-medium pt-4 line-clamp-1">{mentor.name}</div>
                <div className="text-fontlit text-gray-500 mb-1 px-2 line-clamp-2">{mentor.title}</div>
                <div className='flex justify-center flex-row items-center pt-1'>
                    <span><img src={rating} alt="" /></span>
                     <p className='text-fontlit font-normal pl-1'> {mentor.rating} </p>
                     </div>
                
                     <button className="mt-2 py-1 px-5 text-xs text-fillc  ">
                  View Profile
                </button>
                  </div>
               
               
              </div>
            ))}
        </div>
      </div>
    );
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const handleAddMentor = () => {
    console.log("Asking new question");
  };

  return (
    <div className="flex flex-col min-h-screen max-w-[480px] mx-auto font-fontsm p-4">
      {/* Header */}
      <Header
        onNotification={() => console.log('Notification clicked')}
        onMessage={() => console.log('Message clicked')}
        onProfile={() => console.log('Profile clicked')}
      />


        <SearchBar onSearch={handleSearch} onAddMentor={handleAddMentor} /> 
      

     

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

        
        
      {/* More Suggestions */}
      <div className="px-4 mt-8 ">
        <div className='mb-6'>
        <h2 className="text-sm text-gray-700 mb-4">More Suggestions for you</h2>
        </div>
        <div className="overflow-x-auto  grid grid-cols-2 gap-2 ">
          {MentorData.slice(0, 4).map((mentor) => (
            <div 
              key={mentor.id} 
              className="flex bg-white rounded-xl shadow-sm border border-gray-100  flex-col text-center"
            > <div className='relative'>
               <button
                    className="absolute right-2 top-2 bg-white rounded-full p-1.5 hover:bg-gray-100"
                    aria-label="Remove suggestion"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                    <div className='flex justify-center pt-4 items-center '>

                    
                  <img src={mentor.avatar} alt="" className=' w-16' />
                  </div>    
              </div>
              
              <div className="ml-3 flex-1 mt-3">
                <div className="flex justify-between ">
                  <div>
                    <h3 className="font-medium text-sm">{mentor.name}</h3>
                    <p className="text-fontlit text-gray-500 mt-1 px-2 line-clamp-2">{mentor.title}</p>

                    <div className='flex justify-center flex-row items-center pt-1'>
                    <span><img src={rating} alt="" /></span>
                     <p className='text-fontlit font-normal pl-1'> {mentor.rating} </p>
                     </div>
                
                  </div>
                 
                </div >
                <div className='mb-3'>
                <button className="mt-2 py-1 px-5 text-xs text-fillc  ">
                  View Profile
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



    </div>
  );
};

export default MentorshipPage;
