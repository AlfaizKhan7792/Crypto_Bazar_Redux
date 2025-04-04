import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchSearchCoins, FetchSingleCoin, FetchTrendingCoins } from "./CoinsService";

const CoinsSlice = createSlice({
    name : "Coins",
    initialState : {
        coins : JSON.parse(localStorage.getItem("searchCoins")) || [],
        // coins : [],
        trendingCoins : [],
        coin : {},
        CardCoins : JSON.parse(localStorage.getItem("CardItems")) ||  [],
        // CardCoins : [],
        isLoading : false,
        isSuccess : false,
        isError : false,
        message : ""
    },
    reducers : {
        AddToCard : (state , action) =>{
            const existingItem = state.CardCoins.find(item => item.id === action.payload.id)
           
            if(existingItem){
                existingItem.quantity += 1
            }else{
                state.CardCoins.push({...action.payload , quantity : 1})
            }             
            localStorage.setItem("CardItems", JSON.stringify(state.CardCoins))
        },

        RemoveCard : (state , action) =>{
    state.CardCoins = state.CardCoins.filter((item) => item.id !== action.payload)
    localStorage.setItem("CardItems", JSON.stringify(state.CardCoins))

        },

        UpdateQuantity : (state , action) =>{
            const {id , amount} = action.payload
                state.CardCoins = state.CardCoins.map((item) => item.id === id ? {...item, quantity : item.quantity + amount} : item )
                localStorage.setItem("CardItems" , JSON.stringify(state.CardCoins))
        }

    },
    extraReducers : (builder) =>{
builder
.addCase(GetTrendingCoins.pending , (state , action) =>{
    state.isLoading = true
    state.isSuccess = false
    state.isError = false
    state.message = ""
})
.addCase(GetTrendingCoins.fulfilled , (state , action) =>{
    state.isLoading = false
    state.isSuccess = true
    state.trendingCoins = action.payload
    state.isError = false
    state.message = ""
})
.addCase(GetTrendingCoins.rejected , (state , action) =>{
    state.isLoading = false
    state.isSuccess = false
    state.isError = true
    state.message = action.payload
})

.addCase(GetSearchCoins.pending , (state , action) =>{
    state.isLoading = true
    state.isSuccess = false
    state.isError = false
    state.message = ""
})
.addCase(GetSearchCoins.fulfilled , (state , action) =>{
    state.isLoading = false
    state.isSuccess = true
    state.coins = action.payload
    state.isError = false
    state.message = ""
    localStorage.setItem("CardItems", JSON.stringify(action.payload))
})
.addCase(GetSearchCoins.rejected , (state , action) =>{
    state.isLoading = false
    state.isSuccess = false
    state.isError = true
    state.message = action.payload
})

.addCase(GetSingleCoin.pending , (state , action) =>{
    state.isLoading = true
    state.isSuccess = false
    state.isError = false
    state.message = ""
})
.addCase(GetSingleCoin.fulfilled , (state , action) =>{
    state.isLoading = false
    state.isSuccess = true
    state.coin = action.payload
    state.isError = false
    state.message = ""
})
.addCase(GetSingleCoin.rejected , (state , action) =>{
    state.isLoading = false
    state.isSuccess = false
    state.isError = true
    state.message = action.payload
})
    }    
})

export const {AddToCard , RemoveCard , UpdateQuantity} = CoinsSlice.actions
export default CoinsSlice.reducer


// Get Trending-Coins Thunk
export const GetTrendingCoins = createAsyncThunk("FETCH/TRENDING" , async (_, thunkAPI) =>{
    try {
        return await FetchTrendingCoins()
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


// Fetch Search-Coins Thunk
export const GetSearchCoins = createAsyncThunk("SEARCH/COINS" , async (query , thunkAPI) =>{
    try {
        return await FetchSearchCoins(query)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


// Fetch Single-Coin Thunk
export const GetSingleCoin = createAsyncThunk("FETHC-SINGLE/COIN" , async (id , thunkAPI) =>{
    try {
        return await FetchSingleCoin(id)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})