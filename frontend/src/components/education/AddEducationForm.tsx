import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface AddEducationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (educationData: EducationFormData) => void;
}

export interface EducationFormData {
  college: string;
  degree: string;
  specialization: string;
  startYear: string;
  endYear: string;
  grade: string;
  description: string;
}

const AddEducationForm: React.FC<AddEducationFormProps> = ({ isOpen, onClose, onSave }) => {
  const [notifyFollowers, setNotifyFollowers] = useState(false);
  const [formData, setFormData] = useState<EducationFormData>({
    college: '',
    degree: '',
    specialization: '',
    startYear: '',
    endYear: '',
    grade: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:flex md:items-center md:justify-center">
      <div className="bg-white w-full h-full md:w-[700px] md:h-auto md:rounded-lg md:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl text-maincl font-semibold">Add education</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Notify Followers Toggle */}
          <div className="flex items-center justify-between bg-yellow-50 p-3 rounded-lg">
            <div>
              <p className="font-medium">Notify followers</p>
              <p className="text-sm text-gray-600">Turn on to let your followers know about your education at this university</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifyFollowers}
                onChange={(e) => setNotifyFollowers(e.target.checked)}
                className="sr-only peer text-maincl"
              />
              <div className="w-11 h-6 bg-gray-200 text-maincl  peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-maincl rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-maincl"></div>
            </label>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Add your Education</h3>
            <p className="text-sm text-gray-600">Highlight your academic journey to showcase your commitment to excellence in medicine.</p>

            <input
              type="text"
              name="college"
              placeholder="College/University name"
              value={formData.college}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={formData.degree}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="startYear"
                placeholder="Start year"
                value={formData.startYear}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                name="endYear"
                placeholder="End year"
                value={formData.endYear}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <input
              type="text"
              name="grade"
              placeholder="Grade / Percentage"
              value={formData.grade}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <textarea
              name="description"
              placeholder="Describe your role"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>
          <div className="flex justify-center">

          <button
            type="submit"
            className="lg:px-12 px-12   bg-maincl text-white py-2 rounded-3xl hover:bg-fillc transition-colors"
            >
            Save
          </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddEducationForm;
