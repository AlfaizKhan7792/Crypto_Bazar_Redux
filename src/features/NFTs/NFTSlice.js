import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNFTs = createAsyncThunk("nfts/fetchNFTs", async () => {
  const response = await fetch("https://api.coingecko.com/api/v3/nfts/list");
  const data = await response.json();
  return data;
});

const NFTSlice = createSlice({
  name: "nfts",
  initialState: {
    nfts: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNFTs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNFTs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nfts = action.payload;
      })
      .addCase(fetchNFTs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default NFTSlice.reducer;