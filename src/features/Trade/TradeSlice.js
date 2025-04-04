import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCoins = createAsyncThunk("trade/fetchCoins", async () => {
  const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
  return response.json();
});

const tradeSlice = createSlice({
  name: "trade",
  initialState: {
    coins: [],
    tradePair: null,
    status: "idle",
  },
  reducers: {
    setTradePair: (state, action) => {
      state.tradePair = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setTradePair } = tradeSlice.actions;
export default tradeSlice.reducer;
