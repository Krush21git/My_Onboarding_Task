import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//const apiUrl = import.meta.env.VITE_API_URL;
//console.log(`${apiUrl}`);
//console.log("test");
const apiUrl = 'https://onboardingcrudoperation-d7ggg0e9ajagdsbp.australiaeast-01.azurewebsites.net';

// Fetch stores
export const fetchStores = createAsyncThunk(
  'stores/fetchStores',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/Stores`);
      if (!response.ok) throw new Error('Failed to fetch stores');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add store
export const addStore = createAsyncThunk(
  'stores/addStore',
  async (store, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/Stores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(store),
      });
      if (!response.ok) throw new Error('Failed to add store');
      return await response.json(); // Return new store object
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update store
export const updateStore = createAsyncThunk(
  'stores/updateStore',
  async (store, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/Stores/${store.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(store),
      });
      if (!response.ok) throw new Error('Failed to update store');
      return await response.json(); // Return updated store object
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete store
export const deleteStore = createAsyncThunk(
  'stores/deleteStore',
  async (storeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/Stores/${storeId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete store');
      return storeId; // Return ID of deleted store
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const storeSlice = createSlice({
  name: 'stores',
  initialState: { data: [], loading: false, error: null },
  reducers: {
    setStores: (state, action) => {
      state.data = action.payload; // Update the store list directly
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addStore.fulfilled, (state, action) => {
        state.data.push(action.payload); // Add new store to state
      })
      .addCase(updateStore.fulfilled, (state, action) => {
        const updatedStore = action.payload;
        const index = state.data.findIndex((store) => store.id === updatedStore.id);
        if (index !== -1) {
          state.data[index] = updatedStore; // Update store in state
        }
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.data = state.data.filter((store) => store.id !== action.payload); // Remove deleted store from state
      });
  },
});

export const { setStores } = storeSlice.actions;

export default storeSlice.reducer;
