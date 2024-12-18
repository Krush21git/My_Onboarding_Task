import React, { useState, useEffect } from 'react';
import SaleDataTable from './SaleDataTable';
import SaleForm from './SaleForm';

const SaleList = () => {
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSale, setCurrentSale] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesRes, customersRes, productsRes, storesRes] = await Promise.all([
          fetch('/api/sales'),
          fetch('/api/customers'),
          fetch('/api/products'),
          fetch('/api/stores'),
        ]);
        const salesData = await salesRes.json();
        const customersData = await customersRes.json();
        const productsData = await productsRes.json();
        const storesData = await storesRes.json();
        setSales(salesData);
        setCustomers(customersData);
        setProducts(productsData);
        setStores(storesData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleOpenForm = (sale = {}) => {
    setIsEditMode(!!sale.id); // Set edit mode if sale.id exists
    setCurrentSale(sale); // Set current sale to edit or create new
    setShowForm(true);
  };

  // const handleSaveSale = async (e) => {
  //   e.preventDefault();

  //   const { customerId, productId, storeId, dateSold } = currentSale;
  //   if (!customerId || !productId || !storeId || !dateSold) {
  //     console.error('All fields are required!');
  //     return;
  //   }

  //   try {
  //     const method = isEditMode ? 'PUT' : 'POST';
  //     const url = isEditMode ? `/api/sales/${currentSale.id}` : '/api/sales';

  //     const response = await fetch(url, {
  //       method,
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(currentSale),
  //     });

  //     if (response.ok) {
  //       let updatedSale = null;

  //       if (response.status === 204) {
  //         updatedSale = currentSale;
  //       } else {
  //         updatedSale = await response.json();
  //       }

  //       setSales((prevSales) => {
  //         if (isEditMode) {
  //           return prevSales.map((sale) =>
  //             sale.id === updatedSale.id ? updatedSale : sale
  //           );
  //         } else {
  //           return [...prevSales, updatedSale];
  //         }
  //       });

  //       setShowForm(false);
  //       setCurrentSale({});
  //     } else {
  //       console.error('Failed to save sale:', response.status, response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error saving sale:', error);
  //   }
  // };

  const fetchData = async () => {
    try {
      const [salesRes, customersRes, productsRes, storesRes] = await Promise.all([
        fetch('/api/sales'),
        fetch('/api/customers'),
        fetch('/api/products'),
        fetch('/api/stores'),
      ]);
      const salesData = await salesRes.json();
      const customersData = await customersRes.json();
      const productsData = await productsRes.json();
      const storesData = await storesRes.json();
      setSales(salesData);
      setCustomers(customersData);
      setProducts(productsData);
      setStores(storesData);
    } catch (err) {
      console.error(err);
    }
  };
  

  const handleSaveSale = async (e) => {
    e.preventDefault();
  
    const { customerId, productId, storeId, dateSold } = currentSale;
    if (!customerId || !productId || !storeId || !dateSold) {
      console.error('All fields are required!');
      return;
    }
  
    try {
      const method = isEditMode ? 'PUT' : 'POST';
      const url = isEditMode ? `/api/sales/${currentSale.id}` : `/api/sales`;
  
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentSale),
      });
  
      if (response.ok) {
        setSales([]);
        // Re-fetch sales data after saving
        fetchData();
        setShowForm(false);
        setCurrentSale({});
      } else {
        console.error('Failed to save sale:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error saving sale:', error);
    }
  };
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSale((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteSale = async (id) => {
    try {
      const response = await fetch(`/api/sales/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setSales((prevSales) => prevSales.filter((sale) => sale.id !== id));
      } else {
        console.error('Failed to delete sale');
      }
    } catch (err) {
      console.error('Error deleting sale', err);
    }
  };

    // Confirm deletion
  const handleConfirmDelete = () => {
    if (saleToDelete) {
      onDelete(saleToDelete.id); // Call the onDelete function passed as a prop
    }
    handleCloseModal();
  };

  return (
    <div className="container mx-auto p-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
        onClick={() => handleOpenForm()}
      >
        New Sale
      </button>

      <SaleForm
        isOpen={showForm}
        isEditMode={isEditMode}
        currentData={currentSale}
        customers={customers}
        products={products}
        stores={stores}
        onClose={() => setShowForm(false)}
        onSave={handleSaveSale}
        onChange={handleChange}
      />

      <SaleDataTable
        sales={sales}
        customers={customers}
        products={products}
        stores={stores}
        onEdit={handleOpenForm}
        onDelete={handleDeleteSale}
      />
    </div>
  );
};

export default SaleList;
