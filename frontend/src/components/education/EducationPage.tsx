import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import AddEducationForm, { EducationFormData } from './AddEducationForm';
import AddExperienceForm, { ExperienceFormData } from '../experience/AddExperienceForm';

interface Education {
  schoolName: string;
  location: string;
  duration: string;
}

const EducationPage: React.FC = () => {
  const navigate = useNavigate();
  const [isEducationFormOpen, setIsEducationFormOpen] = useState(false);
  const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);
  
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

  const handleSaveEducation = (data: EducationFormData) => {
    // TODO: Implement saving education data
    console.log('Saving education:', data);
  };

  const handleSaveExperience = (data: ExperienceFormData) => {
    // TODO: Implement saving experience data
    console.log('Saving experience:', data);
  };

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
        <div className="flex gap-4">
          <button 
            className="text-blue-600 hover:text-blue-700"
            onClick={() => setIsExperienceFormOpen(true)}
          >
            Add Experience
          </button>
          <button 
            className="text-blue-600 hover:text-blue-700"
            onClick={() => setIsEducationFormOpen(true)}
          >
            <AiOutlinePlus size={24} />
          </button>
        </div>
      </div>

      {/* Education List */}
      <div className="flex-1 overflow-y-auto p-4">
        {educations.map((education, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg">
            <h3 className="font-semibold">{education.schoolName}</h3>
            <p className="text-gray-600">{education.location}</p>
            <p className="text-gray-500 text-sm">{education.duration}</p>
          </div>
        ))}
      </div>

      {/* Add Education Form */}
      <AddEducationForm
        isOpen={isEducationFormOpen}
        onClose={() => setIsEducationFormOpen(false)}
        onSave={handleSaveEducation}
      />

      {/* Add Experience Form */}
      <AddExperienceForm
        isOpen={isExperienceFormOpen}
        onClose={() => setIsExperienceFormOpen(false)}
        onSave={handleSaveExperience}
      />
    </div>
  );
};

export default EducationPage;
