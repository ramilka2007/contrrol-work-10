import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {NewsForm} from "../../types.ts";

export const createPost = createAsyncThunk<void, NewsForm>(
    'posts/create',
    async (productMutation) => {
        const formData = new FormData();
        formData.append('title', productMutation.title);
        formData.append('text', productMutation.text);

        if (productMutation.image) {
            formData.append('image', productMutation.image);
        }

        await axiosApi.post('/news', formData);
    }
);