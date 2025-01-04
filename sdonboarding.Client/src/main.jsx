import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';  // Import BrowserRouter
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import App from './App';
import { store } from './app/store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
   
    <Router> {/* Wrap App component with Router */}
    <Navbar />
      <App />
    <Footer />
    </Router>
  </Provider>
);
