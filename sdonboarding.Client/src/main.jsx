import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import App from './App';
import { store } from './app/store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar at the top */}
        <Navbar />
        
        {/* Main App content that grows to fill space */}
        <App />
        
        {/* Footer at the bottom */}
        <Footer />
      </div>
    </Router>
  </Provider>
);
