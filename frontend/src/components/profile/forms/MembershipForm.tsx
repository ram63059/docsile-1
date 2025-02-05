import React, { useEffect, useState } from 'react';
import Modal from '../../common/Modal';

interface MembershipFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MembershipFormData) => void;
  initialData?: MembershipFormData;
  isEditing?: boolean;
}

export interface MembershipFormData {
  name: string;
  category: string;
  image: File | null;
  imagePreview?: string;
}

const MembershipForm: React.FC<MembershipFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<MembershipFormData>({
    name: initialData?.name || '',
    category: initialData?.category || '',
    image: null
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const medicalCategories = [
    "Ophthalmology",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Dermatology",
    "Gastroenterology",
    "Pulmonology",
    "Endocrinology",
    "Oncology",
    "Nephrology"
  ];
  const medicalSocieties = [
    "Indian Medical Association", 
    "Medical Council of India",
    "Indian Dental Association",
    "Association of Physicians of India",
    "Cardiological Society of India",
    "Indian Academy of Pediatrics",
    "Indian Orthopaedic Association",
  ];


  const filteredSocieties = medicalSocieties.filter(society =>
    society.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  useEffect(() => {
    return () => {
      if (formData.imagePreview) {
        URL.revokeObjectURL(formData.imagePreview);
      }
    };
  }, [formData.imagePreview]);
  

 
  return (
    <Modal isOpen={isOpen} onClose={onClose}  title={`${isEditing ? 'Edit' : 'Add'} Membership`}>
      <form onSubmit={handleSubmit} className="space-y-6">
            {/* Organization Name with Suggestions */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1 pt-6">
                Organization Name
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setFormData(prev => ({ ...prev, name: e.target.value }));
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
              {showSuggestions && searchTerm && (
                <div className="absolute z-10 w-full mt-1 text-gray-800 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredSocieties.map((society, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                      onClick={() => {
                        setSearchTerm(society);
                        setFormData(prev => ({ ...prev, name: society }));
                        setShowSuggestions(false);
                      }}
                    >
                      {society}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full rounded-md border border-gray-300 text-gray-800 px-3 py-2"
              >
                <option value="">Select Category</option>
                {medicalCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization Logo
              </label>
              <div className="flex items-center space-x-2 space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="px-12 py-2  bg-gray-200 rounded-xl cursor-pointer hover:bg-gray-300"
                >
                  Choose Image
                </label>
                {formData.imagePreview && (
                  <div className="relative">
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: null, imagePreview: undefined }))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-1 rounded-3xl border text-maincl bg-gray-100 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-1 bg-maincl text-white rounded-3xl hover:bg-fillc"
                disabled={!formData.name || !formData.category || !formData.image}
              >
                Save
              </button>
            </div>
          </form>
    </Modal>
  );
};

export default MembershipForm;
