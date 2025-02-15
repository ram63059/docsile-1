import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface Person {
  id: number;
  avatar: string;
  name: string;
  title: string;
  mutualConnection:string;
  mutualCount:number
}

const ConnectionCard1: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

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
    
    }
  ];

  const displayedPeople = isExpanded ? peopleData : peopleData.slice(0, 2);

  return (
    <div className="  m-4 mx-auto border w-full border-gray-100 rounded-lg shadow-md   font-fontsm">
      <div className="flex justify-between  items-center px-3 rounded-t-xl py-2">
        <div className="text-md text-gray-700">
            Start connecting to interact and grow your network 
        </div>
        
      </div>
      <div
        className={`  px-4 pt-4  transition-all duration-300 ${isExpanded ? "max-h-[1000px]" : "max-h-[220px]"} overflow-hidden`}
      >
        {displayedPeople.map((person) => (
          <div
            key={person.id}
            className="flex items-center  justify-between mb-3 pb-3 border border-gray-200  shadow-sm rounded-xl w-full p-3"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3">
                <div className="text-xs font-medium">{person.name}</div>
                <div className="text-xs text-gray-500  line-clamp-1">
                  {person.title}
                </div>
                <div className="flex flex-row items-center  mb-2 pt-2">
                    <div className="w-4 h-4 rounded-full"><img src={person.avatar} alt="" /></div>
                    <div className="text-fontlit text-gray-400 pl-1 ">
                        {person.mutualConnection} and {person.mutualCount} mutual connections
                    </div>
                </div>
              
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-1 text-xs text-white bg-maincl rounded-xl transition-colors hover:bg-opacity-90">
                follow
              </button>
             
            </div>
          </div>
        ))}

          
      </div>

      <div
          className="text-xs text-gray-400  pb-3 cursor-pointer flex items-center justify-center gap-1"
          onClick={toggleExpand}
        >
          {isExpanded ? (
            <span className="flex items-center">
              Show Less <ChevronUp className="w-4 h-4" />
            </span>
          ) : (
            <span className="flex items-center">
              See More <ChevronDown className="w-4 h-4" />
            </span>
          )}
        </div>
    </div>
  );
};

export default ConnectionCard1;
