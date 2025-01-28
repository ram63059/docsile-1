import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

interface Education {
  schoolName: string;
  location: string;
  duration: string;
}

const EducationPage: React.FC = () => {
  const navigate = useNavigate();
  
  const educations: Education[] = [
    {
      schoolName: "IGNOU, New Delhi",
      location: "New Delhi",
      duration: "Aug 2023 - Current • 6 mos"
    },
    {
      schoolName: "St. Xavier's High School, Mumbai",
      location: "Mumbai",
      duration: "Apr 2019 - Mar 2023 • 4 yrs"
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800"
          >
            <IoIosArrowBack size={24} />
          </button>
          <h1 className="text-xl font-semibold">Education</h1>
        </div>
        <button 
          className="text-blue-600 hover:text-blue-700"
          onClick={() => {/* Handle add education */}}
        >
          <AiOutlinePlus size={24} />
        </button>
      </div>

      {/* Education List */}
      <div className="flex-1 overflow-y-auto p-4">
        {educations.map((education, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg p-4 mb-4 border shadow-sm"
          >
            <h3 className="font-semibold text-gray-800">{education.schoolName}</h3>
            <p className="text-gray-600 text-sm mt-1">{education.location}</p>
            <p className="text-gray-500 text-sm mt-1">{education.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationPage;
