import React, { useState, useCallback, ChangeEvent } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { BsCheckCircleFill } from 'react-icons/bs';
import locations from "../../assets/icon/location.svg";
import money from "../../assets/icon/money.svg";
import calender from "../../assets/icon/date.svg";
import applicant from "../../assets/icon/applicant.svg";

interface JobApplicationModalProps {
  open: boolean;
  onClose: () => void;
  jobTitle: string;
  companyLogo: string;
  companyName: string;
  job: {
    location: string;
    amount: string;
    applyBy: string;
    numberOfApplicants: number;
  };
}

interface FormData {
  resume: File | null;
  coverLetter: string;
  canRelocate: boolean;
  noticeValue: string;

}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  open,
  onClose,
  jobTitle,
  companyLogo,
  companyName,
  job
}) => {
  const [formData, setFormData] = useState<FormData>({
    resume: null,
    coverLetter: '',
    canRelocate: false,
    noticeValue: 'Available Immediately',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleResumeChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, resume: 'File size should be less than 5MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, resume: file }));
      setErrors(prev => ({ ...prev, resume: undefined }));
    }
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    }
    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter is required';
    }

    setErrors(newErrors);

    // If no errors, submit form
    if (Object.keys(newErrors).length === 0) {
      // Here you would typically make an API call to submit the application
      setShowSuccess(true);
    }
  }, [formData]);

  if (showSuccess) {
    return (
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '12px',
            padding: '24px'
          }
        }}
      >
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <BsCheckCircleFill className="w-12 h-12 text-[#2E5DB0] mb-4" />
          <h2 className="text-lg font-semibold mb-2">Application was successfully sent to</h2>
          <p className="text-lg font-semibold mb-4">{companyName}</p>
          <p className="text-sm text-gray-600 mb-6">
            Thank you for applying!<br />
            Check your email for updates on your application<br />
            and the next steps in the hiring process.
          </p>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      className='px-1'
      PaperProps={{
        style: {
          borderRadius: '12px',
          padding: '',
        }
      }}
    >
      <div className="flex justify-between items-center font-fontsm">
        <DialogTitle className="p-0 text-lg font-fontsm">
          <div className="flex items-center gap-2">
            <img 
              src={companyLogo} 
              alt="Company logo" 
              className="w-9 h-9 rounded-full"
            />
            <div>
              <p className="text-sm  font-fontsm">{jobTitle}</p>
              <p className="text-xs text-gray-500 font-normal font-fontsm">{companyName}</p>
              <p className="text-xs text-fillc font-normal pt-1 font-fontsm">Posted <span>3 days ago</span></p>
            </div>
          </div>
        </DialogTitle>
        <button 
          type="button"
          onClick={onClose}
          className="top-4 absolute right-4 hover:bg-gray-100 rounded-full"
        >
          <IoClose size={24} />
        </button>
      </div>

      <DialogContent className="p-0 font-fontsm m-0 " >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Details Section */}
          <div className="space-y-2">
            <div>

            <p className="text-xs">Full Time</p>
            <p className="text-xs">Starting Date: <span className="text-fillc"> 26 Jan 2025</span></p>

            </div>

            {/* Basic Info */}
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-2">
                <img src={locations} alt="" className="w-3" />
                <span className="text-xs text-gray-600">{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={money} alt="" className="w-3" />
                <span className="text-xs text-gray-600">{job.amount}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <img src={calender} alt="" className="w-3" />
              <div>
                <p className="text-xs text-gray-600">Apply By {job.applyBy}</p>
              </div>
            </div>

            <div className="rounded-lg gap-2 pt-2 flex items-center">
              <img src={applicant} alt="" className="w-3" />
              <p className="text-xs text-gray-600">{job.numberOfApplicants} Applicants</p>
            </div>
          </div>

          {/* Application Form */}
          <div className="space-y-4">
            {/* Resume Upload */}
            <div className="space-y-2">
              <label htmlFor="resume-upload" className="text-sm font-medium">Resume/CV* <span className="text-fontvlit text-gray-500">(Supported format: .doc/.pdf | Max size: 5 MB)</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="px-4 py-2 text-sm text-gray-500 text-center border w-full border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                >
                  Choose File
                </label>
                <span className="text-sm text-gray-500">
                  {formData.resume ? formData.resume.name : ''}
                </span>
              </div>
              {errors.resume && <p className="text-red-500 text-xs">{errors.resume}</p>}
            </div>

            {/* Cover Letter */}
            <div className="space-y-2">
              <label htmlFor="coverLetter" className="text-sm font-medium">Cover Letter</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md  text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Write a brief cover letter..."
              />
              {errors.coverLetter && <p className="text-red-500 text-xs">{errors.coverLetter}</p>}
            </div>

            {/* Relocation */}
            <div className="flex items-center gap-2">
              <input
                id="canRelocate"
                type="checkbox"
                name="canRelocate"
                checked={formData.canRelocate}
                onChange={handleInputChange}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="canRelocate" className="text-sm">Willing to relocate if required</label>
            </div>

            {/* Notice Period */}
            <div className="space-y-2">
              <label htmlFor="noticeValue" className="text-sm font-medium">Notice Period</label>
              <select
                id="noticeValue"
                name="noticeValue"
                value={formData.noticeValue}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 text-sm text-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Available Immediately">Available Immediately</option>
                <option value="15 Days">15 Days</option>
                <option value="30 Days">30 Days</option>
                <option value="60 Days">60 Days</option>
                <option value="90 Days">90 Days</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-maincl rounded-3xl hover:bg-fillc focus:outline-none focus:ring-2 focus:ring-fillc focus:ring-offset-2"
            >
              Submit Application
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
