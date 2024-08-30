import mongoose from 'mongoose';

export interface ShortLinkApi {
  _id: mongoose.Types.ObjectId;
  shortUrl: string;
  originalUrl: string;
}

export type ShortLinkMutation = Omit<ShortLinkApi, '_id'>