import { createSlice } from '@reduxjs/toolkit';
import {createPost} from "./postsThunk.ts";

export interface PostsState {
    isCreating: boolean;
}

const initialState: PostsState = {
    isCreating: false,
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
    },
    selectors: {
        selectPostCreating: (state) => state.isCreating,
    }
});

export const postsReducer = postsSlice.reducer;

export const {
    selectPostCreating,
} = postsSlice.selectors;