import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = 'https://onboardingcrudoperation-d7ggg0e9ajagdsbp.australiaeast-01.azurewebsites.net';

// Fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/Products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const products = await response.json();

      // Format price correctly before storing it in Redux
      return products.map(product => ({
        ...product,
        price: parseFloat(product.price).toFixed(2),  // Ensure price always has two decimals
      }));
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
      const newProduct = await response.json();
      
      // Ensure price is formatted before adding it to state
      return {
        ...newProduct,
        price: parseFloat(newProduct.price).toFixed(2),
      };
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
      if (!response.ok) throw new Error('Failed to update product');

      const updatedProduct = await response.json();

      return {
        ...updatedProduct,
        price: parseFloat(updatedProduct.price).toFixed(2),
      };
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
        const updatedProduct = action.payload;
        const index = state.data.findIndex((product) => product.id === updatedProduct.id);
        if (index !== -1) {
          state.data[index] = updatedProduct;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.data = state.data.filter(product => product.id !== action.payload);
      });
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
