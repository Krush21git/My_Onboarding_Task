import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Navbar from './components/Navbar';
import CustomerList from './components/CustomerList'; // Example of a component for About page
import './index.css';
import ProductList from './components/Product/ProductList';
import StoreList from './components/Store/StoreList';

function App() {
  return (
    <div className="App" >
      <Routes> {/* Define your routes inside Routes component */}
        <Route path="/customers" element= {<CustomerList />} /> {/* Customer route */}
        <Route path="/products" element= {<ProductList />} /> {/* Product route */}
        <Route path="/stores" element= {<StoreList />} /> {/*Store Route */}
        {/* Add more routes here as needed */}
      </Routes>
    </div>
  );
}

export default App;
