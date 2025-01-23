import save1 from "../../assets/icon/save1.svg"
import save2 from "../../assets/icon/save2.svg"
import { useState } from 'react';
import time from "../../assets/icon/time.svg"
import location from "../../assets/icon/location.svg"
import money from "../../assets/icon/money.svg"

import job from "../../assets/icon/jobs.svg"
import job2 from "../../assets/icon/njob2.svg"
import resources from "../../assets/icon/resources.svg"
import resources2 from "../../assets/icon/nresources2.svg"
import cme from "../../assets/icon/cme.svg"
import cme2 from "../../assets/icon/ncme2.svg"
import membership from "../../assets/icon/membership.svg"
import membership2 from "../../assets/icon/nmembership2.svg"
import JobFilterStatic from './JobFilterCard';
import { Header } from "./Header";
import { HeaderL } from "./HeaderL";
import { SearchBar } from "./SearchBar";

interface Conference {
  id: string;
  title: string;
  avatar: string;
  date: string;
  time: string;
  image: string;
  amount: string;
  location: string;
  speaker: string;
  speciality: string;
  
}

const ConferencePage = () => {

  // Sample data for conferences
  const ConferenceData: Conference[] = Array(6).fill(null).map((_, i) => ({
    id: `Conference-${i}`,
    avatar:"https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",

    title: 'India Ophthalmology Forum: Advancing Eye Care Practices',
    date: '7 Jan 2025,Tuesday',
    time: '2:00pm-4:00pm',
    amount:'₹3000/person',
    speaker:'Thoman C Neylan, MD',
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08", // Replace with actual image URL
    location: 'Mira Road,Mumbai,Maharastra',
    speciality: 'Ophthamology',
  }));

  const [isSaved, setIsSaved] = useState(false);
  

  const renderConferenceSection = (title: string, conferences: Conference[]) => (
    <div className="mt-6 font-fontsm">
      <div className="flex justify-between items-center px-4 mb-4">
        <div className="text-sm text-gray-600">{title}</div>
        <button className="text-sm text-maincl">See all</button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 px-4">
        {conferences.map((conference) => (
          <div 
            key={conference.id} 
            className="bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <div className="relative">
              <img 
                src={conference.image} 
                alt={conference.speciality}
                className="w-full h-24 object-cover rounded-t-xl"
              />
              <img 
                src={conference.avatar} 
                alt="" 
                className='absolute left-4 -bottom-8 lg:top-4 w-16 h-16 rounded-lg '
              />
            </div>
    
            <div className="p-4">
              <div className='flex justify-between items-start mt-4 mb-2'>
                <p className="font-medium text-xs text-fillc">{conference.speciality}</p> 
                <img 
                  src={isSaved ? save2 : save1}  
                  onClick={() => setIsSaved(!isSaved)} 
                  alt="" 
                  className="cursor-pointer"
                />
              </div>

              <p className="text-sm font-medium text-gray-800 mb-3">
                {conference.title}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="text-xs text-gray-500 flex items-center">
                  <img src={time} alt="" className='w-3 mr-2'/> 
                  {conference.date}
                </div>
                <div className="text-xs text-gray-500 flex items-center">
                  <img src={location} alt="" className='w-3 mr-2'/> 
                  {conference.location}
                </div>
                <div className="text-xs text-gray-500 flex items-center">
                  <img src={money} alt="" className='w-3 mr-2'/> 
                  {conference.amount}
                </div>
              </div>

              <div className='mb-4'>
                <p className='text-xs font-medium text-gray-700'>Speaker: {conference.speaker}</p>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => {

                  }}
                  className="px-4 py-1.5 text-xs text-white bg-maincl rounded-xl hover:bg-blue-700"
                >
                  Register
                </button>
                <button 
                  onClick={() => {
                  }}
                  className="px-4 py-1.5 text-xs text-maincl border border-gray-200 rounded-xl hover:bg-gray-50"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const [selectedOption, setSelectedOption] = useState<string >("cme");

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const handleAdd = () => {
    console.log("Adding a conference");
  };
  

  return (
    <div className="flex flex-col min-h-screen mx-auto font-fontsm">
      {/* Header */}
      <div className='lg:hidden'>
        <Header
          onNotification={() => console.log('Notification clicked')}
          onMessage={() => console.log('Message clicked')}
          onProfile={() => console.log('Profile clicked')}
        />
      </div>

      <div className="hidden lg:block bg-white border-b sticky top-0 z-50">
        <HeaderL
          onNotification={() => console.log("Notification clicked")}
          onMessage={() => console.log("Message clicked")}
          onProfile={() => console.log("Profile clicked")}
          onSearch={() => console.log("Search clicked")}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 px-4 lg:pl-16 max-w-7xl mx-auto w-full gap-4 pt-2">
        {/* Left Sidebar */}
        <div className="hidden lg:block w-[230px] flex-shrink-0 font-fontsm">
          <div className="top-[calc(theme(spacing.24)+1px)] space-y-2">
            {/* Explore careers */}
            <p className="text-maincl font-medium mb-6 mt-4"> Explore Careers</p>

            <div
              className={`flex gap-3 p-2 cursor-pointer rounded-lg ${
                selectedOption === "jobs" ? "bg-fillc text-white rounded-lg" : "bg-buttonclr"
              }`}
              onClick={() => handleOptionSelect("jobs")}
            >
              <img
                src={selectedOption === "jobs" ? job2 : job}
                alt="Jobs"
              />
              <p>Jobs</p>
            </div>
            <div
              className={`flex gap-3 p-2 cursor-pointer rounded-lg ${
                selectedOption === "cme" ? "bg-fillc text-white rounded-lg" : "bg-buttonclr"
              }`}
              onClick={() => handleOptionSelect("cme")}
            >
              <img
                src={selectedOption === "cme" ? cme2 : cme}
                alt="Conference"
              />
              <p>Conference</p>
            </div>
            <div
              className={`flex gap-3 p-2 cursor-pointer rounded-lg ${
                selectedOption === "mentorship" ? "bg-fillc text-white " : "bg-buttonclr"
              }`}
              onClick={() => handleOptionSelect("mentorship")}
            >
              <img
                src={selectedOption === "mentorship" ? membership2 : membership}
                alt="Menotrship"
              />
              <p>Mentorship</p>
            </div>
            <div
              className={`flex gap-3 p-2 cursor-pointer rounded-lg ${
                selectedOption === "resources" ? "bg-fillc text-white rounded-lg" : "bg-buttonclr"
              }`}
              onClick={() => handleOptionSelect("resources")}
            >
              <img
                src={selectedOption === "resources" ? resources2 : resources}
                alt="Resources"
              />
              <p>Resources</p>
            </div>
          </div>
        </div>

        {/* Main Feed */}
        <div className="flex-1 max-w-[650px] mx- w-full ">
          <div className="lg:hidden">
            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} onAdd={handleAdd} />      
          </div>

          {/* Conferences recommended */}
      {renderConferenceSection(
        'Recommended for you',
        ConferenceData.slice(0, 3)
      )}

      {/* Conferences by Speciality */}
      {renderConferenceSection(
        'Conferences in Mumbai Metropolitan Region ',
        ConferenceData.slice(3, 6)
      )}  




          {/* More Suggestions */}
      <div className="px-4 mt-8 ">
        <div className='mb-6'>
        <h2 className="text-sm text-gray-700 mb-4">More Suggestions for you</h2>
        </div>
        <div className="overflow-x-auto   gap-2 ">
          {ConferenceData.slice(0, 4).map((Conference) => (
            <div 
            key={Conference.id} 
            className="min-w-[250px] bg-white rounded-xl shadow-md mb-3 border border-gray-100 "
          >
            <div className="relative ">
              <img 
                src={Conference.image} 
                alt={Conference.speciality}
                className="w-full h-20 object-cover rounded-t-xl"
              />
              
              <img src={Conference.avatar} alt="" className='absolute left-4 top-12 w-16' />
            </div>
    
            <div className="p-3 text-start ">
              <div className='flex  justify-between mt-8 mb-2'>
  
              
                  <p className="font-medium text-xs  text-fillc">{Conference.speciality}</p> 
  
               <img src={isSaved ? save2 : save1}  onClick={()=>setIsSaved(!isSaved)} alt="" />
  
              </div>
              {/* Description with line clamp */}
              <p className="text-xs text-gray-800 mt-1 line-clamp-2">
                {Conference.title}
              </p>
              
              {/* Mutual info with line clamp */}
              <div className="flex flex-col items- mb-2 pt-2">
                
                <div className="text-fontlit text-gray-400 pt-1 line-clamp-2 flex">
                 <img src={time} alt=""  className='w-3 mr-1'/> {Conference.date} @ {Conference.time}
                </div>
                <div className="text-fontlit text-gray-400 pt-1 line-clamp-2 flex">
                 <img src={location} alt="" className='w-3 mr-1'/> {Conference.location}
                </div>
                <div className="text-fontlit text-gray-400 pt-1 line-clamp-2 flex">
                 <img src={money} alt="" className='w-3 mr-1'/> {Conference.amount}
                </div>
                <div className='mt-3'>
                  <p className='text-xs font-medium text-gray-700'>Speaker:{Conference.speaker} </p>
                </div>
              </div>
              
              <button className="mt-2 py-1 px-4 mr-1 text-xs text-white bg-maincl rounded-xl font-light">
                Register
              </button>
              <button className="mt-2 py-1 px-2 text-xs  text-maincl border border-gray-100 rounded-xl font-light">
                View Details
              </button>
            </div>
          </div>
          ))}
        </div>
      </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-[320px] flex-shrink-0 font-fontsm">
          <div className="sticky top-[calc(theme(spacing.24)+1px)] space-y-4">
            <JobFilterStatic/>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default ConferencePage;