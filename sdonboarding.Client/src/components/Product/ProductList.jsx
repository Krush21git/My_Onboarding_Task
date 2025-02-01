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

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts()).then((response) => {
      if (response.payload) {
        // Ensure all prices are formatted correctly
        const formattedProducts = response.payload.map(product => ({
          ...product,
          price: parseFloat(product.price).toFixed(2), // Ensure two decimal places
        }));
        dispatch(setProducts(formattedProducts));
      }
    });
  }, [dispatch]);  

  const resetForm = () => {
    setIsEditMode(false);
    setCurrentProduct({ name: '', price: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  // const handleSave = (e) => {
  //   e.preventDefault();
    
  //   if (isEditMode) {
  //     if (currentProduct.id) {
  //       // Optimistic update
  //       const updatedProduct = { ...currentProduct };
  //       const updatedProducts = products.map((product) =>
  //         product.id === currentProduct.id ? updatedProduct : product
  //       );
  //       dispatch(setProducts(updatedProducts));
  //       dispatch(updateProduct(currentProduct)); // Update the product via API
  //     } else {
  //       console.error('Product ID is missing!');
  //     }
  //   } else {
  //     dispatch(addProduct(currentProduct)); // Add new product
  //   }
    
  //   setShowModal(false);
  //   resetForm();
  // };


  const handleSave = (e) => {
    e.preventDefault();
    
    const formattedProduct = {
      ...currentProduct,
      price: parseFloat(currentProduct.price).toFixed(2) // Ensure two decimal places
    };
  
    if (isEditMode) {
      if (formattedProduct.id) {
        // Optimistic update in Redux state
        const updatedProducts = products.map((product) =>
          product.id === formattedProduct.id ? formattedProduct : product
        );
        dispatch(setProducts(updatedProducts));
        dispatch(updateProduct(formattedProduct)); // Update API with correctly formatted price
      } else {
        console.error('Product ID is missing!');
      }
    } else {
      dispatch(addProduct(formattedProduct)); // Add new product with formatted price
    }
    
    setShowModal(false);
    resetForm();
  };


  // const handleEdit = (product) => {
  //   setCurrentProduct({
  //     id: product.id,
  //     name: product.name,
  //     price: product.price,
  //   });
  //   setIsEditMode(true);
  //   setShowModal(true);
  // };


  const handleEdit = (product) => {
    setCurrentProduct({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price).toFixed(2), // Ensure two decimal places
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
        New Product
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
