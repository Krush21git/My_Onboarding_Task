import React from 'react';
import { CheckIcon } from "@heroicons/react/solid";

const FormModal = ({ isOpen, isEditMode, currentData, onClose, onSave, onChange }) => {
  if (!isOpen) return null; // Don't render if the modal is not open

   // Filter out the 'id' key from the form fields (don't display it)
  const formData = Object.keys(currentData).filter(key => key !== 'id'); 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Item' : 'Create Customer'}</h2>
        <form onSubmit={onSave}>
        {Object.keys(currentData).map((key) =>  key !== 'id' && (
            <div key={key} className="mb-4">
              <label className="block text-sm font-semibold mb-2 capitalize">{key}</label>
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
              className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center"
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
