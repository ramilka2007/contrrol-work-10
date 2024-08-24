import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useParams } from 'react-router-dom';
import { fetchOnePost } from './postsThunk.ts';
import { selectOnePost, selectOnePostFetching } from './postsSlice.ts';
import FullPostItem from './components/FullPostItem.tsx';
import {
  deleteComment,
  getCommentByNewsId,
} from '../comments/commentsThunk.ts';
import CommentForm from '../comments/components/CommentForm.tsx';
import {
  selectAddLoading,
  selectComments,
  selectFetchingComments,
} from '../comments/commentsSlice.ts';
import Spinner from '../../UI/Spinner/Spinner.tsx';

const FullPost = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectOnePost);
  const comments = useAppSelector(selectComments);
  const onePostFetching = useAppSelector(selectOnePostFetching);
  const addLoading = useAppSelector(selectAddLoading);
  const commentsFetching = useAppSelector(selectFetchingComments);

  useEffect(() => {
    dispatch(fetchOnePost(id));
    dispatch(getCommentByNewsId(id));
  }, [dispatch, id]);

  const deleteCommentById = async (commentId: string) => {
    if (id) {
      await dispatch(deleteComment(commentId));
      await dispatch(getCommentByNewsId(id));
    }
  };

  return (
    <div>
      {onePostFetching ? (
        <Spinner />
      ) : (
        <>
          {post ? <FullPostItem news={post} /> : <h1>Not Found</h1>}
          <div>
            <CommentForm newsId={id} isLoading={addLoading} />
            <h1 className="mt-5">Comments</h1>
            {commentsFetching ? (
              <Spinner />
            ) : (
              <>
                {comments.length > 0 ? (
                  <div className="comments-block">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="border rounded-4 mb-4 p-2 text-start d-flex align-items-center justify-content-between w-50 mx-auto"
                      >
                        <div>
                          <h5>Author: {comment.author}</h5>
                          <p>{comment.comment}</p>
                        </div>
                        <button
                          onClick={() => deleteCommentById(comment.id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <h6 className="opacity-50">No comments</h6>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FullPost;
