import React from 'react';
import { CheckIcon } from "@heroicons/react/solid";

const SaleForm = ({ isOpen, isEditMode, currentData, customers, products, stores, onClose, onSave, onChange }) => {
  if (!isOpen) return null; // Don't render if the modal is not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Sale' : 'Create Sale'}</h2>
        <form onSubmit={onSave}>
          {/* Customer Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Customer</label>
            <select
              name="customerId"
              value={currentData.customerId || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Product Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Product</label>
            <select
              name="productId"
              value={currentData.productId || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          {/* Store Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Store</label>
            <select
              name="storeId"
              value={currentData.storeId || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Store</option>
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Sold */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Date Sold</label>
            <input
              type="date"
              name="dateSold"
              value={currentData.dateSold ? currentData.dateSold.substring(0, 10) : ''}  // Format the date correctly
              onChange={onChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

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
              {isEditMode ? 'Edit Sale' : 'Create Sale'} <CheckIcon className="h-5 w-5 ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaleForm;
