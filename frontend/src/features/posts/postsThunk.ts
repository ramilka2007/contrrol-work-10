import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {News, NewsForm} from "../../types.ts";

export const createPost = createAsyncThunk<void, NewsForm>(
    'posts/create',
    async (productMutation) => {
        const formData = new FormData();
        formData.append('title', productMutation.title);
        formData.append('text', productMutation.text);

        if (productMutation.image) {
            formData.append('image', productMutation.image);
        }

        await axiosApi.post('news', formData);
    }
);

export const fetchNews = createAsyncThunk<News[]>(
    'posts/fetchAll',
    async () => {
        const {data: news} = await axiosApi.get<News[]>('news');
        return news;
    }
);

export const deleteNews = createAsyncThunk<void, string>(
    'news/delete',
    async (id: string) => {
        await axiosApi.delete(`news/${id}`);
    });