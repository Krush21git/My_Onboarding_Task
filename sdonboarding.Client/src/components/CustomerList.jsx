import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCustomers } from '../features/customers/customerSlice';
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import '../index.css';

const CustomerList = () => {
  const dispatch = useDispatch();
  const { data: customers, loading, error } = useSelector((state) => state.customers);

  // Fetch customers when the component mounts
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);
  
//   useEffect(() => {
//     document.body.style.overflow = 'hidden'; // This disables scrolling on the body
//   }, []);

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100 h-screen overflow-hidden'>
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
                                    onClick={() => openUpdateModal(customer)}>
                                        <PencilIcon className="h-5 w-5 mr-2" />Edit
                                    </button></center>
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
  );
};

export default CustomerList;
