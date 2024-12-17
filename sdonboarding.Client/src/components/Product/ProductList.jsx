import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct, setProducts } from '../../features/products/productSlice';
import DataTable from '../DataTable';
import FormModal from '../FormModal';
import ConfirmModal from '../ConfirmModal';

const ProductList = () => {
  const dispatch = useDispatch();
  const { data: products, loading, error } = useSelector((state) => state.products);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ name: '', price: '' });
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const resetForm = () => {
    setIsEditMode(false);
    setCurrentProduct({ name: '', price: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    if (isEditMode) {
      if (currentProduct.id) {
        // Optimistic update
        const updatedProduct = { ...currentProduct };
        const updatedProducts = products.map((product) =>
          product.id === currentProduct.id ? updatedProduct : product
        );
        dispatch(setProducts(updatedProducts));
        dispatch(updateProduct(currentProduct)); // Update the product via API
      } else {
        console.error('Product ID is missing!');
      }
    } else {
      dispatch(addProduct(currentProduct)); // Add new product
    }
    
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (product) => {
    setCurrentProduct({
      id: product.id,
      name: product.name,
      price: product.price,
    });
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete));
      setShowConfirm(false);
    } else {
      console.error('No product selected for deletion.');
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
        Add Product
      </button>

      <DataTable
        columns={['Name', 'Price']}
        data={products}
        onEdit={(product) => handleEdit(product)}
        onDelete={(id) => {
          setProductToDelete(id);
          setShowConfirm(true);
        }}
      />

      <FormModal
        isOpen={showModal}
        isEditMode={isEditMode}
        currentData={currentProduct}
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
        message="Are you sure?"
      />
    </div>
  );
};

export default ProductList;
