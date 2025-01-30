import React from 'react';
import { X } from 'lucide-react';
import upload from  "../../assets/icon/upload.svg";

interface VerifyFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const VerifyForm: React.FC<VerifyFormProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-fontsm">
      <div className="bg-white rounded-xl w-full max-w-md px-20 py-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Form Title */}
        <h2 className="text-base  mb-2">Verify your Student ID</h2>
        <p className="text-fontlit text-gray-600 mb-5">
          Confirm your identity to access exclusive resources and opportunities tailored for medical students.
        </p>

        {/* Form Fields */}
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name*"
              className="w-full p-3 text-sm font-light border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-maincl"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Student Identification number*"
              className="w-full p-3 text-sm font-light border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-maincl"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="College name*"
              className="w-full p-3 text-sm font-light border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-maincl"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Year of Graduation*"
              className="w-full p-3 text-sm font-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Upload Section */}
          <div className="border-2 border-dashed flex flex-col items-center border-gray-300 mb-2 rounded-lg p-4 text-center">
           <div className='justify-center'> <img src={upload} alt="" /> </div>
            <div className="mb-2 text-sm">Upload Student ID*</div>
            <div className="text-xs text-gray-500">Upload a clear picture of your ID here</div>
            <div className="text-fontlit text-gray-400 mt-1">*Only JPG/PNG accepted</div>
            <div className="text-fontlit text-gray-400">Max 10 MB size</div>
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            className="w-full bg-maincl text-white py-2 rounded-3xl  hover:bg-fillc transition-colors"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyForm;
