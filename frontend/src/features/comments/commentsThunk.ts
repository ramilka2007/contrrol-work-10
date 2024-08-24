import { createAsyncThunk } from '@reduxjs/toolkit';
import { CommentForm } from '../../types.ts';
import axiosApi from '../../axiosApi.ts';

export const getCommentByNewsId = createAsyncThunk(
  'comments/get-by-news-id',
  async (id: string) => {
    console.log(id);
    const { data: comments } = await axiosApi.get(`/comments?news_id=${id}`);
    return comments ?? [];
  },
);

export const addComment = createAsyncThunk<void, CommentForm>(
  'comments/add',
  async (comment: CommentForm) => {
    await axiosApi.post(`/comments`, comment);
  },
);

export const deleteComment = createAsyncThunk<void, string>(
  'comments/delete',
  async (id: string) => {
    await axiosApi.delete(`/comments/${id}`);
  },
);

export const deleteAllComments = createAsyncThunk<void, string>(
  'comments/deleteAll',
  async (id: string) => {
    await axiosApi.delete(`/comments?news_id=${id}`);
  },
);
