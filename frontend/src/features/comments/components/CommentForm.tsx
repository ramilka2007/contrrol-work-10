import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { CommentForm } from '../../../types.ts';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch } from '../../../app/hooks.ts';
import { addComment, getCommentByNewsId } from '../commentsThunk.ts';

interface Props {
  newsId: string;
  isLoading: boolean;
}

const PostForm: React.FC<Props> = ({ newsId, isLoading }) => {
  const dispatch = useAppDispatch();

  const [state, setState] = useState<CommentForm>({
    news_id: newsId,
    author: '',
    comment: '',
  });

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(addComment(state));
    await dispatch(getCommentByNewsId(newsId));
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      component="form"
      onSubmit={submitFormHandler}
    >
      <h1>Add new comment</h1>
      <Grid item>
        <TextField
          required
          label="Author"
          id="author"
          name="author"
          value={state.author}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid item>
        <TextField
          required
          multiline
          minRows={3}
          label="Comment"
          id="comment"
          name="comment"
          value={state.comment}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid item>
        <LoadingButton
          type="submit"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
          disabled={state.author === '' || state.comment === ''}
        >
          <span>Save</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default PostForm;
