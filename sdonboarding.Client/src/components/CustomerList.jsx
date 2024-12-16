import React, { useEffect , useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCustomers, addCustomer, updateCustomer, deleteCustomer, setCustomers } from '../features/customers/customerSlice';
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import '../index.css';


const CustomerList = () => {
  const dispatch = useDispatch();
  const { data: customers, loading, error } = useSelector((state) => state.customers);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [isEditMode, setIsEditMode] = useState(false); // Edit mode flag
  const [currentCustomer, setCurrentCustomer] = useState({ name: '', address: '' }); 

  // Fetch customers when the component mounts
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

   // Handle input changes
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCustomer({ ...currentCustomer, [name]: value });
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    dispatch(addCustomer(currentCustomer));
    setShowModal(false);
    setCurrentCustomer({ name: '', address: '' });
  };
  
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
  
  const handleDeleteCustomer = (customerId) => {
    dispatch(deleteCustomer(customerId)); // Dispatch delete action
  };

  
  // State for the customer form inputs
  const [customer, setCustomer] = useState({
    name: '',
    address: '',
  });

 

  

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission
  
//     try {
//       // Dispatch the addCustomer action with the new customer data
//       await dispatch(addCustomer(customer)).unwrap();
  
//       // Reset the form and close the modal
//       setCustomer({ name: '', address: '' });
//       setShowModal(false);
  
//       console.log('Customer added successfully');
//     } catch (error) {
//       console.error('Failed to add customer:', error);
//     }
//   };
  


  
//   useEffect(() => {
//     document.body.style.overflow = 'hidden'; // This disables scrolling on the body
//   }, []);

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
                                        <PencilIcon className="h-5 w-5 mr-2" />Edit
                                    </button></center>
                                </td>
                                {/* Delete Button */}
                                <td className="border border-slate-300 px-4 py-2 h-12">
                                    <center><button className="flex items-center bg-rose-600 text-white px-3 py-1 rounded shadow hover:bg-rose-600 transition duration-300"
                                    onClick={() => handleDeleteCustomer(customer.id)}>
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
                <label className="block text-sm font-semibold mb-2">Name</label>
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
                <label className="block text-sm font-semibold mb-2">Address</label>
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
                  className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  {isEditMode ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
     )}
    </div>
  );
};

export default CustomerList;
