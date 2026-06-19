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
                localStorage.setItem("token ", response.data.token)
            } else {
                return thunkApi.rejectWithValue({
                    message: "user not found"
                })
            }

        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data)
        }
    }
)

export const registerUser = createAsyncThunk(
    "usre/register",
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
            return thunkApi.rejectWithValue(err.response.data);
        }
    }
)