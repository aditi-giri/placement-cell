import { createSlice } from "@reduxjs/toolkit";
import { deletePost, getAllPosts } from "../../action/postAction";

const initialState = {
    posts: [],
    isError: false,
    postFetched: false,
    isLoading: false,
    message: "",
    postId: ""
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        reset: () => initialState,
        resetPostId: (state) => {
            state.postId = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.pending, (state) => {
                state.isLoading = true;
                state.message = "Fetching all the posts...";
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.postFetched = true;
                state.posts = action.payload.posts.reverse();
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message || "Failed to fetch posts.";
            })
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true;
                state.message = "Deleting post...";
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = state.posts.filter((post) => post._id !== action.payload);
                state.message = "Post deleted successfully!";
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message || "Failed to delete post.";
            });
    }
});

export const { reset, resetPostId } = postSlice.actions;
export default postSlice.reducer;