import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch staking options from API
export const fetchStakingOptions = createAsyncThunk("earn/fetchStakingOptions", async () => {
  const response = await fetch("https://api.example.com/staking-options");
  return response.json();
});

const earnSlice = createSlice({
  name: "earn",
  initialState: {
    stakingOptions: [],
    rewards: [],
    status: "idle",
  },
  reducers: {
    stakeCrypto: (state, action) => {
      const { coin, amount } = action.payload;
      state.rewards.push({ coin, amount: amount * 0.05 }); // 5% reward simulation
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStakingOptions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStakingOptions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stakingOptions = action.payload;
      })
      .addCase(fetchStakingOptions.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { stakeCrypto } = earnSlice.actions;
export default earnSlice.reducer;
