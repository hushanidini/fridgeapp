import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addItem as apiAddItem } from "../utils/api";

// Create a thunk action using createAsyncThunk
export const addFridgeItem = createAsyncThunk("fridge/addFridgeItem", async (itemData) => {
  try {
    const response = await apiAddItem(itemData);
    return response;
  } catch (error) {
    throw error;
  }
});

const fridgeSlice = createSlice({
  name: "fridge",
  initialState: {
    items: [],
    loading: false
  },
  reducers: {
    fetchItemsStart: (state) => {
      state.loading = true;
    },
    fetchItemsSuccess: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(addFridgeItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFridgeItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload); // Add the newly added item to the state
      })
      .addCase(addFridgeItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { fetchItemsStart, fetchItemsSuccess } = fridgeSlice.actions;

export default fridgeSlice.reducer;
