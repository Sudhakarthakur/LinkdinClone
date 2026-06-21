import { createSlice } from "@reduxjs/toolkit"
import { getAllComment, getAllPosts } from "../../action/postAction"


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
            .addCase(getAllPosts.pending, (state) => {
                state.isLoading = true,
                    state.message = "Featching all the posts"
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.postFeatch = true;
                state.posts = action.payload.posts.reverse();
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message || "Post featching failed"
            })
            .addCase(getAllComment.fulfilled, (state, action) => {
                state.postId = action.payload.post_id
            })

    }
})


export default postSlice.reducer;