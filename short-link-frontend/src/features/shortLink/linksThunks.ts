import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ApiLink, LinkMutation } from '../../types';

export const sendLink = createAsyncThunk(
  'links/send',
  async (url: string) => {

    const apiLink: LinkMutation = {
      originalUrl: url,
    };

    const { data: shortenLink } = await axiosApi.post<ApiLink | null>('/links', apiLink);

    if (!shortenLink) {
      return null;
    }

    return {
      ...shortenLink,
      shortUrl: `http://localhost:8000/links/${shortenLink.shortUrl}`,
    };
  },
);