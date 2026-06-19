import client from "@/config"
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getAllPost = createAsyncThunk(
    "post/getAllPosts",
    async (_, thunkApi) => {
        try {
            const response = await client.get("/postsAll")
            return thunkApi.fulfillWithValue(response.data);
        } catch (err) {
            return thunkApi.rejectWithValue(err.response?.data || {
                message: err.message
            })
        }

    }
)


export const getAboutUser = createAsyncThunk(
    "user/getAboutUser",
    async (user, thunkApi) => {
        console.log(user);
        console.log(user.token);
        try {
            const response = await client.get("/get_user_profile", {
                params: {
                    token: user.token
                }
            })
            return thunkApi.fulfillWithValue(response.data)
        } catch (err) {
            return thunkApi.rejectWithValue(err.response?.data, {
                message: err.message
            })
        }
    }
)