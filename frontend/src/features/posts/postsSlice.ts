import { createSlice } from '@reduxjs/toolkit';
import {
  createPost,
  deleteNews,
  fetchNews,
  fetchOnePost,
} from './postsThunk.ts';
import { News } from '../../types.ts';

export interface PostsState {
  posts: News[];
  post: News | null;
  postsFetching: boolean;
  isCreating: boolean;
  isDeleting: boolean;
  onePostFetching: boolean;
}

const initialState: PostsState = {
  posts: [],
  post: null,
  postsFetching: false,
  isCreating: false,
  isDeleting: false,
  onePostFetching: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state: PostsState) => {
        state.isCreating = true;
      })
      .addCase(createPost.fulfilled, (state: PostsState) => {
        state.isCreating = false;
      })
      .addCase(createPost.rejected, (state: PostsState) => {
        state.isCreating = false;
      });

    builder
      .addCase(fetchNews.pending, (state: PostsState) => {
        state.postsFetching = true;
      })
      .addCase(fetchNews.fulfilled, (state: PostsState, { payload: news }) => {
        state.posts = news;
        state.postsFetching = false;
      })
      .addCase(fetchNews.rejected, (state: PostsState) => {
        state.postsFetching = false;
      });

    builder
      .addCase(deleteNews.pending, (state: PostsState) => {
        state.isDeleting = true;
      })
      .addCase(deleteNews.fulfilled, (state: PostsState) => {
        state.isDeleting = false;
      })
      .addCase(deleteNews.rejected, (state: PostsState) => {
        state.isDeleting = false;
      });

    builder
      .addCase(fetchOnePost.pending, (state: PostsState) => {
        state.onePostFetching = true;
      })
      .addCase(
        fetchOnePost.fulfilled,
        (state: PostsState, { payload: post }) => {
          state.post = post;
          state.onePostFetching = false;
        },
      )
      .addCase(fetchOnePost.rejected, (state: PostsState) => {
        state.onePostFetching = false;
      });
  },
  selectors: {
    selectPosts: (state) => state.posts,
    selectPostsFetching: (state) => state.postsFetching,
    selectPostCreating: (state) => state.isCreating,
    selectPostDeleting: (state) => state.isDeleting,
    selectOnePost: (state) => state.post,
    selectOnePostFetching: (state) => state.onePostFetching,
  },
});

export const postsReducer = postsSlice.reducer;

export const {
  selectPosts,
  selectPostsFetching,
  selectPostCreating,
  selectPostDeleting,
  selectOnePost,
  selectOnePostFetching,
} = postsSlice.selectors;
