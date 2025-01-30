import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface AddExperienceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (experienceData: ExperienceFormData) => void;
}

export interface ExperienceFormData {
  jobTitle: string;
  organization: string;
  location: string;
  typeOfJob: string;
  startDate: string;
  endDate: string;
  isCurrentlyWorking: boolean;
  description: string;
}

const AddExperienceForm: React.FC<AddExperienceFormProps> = ({ isOpen, onClose, onSave }) => {
  const [notifyFollowers, setNotifyFollowers] = useState(false);
  const [formData, setFormData] = useState<ExperienceFormData>({
    jobTitle: '',
    organization: '',
    location: '',
    typeOfJob: '',
    startDate: '',
    endDate: '',
    isCurrentlyWorking: false,
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
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
          <h2 className="text-xl text-maincl font-semibold">Add experience</h2>
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
              <p className="text-sm text-gray-600">Turn on to let your followers know about your new role at this organization</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifyFollowers}
                onChange={(e) => setNotifyFollowers(e.target.checked)}
                className="sr-only peer text-maincl"
              />
              <div className="w-11 h-6 bg-gray-200 text-maincl peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-maincl rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-maincl"></div>
            </label>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Add your Work experience</h3>
            <p className="text-sm text-gray-600">Detail your hands-on experience to demonstrate your growing expertise in the medical field.</p>

            <input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-maincl focus:border-maincl"
            />

            <input
              type="text"
              name="organization"
              placeholder="Organization"
              value={formData.organization}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-maincl focus:border-maincl"
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-maincl focus:border-maincl"
            />

            <select
              name="typeOfJob"
              value={formData.typeOfJob}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-maincl focus:border-maincl appearance-none bg-white"
            >
              <option value="">Type of job</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="startDate"
                placeholder="Start"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-maincl focus:border-maincl"
              />
              <input
                type="text"
                name="endDate"
                placeholder="End"
                value={formData.endDate}
                onChange={handleChange}
                disabled={formData.isCurrentlyWorking}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-maincl focus:border-maincl disabled:bg-gray-100"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isCurrentlyWorking"
                checked={formData.isCurrentlyWorking}
                onChange={handleCheckboxChange}
                className="rounded border-gray-300 text-maincl focus:ring-maincl"
              />
              <label className="text-sm text-gray-600">I'm currently working here</label>
            </div>

            <textarea
              name="description"
              placeholder="Describe your role"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-maincl focus:border-maincl resize-none"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="lg:px-12 px-12 bg-maincl text-white py-2 rounded-3xl hover:bg-fillc transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExperienceForm;
