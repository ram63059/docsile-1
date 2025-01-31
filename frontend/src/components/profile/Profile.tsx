import React, { useState } from 'react';
import add from "../../assets/icon/add.svg";
import backbutton from "../../assets/icon/backbutton.svg";
import more1 from "../../assets/icon/more1.svg";
import pmessage from "../../assets/icon/pmessage.svg";
import add2 from "../../assets/icon/add2.svg";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Header } from './Header';
import location from "../../assets/icon/location.svg";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = ['About', 'Activity', 'Events', 'Memberships', 'Saved', 'Draft'];

  const aboutText = "An experienced ophthalmologist passionate about advancing care through sustainable eye care. Specializing in cataract and refractive surgery with a focus on advanced surgical ophthalmology. I combine cutting-edge technology with a patient-centered approach...";

  return (
    <div className="min-h-screen font-fontsm mx-auto ">
      {/* Mobile Header - Only visible on mobile */}
      <div className="lg:hidden flex items-center justify-between p-4  bg-white ">
        <div className="flex items-center gap-3">
          <img src={backbutton} alt="" className="w-5" />
          <span className="text-xl font-medium text-maincl ">Profile</span>
        </div>
        <div className="flex items-center gap-4">
         <img src={pmessage} alt="" />
          <button className="w-8 h-8">
            <img src={more1} alt="Profile" className="w-full h-full rounded-full" />
          </button>
        </div>
      </div>

      {/* Desktop Header - Only visible on desktop */}
      <div className="hidden lg:block bg-white border-b sticky top-0 z-50">
      <Header
        onNotification={() => console.log("Notification clicked")}
        onMessage={() => console.log("Message clicked")}
        onProfile={() => console.log("Profile clicked")}
        onSearch={() => console.log("Profile clicked")}

      />
        
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4   lg:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Profile Info */}
          <div className="lg:col-span-3 py-2  ">
            <div className="bg-white   ">
              <div className="flex flex-col  items-center text-center">
                  <div className='lg:border p-3 lg:py-8 shadow-sm rounded-xl border-gray-200'>
                <div className='flex lg:flex-col  items-center' >

                <div className="relative ">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c"
                    alt="Profile"
                    className=" w-28 lg:w-20  rounded-full object-cover"
                    />
                  <div className="absolute bottom-0 right-0  w-6 h-6 flex items-center justify-center text-xs">
                  <img src={add} alt="" />
                  </div>
                </div>
                <div>

                <h1 className="text-lg font-medium text-gray-700   mt-4">Seelam Vamshidhar Goud</h1>
                <p className="text-gray-600 text-sm mt-1 lg:mx-2 px-4 ">Ophthalmologist | AIIMS Delhi |Aspiring Medical Professional</p>
                <p className="text-gray-500 text-sm mt-4 flex items-center justify-center gap-1">
                  <img src={location} alt="" className='w-4' />
                  Mumbai, Maharashtra, India
                </p>
                </div>
                    </div>
                  <div className='hidden lg:block'>

                <div className="flex justify-between  mt-6 mx-3">
                  <div className="text-center">
                    <div className="font-semibold text-sm text-fillc">546</div>
                    <div className="text-sm text-gray-700">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-sm text-fillc">478</div>
                    <div className="text-sm text-gray-700">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-sm text-fillc">5</div>
                    <div className="text-sm text-gray-700">Questions</div>
                  </div>
                </div>
                  </div>

                <div className="flex gap-4 mt-6 w-full text-sm font-normal">
                  <button className="flex-1 px-3 py-1 bg-maincl text-white rounded-3xl hover:bg-fillc">
                    Edit Profile
                  </button>
                  <button className="flex px-3 py-1 border rounded-3xl hover:bg-gray-50">
                    <img src={add2} alt="" />
                    Be Mentor
                  </button>
                </div>



                </div>

                {/* Profile Completion */}
                <div className="w-full mt-6 border border-gray-200 p-4 rounded-lg">
                  
                  <div className="flex   justify-between items-start mb-4">
                    <div className='mr-4'>
                    <h2 className="text-sm flex items-start font-medium text-gray-800">Profile Completion</h2>
                    <div className="space-y-1 grid grid-cols-2 ">
                    <button className=" flex  items-center  bg-gray-50 rounded-full py-2 px-2">
                      <span className="text-xs text-gray-700">Education</span>
                      <span className="text-sm">+</span>
                    </button>
                    <button className=" flex items-center justify-between bg-gray-50 rounded-full py-2 px-4">
                      <span className="text-xs text-gray-700">Experience</span>
                      <span className="text-sm">+</span>
                    </button>
                    <button className=" flex items-center justify-between bg-gray-50 rounded-full py-2 px-4">
                      <span className="text-xs text-gray-700">Skills</span>
                      <span className="text-sm">+</span>
                    </button>
                    <button className=" flex items-center justify-between bg-gray-50 rounded-full py-2 px-4">
                      <span className="text-xs text-gray-700">Awards</span>
                      <span className="text-sm">+</span>
                    </button>
                  </div>
                  </div> 
                    <div className="relative mt-4">
                      <div className="w-14 h-14 rounded-full border-2 border-gray-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-maincl">75%</span>
                      </div>
                      <svg className="absolute top-0 left-0 w-14 h-14 -rotate-90">
                        <circle
                          cx="28"
                          cy="28"
                          r="26"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          className="text-maincl"
                          strokeDasharray="163.36"
                          strokeDashoffset="40.84"
                        />
                      </svg>
                    </div>
                  </div>
                  
                </div>

                {/* Profile Link */}
                <div className="mt-6 w-full text-left border border-gray-200 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <FaLink className="text-gray-400" />
                    Profile Link
                  </p>
                  <p className="text-xs text-gray-600 mt-1 cursor-pointer">profile.seelam.vamshidhar.goud</p>
                </div>

                
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-9">
            {/* Mobile Tabs - Only visible on mobile */}
            <div className="lg:hidden border-b bg-white mb-4">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`px-4 py-3 text-sm whitespace-nowrap ${
                      activeTab === tab.toLowerCase()
                        ? 'border-b-2 border-blue-500 text-blue-500'
                        : 'text-gray-500'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              {/* Post Input */}
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <img src="/profile-pic.jpg" alt="" className="w-10 h-10 rounded-full" />
                  <input
                    type="text"
                    placeholder="What's on your mind?"
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    Add Post
                  </button>
                </div>
              </div>

              {/* Content Sections */}
              <div className="divide-y">
                {/* About Section */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">About</h2>
                    <button className="text-gray-500">
                      <MdEdit size={20} />
                    </button>
                  </div>
                  <p className="text-gray-600">{aboutText}</p>
                </div>

                {/* Experience Section */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Experience</h2>
                    <button className="text-gray-500">
                      <MdEdit size={20} />
                    </button>
                  </div>
                  <div className="space-y-6">
                    {[
                      {
                        title: 'Ophthalmology Clinical Intern',
                        company: 'AIIMS',
                        date: 'Jun 2023 - Present'
                      },
                      {
                        title: 'Research Assistant - Ophthalmology Department',
                        company: 'AIIMS',
                        date: 'Jan 2023 - May 2023'
                      }
                    ].map((exp, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0"></div>
                        <div>
                          <h3 className="font-medium">{exp.title}</h3>
                          <p className="text-gray-500 text-sm">{exp.date}</p>
                          <p className="text-gray-600 text-sm mt-1">{exp.company}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="text-blue-600 text-sm mt-4">See all →</button>
                </div>

                {/* Education Section */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Education</h2>
                    <button className="text-gray-500">
                      <MdEdit size={20} />
                    </button>
                  </div>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0"></div>
                      <div>
                        <h3 className="font-medium">All India Institute of Medical Sciences (AIIMS), New Delhi</h3>
                        <p className="text-gray-500 text-sm">2020 - 2023</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Areas of Interest */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Areas of Interest</h2>
                    <button className="text-gray-500">
                      <MdEdit size={20} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {[
                      'Cataract Surgery',
                      'Corneal Disorders and Treatment',
                      'Pediatric Ophthalmology'
                    ].map((area, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {area}
                        </span>
                        <span className="text-xs text-gray-500">
                          at All India Institute of Medical Sciences, Delhi
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="text-blue-600 text-sm mt-4">See All Areas of Interest →</button>
                </div>

                {/* Memberships */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Memberships</h2>
                    <button className="text-gray-500">
                      <MdEdit size={20} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      'Visionary Care Society',
                      'Visionary Care Society',
                      'Visionary Care Society',
                      'Visionary Care Society'
                    ].map((society, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0"></div>
                        <span className="text-sm">{society}</span>
                      </div>
                    ))}
                  </div>
                  <button className="text-blue-600 text-sm mt-4">See all Memberships →</button>
                </div>

                {/* Languages */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Languages</h2>
                    <button className="text-gray-500">
                      <MdEdit size={20} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>English</span>
                      <span className="text-gray-500">Professional working proficiency</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hindi</span>
                      <span className="text-gray-500">Native or bilingual proficiency</span>
                    </div>
                  </div>
                  <button className="text-blue-600 text-sm mt-4">See all Languages →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
