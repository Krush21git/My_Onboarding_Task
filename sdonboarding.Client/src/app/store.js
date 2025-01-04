import { configureStore } from '@reduxjs/toolkit';
import customerReducer from '../features/customers/customerSlice';
import productReducer from '../features/products/productSlice' ;
import storeReducer from '../features/stores/storeSlice';
import saleReducer from '../features/sales/saleSlice';

export const store = configureStore({
  reducer: {
    customers: customerReducer,
    products: productReducer,
    stores: storeReducer,
    sales: saleReducer,
  },
});

export default store;