import client from "@/config"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { use } from "react";


export const getAllPosts = createAsyncThunk(
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


export const createPost = createAsyncThunk(
    "/user/createpost",
    async (userData, thunkApi) => {
        const { file, body } = userData;
        try {

            const formData = new FormData();
            formData.append('token', localStorage.getItem('token'));
            formData.append('body', body)
            formData.append('media', file)
            const response = await client.post("/post", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                return thunkApi.fulfillWithValue("Post Uploaded");
            } else {
                return thunkApi.rejectWithValue("Post not uploaded")
            }

        } catch (err) {
            return thunkApi.rejectWithValue(err.response?.data, {
                message: err.message
            })
        }
    }

)

export const deletePost = createAsyncThunk(
    "user/deletePost",
    async (post_id, thunkApi) => {
        try {
            const response = await client.delete("/delete_post", {
                data: {
                    token: localStorage.getItem("token"),
                    post_id: post_id.post_id
                }

            });
            return thunkApi.fulfillWithValue(response.data)

        } catch (err) {
            return thunkApi.rejectWithValue(err.response?.data, {
                message: err.message
            })
        }
    }
)


export const incrementlike = createAsyncThunk(
    "user/incrementLikes",
    async (post, thunkApi) => {
        try {
            const response = await client.post("/incremetlikes", {
                post_id: post.post_id
            })

            return thunkApi.fulfillWithValue(response.data)

        } catch (err) {
            return thunkApi.rejectWithValue(err.response?.data, {
                message: err.message
            })
        }
    }
)


export const getAllComment = createAsyncThunk(
    "user/getAllComments",
    async (postData, thunkApi) => {
        try {
            const response = await client.get("/get_comments", {
                params: {
                    post_id: postData.post_id
                }
            })


            return thunkApi.fulfillWithValue({
                comments: response.data.comments,
                post_id: postData.post_id
            })
        } catch (err) {
            return thunkApi.rejectWithValue(err.response?.data, {
                message: err.message
            })
        }
    }
)