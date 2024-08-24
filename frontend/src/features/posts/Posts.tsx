import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchNews } from './postsThunk.ts';
import { selectPosts, selectPostsFetching } from './postsSlice.ts';
import PostItem from './components/PostItem.tsx';
import Spinner from '../../UI/Spinner/Spinner.tsx';

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const postsFetching = useAppSelector(selectPostsFetching);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <>
      {postsFetching ? (
        <Spinner />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h1>Posts</h1>
            <NavLink to="/add-new-post" className="btn btn-primary">
              Add new post
            </NavLink>
          </div>
          <div>
            {posts.length > 0 ? (
              <>
                {posts
                  .slice()
                  .reverse()
                  .map((item) => (
                    <PostItem key={item.id} news={item} />
                  ))}
              </>
            ) : (
              <h4>No news</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Posts;
