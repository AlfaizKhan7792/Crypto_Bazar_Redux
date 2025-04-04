import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Login, Register } from "./AuthService";

const UserExist = JSON.parse(localStorage.getItem("Auth"))

const AuthSlice = createSlice({
    name : "Auth",
    initialState : {
        Users : UserExist || null,
        isLoading : false,
        isSuccess : false,
        isError : false,
        message : ""
    },
    reducers : {},
    extraReducers : (builder) =>{
        builder
        .addCase(RegisterUser.pending , (state , action) =>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
            state.message = ""
        })
        .addCase(RegisterUser.fulfilled , (state , action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.Users = action.payload
            state.isError = false
            state.message = ""
        })
        .addCase(RegisterUser.rejected , (state , action) =>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })

        .addCase(LoginUser.pending , (state , action) =>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
            state.message = ""
        })
        .addCase(LoginUser.fulfilled , (state , action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.Users = action.payload
            state.isError = false
            state.message = ""
        })
        .addCase(LoginUser.rejected , (state , action) =>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })

        .addCase(LogoutUser.fulfilled , (state , action) =>{
            state.isLoading = false
            state.isSuccess = false
            state.Users = null
            state.isError = false
            state.message = ""
        })
    }
})

export default AuthSlice.reducer

// Register Thunk
export const RegisterUser = createAsyncThunk("AUTH/REGISTER", async (FormData , thunkAPI) =>{
    try {
        return await Register(FormData)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

// Login Thunk
export const LoginUser = createAsyncThunk("AUTH/LOGIN", async (FormData , thunkAPI) =>{
    try {
        return await Login(FormData)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

// Logout Thunk
export const LogoutUser = createAsyncThunk("AUTH/LOGOUT", () =>{
    localStorage.removeItem("Auth")
})