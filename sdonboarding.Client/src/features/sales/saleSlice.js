import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//const apiUrl = import.meta.env.VITE_API_URL;
//console.log(`${apiUrl}`);
//console.log("test");
const apiUrl = 'https://onboardingcrudoperation-d7ggg0e9ajagdsbp.australiaeast-01.azurewebsites.net';

// Async Thunk to fetch sales data
export const fetchSales = createAsyncThunk(
  'sales/fetchSales',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/Sales`);
      if (!response.ok) {
        throw new Error('Failed to fetch sales data');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk to add a new sale
export const addSale = createAsyncThunk(
  'sales/addSale',
  async (newSale, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/Sales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSale),
      });
      if (!response.ok) {
        throw new Error('Failed to add new sale');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk to update an existing sale
export const updateSale = createAsyncThunk(
  'sales/updateSale',
  async (updatedSale, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/Sales/${updatedSale.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSale),
      });
      if (!response.ok) {
        throw new Error('Failed to update sale');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk to delete a sale
export const deleteSale = createAsyncThunk(
  'sales/deleteSale',
  async (saleId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/Sales/${saleId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete sale');
      }
      return saleId; // Return the deleted sale ID for state removal
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Sales Slice
const saleSlice = createSlice({
  name: 'sales',
  initialState: {
    data: [], // Holds the sales data
    loading: false, // Tracks the loading state
    error: null, // Holds any error message
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Sales
      .addCase(fetchSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load sales data';
      })

      // Add Sale
      .addCase(addSale.fulfilled, (state, action) => {
        state.data.push(action.payload); // Add the new sale to state
      })
      .addCase(addSale.rejected, (state, action) => {
        state.error = action.payload || 'Failed to add new sale';
      })

      // Update Sale
      .addCase(updateSale.fulfilled, (state, action) => {
        const updatedSale = action.payload;
        const index = state.data.findIndex((sale) => sale.id === updatedSale.id);
        if (index !== -1) {
          state.data[index] = updatedSale; // Update the specific sale
        }
      })
      .addCase(updateSale.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update sale';
      })

      // Delete Sale
      .addCase(deleteSale.fulfilled, (state, action) => {
        state.data = state.data.filter((sale) => sale.id !== action.payload);
      })
      .addCase(deleteSale.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete sale';
      });
  },
});

export default saleSlice.reducer;
