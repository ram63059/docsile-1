import React, { useState, useEffect } from 'react';
import Modal from '../../common/Modal';

interface InterestFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InterestFormData) => void;
  initialData?: InterestFormData;
  isEditing?: boolean;
}

export interface InterestFormData {
  id?: string;
  name: string;
}

const InterestForm: React.FC<InterestFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<InterestFormData>(
    initialData || {
      name: '',
    }
  );

  useEffect(() => {
    if (!isEditing) {
      setFormData({ name: '' });
    } else if (initialData) {
      setFormData(initialData);
    }
  }, [isOpen, isEditing, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${isEditing ? 'Edit' : 'Add'} Interest`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className='pt-4 pb-8'>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Interest Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 rounded-lg border  border-gray-300 shadow-sm focus:outline-none focus:border-fillc"
            placeholder="e.g., Ophthalmology Research"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-maincl  bg-gray-100 border border-gray-300 rounded-3xl hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-maincl border border-transparent rounded-3xl hover:bg-fillc"
          >
            {isEditing ? 'Save Changes' : 'Add Interest'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default InterestForm;
