import { createSlice } from '@reduxjs/toolkit';
import {createPost, deleteNews, fetchNews} from "./postsThunk.ts";
import {News} from "../../types.ts";

export interface PostsState {
    posts: News[];
    isCreating: boolean;
    isDeleting: boolean;
}

const initialState: PostsState = {
    posts: [],
    isCreating: false,
    isDeleting: false,
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createPost.pending, (state: PostsState) => {
            state.isCreating = true;
        }).addCase(createPost.fulfilled, (state: PostsState) => {
            state.isCreating = false;
        }).addCase(createPost.rejected, (state: PostsState) => {
            state.isCreating = false;
        });

        builder.addCase(fetchNews.fulfilled, (state: PostsState, {payload: news}) => {
            state.posts = news;
        });

        builder.addCase(deleteNews.fulfilled, (state: PostsState) => {
            state.isDeleting = false
        });
    },
    selectors: {
        selectPosts: (state) => state.posts,
        selectPostCreating: (state) => state.isCreating,
    }
});

export const postsReducer = postsSlice.reducer;

export const {
    selectPosts,
    selectPostCreating,
} = postsSlice.selectors;