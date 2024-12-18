import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";

const SaleDataTable = ({ sales, customers, products, stores, onEdit, onDelete }) => {
  // State for controlling the delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState(null);

  // Function to get the name for customer, product, and store
  const getCustomerName = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : 'N/A';
  };

  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'N/A';
  };

  const getStoreName = (storeId) => {
    const store = stores.find(s => s.id === storeId);
    return store ? store.name : 'N/A';
  };

  // Open delete confirmation modal
  const handleDeleteClick = (sale) => {
    setSaleToDelete(sale);
    setIsDeleteModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
    setSaleToDelete(null);
  };

  // Confirm deletion
  const handleConfirmDelete = () => {
    if (saleToDelete) {
      onDelete(saleToDelete.id); // Call the onDelete function passed as a prop
    }
    handleCloseModal();
  };

  return (
    <div className="flex justify-center">
      <table className="table-auto border-collapse border border-slate-300 w-full text-center">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Customer</th>
            <th className="border px-4 py-2">Product</th>
            <th className="border px-4 py-2">Store</th>
            <th className="border px-4 py-2">Date Sold</th>
            <th className="border px-4 py-2">Actions</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.length > 0 ? (
            sales.map((sale, index) => (
              <tr key={sale.id} className={index % 2 === 0 ? 'bg-slate-100' : 'bg-white'}>
                <td className="border px-4 py-2">{sale.id}</td>
                <td className="border px-4 py-2">{getCustomerName(sale.customerId)}</td>
                <td className="border px-4 py-2">{getProductName(sale.productId)}</td>
                <td className="border px-4 py-2">{getStoreName(sale.storeId)}</td>
                <td className="border px-4 py-2">
                  {/* {sale.dateSold ? new Date(sale.dateSold).toLocaleDateString() : 'N/A'} */}
                  {sale.dateSold
    ? new Date(sale.dateSold).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'N/A'}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="flex items-center bg-yellow-500 text-white px-3 py-1 rounded shadow hover:bg-yellow-500 transition duration-300"
                    onClick={() => onEdit(sale)}
                  ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 h-5 w-5 mr-2"><path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" /><path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" /></svg>
                    Edit
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="flex items-center bg-rose-600 text-white px-3 py-1 rounded shadow hover:bg-rose-600 transition duration-300"
                    onClick={() => handleDeleteClick(sale)}
                  >
                    Delete <TrashIcon className="h-5 w-5 mr-2" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center border px-4 py-2">
                No sales data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p>Are you sure ?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaleDataTable;
