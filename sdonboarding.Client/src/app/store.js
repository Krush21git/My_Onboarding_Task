import { configureStore } from '@reduxjs/toolkit';
import customerReducer from '../features/customers/customerSlice';
import productReducer from '../features/products/productSlice' ;
// import storeReducer from '../features/stores/storeSlice';

export const store = configureStore({
  reducer: {
    customers: customerReducer,
    products: productReducer,
    // stores: storeReducer,
  },
});

export default store;
