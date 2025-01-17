import { Header } from './Header';
import { SearchBar } from './SearchBar';
import  save1 from "../../assets/icon/save1.svg"
import  save2 from "../../assets/icon/save2.svg"
import { useState } from 'react';
import time from "../../assets/icon/time.svg"
import location from "../../assets/icon/location.svg"
import money from "../../assets/icon/money.svg"
interface Conference {
  id: string;
  title: string;
  avatar:string;
  date: string;
  time: string;
  image: string;
  amount:string;
  location:string;
  speaker:string;
  speciality: string;
}

const ConferencePage = () => {

  // Sample data for communities
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
    
    <div className="flex overflow-x-auto scrollbar-hide px-4 space-x-4">
      {conferences.map((Conference) => (
        <div 
          key={Conference.id} 
          className="min-w-[250px] bg-white rounded-xl shadow-sm border border-gray-100"
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
  
  );

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const handleAdd = () => {
    console.log("Adding a conference");
  };
  

  return (
    <div className="flex flex-col min-h-screen max-w-[480px] mx-auto font-fontsm">
      {/* Header */}
      <Header
        onNotification={() => console.log('Notification clicked')}
        onMessage={() => console.log('Message clicked')}
        onProfile={() => console.log('Profile clicked')}
      />

      {/* Search Bar */}
         <SearchBar onSearch={handleSearch} onAdd={handleAdd} />      
     

     

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

      {/* Bottom Navigation */}
    </div>
  );
};

export default ConferencePage; 