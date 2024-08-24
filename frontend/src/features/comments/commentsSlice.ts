import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types.ts';
import {
  addComment,
  deleteComment,
  getCommentByNewsId,
} from './commentsThunk.ts';
import { postsSlice } from '../posts/postsSlice.ts';

export interface CommentsState {
  comments: Comment[];
  isLoading: boolean;
  addLoading: boolean;
  isError: boolean;
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  addLoading: false,
  isError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addComment.pending, (state: CommentsState) => {
      state.addLoading = true;
      state.isError = false;
    });
    builder.addCase(addComment.fulfilled, (state: CommentsState) => {
      state.addLoading = false;
    });
    builder.addCase(addComment.rejected, (state: CommentsState) => {
      state.addLoading = false;
      state.isError = true;
    });

    builder.addCase(getCommentByNewsId.pending, (state: CommentsState) => {
      state.isLoading = true;
      state.isError = false;
      state.comments = [];
    });
    builder.addCase(
      getCommentByNewsId.fulfilled,
      (state: CommentsState, { payload: comments }) => {
        state.isLoading = false;
        state.comments = comments;
      },
    );
    builder.addCase(getCommentByNewsId.rejected, (state: CommentsState) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(deleteComment.pending, (state: CommentsState) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(deleteComment.fulfilled, (state: CommentsState) => {
      state.isLoading = false;
    });
    builder.addCase(deleteComment.rejected, (state: CommentsState) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
  selectors: {
    selectComments: (state) => state.comments,
    selectFetchingComments: (state) => state.isLoading,
    selectAddLoading: (state) => state.addLoading,
  },
});

export const commentsReducer = commentsSlice.reducer;

export const { selectComments, selectFetchingComments, selectAddLoading } =
  commentsSlice.selectors;
