import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Container, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import { selectLoading, selectShortLink } from './linksSlice';
import { sendLink } from './linksThunks';

const ShortLink = () => {
  const [formData, setFormData] = useState('');
  const shortenLink = useAppSelector(selectShortLink);
  const isLoading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.value);
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(sendLink(formData));
  };

  return (
    <Container component="main" maxWidth="lg">
      <Grid
        container
        direction="column"
        spacing={2}
        component="form"
        onSubmit={submitFormHandler}
      >
        <Grid>
          <TextField
            label="Url"
            name="url"
            id="url"
            value={formData}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid>
          <LoadingButton
            type="submit"
            loading={isLoading}
            loadingPosition="start"
            sx={{ p: '8px 20px', fontSize: '24px' }}
            startIcon={<SendIcon />}
            variant="contained"
          >
            <span>Send</span>
          </LoadingButton>
        </Grid>
      </Grid>
      {shortenLink && (
        <Typography variant="h2" component="a" href={`http://localhost:8000/links/${shortenLink.shortUrl}`}>
          `http://localhost:8000/links/${shortenLink.shortUrl}`
        </Typography>
      )}
    </Container>
  );
};

export default ShortLink;
