import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Fetch customers
const apiUrl = import.meta.env.VITE_API_URL;
//const apiUrl = 'https://onboardingcrudoperation-d7ggg0e9ajagdsbp.australiaeast-01.azurewebsites.net/api/Customers';
//const apiUrl = 'http://localhost:5158/api/customer'

export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/Customers`);
      if (!response.ok) throw new Error('Failed to fetch customers');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Add customer
export const addCustomer = createAsyncThunk(
    'customers/addCustomer',
    async (customer, { rejectWithValue }) => {
      try {
        const response = await fetch('/api/Customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(customer),
        });
        if (!response.ok) throw new Error('Failed to add customer');
  
        const data = await response.json();
        console.log('API Response:', data); // Add this for debugging
        return data; // Ensure this returns the new customer object
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const updateCustomer = createAsyncThunk(
    'customers/updateCustomer',
    async (customer, { rejectWithValue }) => {
      try {
        const response = await fetch(`/api/Customers/${customer.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(customer),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update customer');
        }
  
        return await response.json(); // Return updated customer data
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

  // Delete customer action
export const deleteCustomer = createAsyncThunk(
    'customers/deleteCustomer',
    async (customerId, { rejectWithValue }) => {
      try {
        const response = await fetch(`/api/Customers/${customerId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete customer');
        return customerId; // Return the id of the deleted customer
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

const customerSlice = createSlice({
  name: 'customers',
  initialState: { data: [], loading: false, error: null },

  reducers: {
    setCustomers: (state, action) => {
      state.data = action.payload; // Update the customer list directly
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        //console.log('Redux State Before:', state.data); // Debug current state
        state.data.push(action.payload); // Add new customer to state
        //console.log('Redux State After:', state.data); // Debug updated state
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const updatedCustomer = action.payload;
        const index = state.data.findIndex((customer) => customer.id === updatedCustomer.id);
        if (index !== -1) {
          state.data[index] = updatedCustomer; // Update the customer in the state
        }
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.data = state.data.filter(customer => customer.id !== action.payload); // Remove the deleted customer from state
      });
  },
});
export const { setCustomers } = customerSlice.actions;

export default customerSlice.reducer;
