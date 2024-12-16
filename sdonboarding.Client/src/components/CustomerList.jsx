import React, { useEffect , useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCustomers, addCustomer, updateCustomer, deleteCustomer, setCustomers } from '../features/customers/customerSlice';
import { PencilIcon, TrashIcon, CheckIcon } from "@heroicons/react/solid";
import '../index.css';


const CustomerList = () => {
  const dispatch = useDispatch();
  const { data: customers, loading, error } = useSelector((state) => state.customers);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  
  // State for Edit
  const [isEditMode, setIsEditMode] = useState(false); // Edit mode flag
  const [currentCustomer, setCurrentCustomer] = useState({ name: '', address: '' }); 

  // State for delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Show confirmation modal
  const [customerToDelete, setCustomerToDelete] = useState(null); // Customer to be deleted

  // Fetch customers when the component mounts
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

   // Handle input changes
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCustomer({ ...currentCustomer, [name]: value });
  };

  // Handle Add Customer
  const handleAddCustomer = (e) => {
    e.preventDefault();
    dispatch(addCustomer(currentCustomer));
    setShowModal(false);
    setCurrentCustomer({ name: '', address: '' });
  };
  
  // Handle Edit Customer
  const handleEditCustomer = (e) => {
    e.preventDefault();
    
    // Dispatch the updateCustomer action
    dispatch(updateCustomer(currentCustomer))
      .then(() => {
        // After the update, modify the Redux state directly with the updated customer
        const updatedCustomers = customers.map(customer =>
          customer.id === currentCustomer.id ? currentCustomer : customer
        );
        
        // Dispatch the setCustomers action to update the customer list in Redux
        dispatch(setCustomers(updatedCustomers));
  
        // Close the modal and reset the form
        setShowModal(false);
        setIsEditMode(false);
        setCurrentCustomer({ name: '', address: '' });
      })
      .catch((error) => {
        console.log('Error updating customer:', error);
      });
  };
  
  
  const openEditModal = (customer) => {
    setCurrentCustomer(customer);
    setIsEditMode(true);
    setShowModal(true);
  };
  
    // Open delete confirmation modal
    const openDeleteModal = (customer) => {
        setCustomerToDelete(customer);
        setShowDeleteModal(true);
      };


   // Handle delete action
   const handleDeleteCustomer = () => {
    dispatch(deleteCustomer(customerToDelete.id))
      .then(() => {
        setShowDeleteModal(false); // Close delete modal
        setCustomerToDelete(null); // Clear the customer to delete
      })
      .catch((error) => {
        console.log('Error deleting customer:', error);
      });
  };
  
  // State for the customer form inputs
  const [customer, setCustomer] = useState({
    name: '',
    address: '',
  });

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='container mx-auto p-4 h-[100vh]'>
    
     {/* Add Customer Button */}
     <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
        >
          Add Customer
        </button>
      </div>          
      
      {/* Customer List Table */}
      <div className='flex justify-center'>
      <table className="table-auto border-collapse border border-slate-300 w-1/2 text-center" aria-labelledby="tableLabel">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2 border-slate-300">Name</th>
                            <th className="border px-4 py-2 border-slate-300">Address</th>
                            <th className="border px-4 py-2 border-slate-300">Actions</th>
                            <th className="border px-4 py-2 border-slate-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={customer.id} className={`${index % 2 === 0 ? "bg-slate-100" : "bg-white"}`}>
                                <td className="border border-slate-300 px-4 py-2 h-12">{customer.name}</td>
                                <td className="border border-slate-300 px-4 py-2 h-12">{customer.address}</td>
                                <td className="border border-slate-300 px-4 py-2 h-12">
                                    <center><button className="flex items-center bg-yellow-500 text-white px-3 py-1 rounded shadow hover:bg-yellow-500 transition duration-300"
                                    onClick={() => openEditModal(customer)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 h-5 w-5 mr-2"><path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" /><path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" /></svg>
                                    Edit</button></center>
                                </td>
                                {/* Delete Button */}
                                <td className="border border-slate-300 px-4 py-2 h-12">
                                    <center><button className="flex items-center bg-rose-600 text-white px-3 py-1 rounded shadow hover:bg-rose-600 transition duration-300"
                                    onClick={() => openDeleteModal(customer)}>
                                        <TrashIcon className="h-5 w-5 mr-2" />Delete
                                    </button></center>
                                </td>
                            </tr>
                             ))}
                    </tbody>
        </table>
        </div>

                 {/* Add or Edit Customer Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Customer' : 'Create Customer'}</h2>
            <form onSubmit={isEditMode ? handleEditCustomer : handleAddCustomer}>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">NAME</label>
                <input
                  type="text"
                  name="name"
                  value={currentCustomer.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Customer Name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">ADDRESS</label>
                <input
                  type="text"
                  name="address"
                  value={currentCustomer.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Customer Address"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-950 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-300 flex items-center justify-center"
                >
                  {isEditMode ? 'Edit' : 'Create'} <CheckIcon className="h-5 w-5 ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
     )}

     {/* Delete Confirmation Modal */}
     {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Delete Customer</h2>
            <h4 className="mb-4 font-bold">Are you sure ?</h4>
            <hr className='mb-4'></hr>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)} // Close the modal without deleting
                className="bg-gray-950 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteCustomer} // Handle deletion
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center justify-center"
              >
                Delete  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
</svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
