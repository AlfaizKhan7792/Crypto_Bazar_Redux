import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLearnContent = createAsyncThunk("learn/fetchContent", async () => {
  const response = await fetch("https://api.example.com/learn");
  return response.json();
});

const learnSlice = createSlice({
  name: "learn",
  initialState: { content: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLearnContent.pending, (state) => { state.loading = true; })
      .addCase(fetchLearnContent.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
      })
      .addCase(fetchLearnContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default learnSlice.reducer;
