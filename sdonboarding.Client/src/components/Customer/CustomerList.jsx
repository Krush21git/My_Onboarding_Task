import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers, addCustomer, updateCustomer, deleteCustomer, setCustomers } from '../../features/customers/customerSlice';
import DataTable from '../DataTable';
import FormModal from '../FormModal';
import ConfirmModal from '../ConfirmModal';

const CustomerList = () => {
  const dispatch = useDispatch();
  const { data: customers, loading, error } = useSelector((state) => state.customers);  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({ name: '', address: '' });
  const [customerToDelete, setCustomerToDelete] = useState(null); // Initialize state to store the customer ID to delete

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // Function to reset form to add mode
  const resetForm = () => {
    setIsEditMode(false);  // Ensure it's not in edit mode
    setCurrentCustomer({ name: '', address: '' });  // Reset form data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCustomer({ ...currentCustomer, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
  
    if (isEditMode) {
      if (currentCustomer.id) {
        // Optimistically update the state
        const updatedCustomer = { ...currentCustomer };
        const updatedCustomers = customers.map((customer) =>
          customer.id === currentCustomer.id ? updatedCustomer : customer
        );
        dispatch(setCustomers(updatedCustomers));  // Update the local state immediately
  
        dispatch(updateCustomer(currentCustomer));  // Call the API to update
      } 
    } else {
      dispatch(addCustomer(currentCustomer));  // For adding a new customer
    }
  
    setShowModal(false);  // Close the modal after saving
    setCurrentCustomer({ name: '', address: '' });  // Reset current data
  };
  
  

  const handleEdit = (customer, columns) => {
    // Map the customer fields based on columns but ensure 'id' is also passed
    const filteredCustomer = columns.reduce((obj, col) => {
      obj[col.toLowerCase()] = customer[col.toLowerCase()];
      return obj;
    }, {});
  
    // Ensure id is included in the filtered customer object
    filteredCustomer.id = customer.id;
  
    setCurrentCustomer(filteredCustomer);
    setIsEditMode(true);
    setShowModal(true);
  };
  
  const handleDelete = () => {

    if (customerToDelete) {

      dispatch(deleteCustomer(customerToDelete)); // Dispatch the delete action with customerToDelete ID

      setShowConfirm(false); // Close the confirmation modal

    } 

  };
  

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => { resetForm(); setShowModal(true)}} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-8">
        New Customer
      </button>

      <DataTable
      columns={['Name', 'Address']} // Specify the columns to display
      data={customers}  // This will automatically update when the Redux state changes
      onEdit={(customer) => handleEdit(customer, ['Name', 'Address'])}  // Handle edit
      onDelete={(id) => {
      setCustomerToDelete(id);
      setShowConfirm(true); // Show the confirm modal for deletion
      }}
      />

      <FormModal
        isOpen={showModal}
        isEditMode={isEditMode}
        currentData={currentCustomer}
        onClose={() => {
          setShowModal(false);
          resetForm();  // Reset when closing the modal
        }}
        onSave={handleSave}
        onChange={handleInputChange}
      />

        <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        message="Are you sure ?"
        />

    </div>
  );
};

export default CustomerList;
