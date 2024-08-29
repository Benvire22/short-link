import { createSlice } from '@reduxjs/toolkit';
import { sendLink } from './linksThunks';
import { ApiLink } from '../../types';

export interface LinksState {
  shortUrl: ApiLink | null;
  loading: boolean;
  isError: boolean;
}

export const initialState: LinksState = {
  shortUrl: null,
  loading: false,
  isError: false,
};

export const lLinksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendLink.pending, (state) => {
      state.loading = true;
      state.isError = false;
    }).addCase(sendLink.fulfilled, (state, {payload: shortenLink}) => {
      state.shortUrl = shortenLink;
      state.loading = false;
    }).addCase(sendLink.rejected, (state) => {
      state.isError = true;
      state.loading = false;
    });
  },
  selectors: {
    selectShortLink: (state) => state.shortUrl,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.isError,
  },
});

export const linksReducer = lLinksSlice.reducer;

export const {
  selectShortLink,
  selectLoading,
  selectError
} = lLinksSlice.selectors;
