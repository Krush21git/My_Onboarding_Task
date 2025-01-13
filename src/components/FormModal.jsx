import React from 'react';
import { CheckIcon } from "@heroicons/react/solid";
import { useLocation } from 'react-router-dom';

const convertToSingular = (word) => {
  if (word.endsWith('s')) {
    return word.slice(0, -1); // Remove the trailing 's' to make it singular
  }
  return word;
};

const FormModal = ({ isOpen, isEditMode, currentData, onClose, onSave, onChange }) => {
  const location = useLocation();
  const itemType = location.pathname.split('/')[1]; 
  const singularItemType = convertToSingular(itemType);

  if (!isOpen) return null; // Don't render if the modal is not open

   // Filter out the 'id' key from the form fields (don't display it)
  const formData = Object.keys(currentData).filter(key => key !== 'id'); 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? `Edit ${singularItemType.charAt(0).toUpperCase() + singularItemType.slice(1)}` : `Add ${singularItemType.charAt(0).toUpperCase() + singularItemType.slice(1)}`}
        </h2>
        <form onSubmit={onSave}>
        {formData.map((key) => (
            <div key={key} className="mb-4">
              <label className="block text-sm font-semibold mb-2 uppercase">{key}</label>
              <input
                type="text"
                name={key}
                value={currentData[key]}
                onChange={onChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${key}`}
                required
              />
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-900 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center"
            >
              {isEditMode ? 'Edit' : 'Create'} <CheckIcon className="h-5 w-5 ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
