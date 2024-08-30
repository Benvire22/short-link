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
    <Container component="main" maxWidth="lg" sx={{ mt: 5 }}>
      <Grid
        container
        direction="column"
        spacing={4}
        component="form"
        onSubmit={submitFormHandler}
      >
        <Grid>
          <TextField
            label="Enter url"
            type="url"
            name="url"
            id="url"
            value={formData}
            required
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
          <LoadingButton
            type="submit"
            loading={isLoading}
            loadingPosition="end"
            sx={{ p: '8px 20px', fontSize: '24px' }}
            endIcon={<SendIcon />}
            variant="contained"
          >
            <span>Shorten</span>
          </LoadingButton>
        </Grid>
      </Grid>
      <Grid container direction="column" spacing={4} component="div">
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            p: 5,
          }}
        >
          {shortenLink && (
            <>
              <Typography variant="h3" color="primary">
                Your shorten link is ready!
              </Typography>
              <Typography
                variant="h4"
                component="a"
                color="success"
                href={shortenLink.shortUrl}
                target="_blank"
              >
                {shortenLink.shortUrl}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShortLink;
