import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Person {
  id: number;
  name: string;
  title: string;
  avatar: string;
  mutualConnection: string;
  mutualCount: number;
}



const ConnectionCard2: React.FC = () => {



    const peopleData: Person[] = [
        {
          id: 1,
          avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
          name: 'Vamshidhar seelam',
            title: 'Ophthalmologist | AIIMS Delhi`25 |Aspiring Medical',
            mutualConnection:'bhanu',
            mutualCount:88
        },
        {
          id: 2,
          avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
          name: 'Vamshidhar seelam',
        title: 'Ophthalmologist | AIIMS Delhi`25 |Aspiring Medical',
        mutualConnection:'bhanu',
        mutualCount:69
        
        },
        {
          id: 3,
          avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
          name: 'Vamshidhar seelam',
            title: 'Ophthalmologist | AIIMS Delhi`25 |Aspiring Medical',
            mutualConnection:'bhanu',
            mutualCount:88
        },
        {
          id: 4,
          avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
          name: 'Vamshidhar seelam',
        title: 'Ophthalmologist | AIIMS Delhi`25 |Aspiring Medical',
        mutualConnection:'bhanu',
        mutualCount:69
        
        }
      ];
  const [showAll, setShowAll] = useState<boolean>(false);
  const scrollContainerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleShowAll = () => setShowAll(!showAll);

  const handleScroll = (direction: 'left' | 'right', title: string) => {
    const container = scrollContainerRefs.current[title];
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="px-4 py-3 border border-gray-100 rounded-xl shadow-sm mb-4 font-fontsm">
      <div className="flex justify-between items-center mb-3">
        <div className="text-md text-gray-600">People you may know</div>
        <button
          onClick={toggleShowAll}
          className="text-xs text-maincl hover:text-fillc"
        >
          {showAll ? 'Show less' : 'See all'}
        </button>
      </div>
      <div className="relative">
        <button 
          onClick={() => handleScroll('left', 'connections')}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all duration-200 hidden ${showAll ? 'lg:flex' : ''} items-center justify-center`}
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div
          ref={(el) => (scrollContainerRefs.current['connections'] = el)}
          className={`flex space-x-3 overflow-x-auto scrollbar-hide relative scroll-smooth ${showAll ? 'px-2' : ''}`}
        >
          {peopleData.slice(0, showAll ? undefined : 5).map((person) => (
            <div key={person.id} className="relative min-w-[150px] flex-shrink-0 shadow-lg border border-gray-100 rounded-2xl p-2">
              <button className="absolute right-1 top-1 bg-white rounded-full p-1 hover:bg-gray-100 transition-colors">
                <X className="w-3 h-3 text-gray-400" />
              </button>
              <div className="w-40  flex flex-col items-center">
                <img src={person.avatar} alt={person.name} className="w-16 h-16 rounded-full" />
                <div className="text-xs font-medium pt-2 line-clamp-1">{person.name}</div>
                <div className="text-fontlit text-center text-gray-500 line-clamp-2">{person.title}</div>
                <div className="flex justify-center px-2   mb-2 pt-2">
                
                    <div className="text-fontlit flex  text-center text-gray-400  gap-0  line-clamp-2 ">
                       <img src={person.avatar} className='w-5 h-5 mr-1 ' alt="" />{person.mutualConnection} and {person.mutualCount} mutual connections
                    </div>
                </div>
                <button className="py-1.5 px-3 text-xs text-white bg-maincl rounded-3xl transition-colors mt-2">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => handleScroll('right', 'connections')}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all duration-200 hidden ${showAll ? 'lg:flex' : ''} items-center justify-center`}
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ConnectionCard2;
