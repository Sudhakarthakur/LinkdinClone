import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "@/config";



export const loginUser = createAsyncThunk(
    "user/login", async (user, thunkApi) => {
        try {
            const response = await client.post(`/login`, {
                email: user.email,
                password: user.password
            })

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                return response.data;
            } else {
                return thunkApi.rejectWithValue({
                    message: "user not found"
                })
            }

        } catch (err) {
            return thunkApi.rejectWithValue(err.response?.data || {
                message: err.message
            })
        }
    }
)

export const registerUser = createAsyncThunk(
    "user/register",
    async (user, thunkApi) => {
        try {
            const response = await client.post(`/register`, {
                username: user.username,
                name: user.name,
                email: user.email,
                password: user.password

            })
            return response.data;
        } catch (err) {
            return thunkApi.rejectWithValue(err.response?.data || {
                message: err.message
            })
        }
    }
)


export const getAllUsers = createAsyncThunk(
    "user/getAllUsers", async (_, thunkApi) => {

        try {

            const response = await client.get("/user/get_all_users");
            return thunkApi.fulfillWithValue(response.data);

        } catch (err) {
            return thunkApi.rejectWithValue(err.response?.data || {
                message: err.message
            })
        }
    }

)