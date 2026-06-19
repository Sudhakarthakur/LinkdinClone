import { createSlice } from "@reduxjs/toolkit"
import { getAllPost } from "../../action/postAction"


const initialState = {
    posts: [],
    isError: false,
    postFeatch: false,
    isLoading: false,
    message: "",
    comment: [],
    postId: ""
}


const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        reset: () =>
            initialState,
        resetPostId: (state) => {
            state.postId = ""
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPost.pending, (state) => {
                state.isLoading = true,
                    state.message = "Featching all the posts"
            })
            .addCase(getAllPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.postFeatch = true;
                state.posts = action.payload.posts;
            })
            .addCase(getAllPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message || "Post featching failed"
            })
    }
})


export default postSlice.reducer;