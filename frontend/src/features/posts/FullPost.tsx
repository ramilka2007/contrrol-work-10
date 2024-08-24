import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useParams } from 'react-router-dom';
import { fetchOnePost } from './postsThunk.ts';
import { selectOnePost } from './postsSlice.ts';
import FullPostItem from "./components/FullPostItem.tsx";

const FullPost = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectOnePost);

  useEffect(() => {
    dispatch(fetchOnePost(id));
  }, [dispatch, id]);

  return (
    <div>
      {post ? <FullPostItem news={post}/> : <h1>Not Found</h1>}
    </div>
  );
};

export default FullPost;
