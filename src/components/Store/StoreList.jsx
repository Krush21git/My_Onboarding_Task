import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStores, addStore, updateStore, deleteStore, setStores } from '../../features/stores/storeSlice';
import DataTable from '../DataTable';
import FormModal from '../FormModal';
import ConfirmModal from '../ConfirmModal';

const StoreList = () => {
  const dispatch = useDispatch();
  const { data: stores, loading, error } = useSelector((state) => state.stores);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentStore, setCurrentStore] = useState({ name: '', address: '' });
  const [storeToDelete, setStoreToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  const resetForm = () => {
    setIsEditMode(false);
    setCurrentStore({ name: '', address: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentStore({ ...currentStore, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (isEditMode) {
      if (currentStore.id) {
        const updatedStore = { ...currentStore };
        const updatedStores = stores.map((store) =>
          store.id === currentStore.id ? updatedStore : store
        );
        dispatch(setStores(updatedStores));
        dispatch(updateStore(currentStore));
      } else {
        console.error('Store ID is missing!');
      }
    } else {
      dispatch(addStore(currentStore));
    }

    setShowModal(false);
    resetForm();
  };

  const handleEdit = (store, columns) => {
    const filteredStore = columns.reduce((obj, col) => {
      obj[col.toLowerCase()] = store[col.toLowerCase()];
      return obj;
    }, {});

    filteredStore.id = store.id;
    setCurrentStore(filteredStore);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (storeToDelete) {
      dispatch(deleteStore(storeToDelete));
      setStoreToDelete(null);
      setShowConfirm(false);
    } else {
      console.error('No store selected for deletion.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => {
          resetForm();
          setShowModal(true);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-8"
      >
        New Store
      </button>

      {loading && <p>Loading stores...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <DataTable
        columns={['Name', 'Address']}
        data={stores}
        onEdit={(store) => handleEdit(store, ['Name', 'Address'])}
        onDelete={(id) => {
          setStoreToDelete(id);
          setShowConfirm(true);
        }}
      />

      <FormModal
        isOpen={showModal}
        isEditMode={isEditMode}
        currentData={currentStore}
        onClose={() => {
          setShowModal(false);
          resetForm();
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

export default StoreList;
