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
import ConferenceDetails from './ConferenceDetails';

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
  description: string;
  organizer: string;
  highlights: string[];
  registration: {
    deadline: string;
    fees: {
      early: string;
      regular: string;
      virtual: string;
    }
  };
  contact: {
    email: string;
    phone: string;
  }
  schedule: {
    time: string;
    description: string;
    title?: string;
    speaker?: string;
  }[]
  panelists: {
    name: string;
    image: string;
    role: string;
    institute: string;
    expertise: string;
    notableWork: string;
  }[]
  reviews: {
    id: string;
    name: string;
    image: string;
    designation: string;
    date: string;
    rating: number;
    comment: string;
  }[]
  faqs: {
    id: string;
    question: string;
    answer: string;
  }[]
}

const ConferencePage = () => {

  // Sample data for conferences
  const ConferenceData: Conference[] = Array(6).fill(null).map((_, i) => ({
    id: `Conference-${i}`,
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    title: 'India Ophthalmology Forum: Advancing Eye Care Practices',
    date: '7 Jan 2025, Tuesday',
    time: '2:00pm - 4:00pm',
    amount: '₹3000/person',
    speaker: 'Thoman C Neylan, MD',
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    location: 'Mira Road, Mumbai, Maharashtra',
    speciality: 'Ophthalmology',
    description: "Global Advisory Institute of Ophthalmology offers exciting global insights into the latest developments in ophthalmology. The forum brings together leading experts and practitioners to discuss groundbreaking research, share innovative case studies, learn new techniques, and network with opportunities while engaging in meaningful discussions.",
    organizer: "Global Advisory Institute of Ophthalmology",
    highlights: [
      "Keynote Speech: 'Advances in Retinal Surgery: What's Next?' by Dr. Riya Sen, Head of Ophthalmology, VisionCare Institute",
      "Early Detection of Glaucoma",
      "Advanced Cataract Surgery Techniques",
      "Panel Discussion: 'Novel Challenges in Reducing Preventable Blindness'",
      "Research Showcase: Featuring over 50 research studies on ophthalmology innovations"
    ],
    registration: {
      deadline: "March 1, 2025",
      fees: {
        early: "₹5,000 (valid till February 15, 2025)",
        regular: "₹7,000",
        virtual: "₹3,500"
      }
    },
    contact: {
      email: "info@gioi2025.com",
      phone: "+91 98765 43210"
    },
    schedule: [
      {
        time: "9:00 AM - 10:00 AM",
        description: "Registration and Welcome Breakfast"
      },
      {
        time: "10:00 AM - 10:30 AM",
        description: "Opening Remarks by Dr. Rajesh Mehta",
        speaker: "Conference Chair"
      },
      {
        time: "10:30 AM - 12:00 PM",
        title: "Keynote Address",
        description: "Advances in Retinal Surgery: What's Next?",
        speaker: "Dr. Priya Sen"
      },
      {
        time: "12:00 PM - 1:30 PM",
        description: "Lunch Break"
      },
      {
        time: "1:30 PM - 3:00 PM",
        title: "Workshop 1",
        description: "AI in Early Detection of Glaucoma"
      },
      {
        time: "3:30 PM - 5:00 PM",
        title: "Panel Discussion",
        description: "Global Challenges in Reducing Preventable Blindness"
      },
      {
        time: "5:00 PM - 6:00 PM",
        description: "Networking Session"
      }
    ],
    panelists: [
      {
        name: "Dr. Priya Sen",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        role: "Head of Ophthalmology",
        institute: "VisionCare Institute",
        expertise: "Retinal surgery and AI-driven diagnostics",
        notableWork: "Developed innovative techniques in retinal repair; published over 50 papers."
      },
      {
        name: "Dr. Priya Sen",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        role: "Head of Ophthalmology",
        institute: "VisionCare Institute",
        expertise: "Retinal surgery and AI-driven diagnostics",
        notableWork: "Developed innovative techniques in retinal repair; published over 50 papers."
      },
      {
        name: "Dr. Priya Sen",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        role: "Head of Ophthalmology",
        institute: "VisionCare Institute",
        expertise: "Retinal surgery and AI-driven diagnostics",
        notableWork: "Developed innovative techniques in retinal repair; published over 50 papers."
      }
    ],
    reviews: [
      {
        id: "1",
        name: "Nampally Sriram",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08", 
        designation: "Ophthalmologist | AIIMS Delhi'23",
        date: "22 Dec 2024",
        rating: 4.5,
        comment: "Great opportunity for growth! The clinic is well-equipped, and the team is supportive. Perfect for honing optometry skills and building patient relationships."
      },
      {
        id: "2",
        name: "Nampally Sriram",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08", 
        designation: "Ophthalmologist | AIIMS Delhi'23",
        date: "22 Dec 2024",
        rating: 3.5,
        comment: "Great opportunity for growth! The clinic is well-equipped, and the team is supportive. Perfect for honing optometry skills and building patient relationships."
      },
      {
        id: "3",
        name: "Nampally Sriram",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08", 
        designation: "Ophthalmologist | AIIMS Delhi'23",
        date: "22 Dec 2024",
        rating: 4.5,
        comment: "Great opportunity for growth! The clinic is well-equipped, and the team is supportive. Perfect for honing optometry skills and building patient relationships."
      }
    ],
    faqs: [
      {
        id: "1",
        question: "What are the qualifications required for this role?",
        answer: "The required qualifications include a medical degree with specialization in ophthalmology, valid medical license, and certification in relevant subspecialties if applicable."
      },
      {
        id: "2",
        question: "Is prior experience mandatory, or are recent graduates eligible to apply?",
        answer: "Recent graduates are welcome to apply. While prior experience is valuable, we also have comprehensive training programs for new graduates."
      },
      {
        id: "3",
        question: "What are the working hours and shift timings?",
        answer: "The working hours and shift timings vary depending on the clinic's schedule. Typically, shifts are from 9:00 AM to 6:00 PM, with occasional evening or weekend shifts based on patient needs. Specific details will be discussed during the interview."
      },
      {
        id: "4",
        question: "What kind of patients or cases will I be handling?",
        answer: "You will be handling a diverse range of ophthalmological cases, including routine eye examinations, diagnostic procedures, and specialized treatments."
      },
      {
        id: "5",
        question: "Will there be training or mentorship provided?",
        answer: "Yes, we provide comprehensive training and mentorship programs. New team members are paired with experienced professionals for guidance and support."
      }
    ],
  }));

  const [isSaved, setIsSaved] = useState(false);
  

  // const renderConferenceSection = (title: string, conferences: Conference[]) => (
  //   <div className="mt-6 font-fontsm">
  //     <div className="flex justify-between items-center px-4 mb-4">
  //       <div className="text-sm text-gray-600">{title}</div>
  //       <button className="text-sm text-maincl">See all</button>
  //     </div>
      
  //     <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 px-4">
  //       {conferences.map((conference) => (
  //         <div 
  //           key={conference.id} 
  //           className="bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer"
  //           onClick={() => handleConferenceClick(conference)}
  //         >
  //           <div className="relative">
  //             <img 
  //               src={conference.image} 
  //               alt={conference.speciality}
  //               className="w-full h-24 object-cover rounded-t-xl"
  //             />
  //             <img 
  //               src={conference.avatar} 
  //               alt="" 
  //               className='absolute left-4 -bottom-8 lg:top-4 w-16 h-16 rounded-lg '
  //             />
  //           </div>
    
  //           <div className="p-4">
  //             <div className='flex justify-between items-start mt-4 lg:mt-1 mb-2'>
  //               <p className="font-medium text-xs text-fillc">{conference.speciality}</p> 
  //               <img 
  //                 src={isSaved ? save2 : save1}  
  //                 onClick={() => setIsSaved(!isSaved)} 
  //                 alt="" 
  //                 className="cursor-pointer"
  //               />
  //             </div>

  //             <p className="text-sm font-medium text-gray-800 mb-3">
  //               {conference.title}
  //             </p>
              
  //             <div className="space-y-2 mb-4">
  //               <div className="text-xs text-gray-500 flex items-center">
  //                 <img src={time} alt="" className='w-3 mr-2'/> 
  //                 {conference.date}
  //               </div>
  //               <div className="text-xs text-gray-500 flex items-center">
  //                 <img src={location} alt="" className='w-3 mr-2'/> 
  //                 {conference.location}
  //               </div>
  //               <div className="text-xs text-gray-500 flex items-center">
  //                 <img src={money} alt="" className='w-3 mr-2'/> 
  //                 {conference.amount}
  //               </div>
  //             </div>

  //             <div className='mb-4'>
  //               <p className='text-xs font-medium text-gray-700'>Speaker: {conference.speaker}</p>
  //             </div>
              
  //             <div className="flex gap-2">
  //               <button 
  //                 onClick={() => {

  //                 }}
  //                 className="px-4 py-1.5 text-xs text-white bg-maincl rounded-xl hover:bg-blue-700"
  //               >
  //                 Register
  //               </button>
  //               <button 
  //                 onClick={() => {
  //                 }}
  //                 className="px-4 py-1.5 text-xs text-maincl border border-gray-200 rounded-xl hover:bg-gray-50"
  //               >
  //                 View Details
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );

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
  

  const [selectedConference, setSelectedConference] = useState<Conference | null>(null);

  // const handleConferenceClick = (conference: Conference) => {
  //   setSelectedConference(conference);
  // };

  const handleCloseDetails = () => {
    setSelectedConference(null);
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

      {/* Main Content */}
      <div className="flex flex-1 px-4 lg:pl-10 max-w-7xl mx-auto w-full gap-2 pt-2">
        {/* Left Sidebar - Explore Careers */}
        {!selectedConference && (
          <div className="hidden lg:block w-[230px] flex-shrink-0 font-fontsm transition-all duration-300">
            <div className="sticky top-[calc(theme(spacing.24)+1px)] space-y-2">
              <p className="text-maincl font-medium mb-6 mt-4">Explore Careers</p>

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
                  alt="Mentorship"
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
        )}

        {/* Main Content */}
        <div className={`flex-1 flex ${selectedConference ? 'lg:ml-0' : ''}`}>
          {/* Conference Cards Section */}
          <div className={`${selectedConference ? 'lg:w-[350px] transition-all duration-300' : 'w-full'}`}>
            <div className="lg:hidden">
              <SearchBar onSearch={handleSearch} onAdd={handleAdd} />
            </div>

            <div className="flex flex-col w-full p-4 lg:sticky lg:top-[80px]">
              {ConferenceData.map((conference, index) => (
                <div 
                  key={index}
                  onClick={() => {
                    setSelectedConference(conference);
                    window.scrollTo(0, 0);
                    const detailsContainer = document.getElementById('conference-details-container');
                    if (detailsContainer) {
                      detailsContainer.scrollTop = 0;
                    }
                  }}
                  className={`cursor-pointer transition-all duration-300 ${selectedConference === conference ? 'scale-95 opacity-75' : ''}`}
                >
                  <div 
                    className="bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer"
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
                      <div className='flex justify-between items-start mt-4 lg:mt-1 mb-2'>
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
                </div>
              ))}
            </div>
          </div>

          {/* Conference Details Section */}
          {selectedConference && (
            <div className="fixed lg:static top-[64px] left-0 right-0 bottom-0 bg-white lg:bg-transparent lg:flex-1 lg:min-w-[60px] pr-3">
              <div 
                id="conference-details-container"
                className="h-full p-4 lg:p-0 overflow-auto scrollbar-hide"
                style={{ 
                  height: 'calc(100vh - 64px)',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                <ConferenceDetails 
                  conference={selectedConference}
                  onClose={handleCloseDetails}
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Filters */}
        {!selectedConference && (
          <div className="hidden lg:block w-[320px] flex-shrink-0 font-fontsm">
            <div className="sticky top-[calc(theme(spacing.24)+1px)] space-y-4">
              <JobFilterStatic/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConferencePage;