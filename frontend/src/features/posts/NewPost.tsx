import React from 'react';
import PostForm from "./components/PostForm.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {selectPostCreating} from "./postsSlice.ts";
import {NewsForm} from "../../types.ts";
import {createPost, fetchNews} from "./postsThunk.ts";

const NewPost = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isCreating = useAppSelector(selectPostCreating);

    const onFormSubmit = async (newMutation: NewsForm) => {
        await dispatch(createPost(newMutation));
        await dispatch(fetchNews())
        navigate('/');
    };

    return (
        <div>
            <PostForm onSubmit={onFormSubmit} isLoading={isCreating}/>
        </div>
    );
};

export default NewPost;