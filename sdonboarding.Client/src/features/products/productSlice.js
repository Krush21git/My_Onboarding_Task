import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//const apiUrl = import.meta.env.VITE_API_URL;
//console.log(`${apiUrl}`);
//console.log("test");
const apiUrl = 'https://onboardingcrudoperation-d7ggg0e9ajagdsbp.australiaeast-01.azurewebsites.net';
//const apiUrl = 'http://localhost:5158/api/customer'

// Fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/Products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add product
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/Products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error('Failed to add product');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async (product, { rejectWithValue }) => {
      try {
        const response = await fetch(`${apiUrl}/api/Products/${product.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        });
        if (!response.ok) {

            throw new Error('Failed to update product');
  
          }
  
          return await response.json(); // Return updated customer data
  
        } catch (error) {
  
          return rejectWithValue(error.message);
  
        }
    }
  );

// Delete product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/Products/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete product');
      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: { data: [], loading: false, error: null },

  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload; // The updated product from the API
        const index = state.data.findIndex((product) => product.id === updatedProduct.id);
        if (index !== -1) {
          state.data[index] = updatedProduct; // Update the product in the state
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.data = state.data.filter(product => product.id !== action.payload);
      });
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
