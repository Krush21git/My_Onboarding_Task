import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Navbar from './components/Navbar';
import CustomerList from './components/CustomerList'; // Example of a component for About page
import './index.css';

function App() {
  return (
    <div className="App">
      <Routes> {/* Define your routes inside Routes component */}
        <Route path="/" element={<Navbar />} />  {/* Home route */}
        <Route path="/customers" element= {<CustomerList />} /> {/* About route */}
        {/* Add more routes here as needed */}
      </Routes>
    </div>
  );
}

export default App;
